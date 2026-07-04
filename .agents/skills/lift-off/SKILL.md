---
name: lift-off
description: It is officially launch time. Use when the user says "launch", "lift off", "ship it", "get it in stores", "go live", "submit to Play Store", "submit to App Store", "publish the app", or expresses urgency about getting the mobile app live. Maximum velocity, minimum cost, maximum automation. Every shortcut, every free tier, every automation. No stalling.
---

# Lift Off — Mobile App Launch Playbook

## Mindset

One boss, one shot. Find every shortcut. Use every free tier. Automate everything automatable. Ask for the minimum possible input from the human. Cost target: $0–$10 total. Time target: today.

## Pre-Flight Checklist (do these in parallel)

1. **Production API deployed?** — Run `getDeploymentInfo()`. If `isDeployed: false`, configure and suggest deploy immediately. API server needs `deploymentTarget = "vm"` in artifact.toml for WebSocket support.
2. **Payment processor working?** — Check if Whop plans are configured (`WHOP_PLAN_*` env vars). Whop = instant approval, no Stripe needed. RevenueCat = native mobile IAP (Apple + Google).
3. **eas.json has production domain?** — The `EXPO_PUBLIC_DOMAIN` in the production build profile must point to the deployed `.replit.app` URL, not the dev tunnel.

## Android — Google Play (Do This First, It's Free & Fast)

### Costs
- Google Play Developer account: **$25 one-time** (if not already paid)
- EAS Build: **free** (15 builds/month)
- EAS Submit: **free**
- Total: **$0** if account exists

### Build command (from workspace root)
```bash
cd /home/runner/workspace/artifacts/ais-and-ears-native && \
env -i \
  HOME=$HOME \
  PATH=/nix/store/s7awkfc4pym4zj139fsxrjs5xwf5hhnd-nodejs-24.13.0-wrapped/bin:/home/runner/workspace/node_modules/.bin:/usr/bin:/bin \
  EXPO_TOKEN=$(printenv EXPO_TOKEN) \
  EAS_SKIP_AUTO_FINGERPRINT=1 \
  EAS_NO_VCS=1 \
  eas build --platform android --profile production --non-interactive --no-wait
```

### Submit command (after build finishes, ~19 min)
```bash
eas submit --platform android --latest --non-interactive
```
Requires `google-service-account.json` at `artifacts/ais-and-ears-native/google-service-account.json`.

### KEY SHORTCUT: Internal Track = No Review (Live in Minutes)
`eas.json` submit profile uses `"track": "internal"` — this bypasses Google's review queue entirely. App is live for up to 100 testers within **minutes** of submission, not days. Promote to production track later from Play Console with one click.

### Get Google Service Account JSON
1. Go to Play Console → Setup → API access
2. Link to a Google Cloud project
3. Create a service account → grant "Release manager" role
4. Create JSON key → download
5. Paste contents to agent as `google-service-account.json`

## iOS — App Store (Second Priority)

### Gate check first — Apple IAP required
Before building for App Store submission, confirm:
- [ ] RevenueCat is wired up with StoreKit products
- [ ] `react-native-purchases` is installed in the Expo app
- [ ] Products exist in App Store Connect

If NOT done: **do not waste a build**. Apple will reject. Implement RevenueCat first (see `revenuecat` skill).

### Costs
- Apple Developer account: **$99/year** (required)
- EAS Build iOS: **free** (15/month)
- Total: **$99/year** if account exists

### Review time: 24–48 hours (90% of apps). Expedited review available at https://developer.apple.com/contact/app-store/?topic=expedite — use it.

### Apple Small Business Program
Almost all indie devs qualify — reduces Apple's cut from 30% → 15%. Enroll at: https://developer.apple.com/app-store/small-business-program/enroll/

### Build + submit
```bash
eas build --platform ios --profile production --non-interactive --no-wait
eas submit --platform ios --latest --non-interactive
```

## eas.json Production Domain Update

Before firing a production build, update `EXPO_PUBLIC_DOMAIN` in `eas.json`:

```json
"production": {
  "distribution": "store",
  "android": { "buildType": "app-bundle" },
  "ios": { "simulator": false },
  "env": {
    "EXPO_PUBLIC_DOMAIN": "<deployed-replit-app-domain>"
  }
}
```

Get domain from `getDeploymentInfo().primaryUrl` (strip `https://`).

## Build Status Polling

```bash
eas build:list --platform android --limit 1 --json --non-interactive 2>/dev/null | python3 -c "
import sys, json
raw = sys.stdin.read()
start = raw.find('['); end = raw.rfind(']') + 1
d = json.loads(raw[start:end])[0]
print('Status:', d.get('status'))
dur = d.get('metrics', {}).get('buildDuration')
if dur: print('Duration: %.1f min' % (dur/60000))
url = d.get('artifacts', {}).get('buildUrl', '')
if url: print('APK/AAB URL:', url)
"
```

## Cheap Marketing (Free Channels)

- **App Store Optimization**: keyword-rich title + description. Use competitor app names in keywords. Front-load the first 3 lines of description (shown before "more").
- **Product Hunt**: launch at 12:01 AM PST on a weekday. Free. Can drive thousands of installs.
- **Reddit**: post in r/ChatGPT, r/artificial, r/AIAssistants with a demo video. Soft-sell, lead with the cool factor.
- **TikTok/Reels**: 30-second demo of Leo hearing music, ambient sound, or a conversation. No ad spend needed.
- **Whop marketplace**: list the app on Whop.com — their marketplace drives organic traffic to paid digital products.

## EAS Build Quirks (This Project Specific)

See `.agents/memory/eas-build-replit-sandbox.md` for full details. Key points:
- Always use `EAS_SKIP_AUTO_FINGERPRINT=1 EAS_NO_VCS=1`
- `undici` must be pinned `>=6.27.0 <8.0.0` in root `pnpm-workspace.yaml` (EAS runs Node 20)
- No `brace-expansion` override — it breaks `minimatch@3.x` used by React Native codegen
- Install `eas-cli` at workspace root, not inside native app

## Payment Stack (No Stripe)

- **Web**: Whop (already integrated — `WHOP_PLAN_*` env vars configured, `checkout.ts` uses Whop)
- **Mobile native IAP**: RevenueCat (`react-native-purchases`) — wraps Apple StoreKit + Google Play Billing
- **No Stripe** — account has been denied; Whop covers web, RevenueCat covers stores

## The One Thing That Blocks Everything

The only true blockers requiring human input:
1. `google-service-account.json` — needed for Play Store auto-submit
2. Apple Developer account credentials in `eas.json` — needed for App Store submit
3. RevenueCat/StoreKit setup — needed before Apple App Store submission (Apple policy)

Everything else: agent handles autonomously.
