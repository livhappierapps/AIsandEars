---
name: EAS Build in Replit Sandbox
description: How to run EAS builds from the Replit sandbox environment without git/VCS errors
---

# EAS Build in Replit Sandbox

## The rule
Always run EAS CLI with `EAS_SKIP_AUTO_FINGERPRINT=1` and `EAS_NO_VCS=1`, using `env -i` to pass only required env vars, and the `--no-wait` flag to avoid blocking the shell.

## Why
Replit's sandbox blocks git index lock acquisition and certain post-fingerprint git writes. Without these flags, EAS will error on VCS operations it can't perform.

## How to apply

**eas-cli location**: Install at workspace root (`package.json` devDependencies), NOT inside `artifacts/ais-and-ears-native/` — installing inside the native app disrupts Metro's file watcher (ENOENT on expo_tmp_* dirs).

**Command pattern:**
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

**First-time init (if project not yet on expo.dev):**
```bash
# Same env -i wrapper, but:
eas init --non-interactive --force
# --force creates the project if it doesn't exist yet
```

**EXPO_TOKEN**: Must be set as a Replit secret (key: `EXPO_TOKEN`). Get from expo.dev/settings/access-tokens. Expo project: `@livhappier/ais-and-ears-native`, ID: `99f06f7a-90df-4b77-8138-206c11df7762`.

**Android build URL**: https://expo.dev/accounts/livhappier/projects/ais-and-ears-native/builds/2c6a2e15-b991-4a27-9d8a-9af5624398e1 (first preview build)
