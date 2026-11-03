Source: https://audd.io/pricing/
Title: AudD Music Recognition API Pricing & Plans
Fetched: 2026-11-03T07:40:27.388Z

# AudD Music Recognition API Pricing

AudD's music recognition API has a free trial of 300 requests for new accounts, where available, with no credit card. Paid plans are monthly subscriptions from **$5 per month**, each with a set number of requests included. At very large volumes, custom pricing goes down to **about $2 per 1,000 requests**. Stream monitoring is **$45 per stream per month**.

[Sign Up for an API Token](https://dashboard.audd.io/signup) [Email api@audd.io](mailto:api@audd.io?subject=AudD%20pricing)

## File recognition plans

Prices in US dollars. Requests beyond a plan's included amount cost the same per 1,000 as the included ones, normally billed at the end of the billing period.

| Plan | Price | Requests included | Additional requests |
| --- | --- | --- | --- |
| Free trial: New accounts, where available; no credit card | $0 | 300 requests in total, usable for 14 days | None: requests stop at 300 |
| Indie: Lowest-cost listed plan up to 90,000 requests a month | $5per month | 1,000 per month | $5.00 per 1,000 |
| Startup: Lowest-cost listed plan from 90,000 to about 188,900 requests a month | $450per month | 100,000 per month | $4.50 per 1,000 |
| Pro: Lowest-cost listed plan above about 188,900 requests a month | $850per month | 200,000 per month | $4.25 per 1,000 |
| Custom: [Email api@audd.io](mailto:api@audd.io?subject=Custom%20pricing) | Quoted individually, down to about $2 per 1,000 at very large volumes | Higher volumes, or on-premise | Set in your quote |

AudD file recognition plans

Already signed in? Go straight to checkout: [Indie](https://dashboard.audd.io/?action=subscribe&plan=indie_plan_outside) · [Startup](https://dashboard.audd.io/?action=subscribe&plan=startup_plan) · [Pro](https://dashboard.audd.io/?action=subscribe&plan=pro_plan)

### What a month costs at different volumes

Your requests per monthType a number to see the lowest-cost plan and its cost.

| Requests per month | Lowest-cost plan | Monthly cost |
| --- | --- | --- |
| 1,000 | Indie | $5 |
| 10,000 | Indie | $5 + 9 × $5.00 =$50 |
| 50,000 | Indie | $5 + 49 × $5.00 =$250 |
| 100,000 | Startup | $450 |
| 150,000 | Startup | $450 + 50 × $4.50 =$675 |
| 200,000 | Pro | $850 |
| 300,000 | Pro | $850 + 100 × $4.25 =$1,275 |

Monthly cost on the lowest-cost listed plan, including additional requests.

### Billing details

- Unused included requests don’t roll over to the next month.
- Commercial use is allowed on all paid plans. You can upgrade, change or cancel your plan anytime in the [dashboard](https://dashboard.audd.io/).
- Need a hard monthly cap on requests? Email [api@audd.io](mailto:api@audd.io) and we’ll set one on your account.
- Payment is by card through Stripe. Enterprise customers can also pay by US domestic or international bank transfer.
- Enterprise features such as ISRC and UPC codes and the match score are available on request: email [api@audd.io](mailto:api@audd.io).

## Short clips and long files

### Standard endpoint

`api.audd.io` is for short clips and returns the top match. It analyzes up to the first 12 seconds of audio. Any account can use it, including the free trial.

[Standard endpoint docs](https://docs.audd.io/)

### Enterprise endpoint

`enterprise.audd.io` takes audio and video files of any length and counts one request per 12 seconds of audio scanned. A 60-minute file is 3,600 ÷ 12 = 300 requests: $1.50 at $5.00 per 1,000.

The `skip` and `every` parameters scan part of a file. With `skip=4` and `every=1`, it recognizes 12 seconds out of every 60, so the same file uses 60 requests. Set `limit` to cap how many 12-second chunks one call recognizes. Any paid plan can use this endpoint.

[Enterprise endpoint docs](https://docs.audd.io/enterprise/) [Controlling enterprise endpoint cost](https://audd.io/resources/concepts/enterprise-cost-control)

## Stream monitoring

24/7 recognition of radio stations and other live streams. Results arrive by callback or longpoll, or show in a widget.

Song identifiedSong identifiedSong identifiedSong identified

Song identifiedSong identifiedSong identifiedSong identifiedSong identified

Song identifiedSong identifiedSong identifiedSong identified

Song identifiedSong identifiedSong identifiedSong identifiedSong identified

| Catalog | Price | Setup |
| --- | --- | --- |
| AudD database (160 million songs) | $45per stream per month | Self-serve in the [dashboard](https://dashboard.audd.io/) |
| Your own uploaded catalog | $25per stream per month | By request: [api@audd.io](mailto:api@audd.io). Catalog setup and storage fees are quoted separately |

Stream monitoring prices

Billing is by capacity, not by the hour: you pay for the maximum number of streams you will run at the same time, bought as a monthly limit. 20 simultaneous streams cost 20 × $45 = $900 per month.

If you raise your limit during a billing period, the unused part of what you already paid is credited. New accounts that get the free trial may also get a 3-day trial of one stream.

Add streams in the dashboard or through the API.

[Stream monitoring docs](https://docs.audd.io/streams/) [Callbacks vs longpoll](https://audd.io/resources/concepts/callback-vs-longpoll) [Identify music in live streams](https://audd.io/resources/articles/identify-music-in-live-audio-streams)

## Pricing FAQ

### How much does the AudD music recognition API cost?

AudD has a free trial of 300 requests for new accounts, where available. Paid plans are monthly subscriptions. Indie is $5 per month with 1,000 requests included, then $5.00 per 1,000. Startup is $450 per month with 100,000 requests included, then $4.50 per 1,000. Pro is $850 per month with 200,000 requests included, then $4.25 per 1,000. For higher volumes, and for on-premise deployment, pricing is custom, going down to about $2 per 1,000 at very large volumes: contact [api@audd.io](mailto:api@audd.io). Stream monitoring is $45 per stream per month.

### Is there a free trial for the AudD API?

Yes, where available: a new AudD account gets 300 recognition requests in total, usable for 14 days, with no credit card. The trial does not turn into a paid plan by itself. New accounts that get the trial may also get a 3-day trial of one stream.

### Is AudD pay-as-you-go or a subscription?

AudD's paid plans are monthly subscriptions that include a set number of requests. Requests beyond that are billed at the plan's rate per 1,000, normally at the end of the billing period, so the bill follows your usage. The smallest plan is Indie: $5 per month with 1,000 requests included, then $5.00 per 1,000. Unused included requests do not roll over. You can cancel anytime.

### How does AudD count requests for long audio files?

AudD's standard endpoint (api.audd.io) analyzes up to the first 12 seconds of audio, so longer audio goes through AudD's enterprise endpoint (enterprise.audd.io). The enterprise endpoint accepts files of any length and counts one request per 12 seconds of audio scanned, so a 60-minute file is 3,600 / 12 = 300 requests, or $1.50 at $5.00 per 1,000. Its skip and every parameters let you scan only part of a file to use fewer requests.

### How much does AudD stream monitoring cost?

AudD stream monitoring costs $45 per stream per month against AudD's database of 160 million songs, or $25 per stream per month against your own uploaded catalog, set up by request, with catalog setup and storage fees quoted separately. Billing is by capacity: you pay for the maximum number of streams you run at the same time, not for hours used. For example, 20 simultaneous streams cost 20 x $45 = $900 per month. If you raise the limit during a billing period, the unused part of what you already paid is credited.

### Does the AudD API return ISRC and UPC codes?

AudD can return ISRC and UPC codes and the match score as enterprise features, available on request: email [api@audd.io](mailto:api@audd.io). Any paid plan can use the enterprise endpoint for long files; without enterprise features, results come back without ISRC, UPC and the score.

### How much does AudD charge for higher volumes or for on-premise?

AudD quotes higher volumes, on-premise deployment, SLAs and other custom terms individually, going down to about $2 per 1,000 requests at very large volumes. Email [api@audd.io](mailto:api@audd.io) with your use case and expected volume.

### Can I set a hard monthly request limit on my AudD account?

Yes: email [api@audd.io](mailto:api@audd.io) and AudD will set a hard monthly request cap on your account.

### What payment methods does AudD accept?

AudD accepts cards, through Stripe. Enterprise customers can also pay by US domestic or international bank transfer.

## How to subscribe

1. Sign up: new accounts get the free trial where available, with no card.
2. Choose a plan in the [dashboard](https://dashboard.audd.io/).
3. Pay by card through Stripe, then send requests with your API token.

[Sign Up for an API Token](https://dashboard.audd.io/signup)