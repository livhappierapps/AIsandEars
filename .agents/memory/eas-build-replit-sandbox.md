---
name: EAS Build in Replit Sandbox
description: How to run EAS builds from the Replit sandbox environment, including all quirks discovered across multiple build attempts
---

# EAS Build in Replit Sandbox

## Required env flags (both mandatory)

Always run EAS CLI with `EAS_SKIP_AUTO_FINGERPRINT=1` and `EAS_NO_VCS=1`, using `env -i` to pass only required env vars, and `--no-wait` flag to avoid blocking the shell.

**Why:** Replit's sandbox blocks git index lock acquisition and certain post-fingerprint git writes. Without these flags, EAS errors on VCS operations.

```bash
cd /home/runner/workspace/artifacts/ais-and-ears-native && \
env -i \
  HOME=$HOME \
  PATH=/nix/store/s7awkfc4pym4zj139fsxrjs5xwf5hhnd-nodejs-24.13.0-wrapped/bin:/home/runner/workspace/node_modules/.bin:/usr/bin:/bin \
  EXPO_TOKEN=$(printenv EXPO_TOKEN) \
  EAS_SKIP_AUTO_FINGERPRINT=1 \
  EAS_NO_VCS=1 \
  eas build --platform android --profile preview --non-interactive --no-wait
```

## eas-cli location

Install (or verify) eas-cli at workspace root — `node_modules/.bin/eas` — NOT inside the native app.

## EAS archives the FULL workspace, not just the native app subdirectory

EAS cloud installs the full pnpm workspace (10 packages). It DOES run `pnpm install --frozen-lockfile` against the root `pnpm-lock.yaml`. Any override that needs to apply in EAS must be at the **workspace root** in `pnpm-workspace.yaml`'s `overrides:` section.

**Why:** Despite running EAS from `artifacts/ais-and-ears-native/`, EAS detects the pnpm workspace root and installs everything. The root `pnpm-lock.yaml` is used verbatim.

## EXPO_PUBLIC_DOMAIN must be baked into eas.json

EAS cloud does NOT get Replit env vars. Add to `eas.json` preview profile:

```json
"env": {
  "EXPO_PUBLIC_DOMAIN": "<replit-dev-domain>.worf.replit.dev"
}
```

For production builds, update to the deployed `.replit.app` domain before building.

## No `workspace:*` dependencies in native app package.json

If EAS sees workspace:* refs, it fails with a resolution error. Keep all `catalog:` and actual semver refs — no `workspace:*` entries in the native app's dependencies.

## undici must be pinned below v8 in pnpm-workspace.yaml overrides

**Why:** EAS cloud runs Node.js 20. `undici@8.x` requires Node.js 22+ (`webidl.util.markAsUncloneable` doesn't exist in Node 20). The native app's `@expo/cli` dependency pulls in undici. Without the root override, EAS resolves `undici@8.x` (latest) and crashes with `TypeError: webidl.util.markAsUncloneable is not a function` in the EAGER_BUNDLE phase.

**Fix in `pnpm-workspace.yaml`:**
```yaml
overrides:
  undici: '>=6.27.0 <8.0.0'
```

After changing overrides, run `pnpm install --no-frozen-lockfile` and verify the lockfile shows `undici@7.x`.

## pnpm overrides REPLACE the constraint — they do NOT intersect

**Critical:** `pnpm.overrides.brace-expansion: '>=2.0.3'` forces ALL packages that depend on `brace-expansion` to install `>=2.0.3`, even if they declare `^1.1.0`. pnpm does NOT intersect the override with the dependent's range — it replaces it. This breaks `minimatch@3.x` and `glob@7.x` which require brace-expansion v1.x API (`expand` function removed in v2+).

**Rule:** Do NOT add a blanket `brace-expansion` override. If the security patch is needed, scope it specifically (e.g. `parentpkg>brace-expansion: '>=2.0.2'`).

## React Native codegen needs correct brace-expansion for minimatch@3.x

`@react-native/codegen@0.81.5` → `glob@7.2.3` → `minimatch@3.1.5` → `brace-expansion@^1.1.0`. If brace-expansion gets overridden to `>=2.0.3` or `>=1.1.12` (which resolves to latest = v2+ or v5+), `minimatch@3.x` crashes with `TypeError: expand is not a function` during `generateCodegenSchemaFromJavaScript` Gradle task.

## .easignore excludes node_modules

`artifacts/ais-and-ears-native/.easignore` contains `node_modules` so EAS archives source only and EAS cloud does a fresh `pnpm install --frozen-lockfile` from the workspace root lockfile.

## Checking build status / logs

```bash
# List recent builds
eas build:list --platform android --limit 3 --json --non-interactive

# Decode Brotli-compressed log (use Node.js — curl+gunzip doesn't work)
node -e "
const https = require('https');
const zlib = require('zlib');
https.get('<log-url>', { headers: {'Accept-Encoding': 'identity'} }, res => {
  const chunks = [];
  res.on('data', c => chunks.push(c));
  res.on('end', () => {
    zlib.brotliDecompress(Buffer.concat(chunks), (err, result) => {
      const text = err ? Buffer.concat(chunks).toString('utf8') : result.toString('utf8');
      const lines = text.split('\n').filter(l => l.trim()).map(l => {
        try { return JSON.parse(l); } catch(e) { return null; }
      }).filter(Boolean);
      const errIdx = lines.findIndex(l => l.msg && (l.msg.includes('non-zero exit') || l.msg.includes('FAILURE') || l.msg.includes('TypeError')));
      const start = Math.max(0, errIdx - 60);
      lines.slice(start, errIdx + 10).forEach(l => { if (l.msg && l.msg.trim()) console.log('[' + (l.source||'sys') + '] ' + l.msg.trim()); });
    });
  });
});
"
```

## Expo project info

- Project: `@livhappierapps/ais-and-ears-native`
- Expo project ID: `8c8d85fb-57c4-4c5c-91cf-1cd4bc90b0f9` (re-created July 2026 — old ID `99f06f7a...` was deleted)
- Account ID: `1fab176d-47e6-48c3-8935-b29099032a52` (needed to re-create via GraphQL API)
- Package: `com.livhappierapps.aisandears`
- `EXPO_TOKEN` is set as a Replit secret
- app.json `owner` must be `livhappierapps` (not `livhappier`)

## If project ID stops working again

The project was deleted once from expo.dev. Re-create via GraphQL:
```js
node -e "
const https = require('https');
const token = process.env.EXPO_TOKEN;
const q = JSON.stringify({ query: \`mutation { app { createApp(appInput: { accountId: \"1fab176d-47e6-48c3-8935-b29099032a52\", projectName: \"ais-and-ears-native\" }) { id fullName } } }\` });
const r = https.request({ hostname:'api.expo.dev', path:'/graphql', method:'POST', headers:{'Content-Type':'application/json','Authorization':'Bearer '+token} }, res => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>console.log(d)); });
r.write(q); r.end();
"
```
Then update `extra.eas.projectId` in app.json with the new ID.

## Build phases in order (healthy build)

1. INSTALL_DEPENDENCIES (~30s) — pnpm install --frozen-lockfile from workspace root
2. EAGER_BUNDLE (~60s) — Metro JS bundle
3. RUN_GRADLEW (~15-18 min) — Android compilation, codegen, APK signing

Total successful build time: ~19 minutes
