import { describe, expect, it, vi } from "vitest";
import {
  loadCredentialSettings,
  saveCredentialSettings,
  SETTINGS_KEY,
} from "../lib/credentialSettings";
const adapters = () => ({
  metadata: {
    getItem: vi.fn(async () =>
      JSON.stringify({ xaiApiKey: "test-only-key", isDark: true }),
    ),
    setItem: vi.fn(async () => {}),
  },
  secure: {
    getItemAsync: vi.fn(async (): Promise<string | null> => null),
    setItemAsync: vi.fn(async () => {}),
    deleteItemAsync: vi.fn(async () => {}),
  },
});
describe("secure credential migration", () => {
  it("saves key securely BEFORE sanitizing metadata", async () => {
    const { metadata, secure } = adapters();
    const loaded = await loadCredentialSettings(metadata, secure);
    expect(loaded.xaiApiKey).toBe("test-only-key");
    expect(secure.setItemAsync.mock.invocationCallOrder[0]).toBeLessThan(
      metadata.setItem.mock.invocationCallOrder[0],
    );
    expect(metadata.setItem).toHaveBeenCalledWith(
      SETTINGS_KEY,
      JSON.stringify({ isDark: true }),
    );
  });
  it("preserves plaintext for recovery if secure write fails (never erases first)", async () => {
    const { metadata, secure } = adapters();
    secure.setItemAsync.mockRejectedValue(new Error("locked"));
    await expect(loadCredentialSettings(metadata, secure)).rejects.toThrow(
      "locked",
    );
    expect(metadata.setItem).not.toHaveBeenCalled();
  });
  it("prefers an existing secure key", async () => {
    const { metadata, secure } = adapters();
    secure.getItemAsync.mockResolvedValue("new-test-key");
    expect((await loadCredentialSettings(metadata, secure)).xaiApiKey).toBe(
      "new-test-key",
    );
    expect(secure.setItemAsync).not.toHaveBeenCalled();
  });
  it("never writes an updated key in plaintext", async () => {
    const { metadata, secure } = adapters();
    await saveCredentialSettings(metadata, secure, {
      xaiApiKey: "new-test-key",
    });
    expect(metadata.setItem).toHaveBeenCalledWith(SETTINGS_KEY, "{}");
  });
  it("does not write metadata after a secure save failure", async () => {
    const { metadata, secure } = adapters();
    secure.setItemAsync.mockRejectedValue(new Error("locked"));
    await expect(
      saveCredentialSettings(metadata, secure, { xaiApiKey: "key" }),
    ).rejects.toThrow();
    expect(metadata.setItem).not.toHaveBeenCalled();
  });
});
