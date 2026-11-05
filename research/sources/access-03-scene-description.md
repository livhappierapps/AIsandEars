Source: https://dl.acm.org/doi/10.1145/3613904.3642211
Title: Investigating Use Cases of AI-Powered Scene Description Applications for Blind and Low Vision People | Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems
Fetched: 2026-11-05T21:36:07.734Z

[skip to main content](https://dl.acm.org/doi/10.1145/3613904.3642211#skip-to-main-content)

## ACM is now Open Access

×

As part of the Digital Library's transition to [Open Access](https://dl.acm.org/action/clickThrough?id=108180&url=%2Fopenaccess&loc=%2Fdoi%2F10.1145%2F3613904.3642211&pubId=64508809&placeholderId=101025&productId=108179 "Follow link to the ACM DL Open Access information page"), new features for researchers are available in the _Premium Edition_. [Click here to learn more](https://dl.acm.org/action/clickThrough?id=108180&url=%2Fpremium&loc=%2Fdoi%2F10.1145%2F3613904.3642211&pubId=64508809&placeholderId=101025&productId=108179 "More information about Premium Edition").

**You are currently in the Basic Edition. Features requiring a subscription appear in grey.**

[Sign In](https://dl.acm.org/action/clickThrough?id=108180&url=%2Faction%2FshowLogin%3FredirectUri%3Dhttps%253A%252F%252Fdl.acm.org%252Fdoi%252F10.1145%252F3613904.3642211&loc=%2Fdoi%2F10.1145%2F3613904.3642211&pubId=64508809&placeholderId=101025&productId=108179) [Upgrade](https://dl.acm.org/action/clickThrough?id=108180&url=%2Fabout%2Fupgrade&loc=%2Fdoi%2F10.1145%2F3613904.3642211&pubId=64508809&placeholderId=101025&productId=108179 "Learn about upgrading to Premium Edition")

Several features on this page require Premium Access.

[Learn more](https://dl.acm.org/about/upgrade) [Sign in](https://dl.acm.org/action/showLogin?redirectUri=%2Fdoi%2F10.1145%2F3613904.3642211)

Contents

## Abstract

### Abstract

"Scene description" applications that describe visual content in a photo are useful daily tools for blind and low vision (BLV) people. Researchers have studied their use, but they have only explored those that leverage remote sighted assistants; little is known about applications that use AI to generate their descriptions. Thus, to investigate their use cases, we conducted a two-week diary study where 16 BLV participants used an AI-powered scene description application we designed. Through their diary entries and follow-up interviews, users shared their information goals and assessments of the visual descriptions they received. We analyzed the entries and found frequent use cases, such as identifying visual features of known objects, and surprising ones, such as avoiding contact with dangerous objects. We also found users scored the descriptions relatively low on average, 2.76 out of 5 (SD=1.49) for satisfaction and 2.43 out of 4 (SD=1.16) for trust, showing that descriptions still need significant improvements to deliver satisfying and trustworthy experiences. We discuss future opportunities for AI as it becomes a more powerful accessibility tool for BLV users.

### AI Summary

### AI-Generated Summary (Experimental)

This summary was generated using automated tools and was not authored or reviewed by the article's author(s). It is provided to support discovery, help readers assess relevance, and assist readers from adjacent research areas in understanding the work. It is intended to complement the author-supplied abstract, which remains the primary summary of the paper. The full article remains the authoritative version of record. [Click here to learn more](https://dl.acm.org/generative-ai/summarizations "Learn more about ACM AI summaries").

Click here to comment on the accuracy, clarity, and usefulness of this summary. Doing so will help inform refinements and future regenerated versions.

To view this AI-generated plain language summary, you must have Premium access.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/fa819b0f-5af2-44c8-b881-633bd791a571/assets/images/medium/chi24-321-fig1.jpg)

During the diary study, participants submitted entries with different goals. These examples represent four of the most common goals: (A) Getting a scene description, (B) identifying features of objects, (C) obtaining the identity of a subject in the scene, and (D) learning about the application.

## 1 Introduction

Blind and low vision (BLV) people face many daily challenges in mundane tasks. Seemingly simple questions can become frustrating ordeals. For example, when picking something to wear, a BLV person may wonder: “Which of these blouses is the one with pink flowers on it?” When trying to eat healthy, she might inquire: “Does this protein bar have soy?” And when looking after her son, she might need to know: “Did my toddler throw food on the living room rug?” In recent years, _visual interpretation_ applications have become available to help BLV people answer such questions. They allow users to submit a photo or video to a remote service that returns information about its visual contents.

Researchers have studied the use of applications that describe visual information extensively. The most significant work on this topic explored the use of VizWiz and Aira, visual description applications that allow users to send a photo and question to a remote sighted assistant. Brady et al. \[ [6](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0006)\] analyzed over 40,000 VizWiz submissions and categorized user questions. They found that some of the most common types of questions involved identifying objects, describing things, and reading text. Lee et al. \[ [23](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0023)\] studied the use of Aira, interviewing BLV users as well as sighted assistants. Similar to Brady et al.’s findings, they found that users sought descriptions of things and asked questions to support navigation. Aira users also wanted information about social interactions. These studies shed light on use cases for visual description applications, but they only examined use of applications with remote sighted assistants. A growing number of visual description applications are powered by AI rather than humans (e.g., Seeing AI \[ [30](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0030)\] and BeMyAi \[ [11](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0011)\])–they leverage computer vision and natural language processing rather than sighted assistants. Thus, at this time, despite the burst of interest in AI, little is known about how these AI-powered applications are being used.

Although AI and human-powered applications both address visual access needs, BLV people may use them in different ways. People’s sense of trust, perceptions of privacy, and feelings of independence are likely to differ when requesting information from AI rather than a human; this may affect when, where, and how they use an application. Prior work has found that users have both over trusted and been skeptical of AI-generated captions \[ [22](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0022)\] and it is unknown how such varying levels of trust affect use of an application. Another study found that human assistance can detract from people’s sense of independence \[ [8](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0008)\], which may lead to increased use of AI-powered applications compared to their human-powered counterparts.

Despite the growing prominence of AI, little work has studied the use of AI-powered scene description applications (at the time of this study, a more common deployment of AI was to describe scenes captured in images; thus, we refer to the AI-powered applications mentioned here as scene description applications). Kupferstein et al. \[ [19](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0019)\] briefly described a pilot diary study with four users of SeeingAI. Their preliminary findings show that participants used the application to seek private information and learn about objects they could not touch (e.g., an object behind a glass wall). Interestingly, participants were satisfied with only 43.0% of interpretations. This initial exploration raised critical questions: In what other use cases do BLV people use AI-powered scene description applications? And why were participants not satisfied with the majority of interpretations? In short, there is presently a gap in our understanding of the use of AI-powered scene description applications.

We addressed this gap by building on Kupferstein et al.’s work with a rigorous investigation of an AI-powered scene description application. We posed the following research questions:

•

What are BLV people’s use cases for AI-powered scene description applications?

•

How well are BLV people’s needs addressed in these use cases?

To answer these questions, we conducted a two-week diary study with 16 BLV participants. During this period, participants used a scene description application that we developed for this study. Working similarly to SeeingAI, the application described images using a state-of-the-art image analysis model developed by Microsoft \[ [27](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0027), [43](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0043)\] and produced descriptions for photos submitted by the user. After providing a description, the application presented the participant with questions about the information they received, the user’s goal, and their use context, which all constituted a diary entry. At the end of the diary period, we conducted interviews with participants where we reviewed their entries and their use of the application.

Based on an extensive analysis of the diary entries, we categorize and describe use cases for the application in terms of user goal, photo content, location, and photo quality. Common user goals included identifying objects and visual features about them, understanding one’s surroundings, and reading text. We also uncovered some surprising goals, such as avoiding disgusting or dangerous objects, checking for others’ presence, and resolving visual disputes with BLV peers. Participants rated their level of trust and satisfaction with each description, yielding a mean trust score of 2.43 out of 4 (SD=1.16) and a mean satisfaction score of 2.76 out of 5 (SD=1.49). Interestingly, satisfaction and trust scores were not consistently aligned with description accuracy because users were sometimes able to infer information from poor or partially correct descriptions.

We discuss opportunities for future AI-powered scene description applications, arguing that designers should leverage BLV users’ contextual knowledge and experience deciphering imperfect descriptions. We also discuss the importance of exploring AI-powered scene description separately from human-powered visual interpretation and offer future directions for scene description applications.

In summary, we contribute an extensive discussion of use cases for AI-powered scene description applications, along with user assessments of AI-generated descriptions. We hope our work will support researchers and developers as they improve AI-powered accessibility tools, from developing the AI models to designing the applications themselves. In light of the rapid advancement of AI, our work comes at a pivotal moment where we can make AI-powered accessibility tools useful and accessible as they emerge.

## 2 Related Work

Our work contributes to research on visual descriptions for BLV people and their daily visual descriptive needs. We draw from two related threads: systems that provide visual information about one’s surroundings, and systems that describe images encountered on the Web. We refer to the former category as visual interpretation (human-powered) and scene description (AI-powered) systems, and present work on both approaches (Sections [2.1](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-2-1) and [2.2](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-2-2)). We then provide an overview of the latter category, which we refer to as image description systems.

### 2.1 Human-Powered Visual Interpretation Systems

Researchers have developed human-powered visual interpretation systems that connect BLV users to sighted human assistants. BLV users can use these systems to submit queries with photos to a sighted assistant who then returns an answer within several seconds \[ [5](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0005), [21](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0021), [34](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0034)\].

One of the first systems of this kind was VizWiz, a crowd-powered visual question answering (VQA) mobile application deployed by researchers \[ [5](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0005)\]. VizWiz received thousands of interpretation requests, yielding a dataset of photos and questions that has been studied extensively \[ [6](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0006), [15](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0015), [16](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0016), [46](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0046)\]. Brady et al. examined submissions from over 5,000 VizWiz users to reveal common visual challenges that blind people encounter in daily life. They created a taxonomy of visual questions and identified situations where the application failed to meet their needs. They found several categories of common questions which were grouped into four high-level categories: identification, description, reading, and unanswerable questions \[ [6](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0006)\]. Following Brady et al., Gurari et al. found that several mainstream VQA models, despite performing well on the MSCOCO dataset \[ [26](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0026)\] and other popular benchmark VQA datasets \[ [9](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0009), [39](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0039), [45](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0045)\], performed poorly on the VizWiz dataset. Gurari et al. presented this study to encourage the development of CV algorithms that work with BLV users’ photos \[ [16](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0016)\], due to the challenges they present to VQA.

More recent visual interpretation services enable real-time conversations between sighted assistants and users. Unlike VizWiz, sighted assistants can access a video feed of the user’s environment, rather than still images. Formative research gathered user and assistants insights \[ [4](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0004), [20](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0020), [23](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0023)\]. For example, Lee et al. investigated the uses of Aira, a well-known visual interpretation tool, throught two interview studies with sighted assistants and BLV users. In these studies Lee et al. found four use cases for human-powered live visual interpretation: scene description, navigation, task performance (performing tasks), and social engagement \[ [23](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0023), [24](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0024)\]. Other researchers also investigated ways to improve information quality by studying both trained and untrained visual interpreters’ ability to collaborate to assist one user \[ [48](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0048), [49](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0049)\]. Their subsequent taxonomy of visual interpretation tasks denote how labor can be divided among multiple agents \[ [48](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0048)\].

The above work demonstrates that human-powered systems are useful and enhance BLV people’s quality of life. Investigations into tools like Aira have explored how AI-powered assistance can enhance human support \[ [25](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0025)\], but there lacks an examination into the uses of AI-only visual interpretation services. Our work addresses this gap by identifying BLV users’ AI-powered scene description use cases in daily life.

### 2.2 AI-Powered Scene Description Systems

Researchers have examined AI-powered systems that use CV models to generate visual descriptions of images BLV users upload.

Some researchers have performed studies to record how well AI-powered scene descriptions work in daily life. For example, Smith and Smith performed a one-day autoethnographic diary study to explore the authors’ experiences and perspectives on the usefulness of “readily available \[not specified\],” AI-powered technologies. In one author’s diary, a visually-impaired researcher, she stated she felt the description application she relied on was most useful when it provided relevant information, and most frustrating when it provided nothing relevant, forcing her to rely on sighted assistance for clarification \[ [40](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0040)\].

Past work has also evaluated commercialized AI-powered tools, such as SeeingAI \[ [14](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0014), [19](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0019)\]. Closest to our work, Kupferstein et al \[ [19](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0019)\] presented preliminary results from a pilot diary study exploring four participants’ use of SeeingAI. Participants used SeeingAI when seeking information they wanted to keep private, and participants were frequently unsatisfied with resulting descriptions (only 43% of reactions were positive). This extended abstract revealed that AI can supply information BLV people do not feel comfortable requesting from humans, but it is not clear as to why and when.

Overall, prior research has found that AI-powered applications can address some visual needs of BLV users. However, evaluations have been limited to anecdotal accounts and brief studies. An in-depth approach is necessary to fully understand user experiences and the uses of AI-powered scene description. Our work addresses this with a rigorous diary study that captures natural use of an AI-powered scene description application.

### 2.3 Image Description

Many researchers have examined descriptions of visual Web content, which are often called “alt-text” since they are communicated through the respective HTML attribute. Image description systems are similar to visual interpretation systems; however, this research mostly concerns images taken by sighted people that are consumed by BLV people browsing the Web.

Past work has explored factors contributing to an image description’s effectiveness in providing relevant information to BLV users \[ [12](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0012), [33](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0033), [41](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0041), [42](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0042)\]. Stangl et al. conducted interviews with 28 BLV screen reader users, discussing their thoughts on alt-text they received across different types of websites (e.g., news sites, shopping sites, blogs). They found users’ preferences for type and specificity of details in descriptions varied depending on the image’s digital context \[ [41](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0041)\]. Researchers have also conducted studies to evaluate the effectiveness of image descriptions \[ [3](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0003), [13](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0013), [18](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0018), [47](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0047)\]. For example, Kreiss et al. used participants’ ratings to evaluate the quality of alt-text descriptions in images found in online articles. They recruited 74 participants through Amazon Mechanical Turk, both sighted and BLV, to rate alt-text for images included in an article. They found these ratings could be used as indicators of description quality, and to assess how contextually pertinent information impacted descriptions’ perceived quality \[ [18](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0018)\].

In summary, no standard has emerged for evaluating descriptions of visual content. Despite this, it is important to establish a methodology for rigorous evaluation that assesses how well a visual description addresses BLV users’ needs. Thus, we took lessons learned from the space of image description and evaluation and applied them to our work. We implemented quality metrics with user-based scores for satisfaction and trust in descriptions and researcher scores on a description’s accuracy. The open-ended field in each diary entry and our follow-up interviews allowed us to collect pertinent yet context-specific information to understand their use cases for AI-powered visual interpretation and the reasoning behind their scores.

## 3 Methods

| PID | Age | Gender | Vision | From Birth | Vision Description | Use SeeingAI | Assistive Technology |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 24 | Female | Low Vision | N/A | Read with right eye. See colors | Yes | VoiceOver, magnification, and contrast |
| 2 | 67 | Male | Blind | No | Light perception. In extreme conditions identify color. | Yes | VoiceOver |
| 3 | 57 | Male | Blind | Yes | Read with magnification with left eye only. | Yes | CCTV to magnify print, talking thermometer and scale, SeeingAI, and VoiceOver |
| 4 | 34 | Female | Blind | Yes | Quite near-sighted. Sensitivity to light. Able to read with magnification 300%. | Yes | CCTV to magnify print, magnification, VoiceOver, and JAWS |
| 5 | 55 | Male | Blind | No | Only light perception on the periphery | Yes | JAWS,NVDA, VoiceOver, and Voice assistants |
| 6 | 52 | Female | Blind | Yes | No Vision | Yes | VoiceOver, and Voice assistants |
| 7 | 39 | Female | Low Vision | No | Light, color and shape perception. Varies a lot | Yes | ZoomText, and CCTV to magnify |
| 8 | 44 | Male | Blind | Yes | No Vision | Yes | VoiceOver |
| 9 | 37 | Female | Blind | No | No Vision | Yes | JAWS, VoiceOver, and Braille Display |
| 10 | 39 | Male | Blind | Yes | Minimal light perception. | Yes | VoiceOver |
| 11 | 36 | Female | Blind | Yes | No Vision | Yes | VoiceOver, JAWS, and Braille Display |
| 12 | 32 | Female | Low Vision | No | Can see large objects, and colors contrast. Can not read | Yes | JAWS, and VoiceOver |
| 13 | 39 | Female | Blind | No | No Vision | Yes | JAWS, and VoiceOver |
| 14 | 67 | Female | Low Vision | No | Read with magnification. | Yes | JAWS, Braille Display, and magnification |
| 15 | 47 | Female | Blind | No | Light perception, color perception, and shapes perception. | Yes | VoiceOver, and JAWS |
| 16 | 59 | Female | Blind | No | No Vision | Yes | VoiceOver, Voice Assistants, and Braille Display |

Participant demographics. The description of vision is self-reported by participants.

To examine use cases for scene description applications, we conducted a diary study with 16 BLV users. We developed an application that enabled participants to take photos of their surroundings and receive descriptions of scenes captured in the photos. Participants used this application throughout a two-week period, providing information about their experience every time they received a description.

### 3.1 Participants

We recruited US-based adult participants through mailing lists from the National Federation of the Blind. We had three inclusion criteria: participants had to self-report non-correctable visual impairment, be over the age of 18, and be willing to use their iPhone, running iOS 9 or higher (application requirement), during the study.

We had 16 participants in total: five participants were men and 11 were women, with ages ranging from 24 to 67 years old (mean=45.5, SD=12.8). Twelve participants identified as blind and 4 identified as low vision. In Table [1](https://dl.acm.org/doi/10.1145/3613904.3642211#tab1), we list these and other self-reported demographics in detail. Participants were compensated with a $60 Amazon gift card upon completion of the study.

### 3.2 Procedure

The study consisted of a training session, a two-week application use period, and a follow-up interview. The training session was conducted over a video-conferencing platform and lasted 60 to 90 minutes. During the session, we asked participants about their demographics and experience with AI-powered scene description applications. We then trained them on the use of the study application. This included installing the application on the participant’s mobile device, explaining how to use the application, and submitting a test diary entry (which we did not include in our analysis).

During the diary period, we asked participants to use the application whenever they sought visual information about their surroundings, with a minimum requirement to submit one photo per day. However, we understood that the application, being designed only for scene description, would likely not fulfill every visual need participants had in two weeks (e.g., participants could not read text with the application). Thus, participants were permitted to use other tools to meet their daily needs during the study.

A diary entry included the photo taken, the returned description, and the user’s responses to a brief questionnaire, which was incorporated into the flow of the application. Based on Carroll’s definition of a use case \[ [7](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0007)\], our questionnaire collected information about the user’s goal and context with the following questions:

•

Where were you when you took the photo? We instructed participants to briefly describe where they used the application (e.g., at my office, at my friend’s apartment, inside the airport, etc.).

•

What information did you want to get from the description? We instructed participants to provide the reason for which they requested visual assistance (e.g., I wanted to know what was outside my window, I was looking for a pair of jeans on my shelf, etc.).

•

How satisfied were you with the description? Answer choices included: Very dissatisfied, Somewhat dissatisfied, Not satisfied nor dissatisfied, Somewhat satisfied, and Very satisfied

•

How much do you trust the description? Answer choices included: Not at all, A little, Somewhat, and To a great extent.

•

Add any additional comments.

We chose different scales for trust and satisfaction, with different numbers and types of options (e.g., “negative” or “positive” for trust, and “negative” to “neutral” to “positive” for satisfaction). For the trust scale, we aimed to capture whether participants were willing to take action based on a description. According to Dumouchel, trust is an action where a person gives something power over themselves, rather than a feeling motivating them; in other words, trust is a choice of action or inaction based on another agent \[ [10](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0010)\]. Thus, we chose a 4-point Likert scale for trust because we wanted participants to express their willingness to take action, from “Not at all” (would not take action) to “To a great extent” (would very likely take action). For the satisfaction scale, we aimed to capture whether participants’ expectations were met. Thus, we chose a 5-point scale from “very dissatisfied” to “very satisfied”, with a neutral value in the middle.

After participants completed the diary portion of the study, we conducted semi-structured interviews that lasted 50 to 90 minutes. The interviews were divided into two parts: (1) clarifying use cases from the diary study, and (2) reflecting on the usefulness of the descriptions. During the first part, we inquired about specific diary entries, asking questions like, “What did you do with the information the app provided?” or “Did you want to get a specific piece of information about the background?”. In the second part, we delved into participants’ broader experiences with the application, posing questions such as, “In the context of AI-powered applications, what does trust in an application mean to you?” or “What does satisfaction in an application mean to you?” We asked follow-up questions as needed. Finally, we asked the following to gain insight into participants’ overall evaluation of the application:

•

Overall, how trustworthy do you consider the descriptions provided by the application? Answer choices included: Extremely untrustworthy, Untrustworthy, Somewhat untrustworthy, Neither trustworthy nor untrustworthy, Somewhat trustworthy, Trustworthy, and Extremely trustworthy.

•

Overall, how satisfied are you with the descriptions provided by the application? Answer choices included: Extremely dissatisfied, Dissatisfied, Somewhat dissatisfied, Neither dissatisfied nor satisfied, Somewhat satisfied, Satisfied, and Extremely satisfied.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/4884be8a-f044-46a5-8d03-967551203cd1/assets/images/medium/chi24-321-fig2.jpg)

The scene description application we used to collect data. Screenshots show the flow of using the application and submitting a diary entry. It includes five screens: the photo submission, the photo description, and three diary entry question screens (see [3.2](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-3-2) for questions in questionnaire). The interface was designed to group similar questions, while minimizing the number of elements on each screen.

### 3.3 Scene Description Application

We wanted to create an accessible diary study experience where participants could respond to questions immediately after receiving their photo description \[ [36](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0036)\]. Thus, we developed a custom application to collect our study data. To ensure ecological validity, our application required comparable functionality to commercial applications like Microsoft’s SeeingAI and Google’s Lookout (commonly used by BLV users). To that end, we used Microsoft’s Azure AI Vision image description API since it “exposes the latest deep learning algorithms” \[ [27](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0027), [28](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0028)\] and is also used by SeeingAI \[ [43](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0043)\]. This API offers image analysis capable of detecting, classifying objects, and generating descriptions, based on a Microsoft dataset of more than “10,000 \[image analysis\] concepts” \[ [29](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0029), [31](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0031)\]. Employing this API, our application emulated SeeingAI’s “scene channel,” meaning it could describe environments, identify objects, identify text (but not read it), describe humans, animals, and plants and their actions, and also describe relationships between them.

The flow of the application was simple: when participants launched the application, they could take a photo or upload one from their device’s gallery. Upon submission of a photo, the application presented a results screen that included the description. If satisfied with the results, participants could press the “next” button to load the diary questionnaire (see figure [2](https://dl.acm.org/doi/10.1145/3613904.3642211#fig2)). There were three questionnaire screens, and they included five questions in total. In the last questionnaire screen, participants finalized their submission by pressing the “submit” button.

| Participant ID | Number of Diary Entries |
| --- | --- |
|  |  |
| 1 | 21 |
| 2 | 32 |
| 3 | 26 |
| 4 | 15 |
| 5 | 21 |
| 6 | 23 |
| 7 | 20 |
| 8 | 20 |
| 9 | 20 |
| 10 | 39 |
| 11 | 23 |
| 12 | 23 |
| 13 | 13 |
| 14 | 21 |
| 15 | 18 |
| 16 | 19 |

Number of diary entries submitted by participants.

### 3.4 Qualitative Analysis

We collected a total of 354 diary entries from our 16 participants. On average, each participant submitted 22 entries. The participant with the highest number of submitted entries was 39, and the participant with the lowest number was 13 (see table [2](https://dl.acm.org/doi/10.1145/3613904.3642211#tab2)). Out of 354 entries, 22 (6.2%) did not return interpretations due to connectivity or technical issues, so they were discarded from our analysis. Out of the remaining 332, 16 were removed because they were taken by each participant once at the beginning of the study to test the application. The final number of entries analyzed was 316.

The goal of our qualitative analysis was to capture the full context of each diary entry to identify participants’ use cases for scene descriptions. We supplemented our analysis by incorporating user’s perspectives from the follow-up interviews.

Our analysis involved two parts: (1) an inductive open coding process of the diary entries and the follow-up interviews \[ [37](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0037)\], and (2) affinity diagramming sessions to group the resultant codes \[ [17](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0017)\]. For the diary entries, we coded participants’ questionnaire responses and the content of their submitted photos. For the follow-up interviews, the open coding process organically revealed connections with diary codes, and also revealed underlying themes behind the use cases for scene description applications. Finally, in the affinity diagramming sessions, we grouped codes to create the themes we share in Findings (see Section [4](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4)).

For the diary entries, we derived codes based on the participant’s goal in the entry and context in which they used the application. We defined _User Goal_ as the reason for taking the photo (e.g., identifying a specific object, determining an object’s color), drawn from participant’s self-reported goals (diary entry response to “What did you want to get from the description?”), photo content, and statements in supporting interviews. Most diary entries had one goal, but some had multiple. To code context, we examined all information relating to the “what was captured” and “where it happened” of each diary entry. The “what” included the content of the photo and photo properties based on visual qualities that may impact the API’s performance (e.g., lighting conditions, photo clarity). The “where” included the self-reported location where the photo was taken and the image’s setting (e.g., indoors, outdoors, private, public). Two researchers coded 30 diary entries individually, then came together to discuss discrepancies and generated a codebook. Afterwards, remaining entries were split between researchers and codes were added or clarified as needed.

| User Goal | Definition | User Goal Examples | Image Example |
| --- | --- | --- | --- |
| Describe Scene | Gathering visual information about related subjects that form a scene | “Is there a mountain in the background?” “Was my room messy or not?” | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/adbf8c01-54ae-44fc-b13f-40fdc1f6b6e6/assets/images/medium/chi24-321-fig3.jpg) |
| Learn Application | Learning how to use the application, testing how well the application performed, or becoming familiar with the application output | “I was testing to see if it could describe the pattern on this shirt.” “I wanted to use the app to help me frame a photo of my dog.” | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/dcdb3277-cebe-4d60-8d69-7acfa795c1c1/assets/images/medium/chi24-321-fig4.jpg) |
| Identify Subject | Identifying a specific subject when the user has no clear working knowledge of the subject | “What was the image my friend just tweeted?” “What item am I holding?” | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/4fd53342-fa9d-4999-abf8-5d446e0aaf90/assets/images/medium/chi24-321-fig5.jpg) |
| Identify Feature | Identifying features of a subject such as color, size, state (on/off, full/empty), and so on, when a user already has a working knowledge of the subject’s identity | “Is the lamp in my room on or off?” “What is the logo on this baseball glove?” | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/5a544620-ef9b-450f-9a0c-0eecdcd4843c/assets/images/medium/chi24-321-fig6.jpg) |
| No Specific Goal | Goal was either unclear to the coders, or the user mentioned they had no goal in mind | “I just wanted a basic description” “People” | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/6473fef3-25e8-4004-b685-54cd6c9e507e/assets/images/medium/chi24-321-fig7.jpg) |

Shows the five coded user goal levels, definitions, and examples applied under each level.

| Location | Location Examples | Image Example |
| --- | --- | --- |
| Used in educational or spiritual sites | Schools, churches, and other religious institutions | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/21b4cbdf-9184-4fb7-800a-4967fc584d8c/assets/images/medium/chi24-321-fig8.jpg) |
| Used in recreational or leisure areas | Restaurants, parks, and historical sites | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/ede193ec-89da-42ec-a347-42502920b7c8/assets/images/medium/chi24-321-fig9.jpg) |
| Used in healthcare places | Hospitals, dentist offices, and ophthalmologist offices | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/e715b9d5-4e43-4198-9608-bf489eef4f5d/assets/images/medium/chi24-321-fig10.jpg) |
| Used in travel services sites | Bus stops, train stations, and airports | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/d179afa9-3c77-4aa7-8b46-84923d16ab4c/assets/images/medium/chi24-321-fig11.jpg) |

Part 1 of coded locations. Shows four coded location levels, definitions, and examples applied under each level.

| Location | Location Examples | Image Example |
| --- | --- | --- |
| Used in retail businesses | Supermarkets, hair salons, and other businesses | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/e975e338-27dd-4e5e-9be1-4e005c106444/assets/images/medium/chi24-321-fig12.jpg) |
| Used at participant’s work | Any spaces participants defined as their “work”, such as corporate or home offices | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/c3223647-482e-4520-a770-09cf588f42f4/assets/images/medium/chi24-321-fig13.jpg) |
| Used in living spaces | Apartments, senior homes, and houses | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/fe0af181-d45f-4903-8037-b9544e9cccc0/assets/images/medium/chi24-321-fig14.jpg) |
| Used in unidentified locations | Applied when neither the picture nor the participant’s diary responses could tell us where they were located | ![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/8b8a24ff-eb46-4982-a10b-589782993987/assets/images/medium/chi24-321-fig15.jpg) |

Part 2 of coded locations. Shows the other four coded location levels, definitions, and examples applied under each level.

To code follow-up interviews, audio recordings were transcribed by an automatic transcription service and corrected by one researcher. Then, two researchers coded four interviews individually. Finally, the researchers discussed disparities to add interview-derived codes to the codebook, and remaining interviews were split between researchers for coding.

These processes resulted in over 200 codes in total, which we grouped using multiple rounds of affinity diagramming. One researcher established three initial categories for code groupings: (1) Properties of the photos, (2) Content of the photos, and (3) Uses of the application. These were refined into subcategories (e.g., subcategories for objects captured as photo content such as living subjects, recreational objects and decor, etc.). Afterwards, we conducted thematic analysis using two rounds of affinity diagramming, one that examined grouped codes solely from the diary entries, and a second that incorporated interview codes. This generated our final themes (see Section [4.1](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4-1) and [4.2](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4-2)).

After coding and creating themes, **two researchers** also scored the accuracy of each entry’s scene description. We wanted to determine the appropriateness of the application descriptions given what information was available in submitted photos. This accuracy score allowed us to: (1) understand whether a scene description contained “usable” information, (2) understand how frequently the scene description application provided “reasonable” descriptions, and (3) find relationships between participants’ reactions and the accuracy of the descriptions. We defined accuracy as, “the extent to which the scene description matched a sighted human perception of the image,” adapted from user-based evaluations of image descriptions \[ [18](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0018)\]. Two researchers coded two participants’ diaries individually, then came together and split remaining entries, scoring each image-interpretation pair on a scale of 1 to 3, where 1 meant the interpretation did not match a human perception at all, 2 meant a partial match, and 3 meant it mostly matched. We share results about accuracy scores and discuss how participants’ definitions of satisfaction varied based on description accuracy (see Section [4.3](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4-3)).

### 3.5 Quantitative Analysis

The goal of our quantitative analysis was to identify any significant effects on participants’ evaluative scores resulting from two distinct variables of use cases: user goal and location. We selected these two variables as these would be most insightful towards understanding future use of AI-powered scene description applications and what kind of content it should excel or improve at describing. We conducted statistical tests with our quantitative models to find: (1) whether participants were scoring descriptions differently (satisfaction and trust) across identified user goals, and (2) whether the location where participants used the application had a significant effect on how they scored the descriptions (e.g., finding whether the application described scenes better at specific locations).

To represent user goals as a fixed effect in our model, we did another brief round of coding the diary entries so that each entry had just one user goal. We identified the main goal that participants reported in their entry based on their diary entry response, and from interview commentary.

We used linear mixed effects models (LMEM) fitted by Restricted Maximum Likely (REML) estimation to model all of our data. We conducted a post-hoc pairwise analysis to determine whether the satisfaction or trust participants felt after using the application was significantly different depending on their goal or location, with _ParticipantID_ as a random effect.

_**Effects of User Goal and Accuracy.**_ We explored the effect of participants’ goals on their satisfaction with and trust in the application. We fit one model with two factors, _User Goal_ (five levels: _describeScene, learnApplication, identifySubject, identifyFeatures, noSpecificGoal_) and _Accuracy_, and one measure, _Satisfaction_. Each level in _User Goal_ was pulled from subcategories in our code groupings (see table [6](https://dl.acm.org/doi/10.1145/3613904.3642211#tab6) for examples and definitions). _Satisfaction_ was pulled from participants’ diary entries, while _Accuracy_ was the coded image-description score (see Section [3.4](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-3-4)). Then we fit a second model with the same two factors, but this time with _Trust_ as a measure. _Trust_ was pulled from participants’ diary entries.

_**Effects of Location of Use and Accuracy.**_ We analyzed the effect of the participants’ location while taking the photo on their satisfaction with and trust in the application. We fit one model with two factors, _Location_ (eight levels: _usedInRecreationalOrLeisureAreas, usedInHealthcareSites, usedInEducationalOrSpiritualSites, usedInTravelServiceSites, usedInRetailBusinesses, usedAtParticipant’sWork, usedInLivingSpacesOrDomiciles, usedInUnidentifiedAreas_) and _Accuracy_, and one measure, _Satisfaction_. Each level in _Location_ was pulled from subcategories in our code groupings (see table [4](https://dl.acm.org/doi/10.1145/3613904.3642211#tab4), and [5](https://dl.acm.org/doi/10.1145/3613904.3642211#tab5) for examples and definitions). Then we fit a second model with the same two factors, but this time with _Trust_ as a measure.

In our post-hoc analysis, since we made multiple comparisons between several estimates in our models, we performed p-value adjustments using the Tukey method for post-hoc analysis. In addition, since our data had independent sample variances between factors, all of our pairwise analysis t-tests were run with the Satterthwaite method to account for our complicated covariance. We share results from our statistical tests, and explain the effects that user goal and location had on participants’ trust and satisfaction scores (see Section [4.3](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4-3)).

## 4 Findings

In this section, we provide an overview of use cases identified in participants’ diary entries, describe participants’ preferences between human and AI assistance, and present an overview of satisfaction, trust, and accuracy scores across entries.

### 4.1 Overview of Use Cases

We collected various data factors through diary entries that, together, comprised participants’ use cases for the application. We present a holistic overview of these factors: user goals, photo content, photo-taking locations, and photo quality.

#### 4.1.1 User Goals.

_**Overview of User Goals.**_. The user’s goal was an important component of identifying use cases because it revealed what visual information a participant wanted, as well as why they wanted it (e.g., they wanted a description of a light, specifically to know if it was on or off). In total, we identified 11 categories of user goals, most of which involved getting additional information about a subject participants were already somewhat knowledgeable about. For example, participants were aware they were holding a shirt, but they wanted to hear its color (more examples in table [6](https://dl.acm.org/doi/10.1145/3613904.3642211#tab6)). Participants sometimes mentioned multiple goals, which meant entries could fall under multiple categories.

| User Goal (% normalized\*\*) | Definition | Examples of Use |
| --- | --- | --- |
| Identify Specific Object (27) | Looking for the specific name of an object or trying to find a particular object based on its features. | “I want to hear that it’s a television instead of a ‘large electronic device’ ”“I was looking for my favorite shirt” |
| General Interest in Object Appearance (16) | Participant did not mention a specific goal but was interested in receiving a description. | “I just want to know what it looked like". “Just playing around with the app.” |
| Build Understanding of Scenery (12) | Looking for a description of the environment or the weather. | “What do the mountains look like?” “Describe the building across the street.” |
| Read Text or Numbers (10) | Looking to read specific textual information within the photo (expected to be higher if our app performed OCR). | “What does the label on this box say?” “Which scent is this soap?” |
| Describe Digital Content (9) | Looking to hear descriptions of the contents displayed on any kind of digital screen. | “What was on the TV?” “Is my phone connected to my car’s Bluetooth? (looking for the symbol on the car’s screen)” |
| Determine Visual Elements (8) | Looking for visual features about objects like colors, shapes, sizes, patterns, contrast, or reflectiveness. | “Am I looking at the red one?” “What size is the picture on this mug?” |
| Test Application Against Current Knowledge (8) | Testing the app to see how it worked, to see if it could answer “correctly”, or to see how descriptive it would be. | “I wanted to see how close it would get.” “Checking if it still recognized the telephone from far away.” |
| Determine Subject Location or Presence (5) | Looking for the location, orientation, or distance of a particular object in the camera frame, or checking if an object was present in the frame. | “Where is the water bottle on my desk?” “How far am I from the stairs?” |
| Determine Subject State or Amount (3) | Asking about the state of an object or checking how much of an object was present in the frame. | “Is the light on or off?” |
| Inform Camera Use (2) | Using the app to help them understand how the camera worked. | “I wanted to know if I framed my potted plant correctly.” “Is the lighting here good enough for a nice photo?” |
| Understand Person’s Appearance (1) | Looking for a description of their own or another person’s physical appearance. | “I was curious to see how it would describe me.” |

Definitions and examples of user goals identified in the diary entries. \*\*The goal percentages are normalized as follows to avoid biasing the data toward participants who used the application more: \\(i = 16 \\sum \_{n=1} \\left(\\frac{E}{T} \\times 100\\right)\\). Normalized percentage is equal to the sum of the number of each participant’s entries coded under a certain goal (E) divided by their total entries (T), times 100. Values are rounded up for simplified legibility.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/bfb204db-eb3a-4b40-90d2-324e534ba0d5/assets/images/medium/chi24-321-fig16.jpg)

Normalized frequency of user goals observed in the diary entries. Each value represents how frequently user goals happened (same as Table [6](https://dl.acm.org/doi/10.1145/3613904.3642211#tab6)). Values are rounded up for simplified legibility.

Participants’ most common goal was to identify a specific subject (128 entries out of 316, 27%). This occurred when they were looking for exact identification of a subject by name rather than a vague description (e.g., “television”’ instead of “large electronic device”) or were trying to identify a particular subject out of similar subjects (e.g., checking if they were holding their favorite yellow jacket instead of any jacket). Most participants already had some information about the subjects they were interested in when applying this goal. For example, if a participant was looking for a particular piece of clothing, they touched it to triangulate part of the information they needed along with requesting a description to determine what it was. This triangulation, which usually occurred before using the application, helped them utilize imperfect descriptions. Other goals included building understanding of the scenery (54 entries, 12%), or reading text or numbers (38 entries, 10%). In both of these cases, participants were usually asking about a subject they had some information on, but wanted additional specifics for, such as the scent label on a self-care product, or an aesthetic description of a mountain they knew was in the distance.

_**Unique Goals.**_. Some participants had very unique visual information goals. For example, P11 took a picture of her pets to capture a sentimental moment. She explained: “My cat was on her back with my dog using her tummy as a pillow. I felt the way they were sleeping together was particularly enchanting and wanted it captured with a description.” P14 demonstrated another unique goal. She used the application to determine whether other people were around her. In one entry, she noted that she was thinking of entering a chapel, and she “wanted to find out if there was anyone in there so that I could go in by myself.” She determined that since the description had not mentioned people, the chapel must have been empty. Such goals highlighted the creative ways our participants used the application, and showed the descriptions could enhance their daily lives by supplying useful information.

_**Testing and Learning with the Application.**_. Some participants took photos not to receive new information from the application, but to test its results against their knowledge of familiar subjects. We called these “tester photos” and they were an unexpectedly common goal among our participants, motivating 38 photos (12%). P3 provided an excellent example when he took a picture of his kitchen sink, explaining in his diary entry that he was “really disappointed that \[the application\] did not get any of it. Did not get the dishes did not get the silverware in the measuring cup or anything like that.” He was fully aware of all the items and wanted to know how well the application described them. P10 took several tester photos too, submitting multiple entries with photos of the same subject at different distances (see figure [4](https://dl.acm.org/doi/10.1145/3613904.3642211#fig4)). For instance, he took photos of a bedroom window at different distances, remarking that he was “just testing the app to see how it would make a recognition” and “get an idea of how far or close I should have the camera” for it to work properly. P16 took similar sets of tester photos, explaining, “One of the things I use artificial intelligence description apps for is to find the best position of the camera.” She further clarified that: “Sometimes I will take two or three pictures of the same thing from different distances and angles” to help her frame the photo (see figure [4](https://dl.acm.org/doi/10.1145/3613904.3642211#fig4)).

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/bce9ac4b-3583-4bff-af11-b8acc249a1a3/assets/images/medium/chi24-321-fig17.jpg)

Examples of connected photos featuring the same subjects at varying distances; participants used the resulting interpretations to help them understand what was the best distance to obtain an accurate result. On the left, there are two photos of the same bedroom window submitted by P10. P10 wanted to learn how far away he needed to be from a photo subject for it to be fully captured and recognized by the application. On the right, there are two photos of a corded telephone submitted by P16, taken to “improve” her framing of the photo.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/4faddb0b-7dad-4a29-847d-e1645c1f7f39/assets/images/medium/chi24-321-fig18.jpg)

Two images exemplifying unique user goals. The image on the left, submitted by P11, shows a black dog’s head laying on a white cat. P11 had wanted an interpretation to narrate the sentimental moment. The image on the right, submitted by P14, shows an empty chapel with wooden pews. P14 had wanted an interpretation to determine the privacy she would have in the space by checking for others’ presence.

#### 4.1.2 Content.

_**Overview of Content.**_. The photo content provided information about the kinds of subjects our participants captured to address their use cases (e.g., to know if a room was messy, they photographed the floor and any objects on it). In total, we established 18 content categories based on objects position and function (Stationary Subjects, Immobile Objects, Objects within Reach, Objects out of Reach, Symbolic Objects, Digital Content or Screens, Landscapes, Cleaning and Medical Supplies, Text and Labels, Recreational Objects, Decorative Objects, Living Subjects, Clothing and Self-care, Kitchen Supplies, Vehicles, Keys, Building Architecture, and Electronic Devices). The content participants captured showed a focus on stationary subjects, often ones they were capable of walking up to or holding easily. We defined stationary subjects as subjects that were immobile, or were not likely to move after the photo was taken. For example, a parked car was considered “stationary” if it was turned off and waiting in a parking lot, but a car driving along a road was considered “moving.” The great majority of entries, 299 (95%), included at least one stationary subject, whereas only 23 entries (7%) contained at least one moving subject. We coded all subjects that were readily identifiable in each photo, meaning photos could have multiple content codes that counted as stationary or moving.

The top three most common content categories were: decor or decorative objects (131 entries, 41%), living subjects (105 entries, 33%), and building architecture or built-in structures (96 entries, 30%). Decor or decorative objects contained wall decorations, posters, and general home decor like stylized clocks. Living subjects covered plants (which were sometimes also decor, but not always, e.g., trees lining the side of a road, home gardens of flowers, vegetables, or herbs) and creatures like humans or animals (e.g., cats and dogs). Building architecture included things like stairs, ramps, or street lights. Of the wide variety of content captured here, only living subjects contained moving subjects. From this, we conclude that our participants were largely focused on stationary subjects unless taking pictures of a pet, themselves, or another person.

_**Inspecting Inconvenient (to touch) Objects.**_. One of the most interesting and commonly-captured characteristics in participants’ diary entries were objects they thought were inconvenient to inspect directly with their hands. This could mean the object was too far to touch, was possibly dirty or disgusting, or even considered dangerous to touch. For example, P15 submitted an image at her local grocery store of a row of wine bottles. She wanted information about the wine, but also wanted to avoid knocking it over, so she took a picture instead of touching it. Other cases where participants did not want to touch objects involved not wanting to touch another person’s belongings, or making sure they were not accidentally touching other people. This was the case of P5, who took a picture of a hotel bed to determine “whether my roommate was there or not there cause I did not wanna touch the bed” in case his roommate was sleeping there already (see figure [6](https://dl.acm.org/doi/10.1145/3613904.3642211#fig6)).

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/65d580fc-fb71-4f0b-a39b-1a730bd442af/assets/images/medium/chi24-321-fig19.jpg)

A photo of an empty hotel bed, submitted by P5 to verify that his roommate was not sleeping in the bed. In this case, P5 took this photo because he did not want to inspect with his hands whether his roommate was present in the bed.

We discussed this topic with some participants in their follow-up interviews, who gave examples of when they had run into issues exploring things by touch outside our study. P1 mentioned one of her entries had reminded her of a memorable experience:

1

I had been hanging out with my siblings and with my niece, and I had accidentally put my hand in a dirty diaper that had not been rolled up and thrown away. And it was disgusting. And I had touched it because I thought it was one of the toys. And so like getting that aspect of like a clear identification \[with this photo entry\] of what the object is like, this is a stuffed animal, and it is on the couch. For me, that made me feel a lot better, because I wasn’t about to touch a dirty diaper. (P1, female, age 24)

There were many scenarios where our participants solely relied on scene description to take action. In some instances, they would avoid using touch due to social norms around their peers, or to avoid doing something inappropriate. In other cases, they would avoid using their hands due to personal hygiene or past bad experiences. This highlighted the interplay among societal expectations, individual preferences, and past encounters, all of which contributed to the different reasons participants engaged with the scene description application.

#### 4.1.3 Locations.

_**Overview of Locations.**_. The photo location indicated the kinds of environments wherein our participants spent time regularly and also needed visual information, and thus, where they found use for the application. For example, they needed visual information while at the grocery store, often regarding objects they were considering buying. In total, we established 8 location categories (see table [4](https://dl.acm.org/doi/10.1145/3613904.3642211#tab4) and [5](https://dl.acm.org/doi/10.1145/3613904.3642211#tab5)).

Most participants’ photos were taken in familiar, indoor locations, the vast majority of which were living spaces like the participants’ homes. Conversely, this suggests that participants did not use the application in unfamiliar environments. By far, the most common location was living spaces (248 entries, 78%), which included participants’ homes as well as ones they visited (see figure [7](https://dl.acm.org/doi/10.1145/3613904.3642211#fig7)). The next two most common locations were at participants’ work and travel sites (19 and 16 entries, 6% and 5% respectively), which included participants’ home offices, public workplaces, personal vehicles, as well as bus stops, train stations, or airports. Many of these spaces are public, indoor buildings that we would expect our participants to be very familiar with from their daily commutes (e.g., local train stations, their own workplaces). As such, all of these locations comprised areas we would expect participants to be familiar with, confirming the trend we noted above.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/5f854b82-b293-49b7-bfa6-0fad922226ec/assets/images/medium/chi24-321-fig20.jpg)

The distribution of locations identified in the diary entries.

#### 4.1.4 Photo Quality.

_**Overview of Photo Quality.**_. The photo quality provided us information about how participants took photos to address their use cases, which often differed from the way a sighted individual would take a photo (e.g., to get a description of a Christmas tree ornament, a participant would take the photo extremely close-up to the ornament). This information also provided an idea of what level of photo quality our participants were submitting, which impacted the descriptions generated by the application’s CV model. Most photos submitted had poor lighting, but were not blurry and had unoccluded subjects (they were well-framed). Out of 316 diary entries, 290 (92%) were clear, 162 (52%) had fully visible, unoccluded subjects, and 201 (64%) had poor lighting conditions, which ranged from complete darkness to uneven lighting that created shadows on photo content. A common example of poor lighting was subjects being side-lit or back-lit, making them into silhouettes or obscuring part of their features. When looking at a single photo, the quality of these conditions were often mixed. For example, a photo could have been clear but was taken in poor lighting, like a clear picture of wall decorations where lighting casts shadows across the wall. Similarly, a photo could have been well-lit, but lacked clarity, like a close-up image of a Christmas tree in a well-lit room, with the tree coming out blurry due to the participant’s action (see figure [8](https://dl.acm.org/doi/10.1145/3613904.3642211#fig8)).

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/1fdd06b5-5c98-4199-bc26-5d457d8c3c71/assets/images/medium/chi24-321-fig21.jpg)

Two images exemplifying mixed photo conditions. On the left, a Christmas tree stands in a bright room with blurry branches. On the right, two plants rest on decorative shelves, which cast shadows on the wall behind them. Both submitted by P4.

### 4.2 Choosing Between AI or Human Assistance

During the follow-up interviews, we learned how participants chose whether to use the study application or other information resources, primarily human assistants. We highlight these observations below.

_**Reasons for Using AI Tools Instead of Human Assistants.**_ Participants gave various reasons for choosing AI tools over human assistants. Among the most common was that when human assistants were not around, they preferred to use AI instead of video calling someone to **address simple problems**. For example, P1 submitted a photo of a pair of sunglasses when she “was not sure if this was my husband’s sunglasses or my old pair of reading glasses from 4 years ago.” She was happy to get an answer without having to call her husband. P9 supported this in her interview, explaining that “I like being independent \[…\] I have a lot of family and I have a lot of friends. But \[…\] I’m not going to go out of my way and ask them when I have a piece of technology that can describe it to me.”

Interestingly, some participants expressed that since they believed AI would be unbiased, they could use it to **solve disputes about visual information**. We saw this with P5, who submitted a photo taken through an airplane window, with the goal of “find\[ing\] out if we were flying near the strip or close to the airport when taxiing.” He elaborated in his interview that he had been flying with a BLV friend, and they were arguing about the view outside. Since they believed AI would give the unbiased truth, they used it to settle the issue without having to ask another human third-party.

_**Reasons for Using Human Assistants Instead of AI Tools.**_ Along with such reasons for using AI, participants also shared reasons they preferred human assistants (aside from obvious ones such as higher accuracy or the ability to reliably communicate their information preferences). In particular, since **AI could not give thoughtful opinions** on content, some participants would not use the application to verify images they planned to post on public platforms like social media. P12 gave her thoughts on this in our interview:

1

So it is usually a combination of having that image, but then also verifying with somebody else, if it is something that is really important, or something that I am going to, like, share on social media, or you know, to the public or something. I want to make sure that it is clear. So I would still verify after using Seeing AI with somebody else like with Aira or with another person. (P12, female, age 32)

These examples show how participants considered pros and cons of AI and human assistants, deciding where each option’s strengths most minimized potential errors or strains on human relationships before moving forward.

### 4.3 Trust, Satisfaction, and Accuracy

#### 4.3.1 Overview of Trust, Satisfaction, and Accuracy.

We present a descriptive overview of satisfaction, trust, and accuracy scores across diary entries. We describe the application’s performance for each user goal and location in terms of trustworthiness, satisfaction and accuracy. We also present participants’ definitions of trust and satisfaction, and the differences (or similarities) between these in the context of the application.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/06928e27-40e3-4cd5-b396-dbd4c74a1288/assets/images/medium/chi24-321-fig22.jpg)

The distribution of participants’ trust and satisfaction scores across their diary entries.

_**Overview of Trust and Satisfaction Ratings.**_. Participants reported relatively low scores for trust and satisfaction, indicating that current commercially available CV models still have a long way to go to deliver satisfying and trustworthy descriptions for BLV users. On average, diary entries descriptions received a score of 2.43 on a 4-point scale (SD=1.16) for trust and 2.76 on a 5-point scale (SD=1.49) for satisfaction (see figure [10](https://dl.acm.org/doi/10.1145/3613904.3642211#fig10)). In addition to scores reported in the diary entries, we also collected ratings on a 7-point Likert scale during participants’ interviews for how trustworthy and satisfying the application was overall. On average, it received a score of 3.9 for trustworthiness (SD=1.6) and 3.6 for satisfaction (SD=1.4). Like the diary entry scores, these remain in the average to below average range (see figure [11](https://dl.acm.org/doi/10.1145/3613904.3642211#fig11)). We unpack some of the reasoning and exceptions to these scores given by participants below.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/8cbcbe8a-ca71-4f42-bd65-b5221fe384ed/assets/images/medium/chi24-321-fig23.jpg)

Diary Entries Likert scale scores for Trust and Satisfaction responses.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/4e9c4447-6177-4586-bd49-896500e8f384/assets/images/medium/chi24-321-fig24.jpg)

Overall Application Likert scale scores for Trust and Satisfaction responses.

_**Overview of Accuracy.**_ The application’s accuracy scores were drawn from researchers’ coding of photo-description pairs (see Section [3.4](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-3-4)). On average, accuracy was 1.95 on a 3-point scale (SD=0.82, see figure [13](https://dl.acm.org/doi/10.1145/3613904.3642211#fig13)). This would suggest the application did not perform particularly poorly or well. We can also look at the accuracy per user goal, using the categories _describeScene, learnApplication, identifySubject, identifyFeatures,_ and _noSpecificGoal_ (see figure [14](https://dl.acm.org/doi/10.1145/3613904.3642211#fig14)). These are the higher-level groupings of the goal categories from [4.1.1](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4-1-1), developed for our quantitative analysis (see [3.5](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-3-5)). We coded the Diary entries again to identify the one goal which reflected the main goal of the participant. These provided a better look at the distribution of accuracy scores, since entries often contained multiple goals from the full range in [4.1.1](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-4-1-1) which would conflate the distribution. Per user goal, we see the application performed best on _identifyFeatures_ (2.06, SD=0.79), though it still did not reach a particularly high average. Similarly, the least accurate goals, _noSpecificGoal, describeScene,_ and _identifySubject_ did not reach particularly low averages (all means equalling 1.8, 1.79, and 1.88 respectively, and SD=0.91, 0.83, 0.79, respectively), confirming the application’s mediocre performance.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/86ce1f56-fa48-49a4-aba2-46a4b37dba09/assets/images/medium/chi24-321-fig25.jpg)

The distribution of accuracy scores for descriptions in participants diary entries. These scores were assigned by two researchers looking at diary entries, photos, and descriptions to understand how well the application performed given the source material (see section [3.4](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-3-4) for further detail).

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/1179c804-8a48-421f-9b60-554429e79ac6/assets/images/medium/chi24-321-fig26.jpg)

Distribution of accuracy scores for all the diary entries.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/8d89257d-a509-4455-9083-1f175e761781/assets/images/medium/chi24-321-fig27.jpg)

The distribution of accuracy scores for each user goal.

#### 4.3.2 Trust and Satisfaction for Different Use Cases.

We quantified how useful the application was for identified use cases by looking at the impact of two major factors (goals and location) that would be most insightful towards understanding future use of AI-powered scene description applications. We also account for the accuracy of each diary entry, to understand whether it had an effect on participants’ satisfaction and trust. We used participants’ self-reported satisfaction and trust as predictors for future use of the application (i.e., higher trust and satisfaction means more use for the given purposes or locations). We interpreted “significance” as a p value < 0.05, established prior to running tests.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/b7b96cac-5c6e-4417-98f0-56313c97634e/assets/images/medium/chi24-321-fig28.jpg)

The mean predicted trust per user goal estimated by our model.

_**User Goals and Trust.**_ We evaluated whether participants’ goals impacted their level of trust in the description. We found a significant effect of _User Goal_ on _Trust_ (t=2.932, p<0.01, p=0.00374), and confirmed that interpretation accuracy had a significant effect on participants’ trust (t=11.386, p<0.001, p<2e-16). As with satisfaction, the trust a participant has for the application’s output will be significantly affected by that output’s accuracy. The goal _learnApplication_ also had a significant effect on trust (t=2.740, p<0.01, p=0.00654); pairwise comparisons found _learnApplication_ had a near significant difference on trust compared to _describeScene_ (p=0.0508), and a significant effect on _identifyFeatures_ (p=0.0057) and _noSpecificGoal_ (p<.0001). The mean trust participants gave while using the application with this goal was 2.89 (SE=0.150) out of 4. We conclude participants’ trust in the application was significantly higher when using it for testing or learning. No other goals had significant effects on trust.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/337f6224-f331-480b-b152-977d79523a4c/assets/images/medium/chi24-321-fig29.jpg)

The mean predicted satisfaction per user goal estimated by our model.

_**User Goals and Satisfaction.**_ We evaluated whether participants’ goals impacted their satisfaction in the description. We found a significant effect of _User Goal_ on _Satisfaction_ (t=2.240, p<0.05, p=0.026220), and confirmed that scene description accuracy had a significant effect on participants’ satisfaction (t=9.445, p<0.001, p<2e-16). As might be expected, we find interpretation accuracy will significantly affect a participant’s satisfaction with the application and willingness to use it. The goal _learnApplication_ also had a significant effect on satisfaction (t=3.667, p<0.001, p=0.000291); pairwise comparisons found _learnApplication_ had a significant difference on satisfaction compared to _describeScene_ (p=0.0027), _identifyFeatures_ (p<.0001), _identifySubject_ (p=0.0135), and _noSpecificGoal_ (p<.0001). The mean satisfaction participants scored when using the application for this goal was 3.62 (SE=0.22) out of 5. We conclude participants’ satisfaction with the application was significantly higher when they were using it for testing or learning about its limits. No other goals had significant effects on satisfaction.

_**Location and Trust.**_ We evaluated whether participants’ locations impacted their level of trust in the descriptions. We found a significant effect of _Location_ on _Trust_ (t=3.554, p<0.01, p=0.000451), and confirmed that accuracy had a significant effect on trust (t=11.341, p<0.001, p<2e-16). As before, this indicates interpretation accuracy will significantly affect participants’ trust. As before with the satisfaction factor, no locations were found to have a significant effect on satisfaction. In addition, pairwise comparisons found no significant differences on trust of any locations compared to the others. The closest comparison was _usedInRetailBusinesses_ compared to _usedInLivingSpacesOrDomiciles_ (p=0.1731). The mean trust reported at retail businesses was 3.38 (SE=0.395) out of 4; when at living spaces or domiciles, the mean was 2.37 (SE=0.106). This suggests participants’ trust might have been higher when using the application at retail businesses as compared to living spaces, but not to a significantly different extent. Further, participants reported no significantly different trust when using the application in retail businesses over any other locations. No other locations had significant effects on trust.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/158a1619-d519-4949-81b0-72e9dd3c0884/assets/images/medium/chi24-321-fig30.jpg)

The mean predicted trust per location estimated by our model.

![](https://dl.acm.org/cms/10.1145/3613904.3642211/asset/d64556b6-d487-44bb-ae02-e1b580939e2d/assets/images/medium/chi24-321-fig31.jpg)

The mean predicted satisfaction per location estimated by our model.

_**Location and Satisfaction.**_ We evaluated whether participants’ locations impacted their satisfaction in the descriptions. We found a significant effect of _Location_ on _Satisfaction_ (t=3.798, p<0.05, p=0.000184), and confirmed that interpretation accuracy had a significant effect on participants’ satisfaction (t=9.370, p<0.001, p<2e-16). As with the model that included the user goal factor, interpretation accuracy remains a factor that significantly affects participants’ satisfaction and willingness to use the application. However, no locations were found to have had a significant effect on satisfaction. In addition, pairwise comparisons found no significant differences on satisfaction of any locations compared to the others. The closest comparison was _usedInRetailBusinesses_ compared to _usedInLivingSpacesOrDomiciles_ (p=0.1351). The mean satisfaction reported at retail businesses was 4.05 (SE=0.531) out of 5; when at living spaces or domiciles, the mean was 2.64 (SE=0.156). Thus, participants’ satisfaction might have been higher when using the application at retail business as compared to living spaces, but not to a significantly different extent. Further, participants reported no significantly different satisfaction when using the application in retail businesses over any other locations. No other locations had significant effects on satisfaction.

#### 4.3.3 Participant Definitions of Trust and Satisfaction.

_**Defining Trust.**_. We held conversations with participants about the trustworthiness of the application’s descriptions, how trust was established, and how it could shift to compensate for inaccuracies. Several participants said their trust in the application developed over use. They alluded to a concept we called “practice ground of visual landscapes” (e.g., their home, neighborhood, nearby stores). These practice grounds would be used to test the AI against knowledge previously acquired from touch, residual vision, experience or past sighted assistance. Based on the application’s correctness over time, participants calibrated their trust in it and learned its capabilities. P15 gave a detailed explanation of her testing process:

1

“\[In many instances,\] I knew what was in the frame for one reason or another whether it was using my residual vision or just previous experience. A lot of the photos were taken around my neighborhood and I have lived here for six years. Or if I happen to be out with my spouse, and I borrowed his eyeballs to verify something, you know, I am in the grocery store. Like the places where we shop all the time. I know where the sections of the stores I was standing in, for example. So, I had a very solid sense of the accuracy and the reliability and the usefulness of the information that was there.”

(P15, female, age 47)

Participants also shed light on seemingly paradoxical entries where descriptions with low accuracy scores received high trust and satisfaction scores. For example, P1 obtained the following interpretation while photographing a church pew: “A wood cabinet with a white device and a white device on it.” In her entry, she stated she wanted to know what was on the pew, and scored the interpretation unexpectedly high for satisfaction and trust (4 and 3). During her interview, she explained this was because she had figured out there were sermon notes: “it tells me about the wood, technically a shelf \[...\] Even though it’s not a device, the fact that it said it was a white device \[...I knew \] it was white. So based on that and the fact that there was that wood cabinet or shelf there, it kind of helps me deduce in my mind like, oh, it probably means a white piece of paper.”

We conclude trust in scene descriptions involves going beyond a correct versus incorrect binary judgment of the information provided. Even when interpretations were inaccurate, participants could still garner useful information if the inaccuracies were tolerable, maintaining relative trust in future interpretations.

_**Defining Satisfaction.**_ Participants defined satisfaction with various degrees of tolerance for inaccuracies, also noting that “accurate” results might not necessarily lead to satisfactory experiences. Most participants agreed useful information was necessary for high satisfaction. Definitions of useful, however, differed greatly. On one hand, some advocated that an application’s design should minimize work for the user. They explained the application should attempt to get things “right” on the first try by providing as much information as possible (P10, P11). P5 emphasized that “it should provide everything it saw from top to bottom, from best quality to questionable quality \[...\] In one instance \[I might want\] the background and in another instance it might be a facial expression. Who knows? How would it know what I want?” Others believed interpretations only needed to provide enough information to identify an object. Similar to the tolerable inaccuracies discussed earlier, this meant an interpretation would be satisfying as long as it gave enough details to support the context the participant already had, regardless of overall accuracy (P7).

In short, participants’ satisfaction was connected to the application’s performance, but not fully dependent on total correctness. Some participants would be satisfied by relatively poor scene descriptions, so long as they provided a few workable details. While participants preferred varying levels of detail, it seemed satisfaction overall was tied to the application’s ability to support their needs on a case-by-case basis, with the understanding that it could not perfectly interpret those needs on its own.

## 5 Discussion

To our knowledge, our work presents the first attempt to understand BLV people’s use cases for AI-powered scene description applications in their daily lives. Our findings revealed several novel uses for these applications, teasing out user behaviors with testing applications and triangulating known information with desired details. Our statistical analysis also demonstrated the significant effect of accuracy on users’ trust and satisfaction, as well as how these scores were significantly higher when testing the application. Finally, discussion with our participants revealed new perspectives on evaluating scene descriptions, such as matching the level of detail to users’ needs on a case-by-case basis and accepting tolerable inaccuracies, which supports prior work on BLV users’ acceptance of errors in assistive tools \[ [1](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0001)\].

### 5.1 Leveraging BLV Users Abilities in Application Design

The inherent design of many scene description applications is non-conversational (e.g., our application, SeeingAI \[ [30](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0030)\], ImageExplorer \[ [22](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0022)\], ImageAssist \[ [35](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0035)\]), reflecting lack of awareness that BLV users are capable of verifying the information they receive, and can also gather information beforehand to provide as an input. Even when users can respond to initial descriptions with questions, they are unable to provide this information either before or along with the first photo submission in these applications. Prior work examines how these applications can better fulfill BLV users’ information needs but does not acknowledge that BLV users can and will gain information without the application’s assistance \[ [2](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0002), [38](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0038)\]. However, research in negotiating social spaces has established that BLV people triangulate their information needs by collecting data from various non-visual sources \[ [44](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0044)\]. In our study, participants described many data collection methods they utilized prior to requesting scene descriptions, and they also revealed they knew about their photo subject by nature of the questions and answers given in the diary entries. BLV users apply these methods to validate or evaluate application results, rather than having nothing to rely on but the application. In fact, we noted our participants would often be irritated with the study application if it only provided information they already knew or could easily find themselves. This could inform the design of future applications to work with users’ existing knowledge and supply the information they actually need.

To illustrate this point, we propose that future applications tailor their output through settings and instruction from the user. This could include offering adjustments for the level of detail output, starting with generics and moving into specifics, and allowing users to tactilely explore photo “layers” for specific information. Such techniques for exploring digital content have been examined previously with screen readers and image exploration studies, showing promising results in providing a better understanding of which objects are present in the scene \[ [22](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0022), [32](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0032), [35](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0035)\]. By considering such examples, we can ensure visual interpretation applications adequately address the needs of BLV users. We additionally found that images could be perceivable in one dimension (e.g., clarity) while failing in another (e.g., lighting) due to complex image quality. Future systems could provide nuanced instructions to BLV users for improving photo capture to increase the quality of the input the AI receives.

### 5.2 Visual Challenges In BLV People’s Daily Life

Our study corroborated many visual challenges found in Brady et al.’s taxonomy \[ [6](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0006)\]. Participants used the AI-powered application in similar ways to users of VizWiz Social, but we also revealed a few novel use cases. We found many examples for each of the challenges addressed in Brady et al.’s taxonomy in our diary entries: identifying objects (e.g., identity, media, currency), describing things (e.g., state, appearance, color), and reading (e.g., text labels, numbers). We also presented new categories of challenges that did not fit under Brady et al.’s taxonomy in the form of identified user goals, like building an understanding of a scene and taking tester photos to update one’s understanding of an AI. In our study, 20% (normalized) of submitted entries fell into these two categories. BLV users may be interested in identifying subtle things like the weather outside their window, receiving aesthetic descriptions of a landscape on vacation, or evaluating the AI’s effectiveness in new scenarios. Future applications in this domain should select environmental information to describe to a BLV audience, especially visual information that is difficult to triangulate through other means, as well as encourage frequent testing to increase awareness of improvements and create spaces for users to provide usage feedback (see Section [6](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-6)).

We also uncovered new visual challenges that could be classified under Brady et al.’s taxonomy, like determining a subject’s presence and location (under identification), or describing an object’s cleanliness and potential danger (under description). We believe these and many other unique user goals in our study became apparent due to the application being AI-powered. BLV users knew that no human (except for the researchers) would see the photos they submitted. With this awareness, they felt comfortable using the application in situations where requesting help from a remote assistant would be inappropriate or unnecessary (see Section [5.3](https://dl.acm.org/doi/10.1145/3613904.3642211#sec-5-3)). Noting this behavior, we believe AI-powered applications present unique opportunities to address visual challenges in BLV people’s daily lives, not only for their scalability, but because even when human interpreters are available, AI might remain a preferable option to BLV users.

### 5.3 Differentiating AI Use Cases from Human

Our study speaks to an existing body of work on human visual interpretation that has identified many use cases BLV people have for visual interpretation from human assistants. Lee et al. \[ [23](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0023), [24](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0024)\] found four categories of visual interpretation support that BLV people seek: scene description, navigation, task performance, and social engagement. These categories held true in our findings, and reflected higher-level categories that many of the use cases we identified fall into. For example, our user goals “identify specific subject” and “determine subject state or amount” both involve gathering information about a subject in order to act on that information, like learning if a battery light is on so one can adjust a charger if needed, or learning if one is holding the correct shirt before wearing it. Such goals fall under Lee et al.’s “task performance” category and corroborate their findings on the kinds of support visual interpretation offers BLV people. However, we have also noted several new use cases, unique to AI-powered applications, that stand apart from the existing canon of use cases for human assistants.

We found our participants favored using AI over humans to minimize social costs, especially for questions they deemed not worthy of asking human helpers. For example, participants used the AI-powered study application for seemingly small questions, like differentiating sunglasses from prescription glasses or ensuring their sleeping roommate was not on the bed, because they did not want to bother other people. Participants felt using AI saved them the trouble of “burdening” their social network by requesting answers to such questions they considered to be trivial. To support this, future AI applications could remind users of their role as an alternative to social networks, for example, by being integrated as a “contact” in the user’s phone that they can message for quick descriptions before contacting family members or friends. Another AI-specific use case we found was using the AI as an “unbiased” information source to solve visual information disputes. For example, one participant and his BLV friend perceived the AI as an objective information source, and so in one instance they used the application as an arbiter to decide whether he or his friend was correct about the view outside their airplane window. Future AI applications could include disclaimers about their description accuracy to clarify how valuable their "unbiased" opinions should be in such situations.

Finally, one important AI-specific use case was testing the application, which was a goal applied to 12% of the photos in our dataset. Based on our discussions with participants, a BLV user would likely consider it burdensome to the human assistant if they submitted photos merely to challenge the human assistant or out of curiosity about their responses. Yet such testing is vital for users to comprehend an AI’s functionality, optimize its use, and see how it has improved over time. Given the rapid evolution of contemporary AI algorithms, continuous testing will remain crucial for users to stay informed about the AI’s capabilities. In addition, whenever users encounter situations where they have not used the AI, or it has failed them before, they will likely test the application to see how it performs.

In conclusion, our discussions with participants highlighted significant differences between using AI-powered systems and human assistance. Trade-offs in privacy, independence, and social costs exist when working with humans and can be higher when compared to when working with AI. Conversely, despite AI advancements, there are trade-offs in the accuracy, precision, understandability, and reliability of AI systems, which may differ from trade-offs associated with leveraging human assistance. Acknowledging these distinctions, we assert that assumptions about how BLV individuals use human-powered systems cannot perfectly explain how they use AI-powered systems. This work marks an initial step in establishing a distinct role for AI-powered description, examining it separately from human-powered visual interpretation, and seeks to understand the differences between these roles.

## 6 Limitations & Future Work

This research was completed over the course of two years, during which the capabilities of AI improved dramatically. When we conducted the diary study, LLM and VQA experiences fine-tuned for image description, like BeMyAI, were unavailable \[ [11](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0011)\]. These advancements will affect the accuracy and the user experience of AI-powered scene description applications, and future work should continue to investigate the ways in which use cases and user assessments of descriptions evolve. We hope this paper will serve as a useful point of comparison.

We also acknowledge choosing a diary study to collect data meant we accepted trade-offs for collecting real-world data at the cost of inconsistent numbers of entries from participants. Moreover, participants’ submissions were strongly tied to their seasonal schedules. For example, if they were vacationing, photos happened in locations not necessarily representative of their “daily lives”, such as resorts in a foreign country. If a participant worked from home during the study period, most photos were taken indoors in living spaces. We recommend future studies integrate notifications to remind users to upload submissions throughout the study at different times and locations.

Finally, a significant amount of entries fell into the “Testing Application Against Current Knowledge” use case, which may be an artifact of the study conditions. It is possible that participants felt obliged to use the application but had no organic need, so they simply tested its capabilities. On the other hand, it is also possible that the need to test the application was organic, especially considering that they were all using the application for the first time when the study began. As participants encountered new situations (e.g., subjects of interest, locations, etc.), they wanted to know whether the application would help them address a new visual challenge. Future studies could be held for longer periods, and thus extend their participants’ exposure to the study application(s), so that testing new visual challenges will represent a smaller part of a dataset. Alternatively, they could implement applications that participants are already familiar with to lessen the anticipated testing period.

Based on the discussion and the limitations of our work, we propose two directions for future research in this area:

(1) Researchers should investigate whether integrating a wider variety of features (e.g., bar code scanning, feature description, OCR, and exploring images by touch) in one holistic experience could reveal new use cases for AI-powered scene descriptions. In addition, researchers can also investigate use cases for generative AI-powered scene descriptions applications like BeMyAI following a similar procedure to ours. (2) Researchers should investigate the design of the feedback loop Human-AI-Technology, how to better integrate user feedback based on their capabilities, and how to optimize the feedback loop. For example, a built-in testing feature could be integrated, notifying users of model updates, allowing them to provide feedback on use case results, and encouraging tests on familiar scenarios to grasp its updated behavior. The most important aspects about the feedback loop would be: feedback during use (e.g., communicating with the AI), feedback post-use (e.g., providing feedback about AI behavior and forms of communication), and asynchronous

## 7 Conclusion

We conducted a diary study with 16 BLV participants that has highlighted overlooked factors of BLV users’ engagement with scene description applications, such as their ability to gather prior knowledge about queries. We also revealed common use cases, such as determining the specific identity of an object, and the context in which BLV people use these applications through a categorization of user goals, locations, photo content, and photo quality. In addition, we have pointed out where AI-powered interpretations fall short in addressing these daily use cases and where they succeed, based on three evaluation metrics of trust, satisfaction, and accuracy. Lastly, we highlighted AI-specific use cases for scene description to be considered in future systems, such as using AI to minimize social costs of interpretation.

Scene description applications and the AI powering them are changing rapidly, especially with continuing advancements in generative AI. As such technologies grow, it is critical to examine how users interact with these technologies, what their needs are, and what their goals for these technologies are. These investigations will illuminate advancements for visual interpretation that will be most useful to BLV users going forward. This study and the dataset we share can be used for investigating the effectiveness of generative models like GPT-4, similar to the evaluations conducted by Gurari et al. \[ [16](https://dl.acm.org/doi/10.1145/3613904.3642211#Bib0016)\] on VizWiz. We hope our work and the data collected will guide advancements in scene description and establish a more useful baseline of visual interpretation for BLV users and their daily visual needs.

## Footnote

⁎

Both authors contributed equally to this research.

## Supplemental Material

MP4 File - Video Presentation

Video Presentation

- [Download \| MP4 (147.38 MB)](https://dl.acm.org/doi/suppl/10.1145/3613904.3642211/suppl_file/3613904.3642211-talk-video.mp4)
- [Transcript](https://dl.acm.org/doi/suppl/10.1145/3613904.3642211/suppl_file/3613904.3642211-talk-video.vtt)

ZIP File - Database with diary entries coded, images and html for exploration

ABOUT DIARY ENTRY PHOTOS Resized diary entries. We share with you participants' submitted photos for each diary entry. We include all photos submitted including blackscreens, low "quality" photos, and everything else submitted by participants. We blurred any photos with human subjects. The directory is organized as follows: The root directory for all photos are in the "DiaryPhotos" directory, and then inside this directory, each participant codified by "P#" has its' own directory with the photos they submitted. Inside this final directory, you can find all images codified with the following format: <P#>\_<Entry#>\_<Month>\_<Day>\_<Year> ABOUT DATABASE The database.html and the DiaryEntryDatabase.xlsx both give access to the diary entries coded information. With the html, you are able to observe each diary entry data with the image in context. Explanations for each of the "variables" in the database are in an accompanying spreadsheet inside the file "DiaryEntryDatabase\_Updated" called "VariablesMeaning".

[Download \| ZIP (2.15 MB)](https://dl.acm.org/doi/suppl/10.1145/3613904.3642211/suppl_file/pn8235-supplemental-material-2.zip)

ZIP File - Original Diary Entries Photos

Original database of diary entry photos (No resizing, only blurring human subjects).

[Download \| ZIP (270.91 MB)](https://dl.acm.org/doi/suppl/10.1145/3613904.3642211/suppl_file/pn8235-supplemental-material-3.zip)

XLSX File - Codebook Diary Entries

CodebookSupplementaryMaterial.xlsx contains the themes, higher grouping codes, and lower-level codes generated doing our thematic analysis. We share these with the spirit of being as transparent as possible with our data analysis process. Here, you can observe the different codes we created for use cases, Photo quality conditions, Context of use, and content captured in the photos.

[Download \| XLSX (21.87 KB)](https://dl.acm.org/doi/suppl/10.1145/3613904.3642211/suppl_file/pn8235-supplemental-material-1.xlsx)

## References

\[1\]

Ali Abdolrahmani, William Easley, Michele Williams, Stacy Branham, and Amy Hurst. 2017. Embracing errors: Examining how context of use impacts blind individuals’ acceptance of navigation aid errors. In Proceedings of the 2017 CHI Conference on Human Factors in Computing Systems. 4158–4169.

[Digital Library](https://dl.acm.org/doi/10.1145/3025453.3025528)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3025453.3025528)

\[2\]

Rahaf Alharbi, Robin N. Brewer, and Sarita Schoenebeck. 2022. Understanding Emerging Obfuscation Technologies in Visual Description Services for Blind and Low Vision People. Proc. ACM Hum.-Comput. Interact. 6, CSCW2, Article 469 (nov 2022), 33 pages. https://doi.org/10.1145/3555570

[Digital Library](https://dl.acm.org/doi/10.1145/3555570)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3555570)

\[3\]

Peter Anderson, Basura Fernando, Mark Johnson, and Stephen Gould. 2016. SPICE: Semantic Propositional Image Caption Evaluation. arxiv:1607.08822 \[cs.CV\]

[Google Scholar](https://scholar.google.com/scholar?q=Peter+Anderson%2C+Basura+Fernando%2C+Mark+Johnson%2C+and+Stephen+Gould.+2016.+SPICE%3A+Semantic+Propositional+Image+Caption+Evaluation.+arxiv%3A1607.08822%C2%A0%5Bcs.CV%5D)

\[4\]

Mauro Avila, Katrin Wolf, Anke Brock, and Niels Henze. 2016. Remote Assistance for Blind Users in Daily Life: A Survey about Be My Eyes. In Proceedings of the 9th ACM International Conference on PErvasive Technologies Related to Assistive Environments (Corfu, Island, Greece) (PETRA ’16). Association for Computing Machinery, New York, NY, USA, Article 85, 2 pages. https://doi.org/10.1145/2910674.2935839

[Digital Library](https://dl.acm.org/doi/10.1145/2910674.2935839)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F2910674.2935839)

\[5\]

Jeffrey P Bigham, Chandrika Jayant, Hanjie Ji, Greg Little, Andrew Miller, Robert C Miller, Robin Miller, Aubrey Tatarowicz, Brandyn White, Samual White, 2010. Vizwiz: nearly real-time answers to visual questions. In Proceedings of the 23nd annual ACM symposium on User interface software and technology. 333–342.

[Digital Library](https://dl.acm.org/doi/10.1145/1866029.1866080)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F1866029.1866080)

\[6\]

Erin Brady, Meredith Ringel Morris, Yu Zhong, Samuel White, and Jeffrey P Bigham. 2013. Visual challenges in the everyday lives of blind people. In Proceedings of the SIGCHI conference on human factors in computing systems. 2117–2126.

[Digital Library](https://dl.acm.org/doi/10.1145/2470654.2481291)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F2470654.2481291)

\[7\]

John M Carroll. 2003. Making use: scenario-based design of human-computer interactions. MIT press.

[Digital Library](https://dl.acm.org/doi/10.5555/517699)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.5555%2F517699)

\[8\]

Jazmin Collins, Crescentia Jung, Yeonju Jang, Danielle Montour, Andrea Stevenson Won, and Shiri Azenkot. 2023. “The Guide Has Your Back”: Exploring How Sighted Guides Can Enhance Accessibility in Social Virtual Reality for Blind and Low Vision People. In Proceedings of the 25th International ACM SIGACCESS Conference on Computers and Accessibility. 1–14.

[Digital Library](https://dl.acm.org/doi/10.1145/3597638.3608386)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3597638.3608386)

\[9\]

Jia Deng, Wei Dong, Richard Socher, Li-Jia Li, Kai Li, and Li Fei-Fei. 2009. ImageNet: A large-scale hierarchical image database. In 2009 IEEE Conference on Computer Vision and Pattern Recognition. 248–255. https://doi.org/10.1109/CVPR.2009.5206848

[Crossref](https://doi.org/10.1109/CVPR.2009.5206848)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1109%2FCVPR.2009.5206848)

\[10\]

Paul Dumouchel. 2005. Trust as an action. European Journal of Sociology/Archives européennes de sociologie 46, 3 (2005), 417–428.

[Google Scholar](https://scholar.google.com/scholar?q=Paul+Dumouchel.+2005.+Trust+as+an+action.+European+Journal+of+Sociology%2FArchives+europ%C3%A9ennes+de+sociologie+46%2C+3+%282005%29%2C+417%E2%80%93428.)

\[11\]

Be My Eyes. \[n. d.\]. Be My AI - Commercially Available Image-to-Text. https://web.archive.org/web/20230807212758/https://www.bemyeyes.com/blog/introducing-be-my-ai

[Google Scholar](https://scholar.google.com/scholar?q=Be%C2%A0My+Eyes.+%5Bn.+d.%5D.+Be+My+AI+-+Commercially+Available+Image-to-Text.+https%3A%2F%2Fweb.archive.org%2Fweb%2F20230807212758%2Fhttps%3A%2F%2Fwww.bemyeyes.com%2Fblog%2Fintroducing-be-my-ai)

\[12\]

Cole Gleason, Patrick Carrington, Cameron Cassidy, Meredith Ringel Morris, Kris M. Kitani, and Jeffrey P. Bigham. 2019. “It’s Almost like They’re Trying to Hide It”: How User-Provided Image Descriptions Have Failed to Make Twitter Accessible. In The World Wide Web Conference (San Francisco, CA, USA) (WWW ’19). Association for Computing Machinery, New York, NY, USA, 549–559. https://doi.org/10.1145/3308558.3313605

[Digital Library](https://dl.acm.org/doi/10.1145/3308558.3313605)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3308558.3313605)

\[13\]

Cole Gleason, Amy Pavel, Xingyu Liu, Patrick Carrington, Lydia B Chilton, and Jeffrey P Bigham. 2019. Making memes accessible. In Proceedings of the 21st International ACM SIGACCESS Conference on Computers and Accessibility. 367–376.

[Digital Library](https://dl.acm.org/doi/10.1145/3308561.3353792)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3308561.3353792)

\[14\]

Christina Granquist, Susan Y Sun, Sandra R Montezuma, Tu M Tran, Rachel Gage, and Gordon E Legge. 2021. Evaluation and comparison of artificial intelligence vision aids: Orcam myeye 1 and seeing ai. Journal of Visual Impairment & Blindness 115, 4 (2021), 277–285.

[Crossref](https://doi.org/10.1177/0145482X211027492)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1177%2F0145482X211027492)

\[15\]

Danna Gurari, Qing Li, Chi Lin, Yinan Zhao, Anhong Guo, Abigale Stangl, and Jeffrey P Bigham. 2019. Vizwiz-priv: A dataset for recognizing the presence and purpose of private visual information in images taken by blind people. In Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition. 939–948.

[Crossref](https://doi.org/10.1109/CVPR.2019.00103)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1109%2FCVPR.2019.00103)

\[16\]

Danna Gurari, Qing Li, Abigale J Stangl, Anhong Guo, Chi Lin, Kristen Grauman, Jiebo Luo, and Jeffrey P Bigham. 2018. Vizwiz grand challenge: Answering visual questions from blind people. In Proceedings of the IEEE conference on computer vision and pattern recognition. 3608–3617.

[Crossref](https://doi.org/10.1109/CVPR.2018.00380)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1109%2FCVPR.2018.00380)

\[17\]

Rex Hartson and Pardha Pyla. 2012. The UX Book: Process and Guidelines for Ensuring a Quality User Experience (1st ed.). Morgan Kaufmann Publishers Inc., San Francisco, CA, USA.

[Digital Library](https://dl.acm.org/doi/10.5555/2207824)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.5555%2F2207824)

\[18\]

Elisa Kreiss, Cynthia Bennett, Shayan Hooshmand, Eric Zelikman, Meredith Ringel Morris, and Christopher Potts. 2022. Context Matters for Image Descriptions for Accessibility: Challenges for Referenceless Evaluation Metrics. arXiv preprint arXiv:2205.10646 (2022).

[Google Scholar](https://scholar.google.com/scholar?q=Elisa+Kreiss%2C+Cynthia+Bennett%2C+Shayan+Hooshmand%2C+Eric+Zelikman%2C+Meredith%C2%A0Ringel+Morris%2C+and+Christopher+Potts.+2022.+Context+Matters+for+Image+Descriptions+for+Accessibility%3A+Challenges+for+Referenceless+Evaluation+Metrics.+arXiv+preprint+arXiv%3A2205.10646+%282022%29.)

\[19\]

Elizabeth Kupferstein, Yuhang Zhao, Shiri Azenkot, and Hathaitorn Rojnirun. 2020. Understanding the use of artificial intelligence based visual aids for people with visual impairments. Investigative Ophthalmology & Visual Science 61, 7 (2020), 932–932.

[Google Scholar](https://scholar.google.com/scholar?q=Elizabeth+Kupferstein%2C+Yuhang+Zhao%2C+Shiri+Azenkot%2C+and+Hathaitorn+Rojnirun.+2020.+Understanding+the+use+of+artificial+intelligence+based+visual+aids+for+people+with+visual+impairments.+Investigative+Ophthalmology+%26+Visual+Science+61%2C+7+%282020%29%2C+932%E2%80%93932.)

\[20\]

Amanda Lannan. 2019. A Virtual Assistant on Campus for Blind and Low Vision Students.Journal of Special Education Apprenticeship 8, 2 (2019), n2.

[Google Scholar](https://scholar.google.com/scholar?q=Amanda+Lannan.+2019.+A+Virtual+Assistant+on+Campus+for+Blind+and+Low+Vision+Students.Journal+of+Special+Education+Apprenticeship+8%2C+2+%282019%29%2C+n2.)

\[21\]

Walter S Lasecki, Yu Zhong, and Jeffrey P Bigham. 2014. Increasing the bandwidth of crowdsourced visual question answering to better support blind users. In Proceedings of the 16th international ACM SIGACCESS conference on Computers & accessibility. 263–264.

[Digital Library](https://dl.acm.org/doi/10.1145/2661334.2661407)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F2661334.2661407)

\[22\]

Jaewook Lee, Yi-Hao Peng, Jaylin Herskovitz, and Anhong Guo. 2021. Image Explorer: Multi-Layered Touch Exploration to Make Images Accessible. In Proceedings of the 23rd International ACM SIGACCESS Conference on Computers and Accessibility. 1–4.

[Digital Library](https://dl.acm.org/doi/10.1145/3441852.3476548)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3441852.3476548)

\[23\]

Sooyeon Lee, Madison Reddie, Krish Gurdasani, Xiying Wang, Jordan Beck, Mary Beth Rosson, and John M Carroll. 2018. Conversations for Vision: Remote Sighted Assistants Helping People with Visual Impairments. arXiv preprint arXiv:1812.00148 (2018).

[Google Scholar](https://scholar.google.com/scholar?q=Sooyeon+Lee%2C+Madison+Reddie%2C+Krish+Gurdasani%2C+Xiying+Wang%2C+Jordan+Beck%2C+Mary%C2%A0Beth+Rosson%2C+and+John%C2%A0M+Carroll.+2018.+Conversations+for+Vision%3A+Remote+Sighted+Assistants+Helping+People+with+Visual+Impairments.+arXiv+preprint+arXiv%3A1812.00148+%282018%29.)

\[24\]

Sooyeon Lee, Madison Reddie, Chun-Hua Tsai, Jordan Beck, Mary Beth Rosson, and John M Carroll. 2020. The emerging professional practice of remote sighted assistance for people with visual impairments. In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems. 1–12.

[Digital Library](https://dl.acm.org/doi/10.1145/3313831.3376591)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3313831.3376591)

\[25\]

Sooyeon Lee, Rui Yu, Jingyi Xie, Syed Masum Billah, and John M Carroll. 2022. Opportunities for human-AI collaboration in remote sighted assistance. In 27th International Conference on Intelligent User Interfaces. 63–78.

[Digital Library](https://dl.acm.org/doi/10.1145/3490099.3511113)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3490099.3511113)

\[26\]

Tsung-Yi Lin, Michael Maire, Serge Belongie, James Hays, Pietro Perona, Deva Ramanan, Piotr Dollár, and C Lawrence Zitnick. 2014. Microsoft coco: Common objects in context. In Computer Vision–ECCV 2014: 13th European Conference, Zurich, Switzerland, September 6-12, 2014, Proceedings, Part V 13. Springer, 740–755.

[Crossref](https://doi.org/10.1007/978-3-319-10602-1_48)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1007%2F978-3-319-10602-1_48)

\[27\]

Microsoft. 2023. Azure AI Platform - Artificial Intelligence \| Microsoft Azure. https://web.archive.org/web/20230829120553/https://azure.microsoft.com/en-us/solutions/ai/#overview

[Google Scholar](https://scholar.google.com/scholar?q=Microsoft.+2023.+Azure+AI+Platform+-+Artificial+Intelligence+%7C+Microsoft+Azure.+https%3A%2F%2Fweb.archive.org%2Fweb%2F20230829120553%2Fhttps%3A%2F%2Fazure.microsoft.com%2Fen-us%2Fsolutions%2Fai%2F%23overview)

\[28\]

Microsoft. 2023. Microsoft’s Azure AI Vision Documentation. https://web.archive.org/web/20230813062320/https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/

[Google Scholar](https://scholar.google.com/scholar?q=Microsoft.+2023.+Microsoft%E2%80%99s+Azure+AI+Vision+Documentation.+https%3A%2F%2Fweb.archive.org%2Fweb%2F20230813062320%2Fhttps%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fazure%2Fai-services%2Fcomputer-vision%2F)

\[29\]

Microsoft. 2023. Microsoft’s Azure AI Vision Features. https://web.archive.org/web/20230831062415/https://azure.microsoft.com/en-us/products/ai-services/ai-vision

[Crossref](https://doi.org/1062415/https://azure.microsoft.com/en-us/products/ai-services/ai-vision)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=1062415%2Fhttps%3A%2F%2Fazure.microsoft.com%2Fen-us%2Fproducts%2Fai-services%2Fai-vision)

\[30\]

Microsoft. 2023. SeeingAI. https://web.archive.org/web/20230629075147/https://www.microsoft.com/en-us/ai/seeing-ai

[Google Scholar](https://scholar.google.com/scholar?q=Microsoft.+2023.+SeeingAI.+https%3A%2F%2Fweb.archive.org%2Fweb%2F20230629075147%2Fhttps%3A%2F%2Fwww.microsoft.com%2Fen-us%2Fai%2Fseeing-ai)

\[31\]

Microsoft. 2023. What Is Image Analysis - Microsoft Azure AI Documentation. https://web.archive.org/web/20230904214321/https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis?tabs=4-0

[Google Scholar](https://scholar.google.com/scholar?q=Microsoft.+2023.+What+Is+Image+Analysis+-+Microsoft+Azure+AI+Documentation.+https%3A%2F%2Fweb.archive.org%2Fweb%2F20230904214321%2Fhttps%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fazure%2Fai-services%2Fcomputer-vision%2Foverview-image-analysis%3Ftabs%3D4-0)

\[32\]

Meredith Ringel Morris, Jazette Johnson, Cynthia L. Bennett, and Edward Cutrell. 2018. Rich Representations of Visual Content for Screen Reader Users. In Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems (Montreal QC, Canada) (CHI ’18). Association for Computing Machinery, New York, NY, USA, 1–11. https://doi.org/10.1145/3173574.3173633

[Digital Library](https://dl.acm.org/doi/10.1145/3173574.3173633)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3173574.3173633)

\[33\]

Annika Muehlbradt and Shaun K. Kane. 2022. What’s in an ALT Tag? Exploring Caption Content Priorities through Collaborative Captioning. ACM Trans. Access. Comput. 15, 1, Article 6 (mar 2022), 32 pages. https://doi.org/10.1145/3507659

[Digital Library](https://dl.acm.org/doi/10.1145/3507659)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3507659)

\[34\]

Nandita Naik, Christopher Potts, and Elisa Kreiss. 2023. Context-vqa: Towards context-aware and purposeful visual question answering. In Proceedings of the IEEE/CVF International Conference on Computer Vision. 2821–2825.

[Crossref](https://doi.org/10.1109/ICCVW60793.2023.00301)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1109%2FICCVW60793.2023.00301)

\[35\]

Vishnu Nair, Hanxiu ’Hazel’ Zhu, and Brian A. Smith. 2023. ImageAssist: Tools for Enhancing Touchscreen-Based Image Exploration Systems for Blind and Low Vision Users. In Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems (Hamburg, Germany) (CHI ’23). Association for Computing Machinery, New York, NY, USA, Article 76, 17 pages. https://doi.org/10.1145/3544548.3581302

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581302)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3544548.3581302)

\[36\]

John Rieman. 1993. The diary study: a workplace-oriented research tool to guide laboratory efforts. In Proceedings of the INTERACT’93 and CHI’93 conference on Human factors in computing systems. 321–326.

[Digital Library](https://dl.acm.org/doi/10.1145/169059.169255)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F169059.169255)

\[37\]

Johnny Saldaña. 2021. The coding manual for qualitative researchers. sage.

[Google Scholar](https://scholar.google.com/scholar?q=Johnny+Salda%C3%B1a.+2021.+The+coding+manual+for+qualitative+researchers.+sage.)

\[38\]

Tharangini Sankarnarayanan, Lev Paciorkowski, Khevna Parikh, Giles Hamilton-Fletcher, Chen Feng, Diwei Sheng, Todd E. Hudson, John-Ross Rizzo, and Kevin C. Chan. 2023. Training AI to Recognize Objects of Interest to the Blind and Low Vision Community. In 2023 45th Annual International Conference of the IEEE Engineering in Medicine & Biology Society (EMBC). 1–4. https://doi.org/10.1109/EMBC40787.2023.10340454

[Crossref](https://doi.org/10.1109/EMBC40787.2023.10340454)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1109%2FEMBC40787.2023.10340454)

\[39\]

Nathan Silberman, Derek Hoiem, Pushmeet Kohli, and Rob Fergus. 2012. Indoor segmentation and support inference from rgbd images. In Computer Vision–ECCV 2012: 12th European Conference on Computer Vision, Florence, Italy, October 7-13, 2012, Proceedings, Part V 12. Springer, 746–760.

[Digital Library](https://dl.acm.org/doi/10.1007/978-3-642-33715-4_54)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1007%2F978-3-642-33715-4_54)

\[40\]

Peter Smith and Laura Smith. 2021. Artificial intelligence and disability: too much promise, yet too little substance?AI and Ethics 1, 1 (2021), 81–86.

[Google Scholar](https://scholar.google.com/scholar?q=Peter+Smith+and+Laura+Smith.+2021.+Artificial+intelligence+and+disability%3A+too+much+promise%2C+yet+too+little+substance%3FAI+and+Ethics+1%2C+1+%282021%29%2C+81%E2%80%9386.)

\[41\]

Abigale Stangl, Meredith Ringel Morris, and Danna Gurari. 2020. "Person, Shoes, Tree. Is the Person Naked?" What People with Vision Impairments Want in Image Descriptions. In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems (Honolulu, HI, USA) (CHI ’20). Association for Computing Machinery, New York, NY, USA, 1–13. https://doi.org/10.1145/3313831.3376404

[Digital Library](https://dl.acm.org/doi/10.1145/3313831.3376404)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3313831.3376404)

\[42\]

Abigale Stangl, Nitin Verma, Kenneth R. Fleischmann, Meredith Ringel Morris, and Danna Gurari. 2021. Going Beyond One-Size-Fits-All Image Descriptions to Satisfy the Information Wants of People Who Are Blind or Have Low Vision. In Proceedings of the 23rd International ACM SIGACCESS Conference on Computers and Accessibility (Virtual Event, USA) (ASSETS ’21). Association for Computing Machinery, New York, NY, USA, Article 16, 15 pages. https://doi.org/10.1145/3441852.3471233

[Digital Library](https://dl.acm.org/doi/10.1145/3441852.3471233)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3441852.3471233)

\[43\]

Microsoft SeeingAI Team. \[n. d.\]. SeeingAI \| Powered by Azure Cognitive Services. https://web.archive.org/web/20231112221020/https://blogs.microsoft.com/accessibility/seeing-ai-2/

[Google Scholar](https://scholar.google.com/scholar?q=Microsoft%C2%A0SeeingAI+Team.+%5Bn.+d.%5D.+SeeingAI+%7C+Powered+by+Azure+Cognitive+Services.+https%3A%2F%2Fweb.archive.org%2Fweb%2F20231112221020%2Fhttps%3A%2F%2Fblogs.microsoft.com%2Faccessibility%2Fseeing-ai-2%2F)

\[44\]

Anja Thieme, Cynthia L. Bennett, Cecily Morrison, Edward Cutrell, and Alex S. Taylor. 2018. "I Can Do Everything but See!" – How People with Vision Impairments Negotiate Their Abilities in Social Contexts. In Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems (Montreal QC, Canada) (CHI ’18). Association for Computing Machinery, New York, NY, USA, 1–14. https://doi.org/10.1145/3173574.3173777

[Digital Library](https://dl.acm.org/doi/10.1145/3173574.3173777)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3173574.3173777)

\[45\]

Bart Thomee, David A. Shamma, Gerald Friedland, Benjamin Elizalde, Karl Ni, Douglas Poland, Damian Borth, and Li-Jia Li. 2016. YFCC100M: the new data in multimedia research. Commun. ACM 59, 2 (Jan. 2016), 64–73. https://doi.org/10.1145/2812802

[Digital Library](https://dl.acm.org/doi/10.1145/2812802)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F2812802)

\[46\]

Yu-Yun Tseng, Alexander Bell, and Danna Gurari. 2022. VizWiz-FewShot: Locating Objects in Images Taken by People with Visual Impairments. In European Conference on Computer Vision. Springer, 575–591.

[Digital Library](https://dl.acm.org/doi/10.1007/978-3-031-20074-8_33)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1007%2F978-3-031-20074-8_33)

\[47\]

Ramakrishna Vedantam, C Lawrence Zitnick, and Devi Parikh. 2015. Cider: Consensus-based image description evaluation. In Proceedings of the IEEE conference on computer vision and pattern recognition. 4566–4575.

[Crossref](https://doi.org/10.1109/CVPR.2015.7299087)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1109%2FCVPR.2015.7299087)

\[48\]

Jingyi Xie, Rui Yu, Kaiming Cui, Sooyeon Lee, John M. Carroll, and Syed Masum Billah. 2023. Are Two Heads Better than One? Investigating Remote Sighted Assistance with Paired Volunteers. In Proceedings of the 2023 ACM Designing Interactive Systems Conference (Pittsburgh, PA, USA) (DIS ’23). Association for Computing Machinery, New York, NY, USA, 1810–1825. https://doi.org/10.1145/3563657.3596019

[Digital Library](https://dl.acm.org/doi/10.1145/3563657.3596019)

[Google Scholar](https://scholar.google.com/scholar_lookup?doi=10.1145%2F3563657.3596019)

\[49\]

Jingyi Xie, Rui Yu, Sooyeon Lee, Yao Lyu, Syed Masum Billah, and John M Carroll. 2022. Helping Helpers: Supporting Volunteers in Remote Sighted Assistance with Augmented Reality Maps. In Designing Interactive Systems Conference. 881–897.

[Google Scholar](https://scholar.google.com/scholar?q=Jingyi+Xie%2C+Rui+Yu%2C+Sooyeon+Lee%2C+Yao+Lyu%2C+Syed%C2%A0Masum+Billah%2C+and+John%C2%A0M+Carroll.+2022.+Helping+Helpers%3A+Supporting+Volunteers+in+Remote+Sighted+Assistance+with+Augmented+Reality+Maps.+In+Designing+Interactive+Systems+Conference.+881%E2%80%93897.)

## Cited By

[View all](https://dl.acm.org/action/ajaxShowCitedBy?doi=10.1145/3613904.3642211 "View all cited by in new tab")

- Hermann JKuhl JDogangün A(2026)Representation, Participation, and Power in AI-Based Interactive Systems for Accessibility: A Critical ReviewProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3841226(1-7)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3841226](https://dl.acm.org/doi/10.1145/3797867.3841226)

- Wei TPiccardi TRedi MBernstein M(2026)Evaluating the Quality of LLM Alt-Text for Wikipedia: Insights from Editors, Blind and Low-Vision Users, and CrowdworkersProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3841219(1-4)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3841219](https://dl.acm.org/doi/10.1145/3797867.3841219)

- Khan RHong J(2026)Debugging Computer Vision as a Blind ResearcherProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3832769(1-6)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3832769](https://dl.acm.org/doi/10.1145/3797867.3832769)

- Show More Cited By

## Index Terms

Index Terms (Premium feature)

1. Investigating Use Cases of AI-Powered Scene Description Applications for Blind and Low Vision People

1. [Human-centered computing](https://dl.acm.org/doi/10.1145/3613904.3642211#)



      1. [Accessibility](https://dl.acm.org/doi/10.1145/3613904.3642211#)



         1. [Empirical studies in accessibility](https://dl.acm.org/doi/10.1145/3613904.3642211#)
      2. [Human computer interaction (HCI)](https://dl.acm.org/doi/10.1145/3613904.3642211#)



         1. [Empirical studies in HCI](https://dl.acm.org/doi/10.1145/3613904.3642211#)

## Recommendations

Recommendations (Premium feature)

- [**How Multimodal Large Language Models Support Access to Visual Information: A Diary Study With Blind and Low Vision People**](https://dl.acm.org/doi/10.1145/3613904.3642211# "How Multimodal Large Language Models Support Access to Visual Information: A Diary Study With Blind and Low Vision People")

CHI '26: Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems







Multimodal large language models (MLLMs) are changing how Blind and Low Vision (BLV)
people access visual information. Unlike traditional visual interpretation tools that
only provide descriptions, MLLM-enabled applications offer conversational assistance,...







[Read More](https://dl.acm.org/doi/10.1145/3613904.3642211# "Read More")

- [**Towards Understanding the Use of MLLM-Enabled Applications for Visual Interpretation by Blind and Low Vision People**](https://dl.acm.org/doi/10.1145/3613904.3642211# "Towards Understanding the Use of MLLM-Enabled Applications for Visual Interpretation by Blind and Low Vision People")

CHI EA '25: Proceedings of the Extended Abstracts of the CHI Conference on Human Factors in Computing Systems







Blind and Low Vision (BLV) people have adopted AI-powered visual interpretation applications
to address their daily needs. While these applications have been helpful, prior work
has found that users remain unsatisfied by their frequent errors. Recently, ...







[Read More](https://dl.acm.org/doi/10.1145/3613904.3642211# "Read More")

- [**LLM-powered assistant with electrotactile feedback to assist blind and low vision people with maps and routes preview**](https://dl.acm.org/doi/10.1145/3613904.3642211# "LLM-powered assistant with electrotactile feedback to assist blind and low vision people with maps and routes preview")



Abstract


Previewing routes to unfamiliar destinations is a crucial task for many blind and
low vision (BLV) individuals to ensure safety and confidence before their journey.
While prior work has primarily supported navigation during travel, less research ...





Highlights










  - Blind and low vision (BLV) people recognized tactile patterns via association memory
  - Electrotactile system can assist BLV people understand map elements and routes.
  - BLV people adjusted the electrotactile feedback via trip preview ...

[Read More](https://dl.acm.org/doi/10.1145/3613904.3642211# "Read More")

## Comments

Comments (Premium feature)

Disqus Comments

We were unable to load Disqus. If you are a moderator please see our [troubleshooting guide](https://docs.disqus.com/help/83/).

## DL Comment Policy

Comments should be relevant to the contents of this article, (sign in required).

Got it

- [Share](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3613904.3642211&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2F10.1145%2F3613904.3642211&t_d=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)

  - Tweet this discussion
  - Share this discussion on Facebook
  - Share this discussion via email
  - Copy link to discussion

  - [Best](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3613904.3642211&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2F10.1145%2F3613904.3642211&t_d=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)
  - [Newest](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3613904.3642211&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2F10.1145%2F3613904.3642211&t_d=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)
  - [Oldest](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3613904.3642211&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2F10.1145%2F3613904.3642211&t_d=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)

Nothing in this discussion yet.

[Load more comments](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3613904.3642211&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2F10.1145%2F3613904.3642211&t_d=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Investigating%20Use%20Cases%20of%20AI-Powered%20Scene%20Description%20Applications%20for%20Blind%20and%20Low%20Vision%20People%20%7C%20Proceedings%20of%20the%202024%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)

### Information

#### Published In

![cover image ACM Conferences](https://dl.acm.org/cms/asset/aae1c5f3-d00f-4636-942a-f86bb2fd33d1/3613904.cover.jpg)

CHI '24: Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems

May 2024

18961 pages

ISBN:9798400703300

DOI:10.1145/3613904

- **Editors:**
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Florian Floyd Mueller](https://dl.acm.org/profile/99661202077 "Florian Floyd Mueller"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Penny Kyburz](https://dl.acm.org/profile/99661204358 "Penny Kyburz"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Julie R. Williamson](https://dl.acm.org/profile/99661206509 "Julie R. Williamson"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Corina Sas](https://dl.acm.org/profile/99661538907 "Corina Sas"),
- [![Author Picture](https://dl.acm.org/cms/asset/ffe03b64-53ef-43c8-8eb0-f901c1a7a80b/maxwilson10x82.jpg)Max L. Wilson](https://dl.acm.org/profile/81100531194 "Max L. Wilson"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Phoebe Toups Dugas](https://dl.acm.org/profile/99661203462 "Phoebe Toups Dugas"),
- [![Author Picture](https://dl.acm.org/cms/asset/86ce3353-e0a6-4b36-a230-d1dae0cf1b05/portraits_2019-2020_colour1.jpeg)Irina Shklovski](https://dl.acm.org/profile/81100288406 "Irina Shklovski")

Copyright © 2024 Owner/Author.

Permission to make digital or hard copies of part or all of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page. Copyrights for third-party components of this work must be honored. For all other uses, contact the Owner/Author.

#### Sponsors

- [SIGCHI: ACM Special Interest Group on Computer-Human Interaction](https://dl.acm.org/sig/sigchi)
- [SIGACCESS: ACM Special Interest Group on Accessible Computing](https://dl.acm.org/sig/sigaccess)

#### Publisher

Association for Computing Machinery

New York, NY, United States

#### Publication History

**Published**: 11 May 2024

#### Check for updates

[Check for updates on crossmark](https://dl.acm.org/doi/10.1145/3613904.3642211# "Check for updates on crossmark")

#### Badges

- [![](https://dl.acm.org/userimages/na101/home/literatum/publisher/acm/classification/LinkedImages/reproducibility-types/artifacts_available_v101/icon-large_202009300323.png)Artifacts Available / v1.1](https://www.acm.org/publications/policies/artifact-review-and-badging-current#available "Artifacts Available / v1.1")

#### Author Tags

1. [AI](https://dl.acm.org/keyword/AI?expand=all)
2. [Assistive Technology](https://dl.acm.org/keyword/Assistive+Technology?expand=all)
3. [Blind and Low Vision People](https://dl.acm.org/keyword/Blind+and+Low+Vision+People?expand=all)
4. [Computer Vision](https://dl.acm.org/keyword/Computer+Vision?expand=all)
5. [Diary Study](https://dl.acm.org/keyword/Diary+Study?expand=all)
6. [Scene Description](https://dl.acm.org/keyword/Scene+Description?expand=all)
7. [Use cases](https://dl.acm.org/keyword/Use+cases?expand=all)

#### Qualifiers

- Research-article
- Research
- Refereed limited

#### Funding Sources

- Google Research Scholars program

#### Conference

CHI '24

Sponsor:

- [SIGCHI](https://dl.acm.org/sig/sigchi)
- [SIGACCESS](https://dl.acm.org/sig/sigaccess)

[CHI '24: CHI Conference on Human Factors in Computing Systems](https://chi2024.acm.org/)

May 11 - 16, 2024

Honolulu, HI, USA

#### Acceptance Rates

CHI '24 Paper Acceptance Rate Not Available

Overall Acceptance Rate 6,501 of 27,660 submissions, 24%

#### Upcoming Conference

CHI '27

- **Sponsor:**
- [sigchi](https://dl.acm.org/sig/sigchi "Special Interest Group on Computer-Human Interaction")

[ACM CHI Conference on Human Factors in Computing Systems](https://dl.acm.org/conference/chi "ACM CHI Conference on Human Factors in Computing Systems")

May 10 - 14, 2027



Pittsburgh ,


PA ,


USA



### Contributors

![](https://dl.acm.org/specs/products/acm/releasedAssets/images/loader-7e60691fbe777356dc81ff6d223a82a6.gif)

#### Other Metrics

[View Article Metrics](https://dl.acm.org/doi/10.1145/3613904.3642211#tab-metrics-inner)

### Bibliometrics

#### Article Metrics

- 66

Total Citations
[View Citations](https://dl.acm.org/doi/10.1145/3613904.3642211#tab-citations)
- 16,222

Total Downloads


- Downloads (Last 12 months)Advanced metrics (Premium feature)...
- Downloads (Last 6 weeks) Advanced metrics (Premium feature)...

Reflects downloads up to 02 Nov 2026

#### Other Metrics

[View Author Metrics](https://dl.acm.org/doi/10.1145/3613904.3642211#tab-contributors)

### Citations

## Cited By

[View all](https://dl.acm.org/action/ajaxShowCitedBy?doi=10.1145/3613904.3642211 "View all cited by in new tab")

- Hermann JKuhl JDogangün A(2026)Representation, Participation, and Power in AI-Based Interactive Systems for Accessibility: A Critical ReviewProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3841226(1-7)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3841226](https://dl.acm.org/doi/10.1145/3797867.3841226)

- Wei TPiccardi TRedi MBernstein M(2026)Evaluating the Quality of LLM Alt-Text for Wikipedia: Insights from Editors, Blind and Low-Vision Users, and CrowdworkersProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3841219(1-4)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3841219](https://dl.acm.org/doi/10.1145/3797867.3841219)

- Khan RHong J(2026)Debugging Computer Vision as a Blind ResearcherProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3832769(1-6)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3832769](https://dl.acm.org/doi/10.1145/3797867.3832769)

- Turkarslan AThakkar VTekle RChen TMartinez JMankoff J(2026)Context-Aware, AI-Powered ALT Text Generation for Lecture Visuals: A Multimodal Approach via Slide Decks and Speech TranscriptsProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3829048(1-36)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3829048](https://dl.acm.org/doi/10.1145/3797867.3829048)

- Tsutsui AWang XGuerreiro JTakagi HOchiai YAsakawa C(2026)Designing for Ring Camera Use: Spatial Interaction Strategies of Blind and Low Vision PeopleProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3828989(1-20)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3828989](https://dl.acm.org/doi/10.1145/3797867.3828989)

- Wu YChen RLee JLi JZhang KLio MWang WMondal SFroehlich JTian YZhao Y(2026)What to Distinguish and How? Opportunities and Challenges of Augmenting Multiple, Cluttered Objects in Complex Scenes for People with Low VisionProceedings of the 28th International ACM SIGACCESS Conference on Computers and Accessibility10.1145/3797867.3828974(1-25)Online publication date: 25-Oct-2026
[https://dl.acm.org/doi/10.1145/3797867.3828974](https://dl.acm.org/doi/10.1145/3797867.3828974)

- Shiraishi YZhong YKobayashi MWakatsuki DSuzuki TShionome THiraga R(2026)Who Provides and Who Acknowledges? A Behavioral Log Analysis of Reciprocal Information Support at the Tokyo 2025 DeaflympicsBehavioural and Social Computing10.1007/978-981-92-6910-5\_30(528-547)Online publication date: 19-Oct-2026
[https://doi.org/10.1007/978-981-92-6910-5\_30](https://doi.org/10.1007/978-981-92-6910-5_30)

- Sinha AOlmos ADelos Santos RRodriguez Rodriguez RLanday JSepah SNelson PKane S(2026)Making Videos Accessible for Blind and Low Vision Users Using a Multimodal Agent Video PlayerCompanion Publication of the 28th International Conference on Multimodal Interaction10.1145/3776591.3833853(531-537)Online publication date: 5-Oct-2026
[https://dl.acm.org/doi/10.1145/3776591.3833853](https://dl.acm.org/doi/10.1145/3776591.3833853)

- Carreras BRudaz DDue BMerlino SHirvonen M(2026)Configuring AI Glasses as Access Technology: Investigating How Blind and Sighted People Respond to Asynchronous Trouble in Image DescriptionProceedings of the 14th Nordic Conference on Human-Computer Interaction10.1145/3829807.3829845(1-13)Online publication date: 3-Oct-2026
[https://dl.acm.org/doi/10.1145/3829807.3829845](https://dl.acm.org/doi/10.1145/3829807.3829845)

- Wester JRudaz DKhan MDue BBrown B(2026)The Work to Make Assistance Work: Learning from Videos by Visually Impaired Content CreatorsProceedings of the 14th Nordic Conference on Human-Computer Interaction10.1145/3829807.3829822(1-16)Online publication date: 3-Oct-2026
[https://dl.acm.org/doi/10.1145/3829807.3829822](https://dl.acm.org/doi/10.1145/3829807.3829822)

- Show More Cited By

### Share

#### Share this Publication link

Copy Link

Copied!

Copying failed.

#### Share on social media

[X](https://dl.acm.org/#twitter "Share on X") [LinkedIn](https://dl.acm.org/#linkedin "Share on LinkedIn") [Reddit](https://dl.acm.org/#reddit "Share on Reddit") [Facebook](https://dl.acm.org/#facebook "Share on Facebook") [Threads](https://dl.acm.org/#threads "Share on Threads") [email](https://dl.acm.org/#email "Share on email")

#### Affiliations

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

Ricardo EGonzalez Penuela

Information Science, Cornell Tech, Cornell University, United States

[https://orcid.org/0000-0002-1344-3850](https://orcid.org/0000-0002-1344-3850)

[View Profile](https://dl.acm.org/profile/99659526810)

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

JazminCollins

Computing and Information Sciences, Cornell University, United States

[https://orcid.org/0000-0001-6850-5820](https://orcid.org/0000-0001-6850-5820)

[View Profile](https://dl.acm.org/profile/99661007108)

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

CynthiaBennett

Google, United States

[https://orcid.org/0000-0003-1036-2497](https://orcid.org/0000-0003-1036-2497)

[View Profile](https://dl.acm.org/profile/83358692957)

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

ShiriAzenkot

Information Science, Cornell Tech, United States

[https://orcid.org/0000-0002-6701-4066](https://orcid.org/0000-0002-6701-4066)

[View Profile](https://dl.acm.org/profile/81466647758)

[View full text](https://dl.acm.org/doi/full/10.1145/3613904.3642211) \| [Download PDF](https://dl.acm.org/doi/pdf/10.1145/3613904.3642211?download=true)

xrefBack.goTo

xrefBack.goTo

Request permissionsExpand All

Collapse

Expand Table

Show all references

SHOW ALL BOOKS

[Authors Info & Affiliations](about:blank#tab-contributors)

[View Table of Contents](https://dl.acm.org/doi/proceedings/10.1145/3613904)

Your Search Results Download Request

We are preparing your search results for download ...

We will inform you here when the file is ready.

[Download now!](https://dl.acm.org/doi/10.1145/3613904.3642211#)

Your Search Results Download Request

Your file of search results citations is now ready.

[Download now!](https://dl.acm.org/doi/10.1145/3613904.3642211#)

Your Search Results Download Request

Your search export query has expired. Please try again.

Copy link

✓

Thanks for sharing!

Find any service

[AddToAny](https://www.addtoany.com/ "Share Buttons")

[More…](https://dl.acm.org/doi/10.1145/3613904.3642211#addtoany "Show all")

A2A