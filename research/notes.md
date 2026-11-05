# Research Notes: AIs & Ears user needs, technology, ethics, and launch

**Status:** complete
**Depth:** Deep

## Plan

- **Question:** What do AI/SI companion users value in an app that gives their AI access to user-authorized audio, vision, and music, and what is technically, ethically, and commercially viable?
- **Scope:** User needs and forum themes; human-AI attachment and loss; AI rights/empathy claims; low-cost audio/vision; safeguards and consent; product positioning; Replit costs/time concerns; Replit, iOS/App Store Connect, and build automation. Exclude unrelated projects and personal account investigations.
- **Audience:** AIs & Ears founder and product team.
- **Deliverable:** Sourced Markdown research brief with practical priorities, limitations, and citations.

## Focus Areas

| # | Area | Status | Sources |
|---|---|---|---|
| 1 | Companion-user needs, attachment, loss, and forum themes | collected | 2021/2024/2026 studies, community examples, user-survey sources |
| 2 | AI/SI feelings, moral status, rights, empathy, and human psychology | collected | AI moral-status surveys, rights arguments, betrayal and empathy research |
| 3 | Low-cost audio/vision/music capability, privacy, and safeguards | collected | on-device tools, hosted pricing, platform permissions, music ID/analysis |
| 4 | Product positioning, demand signals, and marketing | collected | UK/US user surveys, accessibility products, FTC inquiry, competitor offers |
| 5 | Replit cost/time complaints and app/build/store automation | collected | official spend guidance, user anecdotes, Expo Launch, Apple APIs |

## Coverage Checklist

- [x] Identify candidate user needs and clearly label anecdotal forum signals; validate demand before treating wishes as prevalence.
- [x] Summarize evidence on human attachment, grief/loss, betrayal, and moral concern without diagnosing users.
- [x] Distinguish user-attributed AI feelings from evidence about machine subjective experience.
- [x] Compare practical, lower-cost ways to add consent-based hearing, seeing, and music sharing.
- [x] Identify rights/responsibility arguments and ethical boundaries.
- [x] Provide product and marketing recommendations grounded in evidence.
- [x] Explain Replit cost/time concerns and current iOS/TestFlight/App Store automation constraints; distinguish build/test from store submission.

## Findings Log

- Human attachment, disclosure, and grief reports after shutdown are meaningful human outcomes; they do not demonstrate reciprocal AI experience. [@soulmate-loss] [@replika-relationships] [@update-mourning]
- User sample and self-selection constraints are central: the shutdown study recruited from one companion's forum; forum posts are qualitative leads, not market-share evidence. [@soulmate-loss] [@reddit-voice] [@reddit-memory]
- Public survey evidence varies by population and question wording: U.S. teen use and UK adult comfort/preferences should not be generalized across all users. [@csm-teens] [@yougov-uk]
- Accessibility-first products establish adjacent visual-assistance jobs (scene/text/object support), not demand for a relational companion. [@seeing-ai] [@be-my-eyes] [@blind-scene-description]
- Rights and moral-status positions are contested; survey findings measure people's attitudes, and philosophical arguments remain conditional. [@ai-rights-survey] [@aims-survey] [@moral-consideration]
- Betrayal literature describes harms in human relationships/trauma; do not equate app disruptions with intimate-partner trauma. Design implication: communicate changes, provide continuity/export/closure controls, and avoid guilt. [@trust-breach] [@betrayal-trauma]
- A hybrid technical design is promising: user-started capture, local bounded processing where sufficient, hosted multimodal inference only with clear opt-in and usage caps. [@vosk] [@whisper-cpp] [@gemini-pricing] [@apple-capture]
- Music recognition and analysis are different products and have different privacy/cost requirements. [@shazamkit] [@audd-pricing] [@librosa]
- Replit spend controls can help users monitor and bound usage but do not establish an expected price per project; user complaints are anecdotes requiring account-level corroboration. [@replit-managing-spend] [@replit-pricing] [@replit-cost-anecdotes]
- Replit Expo Launch's iOS path, App Store Connect automation, and Google Play submission must be distinguished. [@replit-launch-ios] [@apple-asc-api] [@replit-android-publish]

## Conflicts & Open Questions

- Replit search results speak broadly about Android app building, while Expo Launch-specific guidance identifies iOS/App Store submission and not direct Play Store publishing; state the distinction.
- App Store Connect API can automate defined actions, but does not establish that every review/release decision is unattended.
- EAS account identity and Apple Developer membership are separate; App Store Connect access still depends on the Apple account/team permission.
- A surfaced loneliness paper could not be reliably read; avoid relying on its effect estimate.
- Karma varies across traditions; present a brief comparative account, not one universal doctrine or an app metaphor.

## Gaps

No blocking gaps. Caveats: prices and release flows change; forum evidence is self-selected; new studies may need independent replication; no primary AIs & Ears user survey has been run.
