/** Storage order is intentional: secure write must succeed BEFORE plaintext removal.
 * Injected adapters keep migration independently testable without native modules.
 */
export interface MetadataStore {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}
export interface CredentialStore {
  getItemAsync(key: string): Promise<string | null>;
  setItemAsync(key: string, value: string): Promise<void>;
  deleteItemAsync(key: string): Promise<void>;
}
export const SETTINGS_KEY = "@aisears/settings";
export const CREDENTIAL_KEY = "aisears.xaiApiKey"; // SecureStore permits dots, not slashes/@
export async function loadCredentialSettings(
  metadata: MetadataStore,
  credentials: CredentialStore,
) {
  const raw = await metadata.getItem(SETTINGS_KEY);
  const loaded = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  const legacy = typeof loaded.xaiApiKey === "string" ? loaded.xaiApiKey : "";
  let key = await credentials.getItemAsync(CREDENTIAL_KEY);
  if (key === null && legacy) {
    await credentials.setItemAsync(CREDENTIAL_KEY, legacy);
    key = legacy;
  }
  const { xaiApiKey: _discard, ...safe } = loaded;
  await metadata.setItem(SETTINGS_KEY, JSON.stringify(safe));
  return { ...safe, xaiApiKey: key ?? "" };
}
export async function saveCredentialSettings(
  metadata: MetadataStore,
  credentials: CredentialStore,
  settings: { xaiApiKey: string },
) {
  const { xaiApiKey, ...safe } = settings;
  if (xaiApiKey) await credentials.setItemAsync(CREDENTIAL_KEY, xaiApiKey);
  else await credentials.deleteItemAsync(CREDENTIAL_KEY);
  await metadata.setItem(SETTINGS_KEY, JSON.stringify(safe));
}
