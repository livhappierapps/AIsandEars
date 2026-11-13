# Deployment reference (historical migration guide)

> **2026-11-06 audit:** This PR was not deployed. The existing supplied API is `https://aisandears.onrender.com`; do not create a duplicate service just by following this older guide. Review [the audit](docs/AUDIT-2026-11-06.md) before release. No free-tier uptime, model-cost or no-credit-card guarantee is made. Deployment/signing/store operations require separate approval.

This guide moves AIs&Ears off Replit onto free infrastructure that runs forever.

**When you're done**: Replit is still where you code. But the live app runs on its own.

**Total cost**: $0/month. No credit card needed for any of these steps.

---

## PART 1 — Get a Free Database (Neon)

**Step 1 — Open Neon**
Go to: **https://neon.tech**
Click **Sign Up**. Use your Google account — it's fastest.

**Step 2 — Create a project**
Click **New Project**.
Name it `ais-and-ears`. Leave everything else as-is.
Click **Create Project**.

**Step 3 — Copy the connection string**
You'll see a box that says **Connection string**.
Click the **copy icon** next to it. (Two overlapping squares.)

✅ You have a connection string. It starts with `postgresql://`.

**Step 4 — Push the schema to Neon**
Come back to Replit. Open the shell. Run this (paste your connection string where it says `YOUR_NEON_URL`):

```bash
DATABASE_URL="YOUR_NEON_URL" pnpm --filter @workspace/db run db:push
```

Wait for it to finish. You should see tables being created.

✅ Stop here if the command fails — paste the error in chat.

---

## PART 2 — Deploy the API to Render

**Step 5 — Open Render**
Go to: **https://render.com**
Click **Get Started for Free**. Use your GitHub account.

**Step 6 — Connect your GitHub repo**
Click **New +** → **Web Service**.
Connect your GitHub account if it asks.
Find your `ais-and-ears` repo and click **Connect**.

**Step 7 — Use the render.yaml config**
Render will find the `render.yaml` file automatically.
If it asks you to confirm the service name, leave it as `ais-and-ears-api`.
Click **Create Web Service**.

**Step 8 — Add environment variables on Render**
Go to your service → **Environment** tab.
Add each of these one at a time. Click **Add Environment Variable** for each:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon connection string from Step 3 |
| `XAI_API_KEY` | Your xAI key (from console.x.ai) |
| `WHOP_API_KEY` | From app.whop.com → Settings → API Keys |
| `WHOP_WEBHOOK_SECRET` | From app.whop.com → your app → Webhooks |
| `WHOP_PLAN_AUDIO_MONTHLY` | Your Whop plan ID |
| `WHOP_PLAN_FULL_MONTHLY` | Your Whop plan ID |
| `WHOP_PLAN_AUDIO_SESSION` | Your Whop plan ID |
| `WHOP_PLAN_FULL_SESSION` | Your Whop plan ID |
| `WHOP_COMPANY_ID` | Your Whop company ID |
| `SESSION_SECRET` | Any long random string (like a password) |
| `BRIDGE_API_KEY` | Same value as your Replit `BRIDGE_API_KEY` secret |
| `EXPO_TOKEN` | Your Expo access token |
| `OWNER_PASS` | *(optional)* Private owner pass, at least 24 characters (use a long random string). Enables `POST /api/owner-pass` and the small **Owner access** link on the packages screen, which starts a 24-hour voice + vision session without Whop. Unset = the route returns 404. Five wrong tries from one address locks it for 15 minutes. |
| `APP_BASE_URL` | Web checkout return origin (not the API origin) |
| `API_PUBLIC_BASE_URL` | Public API origin, e.g. `https://aisandears.onrender.com`; bridge URLs fall back to `RENDER_EXTERNAL_URL` then the API request host |
| `APPROVED_APK_URL` | Optional approved Expo APK artifact URL; absent means no APK is advertised |
| `FFMPEG_BIN` | Optional ffmpeg executable path; Android music requires an installed decoder. Local verification does not verify Render. |
| `XAI_VOICE_MODEL` | *(optional)* Defaults to `grok-voice-latest` |
| `XAI_VOICE` | *(optional)* Defaults to `ara` (others: eve, leo, rex, sal) |
| `XAI_VISION_MODEL` | *(optional)* Defaults to `grok-4.3` |

See `artifacts/api-server/.env.example` for the full list.

**Owner pass:** sessions made with `OWNER_PASS` are stored in `paid_sessions`
like paid ones but their payment id starts with `owner_comp_` (never a Whop
`mem_` id), so they are easy to tell apart from paid memberships. To revoke
access, change or remove `OWNER_PASS`; existing owner sessions expire within
24 hours.

Click **Save Changes** when all are added.

**Step 9 — Wait for the first deploy**
Render will build and start your API. This takes about 3–5 minutes.
You'll see a green **Live** badge when it's done.

**Step 10 — Copy your Render URL**
It will look like: `https://ais-and-ears-api.onrender.com`
Copy it. You'll need it in the next steps.

**Step 11 — Test the API**
In your browser, go to: `https://YOUR-RENDER-URL/api/healthz`
You should see: `{"status":"ok"}`

✅ Your API is live if you see that.

---

## PART 3 — Keep Render Awake (UptimeRobot)

A free service can sleep or hit usage limits; a monitor is not an uptime guarantee. Review current Render terms and limits before configuring one.

**Step 12 — Open UptimeRobot**
Go to: **https://uptimerobot.com**
Click **Register for FREE**.

**Step 13 — Add a monitor**
Click **Add New Monitor**.
Set these values:
- **Monitor Type**: HTTP(s)
- **Friendly Name**: AIs&Ears API
- **URL**: `https://YOUR-RENDER-URL/api/healthz`
- **Monitoring Interval**: 5 minutes

Click **Create Monitor**.

A successful monitor request is not proof that cold starts, quotas or outages cannot occur.

---

## PART 4 — Deploy the Web App to Cloudflare Pages

**Step 14 — Open Cloudflare Pages**
Go to: **https://pages.cloudflare.com**
Sign up for a free account (no credit card needed).

**Step 15 — Connect your repo**
Click **Create a project** → **Connect to Git**.
Connect your GitHub account.
Select your `ais-and-ears` repo.

**Step 16 — Configure the build**
Set these values:
- **Framework preset**: None (Custom)
- **Build command**: `BASE_PATH=/ pnpm --filter @workspace/ais-and-ears run build`
- **Build output directory**: `artifacts/ais-and-ears/dist/public`
- **Root directory**: `/` (leave blank)

**Step 17 — Add the environment variable**
On the same screen, scroll to **Environment variables**.
Add one variable:
- **Name**: `VITE_API_BASE_URL`
- **Value**: `https://YOUR-RENDER-URL` (no trailing slash)

Click **Save and Deploy**.

**Step 18 — Wait for the build**
This takes about 2–3 minutes.
You'll get a URL like `https://ais-and-ears.pages.dev` when it's done.

**Step 19 — Add your Cloudflare domain to Render CORS**
Go back to Render → your service → **Environment**.
Add one more variable:
- **ALLOWED_ORIGINS**: `https://ais-and-ears.pages.dev`
- **APP_BASE_URL**: `https://ais-and-ears.pages.dev`

Click **Save Changes**. Render will redeploy automatically (takes 1–2 min).

✅ Your web app is live at your Cloudflare Pages URL.

---

## PART 5 — Update the Mobile App

**Step 20 — Update eas.json**
Open `artifacts/ais-and-ears-native/eas.json`.
Preview and production now use the public API origin:
```json
"EXPO_PUBLIC_API_BASE_URL": "https://aisandears.onrender.com"
```
This value is public build-time configuration, never an API key. The legacy `EXPO_PUBLIC_DOMAIN` remains accepted for compatibility; do not include arbitrary paths or an insecure remote HTTP origin.

**Step 21 — Trigger new EAS builds**
Only after separate build/signing approval and the provisioning checks in the audit: run the appropriate EAS build from `artifacts/ais-and-ears-native`. This audit ran config resolution and unsigned exports only, not an EAS build.

---

## PART 6 — Tell Whop Your New URL

**Step 22 — Update Whop webhook URL**
Go to: **app.whop.com** → your app → **Webhooks**
Update the webhook URL from the Replit URL to your Render URL:
`https://YOUR-RENDER-URL/api/whop/webhook`

**Step 23 — Update Whop redirect URLs**
In your Whop app settings, update any allowed redirect domains to include `ais-and-ears.pages.dev`.

---

## ✅ Done — You're Free

| Service | URL | Cost |
|---|---|---|
| API | `https://ais-and-ears-api.onrender.com` | $0 |
| Web app | `https://ais-and-ears.pages.dev` | $0 |
| Database | Neon | $0 |
| Keep-alive | UptimeRobot | $0 |

If Replit disappears, users notice nothing. Come back here to code; the app runs itself.
