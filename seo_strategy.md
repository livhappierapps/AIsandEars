# SEO Strategy

## In scope
- Public web routes in `artifacts/ais-and-ears`
- Landing / marketing experience at `/`
- Legal pages at `/privacy` and `/terms`
- Source-visible crawlability files for the web app (`robots.txt`, `sitemap.xml`, `llms.txt`, favicon, social assets)

## Out of scope
- Native mobile app in `artifacts/ais-and-ears-native`
- Internal design tooling in `artifacts/mockup-sandbox`
- Authenticated or paid in-session UI after checkout
- API endpoints except where they would need to serve crawlability/discovery files

## Target audience
- Prospective buyers evaluating a paid AI voice-and-vision assistant
- Existing customers who need shareable legal/policy pages

## Primary keywords
- Unknown — likely around AI voice assistant, AI with camera access, real-time AI voice, and Grok voice companion

## Dismissed categories
- None yet.

## Notes
- Public web app is a React 19 + Vite 7 SPA using Wouter routes.
- Public routes currently identified from source: `/`, `/privacy`, `/terms`.
- Social bots and AI crawlers are assumed to consume only initial HTML, not client-rendered route content.
