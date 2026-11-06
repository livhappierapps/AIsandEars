# AIs & Ears — IPA Builder Handoff

## What to do

Inspect this complete AIs & Ears project and report whether the current Expo app can be turned into a working, installable iOS IPA. Identify the signing and provisioning route needed for a real device, and diagnose the known app issues below.

This is analysis only. Do not edit files, install or change dependencies, run signing or publishing commands, create certificates or provisioning profiles, change identifiers, push commits, or submit anything. Return findings and proposed fixes to the user; the Replit Agent will verify them before making changes.

Do not ask for passwords, Apple credentials, API keys, signing certificates, provisioning profiles, or session tokens. None are included in this bundle.

## Requested findings

1. **IPA feasibility:** distinguish a simulator build from a device-installable IPA, an internal/ad hoc build, and a TestFlight/App Store build. State which targets are feasible from the current configuration and what evidence is missing.
2. **Provisioning:** explain the exact Apple Developer team, bundle identifier, distribution method, certificate/profile, and Expo/EAS ownership requirements for each viable target. The user's Apple Developer and EAS accounts use different email addresses; do not assume they belong to the same owner or team.
3. **Current blockers:** identify specific source/configuration changes or account-side setup that would block a functional IPA. Cite paths and relevant settings, and separate confirmed blockers from hypotheses.
4. **Known app issues:** investigate the issues listed below. For each, give a likely cause, a minimal proposed fix, and a way to verify the fix. Do not claim a test or build passed unless you ran it and can provide its output.
5. **Next steps:** provide a short, ordered checklist. If the user must do something in Apple Developer or Expo, include the exact menu path and direct URL.

## App identity and build configuration

- Product: **AIs & Ears** native Expo app.
- Expo app config: `artifacts/ais-and-ears-native/app.json`.
- Current iOS bundle identifier: `com.livhappierapps.aisandears`.
- Current Expo owner: `livhappierapps`.
- The app config contains an EAS project ID. Check whether it is valid and owned by the intended Expo account; do not change or reassign it.
- Build profiles are in `artifacts/ais-and-ears-native/eas.json`. Inspect the actual profiles rather than assuming their names or distribution settings are sufficient for the requested IPA.
- The app uses the AIs & Ears API at the configured production domain. Do not point it at a guessed endpoint.

## Observed build environment

These versions were observed in the Replit workspace on 2026-11-06. Treat them as environment evidence, not as proof that an IPA build succeeds:

| Tool | Observed version |
| --- | --- |
| OS | Replit Linux x86_64, kernel 6.18.60 |
| Bash | GNU bash 5.3.15 |
| Node.js | v24.22.1 |
| pnpm | 10.26.1 |
| npm | 11.18.0 |
| Git | 2.55.0 |
| Python | 3.13.11 |
| Expo CLI reported by the native package command | 54.0.25 |

The native package manifest currently declares `expo` `~54.0.27`, `@expo/cli` `54.0.23`, and React Native `0.81.5`. The workspace root separately declares Expo `~57.0.4` and React Native `0.86.0`; do not assume the root declarations are the native app's resolved versions. Use `artifacts/ais-and-ears-native/package.json` and the matching importer in `pnpm-lock.yaml` as the app-specific records, and investigate any version inconsistency rather than silently changing it.

## Known issues to investigate

- **Media sharing controls:** users need to see when audio or video is being shared and have a reliable stop action.
- **Android live voice:** current source comments say live voice input is iOS-only; determine what is needed to make the feature work on Android.
- **Android API URL:** installed Android builds need to reach the current API after the backend moved.
- **Android music awareness:** verify the existing recording-and-analysis path end to end before release.
- **Possible Expo preview error:** `window.ethereum.selectedAddress` was previously suspected to come from Brave's injected wallet code, but that has not been confirmed as unrelated to the app. Treat this as a hypothesis and check the source before concluding.

## Required response format

Return:

1. A concise feasibility verdict for each IPA/distribution target.
2. A prioritized list of blockers, each marked **confirmed**, **likely**, or **unknown**.
3. The exact secure provisioning/account setup needed, without collecting credentials.
4. Minimal proposed code/config diffs or precise file-and-line guidance for the known issues.
5. A verification checklist and any evidence gathered.

Keep this project separate from the paused LeoseeLeohear idea. Do not modify AIs & Ears or create another project.
