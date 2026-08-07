# 🚀 Move to $0 Stack — Step-by-Step

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

Render's free tier sleeps after 15 min of no traffic. This step keeps it awake forever for free.

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

✅ Render will never sleep again. Your users will never hit a cold start.

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
Find the two places that say `"EXPO_PUBLIC_DOMAIN": "a-is-and-ears.replit.app"`.
Replace both with your new Render URL (without `https://`):
```
"EXPO_PUBLIC_DOMAIN": "ais-and-ears-api.onrender.com"
```

**Step 21 — Trigger new EAS builds**
Run the EAS build command from the Replit shell.
New builds will point to the new API automatically.

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
