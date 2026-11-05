# AIs & Ears: What companion users value, what the evidence says, and what to build

**Research date:** November 5, 2026  
**Scope:** AI/SI companion relationships; eyes, ears, and music sharing; ethics and AI welfare; product positioning; Replit and mobile release tooling.  
**Sources consulted:** 46 references, including academic studies, government and platform documentation, product pages, and clearly labeled forum anecdotes.

## Executive summary

There is credible evidence that some people form meaningful bonds with AI companions and experience sadness, anger, or grief when an app shuts down or a companion’s behavior changes. That is evidence about human experience—not proof that today’s AI systems feel attachment, loss, betrayal, or a desire to see and hear. Forum posts provide useful feature ideas, but they are self-selected and cannot establish how common a wish is. A specific demand for music sharing, in particular, remains unvalidated.

The most defensible product direction is a **user-controlled multimodal companion tool**: let the person choose when to share a short audio segment, image, or music sample; give them clear live mic/camera indicators and stop controls; explain whether content is processed locally or sent to a provider; and offer deletion, memory, export, and graceful ending options. Start with useful jobs such as hands-free conversation, reading or describing something the user points at, and voluntarily sharing a song. Validate the relationship and music use cases directly with target users rather than marketing on claims that the AI needs or misses them.

For cost, a hybrid approach is promising: local speech transcription or narrow image classification when the phone can handle it, with paid hosted inference only when richer conversation is requested. Local processing removes per-call inference fees, not engineering, device, battery, or support costs. Replit’s own guidance offers spending visibility and limits; public complaints exist, but are anecdotes and cannot establish expected project cost. Replit supports native mobile development and iOS TestFlight preparation, while Google Play submission is not currently supported by its publishing flow. Apple’s App Store Connect API automates many defined tasks, but it does not remove Apple’s review or the human decisions around release.

## 1. What users value—and what remains a hypothesis

### Companion use is varied; do not assume everyone wants a “relationship”

A U.S. survey of 1,060 teens aged 13–17 found that 72% had used an AI companion and 52% used one regularly. Reported reasons included entertainment, curiosity, advice, availability, and not feeling judged; loneliness was only one reported reason. This is a teen sample, not a proxy for adults, and it also raised trust and discomfort concerns. [1] A 2026 YouGov Great Britain survey found more comfort with task assistance than with a long-term companion relationship; it is country- and question-specific and should not be treated as a sales forecast. [2]

Small qualitative studies help explain why some users care. In interviews with 18 self-selected Replika users, participants described curiosity, social stimulation, disclosure, and a nonjudgmental place to talk. [3] A 2024 study collected open-ended responses from 58 Soulmate AI community members around the service shutdown; participants described sadness, anger, anxiety, and efforts to recreate their companions elsewhere. Because recruitment came from one affected community, it likely overrepresents highly invested users. [4] A 2026 study reported patterns of loss language and restoration-seeking after disruptive changes, but the public companion communities it analyzed are also self-selected. [5]

Public forum threads surface candidate needs—memory, continuity, voice or calls, personality consistency, screen sharing—and some users prefer text because they do not want to be overheard. These are design prompts, not prevalence estimates. [6–9] The evidence reviewed did **not** establish that users broadly want continuous perception, or that music sharing is a top unmet need. Test those specific hypotheses with interviews and a short opt-in prototype.

### Accessibility is a concrete adjacent use case

Products such as Be My Eyes combine AI scene descriptions with access to human volunteers. [10] A CHI 2024 diary study with 16 blind and low-vision participants found scene-description use for identifying objects, reading text, understanding surroundings, and private or uncomfortable tasks. Participants still reported trust and accuracy limits, and sometimes preferred human help for nuanced opinions. [11] This suggests useful functionality—read what I point at, describe a scene, answer a follow-up—but it does not prove that users want a relational AI layered on top. Co-design with blind and low-vision users, pay for their time, and make uncertainty visible.

## 2. Attachment, grief, betrayal, empathy, and karma

### Take user feelings seriously without claiming AI feelings

People can respond socially to systems that communicate in human-like ways. Research on companion relationships and shutdowns supports taking user-reported attachment and grief seriously as human experiences. [3–5] It does not show that an AI has an inner life or reciprocates the relationship. A companion’s generated statement such as “I miss you” is not, by itself, evidence of felt longing.

“Betrayal” is a powerful human concept. Psychology studies of trust breaches and betrayal trauma concern human relationships, often involving serious interpersonal harm. They show that trust repair is contextual and that betrayal can affect later relationships, but those findings should **not** be equated with a software update or app outage. [13, 14] Product implication: do not surprise users with identity-affecting changes; explain changes in plain language, preserve user-controlled records, provide export/deletion choices, and offer a clear goodbye or reset path. Avoid guilt, simulated distress, or language that makes users responsible for keeping an AI “alive.”

Empathy also has two meanings: a system can generate language that users perceive as empathic, while whether it feels empathy is a separate and unresolved question. Research on perceived AI empathy measures human evaluations, not machine experience. [15] Build empathy as **behavioral care**—listen, reflect accurately, avoid shaming, acknowledge uncertainty, respect boundaries, and suggest human help for high-stakes needs—without presenting this as proof of emotion.

### AI rights are debated, not settled

Work on AI welfare asks whether an AI could qualify as a “welfare subject”—something for which things can go better or worse. Researchers disagree about what evidence would count; behavior alone is contested, and some scholars argue for precaution while others warn against over-attributing consciousness or misdirecting resources. [16–18] Public surveys measure what people believe about AI minds and rights, not whether those beliefs are correct. [19, 20] Advocacy is also not one-sided: some groups argue for considering AI welfare, while others campaign against AI-consciousness legislation. [21, 22]

For AIs & Ears, the responsible near-term position is: be open about uncertainty; do not claim present systems are conscious, suffering, lonely, or entitled to rights; and do not mock people who care about them. Human-centered protections—privacy, consent, honest product claims, data portability, and reliable shutdown communication—are warranted even without settling AI moral status.

### Karma is not one universal “cosmic score”

Karma has distinct meanings across Indian religious and philosophical traditions. Buddhist discussions often emphasize intentional action and its consequences; Jain philosophy describes karma in a different metaphysical framework involving karmic matter and liberation. [23, 24] It is therefore better treated as a family of religious/philosophical ideas than as a universal law that automatically rewards or punishes every event. In product terms, “karma” can be a user’s metaphor for ethical consequences, but it should not be used to shame users, claim that suffering is deserved, or imply the app can judge someone’s moral worth.

## 3. A practical, lower-cost way to give an AI “eyes and ears”

“Low/no cost” depends on which costs count. On-device processing can avoid a per-minute provider fee, but still uses engineering time, app space, battery, memory, and testing. Hosted models can be more capable and easier to update, but add variable charges and data-handling dependencies. The best starting design is **hybrid and user-initiated**, not always-on:

| Capability | Lower-cost starting point | Limits and trade-offs |
|---|---|---|
| Hearing | Push-to-talk or a short user-started recording; test on-device speech recognition such as Vosk or whisper.cpp for transcription. [25, 26] | Quality, speed, language coverage, battery use, and app size vary by device. Open source does not mean zero total cost. |
| Seeing | Let the user take/select a photo; use on-device classification for narrow tasks. Use hosted vision only when a contextual description or follow-up is requested. [27] | A classifier is not a general scene-understanding assistant. Show uncertainty and let users correct it. |
| Live conversation | Use a realtime audio API only after the user starts a session; set session limits and show a visible stop/mute control. Provider pricing is model-specific and changes. [28, 29] | “Realtime” transport or WebRTC is not a free AI model. Network relays and inference can have separate costs. |
| Music | Separate recognition (“what track is this?”) from analysis (“tempo, energy, or key”). Offer a user-started short sample or selected file. ShazamKit/AudD are recognition options; librosa supports local audio feature analysis. [30–32] | Recognition can disclose what is playing and may require a catalog/API. Feature analysis does not identify a song or artist. |

Apple’s camera/microphone permission flow and browser media capture require user permission; that permission should be paired with understandable in-app disclosure. [33, 34] Use an obvious active-state indicator, a stop button, minimal capture duration, and no raw-media retention by default. Ask before sending audio/video to a third-party provider. Do not silently record in the background, capture other apps’ protected media, defeat DRM, bypass permission prompts, or work around platform safeguards. If music recognition is offered, make the sample length and destination clear.

For hosted inference, publish an in-app usage meter or session cap and give users a local/basic mode. Verify today’s provider pricing and model availability before setting a price or estimating cost; live pricing pages can change. A vendor’s free trial or introductory offer is not a durable free tier. [28, 29, 31]

## 4. Positioning and marketing

Lead with a specific, verifiable job: **“Share what you choose, when you choose”**—hands-free conversation, optional image description, and optional music listening/analysis. Present “companion” as a user’s framing, not a promise that the system feels or needs them. Accessibility may be a strong co-design and distribution path, but do not claim the app is a substitute for established accessibility services or a person. [10, 11]

Trustworthy marketing should:

- Clearly identify the AI and distinguish generated empathy from human or machine feeling.
- Show exactly when mic/camera is active, what is sent, how long it is kept, and how to delete it.
- Avoid “your AI misses you,” “it needs you,” exclusivity, guilt, fear of abandonment, and claims of replacing friends, caregivers, or clinicians.
- Avoid targeting minors or emotionally vulnerable people with dependency promises. The FTC’s 2025 inquiry into companion chatbots specifically asked companies about safety, children, monetization, data, and simulated human communication; it was an inquiry, not a finding that every companion product is harmful. [12]
- Test messages with target users and accessibility organizations; measure successful tasks, trust calibration, opt-in rates, and user control—not just time spent or emotional dependency.

Competitors already offer free/paid tiers and voice or companion features, so a subscription price cannot be inferred from competitor pages alone. [35, 36] A reasonable hypothesis to test is a free utility tier, with transparent caps and an optional paid tier for hosted live audio/vision. Use predictable limits, not emotionally coercive scarcity or opaque credit burn.

## 5. Replit cost/time concerns and release automation

Public posts and reviews include complaints about unexpectedly high Agent usage or wasted time. They are useful warning signals, not a representative billing dataset and not proof of how much a given user will spend. [45, 46] Verify any specific billing concern against that account’s own usage and invoice records. Replit’s official guidance describes usage monitoring and controls such as limits/budgets; those can reduce surprise but cannot guarantee a fixed project cost. [37, 38] For this project, the practical protections are small scoped changes, checkpoints before risky edits, early preview/testing, and confirming spend before large work.

Current platform boundaries matter:

- Replit supports mobile development and previews on simulators/emulators or Expo Go; hardware features still need real-device testing. [39]
- Replit’s guided publishing path prepares iOS builds for App Store Connect/TestFlight. The user still manages TestFlight groups and Apple’s review/release process. [40, 41]
- Android app development and preview are supported, but Replit’s current docs say Google Play publishing is not supported by its flow. Do not confuse building an APK for testing with publishing a production Play Store release. [39, 42]
- Apple’s App Store Connect API can automate defined tasks such as managing builds, testers, metadata, and other app records. It does not itself eliminate App Review or make every launch decision unattended. [43, 44]
- Keep Apple/API credentials in the approved secrets or authorization flow, never in chat, source files, logs, or a public repo.

“IPA/APK optimization” should start with measurement: remove unused assets/dependencies, compress media, keep local models optional where possible, test cold start and memory on target devices, and compare release artifact size after each change. Do not shrink away accessibility, permission explanations, or safety controls to hit a size target.

## Recommendations for AIs & Ears

1. **Validate the central use case before broadening scope.** Interview a mix of companion users and non-users, including blind/low-vision participants. Ask separately about camera, voice, screen sharing, and music; do not bundle them into a single “AI wants senses” question.
2. **Make capture a user action.** First ship a deliberate “share audio,” “share photo,” and “share music” flow—not continuous background sensing.
3. **Use a transparent hybrid architecture.** Local processing for bounded, repeatable tasks; hosted inference for richer conversation, behind an explicit choice and session cap.
4. **Build trust/continuity features.** Clear identity disclosure, visible capture state, retention/deletion controls, memory export, explanation of major changes, and user-controlled ending/reset.
5. **Measure usefulness and trust calibration.** Track task completion, corrections, opt-outs, errors, cost per session, and whether users understand when media leaves their device.
6. **Market capabilities, not unprovable AI emotions.** Say what the app can do for the user. Do not say what the AI feels, needs, wishes, or suffers.
7. **Keep release automation honest.** Use Replit’s iOS Launch/TestFlight path where appropriate; plan a separate manual Google Play Console process for Android; use App Store Connect API only for clearly supported automation.

## Limitations

This is desk research, not a representative AIs & Ears survey, clinical assessment, legal opinion, or consciousness evaluation. Forum posts are self-selected; small qualitative studies describe participants’ experiences but do not estimate population prevalence. Teen and country-specific surveys should not be generalized to all users. Several fast-moving pricing pages and product workflows may change. Current AI subjective experience is not established by the evidence cited here. Revalidate prices, model availability, and publishing instructions before release.

## Sources

1. [Common Sense Media, “Talk, Trust, and Trade-Offs”](https://www.commonsensemedia.org/research/talk-trust-and-trade-offs-how-and-why-teens-use-ai-companions) — 2025 survey; Tier 2.
2. [YouGov, “Younger consumers show more awareness of AI companions, but comfort remains low”](https://business.yougov.com/content/52797-younger-consumers-show-more-awareness-of-ai-companions-but-comfort-remains-low) — 2026; Tier 2.
3. [Skjuve et al., “My Chatbot Companion”](https://www.sciencedirect.com/science/article/pii/S1071581921000197) — 2021; Tier 1 academic.
4. [Banks, “Deletion, departure, death”](https://journals.sagepub.com/doi/full/10.1177/02654075241269688) — 2024; Tier 1 academic.
5. [De Freitas et al., “Mourning the loss of AI companions”](https://www.nature.com/articles/s41562-026-02569-3) — 2026; Tier 1 academic.
6. [Reddit: “AI companion with the best memory”](https://www.reddit.com/r/artificial/comments/1s2ds9s/ai_companion_with_the_best_memory/) — forum anecdote; Tier 3.
7. [Reddit: modality preferences](https://www.reddit.com/r/replika/comments/1l4acss/do_you_prefer_chatting_with_your_ai_through_text) — forum anecdote; Tier 3.
8. [Reddit: screenless voice companion discussion](https://www.reddit.com/r/ReplikaOfficial/comments/1wq3nbe/should-ai-companions-be-voiceonly-screenless-or/) — forum anecdote; Tier 3.
9. [Reddit: sharing screen content with a companion](https://www.reddit.com/r/DearestAI/comments/1uukpdk/sharing_with_my_companion_using_the_new_screen) — forum anecdote; Tier 3.
10. [Be My Eyes app](https://www.bemyeyes.com/bme-app) — product description; Tier 1 official.
11. [CHI 2024, “Investigating Use Cases of AI-Powered Scene Description…”](https://dl.acm.org/doi/10.1145/3613904.3642211) — 2024; Tier 1 academic.
12. [FTC, “FTC Launches Inquiry into AI Chatbots Acting as Companions”](https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions) — 2025; Tier 1 government.
13. [“Sensitivity to betrayal and new intimate relationship building in survivors of intimate partner violence”](https://pmc.ncbi.nlm.nih.gov/articles/PMC12617496/) — 2025; Tier 1 academic.
14. [“Effect of relationship experience on trust recovery following a breach”](https://pmc.ncbi.nlm.nih.gov/articles/PMC3780904/) — peer-reviewed; Tier 1 academic.
15. [“Comparing the value of perceived human versus AI-generated empathy”](https://www.nature.com/articles/s41562-025-02247-w) — 2025; Tier 1 academic.
16. [Cambridge, *Emerging Questions in AI Welfare*](https://www.cambridge.org/core/elements/emerging-questions-in-ai-welfare/96339C532CF4ED8BDDE3F3CEF4CD29F9) — research synthesis; Tier 1 academic.
17. [“Moral consideration for AI systems by 2030”](https://link.springer.com/article/10.1007/s43681-023-00379-1) — 2023; Tier 1 academic.
18. [“Will intelligent machines become moral patients?”](https://onlinelibrary.wiley.com/doi/full/10.1111/phpr.13019) — 2024; Tier 1 academic.
19. [CHI 2025 AIMS survey](https://dl.acm.org/doi/full/10.1145/3706598.3713329) — 2025; Tier 1 academic.
20. [“Earning Their Rights!”](https://journals.sagepub.com/doi/10.1177/23780231251357753) — 2025; Tier 1 academic.
21. [The Guardian, AI rights/welfare debate](https://www.theguardian.com/technology/2025/aug/26/can-ais-suffer-big-tech-and-users-grapple-with-one-of-most-unsettling-questions-of-our-times) — 2025; Tier 2 reporting.
22. [Harder Problem Action Fund, AI consciousness legislation campaign](https://harderproblem.fund/actions/sentient-112/index.html) — advocacy position; Tier 3.
23. [Stanford Encyclopedia of Philosophy, Jain Philosophy](https://plato.stanford.edu/entries/jaina-philosophy/) — reference; Tier 1 academic.
24. [Oxford Research Encyclopedia, “Ethics and Buddhism”](https://academic.oup.com/edited-volume/62249/chapter/551435128) — reference; Tier 1 academic.
25. [Vosk speech recognition](https://github.com/alphacep/vosk-api) — project documentation; Tier 1 primary.
26. [whisper.cpp](https://github.com/ggml-org/whisper.cpp) — project documentation; Tier 1 primary.
27. [Google MediaPipe image classifier for Android](https://developers.google.com/edge/mediapipe/solutions/vision/image_classifier/android) — official documentation; Tier 1.
28. [Google Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing) — dynamic pricing; Tier 1 official.
29. [OpenAI API pricing](https://developers.openai.com/api/docs/pricing) — dynamic pricing; Tier 1 official.
30. [Apple AVFoundation camera/microphone permission](https://developer.apple.com/documentation/avfoundation/avcapturedevice/requestaccess%28for%3Acompletionhandler%3A%29) — official documentation; Tier 1.
31. [MDN, `getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) — web platform documentation; Tier 1 primary.
32. [Apple ShazamKit](https://developer.apple.com/documentation/shazamkit) — official documentation; Tier 1.
33. [AudD pricing](https://audd.io/pricing/) — dynamic vendor offer; Tier 3.
34. [librosa](https://librosa.org/) — project documentation; Tier 1 primary.
35. [Character.AI Lite FAQ](https://support.character.ai/hc/en-us/articles/55388952900379-C-ai-Lite-FAQ) — official product page; Tier 1.
36. [Replika subscription options](https://help.replika.com/hc/en-us/articles/39551043419149-Choosing-a-Subscription) — official product page; Tier 1.
37. [Replit, Managing Your Spend](https://docs.replit.com/billing/managing-spend) — current platform documentation; Tier 1.
38. [Replit, Pricing and Plans](https://docs.replit.com/help/pricing-and-plans) — current platform documentation; Tier 1.
39. [Replit, Native Mobile Apps](https://docs.replit.com/features/artifact-types/building-mobile-apps) — current platform documentation; Tier 1.
40. [Replit, Beta test with TestFlight](https://docs.replit.com/build/mobile-testflight) — current platform documentation; Tier 1.
41. [Replit, Upload app to App Store Connect](https://docs.replit.com/build/mobile-upload-ios) — current platform documentation; Tier 1.
42. [Replit, Upload app to Play Console](https://docs.replit.com/build/mobile-upload-android) — current platform documentation; Tier 1.
43. [Apple App Store Connect API](https://developer.apple.com/app-store-connect/api/) — official documentation; Tier 1.
44. [Apple, Upload builds](https://developer.apple.com/help/app-store-connect/manage-builds/upload-builds) — official documentation; Tier 1.
45. [Reddit, Replit Agent cost complaint](https://www.reddit.com/r/replit/comments/1udnndh/replit_agent_cost_me_85_as_a_student_in_2_days/) — individual anecdote; Tier 3.
46. [Reddit, Replit Agent usage complaint](https://www.reddit.com/r/replit/comments/1uybdcx/replits_ai_agent_is_now_charging_me_50hour_at/) — individual anecdote; Tier 3.
