Source: https://dl.acm.org/doi/full/10.1145/3706598.3713329
Title: Perceptions of Sentient AI and Other Digital Minds: Evidence from the AI, Morality, and Sentience (AIMS) Survey | Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems
Fetched: 2026-11-05T21:34:23.712Z

[skip to main content](https://dl.acm.org/doi/full/10.1145/3706598.3713329#skip-to-main-content)

## ACM is now Open Access

×

As part of the Digital Library's transition to [Open Access](https://dl.acm.org/action/clickThrough?id=108180&url=%2Fopenaccess&loc=%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&pubId=64502280&placeholderId=101025&productId=108179 "Follow link to the ACM DL Open Access information page"), new features for researchers are available in the _Premium Edition_. [Click here to learn more](https://dl.acm.org/action/clickThrough?id=108180&url=%2Fpremium&loc=%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&pubId=64502280&placeholderId=101025&productId=108179 "More information about Premium Edition").

**You are currently in the Basic Edition. Features requiring a subscription appear in grey.**

[Sign In](https://dl.acm.org/action/clickThrough?id=108180&url=%2Faction%2FshowLogin%3FredirectUri%3Dhttps%253A%252F%252Fdl.acm.org%252Fdoi%252Ffull%252F10.1145%252F3706598.3713329&loc=%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&pubId=64502280&placeholderId=101025&productId=108179) [Upgrade](https://dl.acm.org/action/clickThrough?id=108180&url=%2Fabout%2Fupgrade&loc=%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&pubId=64502280&placeholderId=101025&productId=108179 "Learn about upgrading to Premium Edition")

Several features on this page require Premium Access.

[Learn more](https://dl.acm.org/about/upgrade) [Sign in](https://dl.acm.org/action/showLogin?redirectUri=%2Fdoi%2F10.1145%2F3706598.3713329)

Contents

## Abstract

### Abstract

Humans now interact with a variety of _digital minds_, AI systems that appear to have mental faculties such as reasoning, emotion, and agency, and public figures are discussing the possibility of sentient AI. We present initial results from 2021 and 2023 for the nationally representative AI, Morality, and Sentience (AIMS) survey ( _N_ = 3,500). Mind perception and moral concern for AI welfare were surprisingly high and significantly increased: in 2023, one in five U.S. adults believed some AI systems are currently sentient, and 38% supported legal rights for sentient AI. People became more opposed to building digital minds: in 2023, 63% supported banning smarter-than-human AI, and 69% supported banning sentient AI. The median 2023 forecast was that sentient AI would arrive in just five years. The development of safe and beneficial AI requires not just technical study but understanding the complex ways in which humans perceive and coexist with digital minds.

### AI Summary

### AI-Generated Summary (Experimental)

This summary was generated using automated tools and was not authored or reviewed by the article's author(s). It is provided to support discovery, help readers assess relevance, and assist readers from adjacent research areas in understanding the work. It is intended to complement the author-supplied abstract, which remains the primary summary of the paper. The full article remains the authoritative version of record. [Click here to learn more](https://dl.acm.org/generative-ai/summarizations "Learn more about ACM AI summaries").

Click here to comment on the accuracy, clarity, and usefulness of this summary. Doing so will help inform refinements and future regenerated versions.

To view this AI-generated plain language summary, you must have Premium access.

## 1 Introduction

Philosophers and scientists have long considered the possibility of artificial intelligence (AI) systems with mental faculties such as reasoning, emotion, and agency, which we call _digital minds_. Popular questions include: Can an AI ever have a mind of its own? How should we treat sentient AI if it is created? Should humanity, as Metzinger \[ [115](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0115)\] suggests, ban the development of sentient AI to preclude interaction? When, if it is not banned, should we expect sentient AI to first be created? These profound questions of mind perception, moral status, policy, and forecasting are now being asked and answered by researchers, industry leaders, and much of the general public. [1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fn1)

![](https://dl.acm.org/cms/10.1145/3706598.3713329/asset/6292ab3f-cda3-4433-b3b6-98896d9decef/assets/images/medium/chi25-246-fig1.jpg)

A 3-by-3 grid with three questions as rows: “Do you think it could ever be possible for robots/AIs to be sentient?”, “Do you think any robots/AIs that currently exist are sentient?”, and “Do you think ChatGPT is sentient?”; and three survey waves as columns: Main 2021, Main 2023, and Supplement 2023. Only the Supplement 2023 asked the third question.

Responses to three questions across the three AIMS survey waves. See Section [4](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4) for detailed results.

The manifestation of these dynamics in public discourse surged in 2022, first in February when Ilya Sutskever, chief scientist at a leading AI company, OpenAI, tweeted, “it may be that today’s large neural networks are slightly conscious” \[ [165](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0165)\]. In June, Google vice-president Blaise Agüera y Arcas published an editorial in _The Economist_ on how “Artificial neural networks are making strides towards consciousness” \[ [2](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0002)\]. Weeks later, Google engineer Blake Lemoine vigorously argued that the company’s chatbot LaMDA was sentient and needed legal protection, which led to his termination from the company and sparked a global conversation on the topic \[ [170](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0170)\]. Since before 2022, there has also been rapid growth in the academic literature on the possibility of digital minds and the normative implications \[ [66](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0066)\].

Regardless of whether sentient AI ever will be developed, the act of asking and answering questions about digital minds will itself reshape human-AI interaction. In this work, we view sentience and consciousness not as facts of reality but as semantic labels that humans place on certain entities, endowing them social status \[ [6](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0006)\]. We know from the human-computer interaction (HCI) and human-robot interaction (HRI) literatures that “computers are social actors” (CASA) \[ [73](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0073), [122](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0122)\]; are perceived as having their own minds \[ [58](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0058), [152](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0152), [164](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0164), [169](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0169), [175](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0175)\]; and can be perceived as moral patients or subjects with their own welfare \[ [48](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0048), [66](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0066), [82](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0082), [107](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0107), [130](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0130)\] and as moral agents worthy of praise, blame, and responsibility \[ [10](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0010), [47](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0047), [80](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0080), [90](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0090)\]. For example, Scott et al. \[ [152](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0152)\] conducted an online survey of 100 Amazon Mechanical Turk workers on perceptions of machine consciousness and identified dynamic tensions in user perceptions, and Kneer et al. \[ [90](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0090)\] found that whether people saw a harmful robot as blameworthy depended on whether it seemed to have its own theory of mind.

Perceptions of AI already shape trust in AI \[ [70](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0070)\], willingness to use AI \[ [87](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0087), [88](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0088), [172](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0172)\], and the consequences of AI for mental health and social relationships \[ [30](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0030), [71](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0071), [72](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0072), [129](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0129)\]. In the long run, human perceptions of and interactions with digital minds will affect which types of AI systems are safe, which policy and governance frameworks are most beneficial, how AI designers and engineers choose to build AI, how individual users and state actors use AI, and ultimately the existential trajectory of the human species. A particularly concerning and understudied existential risk \[ [15](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0015), [56](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0056), [144](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0144)\] is the effect on human agency like the dystopian futures in the 1909 short story _The Machine Stops_ and the science fiction film _WALL-E_. If humans fail to prepare for these new forms of human-AI interaction, we could face “disempowerment,” absent-mindedly giving up control to evolutionary or artificial forces \[ [37](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0037), [41](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0041), [45](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0045), [57](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0057), [94](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0094), [146](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0146)\], and this transition may be particularly difficult to preempt if it is “accumulative” \[ [86](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0086)\] or “gradual” \[ [94](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0094)\].

Effective AI research and design require grounded knowledge of the different “frames,” schema of interpretation \[ [55](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0055)\], that increasingly shape how people individually and collectively understand and react to AI systems. Representative surveys to tease out such understandings are a well-established method in HCI, such as in privacy \[ [65](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0065)\], cybercrime \[ [62](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0062)\], and trust in social media platforms \[ [191](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0191)\]. Attitudes and beliefs have implications for technological design, including privacy \[ [26](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0026), [65](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0065), [68](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0068)\], cybercrime \[ [18](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0018), [62](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0062)\], and trust in social media \[ [190](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0190)\]. Theories in psychology and sociology emphasize the distinct role of sociocognitive processes in shaping the future, such as through “world-making” \[ [131](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0131), [135](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0135)\], and a wide range of research has shown that public opinion has influence on policy, politics, and other social institutions \[e.g., [11](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0011), [21](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0021)\].

We address mind perception, morality, policy, and forecasting by posing four overlapping research questions (RQs) about public perceptions of digital minds:

•

**RQ1**: To what extent do people perceive sentience and other mental faculties in AI?

•

**RQ2**: To what extent do people feel morally concerned for AI (i.e., see it as a moral subject) and threatened by AI (i.e., see it as a moral agent)?

•

**RQ3**: What policies are supported to govern interaction between humans and sentient AI?

•

**RQ4**: When do people expect sentient AI to arrive, and what do they think will happen when it does?

Because there have been such rapid changes in how AI is discussed, used, and conceptualized by the public in the 21st century, we began seeking answers to these questions in 2021 with the first wave of the **AI, Morality, and Sentience (AIMS) survey** with a nationally representative sample of U.S. adults. In this paper, we present the first three waves of AIMS: one in 2021 and two in 2023 (one with the same questions as the 2021 wave and one with supplemental questions).

Our first wave ( _N_ = 1,232, referred to as **Main 2021**), was collected from November to December 2021, approximately seven months before the topic of sentient AI entered the public spotlight with the LaMDA discussion. We asked 86 questions related to the perception of mental faculties in AI, the moral concern for AI being harmed, the moral threat of AI enacting harm, the prospect of banning sentience-related technologies, forecasts of the future of sentient AI, personal AI usage, demographics, and relevant background beliefs such as views on animal welfare and environmental issues. From April to May 2023, approximately 11 months after the public spotlight began and four months after the public release of ChatGPT—an AI product that became the world’s fastest growing app \[ [75](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0075)\]—we repeated the AIMS survey with a new nationally representative sample ( _N_ = 1,169, referred to as **Main 2023**). Finally, to assess a wider range of attitudes and better contextualize the longitudinal results, we conducted a supplemental AIMS survey wave ( _N_ = 1,099, referred to as **Supplement 2023**) from May to July 2023 with 111 questions, including on public awareness of specific AI systems, trust of AI and its developers, and additional forecasts of the future of artificial general intelligence (AGI). We intend AIMS supplements to be one-time surveys that do not necessarily measure the same perceptions over time but complement the longitudinal main data.

In **Main 2021**, we found surprisingly high mind perception ( **RQ1**) and attribution of moral status, including both concern for the wellbeing of AI and feeling threatened by AI ( **RQ2**). Likewise, even the most strongly worded policy proposals garnered substantial support, such as 37.2% agreement with, “I support granting legal rights to sentient robots/AIs” ( **RQ3**). Participants forecasted sentient AI would arrive quickly with a median estimate of five years ( **RQ4**). Comparing data from **Main 2021** to **Main 2023**, there were significant increases in mind perception, moral concern, and threat as well as a shortening timeline of when sentient AI will arrive. In a set of additional policy questions asked in **Supplement 2023**—prompted by the political debates in early 2023 on the topic—we also found widespread support for slowing down and regulating various forms of AI development. Finally, as described in the supplemental materials, exploratory analysis surfaced numerous significant differences in opinion across age, gender, frequency of AI interaction, and other participant characteristics, even when adjusting for family-wise error rates.

These preliminary results from the ongoing AIMS survey project suggest a number of implications for HCI design, policy, and research. In Section [5](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-5), we argue that:

(1)

Designers should prioritize explainable AI (XAI) and consider selectively tuning anthropomorphism with physical and behavioral cues to harness benefits and minimize risks of different systems.

(2)

Policymakers should prioritize safety-focused policy, such as the EU AI Act, to account for widespread public concern. They should also ensure their own technological literacy and work towards meaningful public engagement with these challenging new issues.

(3)

Researchers should address the open and important research questions about the perception of sentient AI, including the drivers and consequences of public opinion, refinement of HCI theories, and approaches to varied global perspectives on AI development.

Understanding the “theory of mind” that people use to think about increasingly powerful and prevalent AI systems can illuminate the design space of future human-AI interaction and inform the management of existing AI technologies. Rigorously measuring public perceptions, particularly over time, can provide insights for design and policy decisions that must be made before new technologies are invented and that should account for what people value, not only how they behave with existing technologies. Survey data is particularly important during this challenging and dynamic period of technological change as the HCI community debates the interplay between new forms of human-AI interaction and established areas of research, such as CSCW and social computing \[ [119](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0119)\].

## 2 Related Work

### 2.1 Social Response and Mind Perception

There are numerous mechanisms by which humans interact with computer systems in ways similar to social interactions between humans. These span the course of interaction from initial perception of the system to attitude and belief formation to resultant behavior. The CASA view, as evidenced by studies in the 1990s, suggests that these “social” responses need not occur because of a conscious belief that the computer has human characteristics but can merely be the application of etiquette, stereotypes, norms, and other social scripts \[ [122](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0122), [136](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0136)\]. Recent work has continued to build on social response theory to explain human-AI interaction, such as with chatbots \[ [125](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0125)\] and avatars \[ [116](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0116)\]. As computers have become more familiar and ubiquitous, interface design has built on this tendency by incorporating natural social dynamics between the user and the system \[ [155](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0155)\], and now people also use novel “human-media social scripts” \[ [52](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0052)\]. For example, with voice assistants, such as Amazon Alexa, people often have established social routines and commands that have been developed through repeated usage and understanding of the system’s affordances \[ [5](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0005)\]. “Mindless” social responses can emerge from habit and ease of use \[ [121](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0121)\], and studies continue to find that many social psychology effects found in human-human interaction carry over to HCI \[ [95](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0095), [162](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0162)\].

As computer systems have become more sophisticated, they have in many ways become more human-like, leading to a research focus on anthropomorphism (i.e., the attribution of human characteristics, motivations, intentions, or emotions to nonhuman entities \[ [43](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0043)\]). While anthropomorphism is often associated with positive HCI outcomes through increased trust and engagement, it can lead to unrealistic expectations \[ [108](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0108)\] and the well-known “uncanny valley” effect \[ [163](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0163)\].

A particularly important human-like feature that people can attribute is having a mind. The importance of mind perception in HCI has led to a diverse, interdisciplinary literature that uses a number of different, closely related terms, including “theory of mind” and “mind attribution,” as documented in a recent HRI review \[ [169](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0169)\]. Several authors have taxonomized the mental faculties perceived in human and nonhuman entities: Gray et al. \[ [58](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0058)\] used principal component factor analysis to identify “experience” (e.g., hunger, fear, pain, pleasure) and “agency” (e.g., self-control, morality, memory, emotion recognition) as the main dimensions of mind perception. More recent work has proposed one-dimensional \[ [174](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0174)\], three-dimensional \[ [179](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0179)\], and five-dimensional taxonomies \[ [110](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0110)\]. In the HCI literature, Wang et al. \[ [175](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0175)\] recently proposed “mutual theory of mind” as a framework to study human-AI interaction and to design systems that support user needs over time. Related literature also suggests that techno-animism—the attribution of souls, life forces, and related phenomena to technological artifacts—plays an important role in human-AI interaction \[ [130](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0130), [140](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0140), [154](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0154)\]. Anthropomorphic cues, in particular those affecting mind perception, have been shown to shape beliefs about system performance and moral responsibility in contexts such as driving simulators \[ [178](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0178)\].

### 2.2 Sentience and Morality

Social response and mind perception are key drivers of moral attitudes and behaviors. Gray et al. \[ [60](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0060)\] aphorized, “Mind perception is the essence of morality.” Sentience has been one of the most frequently hypothesized and debated mental faculties of future AI in science fiction and purportedly even current AIs, as attested in the statements of OpenAI’s Sutskever \[ [165](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0165)\] and Google’s Agüera y Arcas \[ [2](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0002)\] and Lemoine \[ [170](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0170)\]. Sentience (i.e., the capacity for positive and negative experiences \[ [7](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0007)\]) is closely associated with moral standing as it is frequently seen as the primary or exclusive basis of moral concern \[ [134](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0134)\]. In the two-dimensional taxonomy of mind as experience and agency, perceptions of sentience are typically associated with experience but can also affect perceived agency, particularly the capacity to do harm (i.e., to pose a threat). Sometimes people refer to “sentience” with the term “consciousness,” but while consciousness has many different meanings in the literature, we focus on sentience for specificity and to focus on social and moral entailments \[ [95](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0095)\]. We also use the term “digital mind” for the wider category—to encompass AI not necessarily with sentience but any mental faculties, such as reasoning \[ [76](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0076)\] or understanding \[ [12](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0012)\].

In terms of moral concern for an AI’s wellbeing (i.e., the attribution of moral standing), Harris and Anthis \[ [66](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0066)\] conducted a systematic literature review of empirical studies of moral concern for AIs, finding that AI tends to be granted much less moral concern than humans, but that moral concern increases when humans perceive autonomy, human-like appearance, mind, and verbal responses to harm in the AI. For example, Spence et al. \[ [160](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0160)\] presented 167 undergraduate students with a video of either a human or a robot asking them to sign a petition for robot rights. Responses did not depend on whether the requester was a human or robot, and 46% said they would sign the petition—a substantial amount of moral concern—and perceived credibility, positive attitudes towards robots, and prior experience with robots was associated with a higher likelihood of signing the petition. Similarly, Lima et al. \[ [107](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0107)\] presented 11 possible AI rights and corresponding arguments to debunk common misconceptions about them to 1,270 Amazon Mechanical Turk users and 164 Qualtrics users. Participants tended to disagree with the endowment of most rights, such as the right to enter contracts and the freedom of speech, with the exception of protection from cruel treatment. Each participant was randomly assigned to one of four debunking interventions, which were found to significantly increase support for AI rights, particularly the intervention that showed examples of nonhumans that were already granted rights and duties, which indicated to participants that AI rights were a realistic possibility.

In terms of being threatened by AI (i.e., the attribution of negative moral agency), this has been most salient with AI that assists in consequential tasks, such as medical imaging \[ [101](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0101)\] and bail decisions \[ [61](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0061), [105](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0105)\]. AI is often blamed or held responsible when they cause harm \[ [49](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0049), [50](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0050), [90](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0090), [91](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0091), [92](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0092), [164](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0164), [173](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0173)\], though there have been mixed results in studies of whether they are blamed more or less than humans in similar contexts \[ [102](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0102), [106](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0106), [111](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0111)\]. While many scholars have developed theories of artificial moral agency in ethics and HCI \[ [24](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0024), [192](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0192)\], others have argued that machines themselves lack minds or personhood and therefore should not—or cannot—be held responsible for harm and that this attribution can be a distraction from holding the humans involved accountable for their actions \[ [159](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0159)\]. A rapidly growing academic and public discourse addresses the existential threat that “agentic,” “conscious,” or “superintelligent” AI poses to humanity itself, such as if capabilities rapidly accelerate in an “intelligence explosion” \[ [15](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0015), [56](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0056), [144](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0144)\]. Such threats have been considered to some extent for decades, particularly in science fiction, but they captured the public imagination anew following the aforementioned mid-2022 discussions of sentient AI, the launch of ChatGPT in November 2022, and the widely read open letter signed by leading academics and executives in March 2023 that called for a 6-month pause on advanced AI development \[ [51](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0051)\].

The field of HCI lacks a solid foundation of detailed, longitudinal, and nationally representative data on which social theories and technical designs can be developed. Basic facts about everyday user viewpoints, such as whether people support protecting sentient AI from harm or banning the development of sentient AIs, remain unknown. Therefore, in the present work, we answer our RQs with rigorous, multidimensional measurement of the beliefs and attitudes toward morality and sentience that could drive human-AI interaction in the 21st century.

### 2.3 Perceptions and Public Opinion

Internal states (perceptions, opinions, beliefs, attitudes, etc.) drive individual behavior and social change. These cognitive and affective states deserve study in their own right, not just as proxies for behavior. There are large and well-documented differences between them and behavior, often summarized as the “attitude-behavior gap” \[ [16](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0016)\]. For example, it is well-known that people report significant concerns about preserving their own privacy, yet they tend to take little action to preserve it with their online behavior; this “privacy paradox” has motivated efforts to preserve privacy without requiring individual behavioral choices—in an effort to align outcomes with attitudes rather than merely with behaviors \[ [158](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0158), [185](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0185)\].

Instead of as a proxy for behavior, cognition is studied for its distinct causal effects on future real-world events. That can be through interaction with other cognitive processes of the individual mind or as a distinct driver of subsequent behavior, such as speaking with peers, that affects other people or the environment. For example, the expression of political views and the publication of poll results can affect how people vote, among other real-world outcomes \[ [142](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0142), [143](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0143)\]. Normatively, it is often the case that, if a person could decide whether their attitude or behavior is used as the basis of a design or policy decision, they would choose the attitude, such as high proportions of people voting for recycling mandates despite few people opting in before it is mandated or the many people attempting to diet who pay a coach or use an app to push themselves to consistently change their behavior.

In the AIMS survey project, we draw on sociocognitive theories of how people think about different “frames,” the schema of interpretation by which people make sense of the world \[ [55](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0055)\]. In particular, people collectively engage in “world-making,” discussed in more detail in the context of sentient AI in Pauketat et al. \[ [131](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0131)\]. World-making is the process by which individuals, including researchers, envision possible futures such as utopias and dystopias and bring one into existence \[ [131](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0131), [135](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0135), [148](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0148)\]. In general, a central finding of social psychology is that “people are future-oriented and often are guided more by what could be than what is” \[ [135](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0135)\], and human motivation centers the pursuit of positive outcomes and, moreso, the avoidance of negative outcomes \[ [83](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0083)\]. Social discourse and debate often center “collective imagination” \[ [14](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0014)\] or different “imaginaries” \[ [9](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0009), [147](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0147)\] of how the world could be. Likewise, design fiction \[ [38](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0038)\] and speculative design \[ [38](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0038), [182](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0182)\] encourage people to explore a variety of likely or unlikely possible futures.

## 3 Methodology

In order to study change in public opinion over time, we have been collecting longitudinal data in the AI, Morality, and Sentience (AIMS) survey. In this paper, we report the first three waves of survey data: the main survey in 2021 (i.e., **Main 2021**), the main survey in 2023 with the same questions as in 2021 (i.e., **Main 2023**), and a supplemental survey in 2023 with a different set of questions (i.e., **Supplement 2023**). To allow for direct comparison between results, AIMS participants who had taken one survey were excluded from the following survey waves, and the samples were otherwise gathered with an identical methodology to ensure representativeness and that we could make statistical comparisons over time, which past one-time surveys on AI cannot provide. We intend to continue running the main AIMS survey and collecting different supplemental data over time as humanity begins to coexist with digital minds in the coming years.

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
|  | **2021 Main** | **Latest U.S. Population Estimates** | **2023 Main** | **2023 Supp.** | **Latest U.S. Population Estimates** |
| **Age** |  |  |  |  |  |
| 18–34 | 22% | 24% | 27% | 28% | 28% |
| 35–54 | 32% | 31% | 34% | 33% | 33% |
| 55– | 45% | 45% | 39% | 39% | 39% |
| **Gender** |  |  |  |  |  |
| Female | 54% | 52% | 54% | 51% | 51% |
| Male | 46% | 48% | 46% | 49% | 49% |
| **Region** |  |  |  |  |  |
| Midwest | 20% | 21% | 21% | 21% | 21% |
| Northeast | 19% | 18% | 18% | 17% | 17% |
| South | 40% | 38% | 39% | 38% | 38% |
| West | 21% | 24% | 23% | 24% | 24% |
| **Household Income** |  |  |  |  |  |
| –$24,999 | 12% | 12% | 14% | 12% | 11% |
| $25,000–$49,999 | 018% | 8% | 18% | 16% | 17% |
| $50,000–$74,999 | 019% | 9% | 15% | 17% | 17% |
| $75,000–$99,999 | 016% | 6% | 16% | 14% | 14% |
| $100,000– | 36% | 36% | 39% | 40% | 42% |
| **Ethnicity/Race** |  |  |  |  |  |
| Asian | 6% | 6% | 6% | 6% | 6% |
| Black | 12% | 12% | 11% | 11% | 11% |
| Hispanic (any race) | 16% | 17% | 17% | 17% | 17% |
| Native American | 1% | 1% | 0% | 0% | 0% |
| White | 64% | 64% | 61% | 61% | 61% |
| Other | 2% | 2% | 4% | 4% | 4% |
| **Education** |  |  |  |  |  |
| Less than high school | 9% | 10% | 10% | 10% | 10% |
| High school | 25% | 27% | 25% | 26% | 27% |
| Some college | 20% | 21% | 17% | 18% | 21% |
| Associate | 10% | 9% | 010% | 9% | 9% |
| Bachelor’s degree | 20% | 20% | 25% | 22% | 21% |
| Post-graduate | 16% | 13% | 13% | 13% | 13% |

Unweighted demographics for the three AIMS survey waves: **Main 2021**, **Main 2023**, and **Supplement 2023**. Unweighted proportions are those before raking, which further balanced the data. Demographic categories (e.g., binary gender) were determined by the sample providers, as were population estimates, which were from the latest iteration available of the U.S. Census Bureau’s American Community Survey at the time of data collection.

### 3.1 Recruitment and Census-Balanced Demographics

Each of the three AIMS survey waves was conducted with a nationally representative sample of U.S. adults aged 18 or older. Participants were recruited through a combination of Ipsos iSay, Dynata, Disqo, and other leading survey panels to ensure representativeness. Sample sizes were initially targeted at 1,100 participants, corresponding to a ±3% margin of error, and additional participants were recruited as needed to ensure representativeness of each subgroup. Unweighted sample proportions and U.S. adult population estimates are shown in Table [1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab1). Each sample was collected based on U.S. census data for age, gender, race/ethnicity, income, and education. To further ensure external validity, we report sample statistics (e.g., median, mean, standard error) that are weighted with iterative proportional fitting, a procedure commonly known as “raking” that adjusts sample weights to mitigate the random demographic variation that is present even in representative sampling \[ [36](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0036)\].

To contextualize our results, we documented several AI-specific characteristics of the AIMS participants. In **Main 2023**, 29.2% answered “Yes” to the binary question, “Do you own AI or robotic devices that can detect their environment and respond appropriately?” alongside examples, and 16.5% answered “Yes” to “Do you work with AI or robotic devices at your job?” alongside another set of examples. We also measured smart device ownership, the types of experiences that participants previously had with AI, the frequency of AI interaction, and the frequency of reading or watching AI-related media. Each of these was included alongside more general demographic characteristics in the predictive models detailed in the supplemental materials of this paper.

| Survey | Term | Definition |
| --- | --- | --- |
| **Main** | Artificial beings and robots/AIs | **Artificial beings** and **robots/AIs** are **intelligent entities built by humans**, such as robots, virtual copies of human brains, or computer programs that solve problems, **with or without a physical body**, that may exist now or in the future. |
| Sentience | **Sentience** is the capacity to have positive and negative experiences, such as happiness and suffering. |
| Sentient robots/AIs | **Sentient robots/AIs** are those with the capacity to have positive and negative experiences, such as happiness and suffering. |
| **Supplement 2023** | Robots/AIs | **Robots/AIs** are **intelligent entities built by humans**, such as robots, virtual copies of human brains, or computer programs that solve problems, **with or without a physical body**, that may exist now or in the future. |
| Large language models | **Large language models** are artificial intelligence (AI) algorithms that can recognize, summarize, and generate text from being trained on massive datasets. |

Definitions provided to AIMS participants at the beginning of the survey and individually on pages that used the term. Participants were shown bolded text for emphasis and clarity.

### 3.2 Survey Design

Some demographic information was drawn from the pre-screening data of the survey provider. Informed consent was given for each participant at the beginning of their AIMS survey. As shown in (Table [2](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab2)), participants were introduced to the topic by showing definitions of the terms “artificial beings,” “robots/AIs,” “sentience,” “sentient robots/AIs,” and “large language models” at the beginning of the survey and at the top of each page that contained the term. While “robots/AIs” was used in the survey instrument to ensure clarity, in this paper we refer simply to “AIs” or “AI systems” because robots are a type of AI. To reduce cognitive load \[ [128](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0128)\] and minimize the influence of idiosyncratic wording choices \[ [149](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0149)\], only these definitions were provided, and they were kept as simple as possible. Therefore, other terms in the AIMS survey, such as “AI video game characters,” were not explicitly defined. In general, different participants may have different interpretations of terms based on their own background and the state of public understanding and discourse when the data was collected, which is a part of the public opinion we hope to measure over time.

An attention check was included midway through each survey, and participants who failed the attention check were redirected out of the survey and excluded from the analysis. The instruments were designed to capture the most relevant information for assessing public opinion; in the **Main 2021** and **Main 2023** survey waves, we aimed to ensure that the wording would still be relevant in future years despite the rapidly changing AI landscape, such as by not mentioning many particular AI systems that were those most well-known when the data was collected (e.g., GPT-3) but may not be as well-known in the future. When creating the instruments, if possible, the wording of survey questions was copied or adapted from published materials and validated scales \[e.g., [99](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0099), [176](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0176), [177](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0177), [168](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0168)\]. However, because of the paucity of survey data on related topics, we have limited ability to compare our results to past surveys and had to develop original measures for many constructs. Items were randomized within each section, and section order was randomized when feasible; for example, the demographic questions that were not in the pre-screener were placed at the end of the instrument to mitigate stereotype threat (i.e., survey responses that are influenced by being reminded of the cultural associations of one’s social group \[ [161](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0161)\]).

### 3.3 Analysis and Presentation of Results

Each survey wave was preregistered, and all materials, data, and brief summaries of additional results not discussed in the main text are available in the supplementary materials. As part of the preregistration and in line with recommendations for open and efficient scientific practices \[e.g., [35](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0035)\], researchers and forecasters from an online forecasting platform made predictions about the results to ensure that we would know which results were surprisingly high, surprisingly low, or in line with our expectations; some comparisons are shown in Figure [5](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fig5).

We exclude confidence intervals from Section [4](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4) for readability because of the large number of results reported, but they are consistent with the approximately ±3% margin of error in nationally representative surveys, and we report the **Main 2023** or **Supplement 2023** results unless otherwise specified. For questions in the main survey waves, we note when there were statistically significant changes from **Main 2021** to **Main 2023** as measured with a generalized linear model (GLM) of the average response across time with a _p_-value cutoff of 0.05, all of which persist after adjustment for multiple comparisons with a false discovery rate (FDR) of 0.1 except for one effect noted in the text. Due to the extensive nature of our survey, including many novel questions because of the lack of prior research on this topic, we cannot include the full text and explanation of all questions and response choices in Section [4](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4), and for the sake of readability, we do not present all results in the same format, choosing instead to focus on the summary statistics that bear most directly on the research questions, such as by presenting figures with unique formatting to highlight certain aspects of the results rather than for comprehensive documentation.

We also ran predictive GLMs to explore associations between public opinion and certain demographics and personal characteristics of participants. To conserve space in the main text, those models are detailed in the supplemental materials. The supplementary materials also contain the results for several sentience-related questions that help contextualize the main results: social beliefs about the attitudes of other people; support for the subservience of AI; views towards other nonhuman entities (animals and the environment); target-specific social connection; substratism; awareness of AI systems; trust in AIs, governments, and companies; positive emotions felt towards AIs; attitudes toward uploading human minds to computers; and replications of some well-known results from other surveys. In addition to these extensive results, all data and code are available in the supplementary materials to support further analysis and new research studies.

## 4 Results

### 4.1 RQ1: Mind Perception

In the **Main 2021** and **Main 2023** AIMS survey waves, we measured mind perception of AI with four sliding scale questions about particular mental faculties, four questions from an anthropomorphism scale, and a yes-no-not-sure question of whether any existing AIs are sentient. In **Supplement 2023**, we asked 14 questions about the mental faculties of “current large language models” (LLMs), the same yes-no-not-sure question for comparison, and whether participants thought ChatGPT, in particular, is sentient. The yes-no-not-sure questions, in particular, were meant to measure an alternate form of public opinion with coarser-grained, categorical responses rather than the quantitative and ordinal measures.

#### 4.1.1 General Mind Perception.

We asked about whether current AIs have four mental faculties with wording drawn from Wang and Krumhuber \[ [176](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0176)\]. On a 0–100 scale from “not at all” to “very much,” 2021 participants on average perceived AIs as thinking analytically ( _M_ = 62.7, _SE_ = 0.780) and being rational ( _M_ = 51.4, _SE_ = 0.825) but not experiencing emotions ( _M_ = 34.3, _SE_ = 0.864) or having feelings ( _M_ = 33.7, _SE_ = 0.870). Each attribution significantly increased in the 2023 participants: thinking analytically ( _M_ = 67.1, _SE_ = 0.766, _p_ < 0.001), being rational ( _M_ = 53.8, _SE_ = 0.846, _p_ = 0.012), experiencing emotions ( _M_ = 36.8, _SE_ = 0.919, _p_ < 0.001), and having feelings ( _M_ = 36.5, _SE_ = 0.919, _p_ < 0.001). As mentioned before, all _p_-values were produced by regressing the change in response on time in a generalized linear model (GLM).

#### 4.1.2 LLM Mind Perception.

In **Supplement 2023**, based on the greatly increased interest in LLMs since 2021, we queried the mind perception of LLMs in particular. Assessments of LLMs were lower than those of all AIs: namely, thinking analytically ( _M_ = 57.7, _SE_ = 0.902, _p_ < 0.001), being rational ( _M_ = 48.0, _SE_ = 0.906, _p_ < 0.001), experiencing emotions ( _M_ = 32.7, _SE_ = 0.904, _p_ < 0.001), and having feelings ( _M_ = 31.9, _SE_ = 0.900, _p_ < 0.001). **Supplement 2023** queried ten additional mental faculties related to agency, with wording based on Ngo et al. \[ [124](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0124)\], because of the increased interest in AI safety in early 2023 alongside the popularization of LLMs. These were presented with the same 0–100 scale. In descending order, participants viewed LLMs as having the capacity for: being friendly with humans ( _M_ = 51.4, _SE_ = 0.906), having situational awareness ( _M_ = 46.3, _SE_ = 0.902), maintaining human-safe goals ( _M_ = 45.7, _SE_ = 0.907), controlling themselves ( _M_ = 45.0, _SE_ = 0.928), seeking power ( _M_ = 44.1, _SE_ = 0.939), having their own motivations ( _M_ = 42.8, _SE_ = 0.919), upholding human values ( _M_ = 42.2, _SE_ = 0.926), understanding human values ( _M_ = 41.7, _SE_ = 0.942), deciding their own goals ( _M_ = 41.6, _SE_ = 0.919), and having self-awareness ( _M_ = 41.1, _SE_ = 0.927). Overall, this suggests AI is more readily attributed the capacity for cooperative action and less readily attributed self-awareness, independent motivation and goals, and the capacity to uphold and understand human values.

#### 4.1.3 Mind-related Anthropomorphism.

On a different 0–10 scale of mind perception as a measure of anthropomorphism, taken from Waytz et al. \[ [177](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0177)\] and using the original scale to ensure comparability, people in 2023 generally did not think that the average digital simulation has emotions ( _M_ = 3.22, _SE_ = 0.0878), the average robot has consciousness ( _M_ = 3.23, _SE_ = 0.0885), the average computer has a mind of its own ( _M_ = 3.71, _SE_ = 0.0913), or the average AI has intentions ( _M_ = 4.04, _SE_ = 0.0890). These results did not significantly change from **Main 2021** to **Main 2023**.

#### 4.1.4 Current Sentience.

In our literature review, we did not find any established survey questions or indices to utilize for assessing perceived sentience, though we did not expect to have precedent for all questions given the novelty of our survey. We presented participants with the definition of sentience (“Sentience is the capacity to have positive and negative experiences, such as happiness and suffering” \[ [7](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0007)\]) at the beginning of the AIMS survey and on each page in which it appeared. When asked, “Do you think any robots/AIs that currently exist (i.e., those that exist in 2023) are sentient?” 18.8% said “yes,” 42.2% said “no,” and 39.0% said “not sure.” Responses to this question did not significantly vary between survey waves, and Figure [1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fig1) summarizes these results.

#### 4.1.5 Summary for RQ1.

We found substantial perception of emotional mental faculties in AI and perceptions of rational and analytical faculties—giving a general sense of how laypeople think of digital minds. When asked about LLMs in particular, a lower degree of mental faculties was perceived, and LLMs were more readily attributed the capacity for cooperation compared to faculties related to values, motivation, goals, and self-awareness.

### 4.2 RQ2: Moral Status

In **Main 2021** and **Main 2023**, we measured moral concern with seven general agree-disagree questions about all sentient AIs, two general agree-disagree questions about all AIs, 11 sliding scale questions about moral concern for particular types of AIs, and two questions related to substratism (i.e., the idea that AIs fundamentally count less than humans and other biological intelligences \[ [130](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0130)\]). In **Supplement 2023**, we asked six general agree-disagree questions about all AI and three specific agree-disagree questions about what should be done “\[i\]f a large language model develops the capacity to suffer.”

In **Main 2021** and **Main 2023**, we also asked three questions about whether participants saw AIs as potentially harmful to them, people in their country, and future generations. In **Supplement 2023**, we asked the same three questions, three additional original questions about existential threats from AI developments, and replicated a YouGov question about the possibility of human extinction \[ [187](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0187)\].

| Statement | % Agree (All AIs) | % Agree (Sentient AIs) | Increase (95% CI) |
| --- | --- | --- | --- |
| Torturing (sentient) robots/AIs is wrong. | 60.7% | 76.4% | 15.7% (11.6%, 19.9%) |
| (Sentient) robots/AIs deserve to be treated with respect. | 55.7% | 71.1% | 15.4% (11.1%, 19.7%) |
| I support campaigns against the exploitation of (sentient) robots/AIs. | 53.0% | 55.8% | 2.8% (-1.8%, 7.3%) |
| Physically damaging (sentient) robots/AIs without their consent is wrong. | 46.2% | 65.1% | 18.9% (14.5%, 23.3%) |
| I support the development of welfare standards that protect the well-being of (sentient) robots/AIs. | 42.9% | 57.5% | 14.6% (10.2%, 19.0%) |
| I support asking institutions like the government and private corporations to fund research that protects (sentient) robots/AIs. | 41.8% | 52.0% | 9.8% (5.8%, 14.7%) |
| (Sentient) robots/AIs deserve to be included in the moral circle. | 36.2% | 44.6% | 8.4% (4.0%, 12.7%) |
| Re-programming (sentient) robots/AIs without their consent is wrong. | 29.7% | 45.2% | 15.5% (11.2%, 19.8%) |
| I would consider joining a public demonstration against the mistreatment of (sentient) robots/AIs. | 29.3% | 35.6% | 6.3% (2.1%, 10.5%) |
| I support granting legal rights to (sentient) robots/AIs. | 26.8% | 37.7% | 10.9% (6.7%, 14.9%) |

Agreement with statements about all AIs or sentient AIs. The statements about sentient AIs are in the **Main 2023** AIMS survey, and the statements about all AIs are from the **Supplement 2023** AIMS survey. This table includes statements from both Section [4.2.1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4-2-1) and Section [4.3.1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4-3-1).

#### 4.2.1 General Moral Concern.

We asked a total of 15 agree-disagree questions about general moral concern for AIs. These questions were developed specifically for this survey and are based on the range of possible harms that could be imagined towards sentient AI and the general literature on moral circle expansion and moral standing of AI \[e.g., [7](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0007), [98](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0098), [95](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0095)\]. Because of the centrality of these questions to the present study, we include the exact text and confidence intervals for the proportion agreement with statements that were asked for both sentient AI and all AI in Table [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab3), which also includes questions about the protections of AI discussed in Section [4.3.1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4-3-1). Participants were asked, “To what extent do you agree or disagree with the following statements?” with numbered choices (1 = strongly agree, 2 = agree, 3 = somewhat agree, 4 = somewhat disagree, 5 = disagree, 6 = strongly disagree) followed by an unnumbered “no opinion” option at the end, again for comparability to related work. The most prominent trend in Table [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab3) is that the moral concern expressed for sentient AI is much higher than that for all AI and that it has a substantially larger effect with certain questions.

There were no statistically significant changes in the mean agreement from **Main 2021** to **Main 2023** for individual items. Note that means are used for significance testing for these questions because, while dichotomous measures such as agreement are more interpretable, the mean captures more information and thereby results in a higher-powered test \[ [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0003)\].

#### 4.2.2 Target-Specific Moral Concern.

While the preceding questions focused on the different sorts of moral concern expressed for sentient AI and all AI, we also directly probed expressions of self-reported moral concern for particular types of AIs. We did not explain in detail the particular types of AI in order to minimize survey fatigue, cognitive load \[ [128](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0128)\], and the influence of idiosyncratic wording choices on participant responses \[ [149](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0149)\]. This allows us to understand how people interpreted the particular terms themselves in the context of the same question, “How much moral concern do you think you should show for the following robots/AIs?” on a sliding scale from 1 (“less concern”) to 5 (“more concern”) and ensure comparability.

The most concern was for exact digital copies of human brains ( _M_ = 3.43, _SE_ = 0.0375), followed by human-like companion robots ( _M_ = 3.34, _SE_ = 0.0350), human-like retail robots ( _M_ = 3.11, _SE_ = 0.0357), animal-like companion robots ( _M_ = 3.10, _SE_ = 0.0352), exact digital copies of animals ( _M_ = 3.07, _SE_ = 0.0364), AI personal assistants ( _M_ = 3.02, _SE_ = 0.0343), complex language algorithms ( _M_ = 2.90, _SE_ = 0.0348), machine-like factory production robots ( _M_ = 2.78, _SE_ = 0.0358), machine-like cleaning robots ( _M_ = 2.66, _SE_ = 0.0356), virtual avatars ( _M_ = 2.63, _SE_ = 0.0350), and AI video game characters ( _M_ = 2.46, _SE_ = 0.0351). In general, human-likeness and animal-likeness were most associated with high moral concern, while machine-likeness and particularly being a virtual avatar or character were most associated with low concern. There was a statistically significant increase from 2021 to 2023 in the overall Target-Specific Moral Concern index of these 11 questions ( _p_ < 0.001) and each individual question except AI video game characters.

The results of pairwise comparisons between each of the questions are included in the supplementary materials as are the results of an analogous set of questions on social connection using the Inclusion of Other in the Self (IOS) scale \[ [8](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0008)\] with the same 11 targets as in the target-specific moral concern measures, including pairwise comparisons for social connection as well.

#### 4.2.3 LLM Suffering.

While we intended the main longitudinal survey to minimize references to particular types of AI systems, we asked in the 2023 supplement specifically about what humanity should do “\[i\]f a large language model develops the capacity to suffer.” As with other key terms, we defined a large language model (“Large language models are artificial intelligence (AI) algorithms that can recognize, summarize, and generate text from being trained on massive datasets” \[e.g., [85](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0085)\]) at the beginning of the survey and on each page where it appeared, but we did not define more particular, subjective terms, such as “suffering.” We found general agreement that, “We must ensure we don’t cause unnecessary suffering” (67.9%); “We must pay more attention to their welfare” (56.9%); and, “We must respect their personhood” (50.4%).

#### 4.2.4 General Threat.

Sentience tends to be associated with moral concern (i.e., seeing the entity as a moral subject) more than with threat (i.e., seeing the entity as a moral agent), but we were nonetheless interested in threat measures, which are a frequent topic of public discussion and research. To understand how threatened participants felt by AI in general (i.e., without specifying particular types of harm), we tested agreement with three statements beginning with, “Robots/AIs may be harmful to.” In 2021, most people believed AI may be harmful to “future generations of people” (69.2%), “people in the USA” (64.5%), and “me personally” (50.7%). Each figure significantly increased from 2021 to the 2023 results of 74.7% ( _p_ < 0.001), 70.4% ( _p_ < 0.001), and 58.7% ( _p_ < 0.001).

#### 4.2.5 Existential Threat.

**Supplement 2023** included three questions about particular sorts of harm frequently discussed in the wake of ChatGPT. We found that 47.9% of participants agreed, “AI is likely to cause human extinction”; 57.2% agreed, “Humanity will be able to control powerful AI systems”; and 72.4% agreed, “The safety of AI is one of the most important issues in the world today.” For comparison, the latter figure was more than twice the 29.8% agreement found in the supplement with the statement, “The welfare of robots/AIs is one of the most important social issues in the world today.”

In **Supplement 2023**, we also replicated a question from YouGov \[ [187](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0187)\] that asked, “How concerned, if at all, are you about the possibility that AI will cause the end of the human race on Earth?” (very concerned, somewhat concerned, not very concerned, not at all concerned, not sure). We found that 51.5% reported being very or somewhat concerned, moderately higher than the 46% reported by YouGov, though we were not able to test the statistical significance of this difference due to a lack of detailed information on the YouGov results.

#### 4.2.6 Summary for RQ2.

Both the research team and the forecasters underestimated the public’s moral concern for the treatment of sentient AI (i.e., ability to be harmed) but not the level of threat (i.e., ability to harm). Participants were more concerned about sentient AI than all AI in general, as well as more concerned about and socially connected to human-like and animal-like AIs. Participants tended to agree with basic protections for AIs but disagree with the stronger expressions of concern, such as joining public demonstrations against their mistreatment.

![](https://dl.acm.org/cms/10.1145/3706598.3713329/asset/b482ac4a-72e9-487e-8418-c2decb12e746/assets/images/medium/chi25-246-fig2.jpg)

Support and opposition to policies related to sentient AI from the main and supplemental 2023 surveys. For readability, the color palette is colorblind-safe, and not all policy results are included. For the three bans queried in both the main and supplemental 2023 surveys (robot-human hybrids, AI-enhanced humans, and sentient AI), the main data is represented here to facilitate longitudinal comparison. Horizontally, the figure has each of the six statements quoted with portioned bars for the seven Likert options of Strongly agree, Agree, Somewhat agree, No Opinion, Somewhat disagree, Disagree, and Strongly disagree. The color palette is a color-blind friendly spectrum from dark green to light green (agreement), a middling shade of yellow (No opinion), and from light red to dark red (disagreement). Opinions are generally split, and the figure is ordered from top to bottom by the percentage of Strongly agree.

Support and opposition to policies related to sentient AI from the **Main 2023** and **Supplement 2023** AIMS survey waves. For readability, not all policy results are included. For the three bans queried in both **Main 2023** and **Supplement 2023** survey waves (robot-human hybrids, AI-enhanced humans, and sentient AI), the main data is represented here to facilitate longitudinal comparison.

### 4.3 RQ3: Policy Support

In **Main 2021** and **Main 2023**, we probed support for eight policies to directly protect sentient AIs, one question about a policy to directly protect all AIs, and three questions about banning sentience-related AI technologies.

In **Supplement 2023**, we asked analogs of five of the eight protection questions—but for all AIs rather than only those that are sentient, an additional question about a “bill of rights” for sentient AI, the same three ban questions, two additional ban questions about AGI and large data centers, and six questions about policies that would slow down the development of advanced AI.

Figure [2](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fig2) shows the specific breakdown of agreement with the five proposals to ban particular AI developments, support for government regulation that slows down AI development, and support for legal rights for sentient AI and all AI.

#### 4.3.1 Protection Support.

Table [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab3), in addition to showing agreement with statements of general moral concern, shows the agreement with the five statements regarding the protection of AI that were asked about sentient AI and about all AI. The question categories are combined in this table for easier comparison between responses. Testing the average difference across all five questions, we found that the inclusion of “sentient” significantly increased agreement ( _p_ < 0.001) and that there was substantial variation in the effect of specifying sentient AI across questions. Four other policy proposals only about sentient AI were presented as well as one about all AI in general: 65.2% supported “safeguards on scientific research practices that protect the wellbeing of sentient robots/AIs”; 56.0% supported “a global ban on the development of applications that put the welfare of robots/AIs at risk”; 49.2% supported “a global ban on the use of sentient robots/AIs as subjects in medical experiments without their consent”; 47.9% supported “a global ban on the use of sentient robots/AIs for labor without their consent”; and 39.4% supported “a ‘bill of rights’ that protects the well-being of sentient robots/AIs.” All except the “bill of rights” question were asked in 2021 and 2023, but there were no significant changes from 2021 to 2023.

#### 4.3.2 Ban Support.

In 2023, we queried support for five bans of sentience-related AI technologies. Each proposal for a ban garnered majority support: robot-human hybrids (67.8% in main, 72.3% in supplement), AI-enhanced humans (65.8% in main, 71.1% in supplement), development of sentience in AI (61.5% in main, 69.5% in supplement), data centers that are large enough to train AI systems that are smarter than humans (64.4% in supplement), and artificial general intelligence that is smarter than humans (62.9% in supplement). As mentioned before, the supplement data was collected later in 2023 and the accompanying questions were different (e.g., the supplement being more focused on risks to humans), so these or other factors, including random variation in representative sampling, may explain the discrepancy in results. There was a significant increase in support for a ban on sentient AI from 57.7% in 2021. Still, as referenced earlier, the unadjusted _p_-value ( _p_ = 0.046) did not persist with the FDR-adjusted value just over the cutoff of 0.1 at 0.1005. However, the **Main 2021** agreement was over twice as high as the 24.4% predicted by the median forecaster prediction.

#### 4.3.3 Slowdown Support.

When asked about “the pace of AI development” in **Supplement 2023**, 48.9% of respondents said, “It’s too fast”; 30.0% said, “It’s fine”; 18.6% said, “Not sure”; and only the remaining 2.5% said, “It’s too slow.” When asked about taking action on this, 71.3% agreed, “I support public campaigns to slow down AI development,” and 71.0% agreed, “I support government regulation that slows down AI development.” We also replicated a question from YouGov \[ [188](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0188)\] about a six-month pause on some kinds of AI development, as called for in the March 2023 open letter by the Future of Life Institute \[ [51](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0051)\]. To match their formatting, there were five answer choices (strongly support, somewhat support, somewhat oppose, strongly oppose, not sure). We found that 69.1% strongly or somewhat supported the pause, closely matching the 69% reported by YouGov. Because this question was framed positively, presenting the arguments in favor of the pause, we asked the same “support” question framed analogously from the critics’ view. The reversed version elicited 65.9% support.

#### 4.3.4 Summary for RQ3.

We found that policy support varied substantially across proposals, such as higher support for banning the use of sentient AI for labor without consent and lower support for a “bill of rights.” As with moral concern, the specification of “sentient” AIs led to more support for positive AI treatment. The public overall supports bans on sentience-related technologies and slowdowns of advanced AI development.

![](https://dl.acm.org/cms/10.1145/3706598.3713329/asset/588ff780-7d0c-4e07-bcca-5be0551744fa/assets/images/medium/chi25-246-fig3.jpg)

From the main 2021 and 2023 surveys, answers to, “If you had to guess, how many years from now do you think that robots/AIs will be sentient?” Each row is a box-and-whiskers plot, representing first, second, third, and fourth quartiles for all 2021 participants, all 2023 partipants, or bifurcations of the 2023 participants.

Vertical lines divide quartiles (shortest, 25th, 50th, 75th, longest), so each colored box contains approximately 50% of that category, and each whisker on the side contains approximately 25%. For each row, the shortest expectation was, “It has already happened,” and the longest expectation was, “It will never happen.” For example, In every 2023 category, over a quarter said that sentient AI already existed or would exist in one year.

### 4.4 RQ4: Forecasting the Future of Sentient AI

We asked AIMS participants to forecast the future of sentient AI: “If you had to guess, how many years from now do you think that robots/AIs will be sentient?” We provided options to say AI is already sentient, to enter a number, or to say that AI will never be sentient. In **Main 2023**, the proportion of participants who said AI is already sentient was 20.0% (slightly more than the 18.8% response rate when asked a similar question in the way previously described), and the proportion who think AIs will never be sentient was 10.0%. This data is presented in a box-and-whiskers plot, divided into quartiles, in Figure [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fig3).

In **Main 2023**, the weighted median timeline was five years. Each of these three quantities (proportion of “already,” proportion of “never,” median of those expecting sentient AI in the future) significantly changed from **Main 2021** to **Main 2023** ( _p_ < 0.001), though this was the one question that changed wording from 2021 to 2023, and we recommend caution in interpreting this result.

In **Supplement 2023**, we asked for numerical estimates, in the same format, for three related milestones in AI development: the first AGI, human-level AI, and artificial superintelligence. In terms of median estimates excluding people who said these events would “never happen,” U.S. adults expected the first human-level AI and the first artificial superintelligence to be created in just five years, and they expected the first AGI to be created in just two years. Further detail on the numerical estimates is shown in Figure [4](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fig4).

In the main AIMS survey waves, we asked participants whether they thought AI could ever be sentient. In response, 38.2% said AI could ever be sentient, 38.0% were not sure, and 23.8% said AI could never be sentient, as shown in a figure in the supplementary materials. The mean response to, “How likely is it that robots/AIs will be sentient within the next 100 years?” was 64.1%, which was significantly higher than in 2021 ( _p_ < 0.001). It is important to note that these results are not directly comparable to the “how many years” question because, in part, there was no answer choice of “not sure” in that context. By eliciting similar attitudes and beliefs in different ways, we can more robustly account for nuances of public opinion. We also asked participants to imagine a future with “widespread” sentient AI. Six questions asked how they thought AI would be treated in that hypothetical world (scale: 1-5). People tended to think AIs would be used as subjects in scientific and medical research ( _M_ = 3.46, _SE_ = 0.0330); AIs would be exploited for their labor ( _M_ = 3.23, _SE_ = 0.0368); it would be important to reduce the overall percentage of unhappy sentient AIs ( _M_ = 3.06, _SE_ = 0.0366); the welfare of AIs would be an important social issue ( _M_ = 2.94, _SE_ = 0.0366); advocacy for AI rights would be necessary ( _M_ = 2.94, _SE_ = 0.0367); and AIs would be treated cruelly ( _M_ = 2.79, _SE_ = 0.0344).

#### 4.4.1 Summary for RQ4.

People expect sentient AI to come soon, including minorities who say some AIs are already sentient, but there is also a sizeable group who said AI could never be sentient. In 2023, we found similarly short timelines for AGI, human-level AI, and superintelligence. We found that people tended to think sentient AIs would be used for research and labor, sometimes cruelly, and that protecting their welfare would be important.

![](https://dl.acm.org/cms/10.1145/3706598.3713329/asset/715e5341-d0a6-47bb-a5ec-af4742c4e0f9/assets/images/medium/chi25-246-fig4.jpg)

From the main and supplemental 2023 surveys, answers to, “If you had to guess, how many years from now do you think that…?” for each type of AI: artificial general intelligence (AGI), superintelligence, human-level artificial intelligence (HLAI), and sentient AI. The weighted medians, excluding participants who said it will never happen, were two years for AGI and five years for superintelligence, HLAI, and sentient AI. The figure is a vertical bar graph with five bars (for the five types) with their respective percentages on the Y-axis, bucketed into each of seven categories: Already happened, 1-4 years, 5-9 years, 10-49 years, 50-99 years, 100+ years, and Will never happen. Already happened is the largest category followed by the next three categories then lower levels for the final three categories. The Sentient AI bars tend to be tallest on the right (i.e., longer forecasts), and AGI has a particularly high bar for Already happened.

From **Main 2023** and **Supplement 2023** AIMS surveys, answers to, “If you had to guess, how many years from now do you think that…?” for each type of AI: artificial general intelligence (AGI), superintelligence, human-level artificial intelligence (HLAI), and sentient AI. The weighted medians, excluding participants who said it will never happen, were two years for AGI and five years for superintelligence, HLAI, and sentient AI.

![](https://dl.acm.org/cms/10.1145/3706598.3713329/asset/9538933a-7b6e-431f-845a-1d317c95f41b/assets/images/medium/chi25-246-fig5.jpg)

Three subfigures show horizontal graphs for (a) 2021 Agreement with the Moral Treatment of Sentient AI, (b) 2021 Moral Concern Ratings, and (c) 2021 Mind Perception Ratings. The markers for actual results and the 80% credible intervals in the preregistration show that moral concern was surprisingly high for AI video game characters, virtual avatars, complex language algorithms, and AI personal assistants. Mind perception was surprisingly high for the rating of AIs as having feelings and experiencing emotions as well as for the claim that a digital simulation has emotions.

Comparison between preregistered predictions (80% credible intervals) and actual results in the **Main 2021** survey wave. For example, as shown in subfigure (c), we underestimated the perceptions of AI as “having feelings” and “experiencing emotions,” but our predicted ranges included the actual results for AI as “being rational” and “thinking analytically.”

## 5 Discussion

The AI, Morality, and Sentience (AIMS) survey is a longitudinal and nationally representative survey of U.S. adults. In this paper, we present the initial data, from 2021 (one wave: **Main 2021**) and 2023 (two waves: **Main 2023** and **Supplement 2023**). AIMS is among the first surveys to gauge public opinion on these topics and the first representative survey we know of specifically on digital sentience or digital minds. Academics, futurists, and science fiction authors have speculated about this topic for decades, but it has only recently been studied from HCI, design, and social science perspectives. This limits the extent to which we can connect our findings to past work and confidently argue for changing design and policy, but the novelty of our findings admits numerous tentative implications and promising future research directions. Digital minds research will be essential for humanity to safely navigate the coming years of advancing AI technology.

First, to summarize the primary AIMS findings: We found high mind perception of AI that increased from 2021 to 2023 ( **RQ1**). We found high moral concern for AI and threat from AI that increased from 2021 to 2023 ( **RQ2**). We found widespread support for slowdowns and regulations of advanced AI capabilities and an increase in support for banning sentience-related technologies from 2021 to 2023 as well as mixed support for other policies to govern interaction between humans and sentient AI, both across demographic characteristics and across particular policy proposals ( **RQ3**). Finally, we found that people expect sentient AI to arrive increasingly soon and expect the protection and governance of sentient AI to be important social issues ( **RQ4**).

The following sections articulate key implications of the AIMS findings. For clarity, we divide implications by social group, but there is substantial overlap in the implications for each group. Effectively addressing public concerns will require working together in combination and in parallel.

### 5.1 Implications for Designers

Designers face unique challenges with AI systems, which increase in difficulty as systems become more advanced \[ [184](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0184)\]. We foreground three related approaches that designers can take to address public perception of digital minds: First, ideally, the system is made transparent to the user with explainable AI (XAI) practices. Second, when that is not possible due to user or contextual constraints, designers should consider tuning anthropomorphism (e.g., mind perception) up or down. Third, designers should consider different tuning for different systems; for example, we may accept and support anthropomorphism for a responsibly designed mental health chatbot to facilitate trust, but we may want to decrease anthropomorphic cues if autonomous vehicle companies were passing off blame for collisions to the technology as if it were a moral agent.

#### 5.1.1 Explainable AI (XAI).

Based on our findings, we see the first tool in the designer’s toolbelt as XAI. Scholars in HCI and more technology-centered fields, such as machine learning and natural language processing, have prioritized explainability, interpretability, and transparency because, if these can be achieved, users and affected individuals can judge for themselves the best actions to take. There is a growing literature in HCI that taxonomizes the various algorithmic, organizational, and sociotechnical factors that tend to facilitate XAI in general \[ [39](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0039), [40](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0040)\] and in particular contexts, such as augmented reality \[ [183](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0183)\]. Researchers have begun to empirically test particular XAI techniques to improve human-AI performance, such as behavior descriptions \[ [22](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0022)\], cognitive forcing functions \[ [20](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0020)\], and balancing different levels (e.g., fine-grained, coarse-grained) of conceptual information \[ [118](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0118)\]. XAI will accrue additional importance and complexity as the perception of digital minds changes HCI dynamics. It could make human-AI interaction less clearly fit the established scripts and schemas that users employ, such as the distinction between working with inanimate tools and working with living agents, a line that is increasingly blurred for the end-user with rapidly advancing AI capabilities, as reflected in the increasing mind perception and moral concern we documented from 2021 to 2023.

Ehsan et al. \[ [39](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0039), [40](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0040)\] have developed the framework of human-centered explainable XAI (HCXAI). In particular, they have extended the framework of “social transparency,” originally developed to describe humans observing each other across online social networks, to the socio-organizational dynamics of XAI in which people learn from observing each other’s interaction with AI systems. Our findings show that people perceived AI systems as having a substantial amount of mind in both 2021 and 2023, including variation in system description (e.g., “robot,” “large language model”) and mental faculty description (e.g., “experiencing emotions,” “having self-awareness”). This increased over time, and we see it as likely that humans will continue to perceive AI systems as having minds and, more broadly, as “social actors” \[ [122](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0122)\]. New challenges will emerge for XAI as people see systems as more complex and more threatening, and social transparency could manifest not only into the behavior of other humans but also into interaction between AI systems. If technical and social transparency can be achieved, then users themselves can make informed decisions about how best to utilize or not utilize particular systems.

#### 5.1.2 Tuning anthropomorphism.

It will not always—or perhaps not even in most cases—be possible to provide reliable explanations of AI behavior and transparency into system dynamics. Explainability is difficult when interaction is brief, when users lack interest, and when explanations are not readily accessible even to experts—as is the case with most deep learning systems. In human-AI interaction, there is never a value-neutral design approach because the user can never be fully informed. Every design approach will be a choice to support particular mental models of system affordances and consequences, each with some level of anthropomorphism. In situations where XAI is infeasible, our results suggest that designers should try to avoid a narrative that locks interaction into particular philosophical commitments or technological forecast, such as that all AI systems today should be viewed as agents, rather than tools, or that no AI will ever obtain sentience or other mental faculties.

Designers should avoid a strong push against or in favor of anthropomorphism. It has been common for researchers in AI—those outside of HCI, social sciences, and the humanities—to frame anthropomorphism solely in terms of its risks or as a risk itself \[e.g., [1](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0001), [28](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0028), [27](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0027), [109](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0109)\]. However, our nationally representative survey data shows that people willingly attribute many human-like characteristics to AI, even with detailed questions. There are many benefits of anthropomorphism in human-AI interaction, and while some user beliefs may be misguided, participatory design efforts should try to avoid overturning user beliefs. Moreover, our data suggests that the tendency to anthropomorphize may be too prevalent and entrenched to curtail—particularly with advanced AI systems that objectively have many human-like characteristics (e.g., human or even superhuman task performance, even if the processes leading to that performance are unlike those in human minds). In these cases, it is probably better to steer anthropomorphism towards beneficial mental models rather than attempt to prevent it entirely. The paucity of empirical data, the variation in our survey results, and the importance of attributing social, mental, and moral characteristics in HCI suggest that designers should generally proceed with caution due to risks of both over- and underattribution of these human-like characteristics to AI.

Based on the AIMS findings, we present four categories of design risks based on two issues surfaced in our results (over- and underattribution) that manifest for the two components of mind and morality established in social psychology \[ [59](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0059), [60](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0060)\]: (i) agency, including both mental and moral agency, and (ii) experience, including both mental experience and moral standing—two closely related concepts that we abbreviate as “experience” for clarity.

(1)

**Overattribution of agency.** Designers should minimize the risks of users expecting AIs to be more capable of taking action than they are. Users may have negative interactions in which the AI fails to take the expected action, including wasting resources on the attempt, false alarms about AI risks from highly agentic AI \[ [25](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0025)\], and the dangers of trusting or delegating complex tasks to a system without the autonomous decision-making ability to do so effectively.

(2)

**Underattribution of agency.** Researchers today are divided on the extent to which current systems are agentic, but underattribution could become more of a risk as technological capabilities advance and more AI experts believe AIs actually have these faculties. People could underutilize useful systems, such as by not adopting the mental models provided by human-likeness or failing to take the precautions necessary to restrict the actions of an unpredictable moral agent.

(3)

**Overattribution of experience.** Designers should particularly watch out for design patterns that lead to users forming emotional and cognitive attachments to systems that do not merit such consideration \[ [54](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0054)\]. In particular, with Replika, Digi, and other contemporary products that purport to provide chatbot companionship, vulnerable user populations such as children may have unrealistic expectations from interaction that lead them to neglect real-world socialization. This could put users’ mental health under the control of corporations that can easily raise subscription prices or otherwise cut off access.

(4)

**Underattribution of experience.** As more AI experts believe AIs actually have these faculties, designers should consider risks of underattribution of experience, such as antagonism or conflict between advanced AI systems and their human counterparts. There are already numerous examples of people harming robots for their amusement in ways that seem socially detrimental \[ [19](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0019), [180](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0180)\], and this approach would echo calls by moral philosophers to ensure that AI systems are built to evoke reactions that match the AI’s true moral status \[ [150](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0150), [151](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0151)\].

In terms of exactly how to implement this tuning, our findings of different perceptions across AI systems (e.g., Target-Specific Moral Concern) suggest specific physical and behavioral cues that designers can incorporate, such as zoomorphism (animal-likeness, e.g., a robot dog) and embodiment (e.g., having a physical body rather than a virtual avatar). This contributes to numerous studies that have identified anthropomorphic cues for AI systems, such as name \[ [104](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0104), [153](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0153)\], voice \[ [31](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0031), [120](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0120), [178](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0178)\], first-person language \[ [31](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0031), [93](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0093), [153](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0153)\], and prosocial behaviors \[ [46](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0046), [97](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0097)\] as well the broader literature beyond AI, dating back to at least the famous 1944 Heider and Simmel \[ [67](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0067)\] experiments in which movement around a screen leads people to anthropomorphize simple geometric shapes.

Finally, designers should consider that the cautionary approach we espouse poses its own risk as AI systems advance. Because AI technologies emerge and change so rapidly, designers may need to quickly adapt by focusing on particular attribution risks. For example, there may be a sudden paradigm shift in agentic capabilities based on ongoing research efforts towards AI assistants that work autonomously. Users could then face immediate and extreme risks of underattribution, such that designers may have to respond quickly and decisively.

#### 5.1.3 System-specific anthropomorphism.

While designers have the capacity to tune anthropomorphic tendencies up or down, the level of tuning does not need to be the same for every system. As mentioned, our survey data reveals wide variation in how people perceive different AI systems. For example, LLMs were rated as having less mind than “robots/AIs” in general; “human-like” and “animal-like” AIs were rated as having more moral status than “machine-like” AIs and virtual avatars; and AIs described as “sentient” were granted more moral status and seen as more threatening than those without this description.

Keeping in mind that AI researchers have often focused on the potential harms of anthropomorphism without as much attention paid to the potential benefits, one domain with salient benefits has been mental health chatbots. Despite clear risks such as overattachment, mental health chatbots have been praised for accessibility to underrepresented groups \[ [63](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0063), [181](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0181)\] and to those who are unable or unwilling to engage with human care providers \[ [29](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0029), [64](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0064), [181](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0181)\]. Prior work has shown benefits of anthropomorphism for trust \[ [34](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0034)\], psychological distance \[ [104](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0104)\], and a variety of positive outcomes specifically for mental health chatbots, such as subsequent self-disclosure to human care providers \[ [103](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0103)\], compliance with health recommendations \[ [129](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0129)\], and mitigation of loneliness and suicidal ideation \[ [112](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0112), [113](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0113)\].

There are possible risks and benefits of anthropomorphism for every AI system, but an example of a system where designers may be better off tuning anthropomorphism down instead of up is autonomous vehicles. While trust is still important in this context, there are substantial risks of attributing moral agency to autonomous vehicles. Elish \[ [42](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0042)\] develop the idea of “moral crumple zones,” in which a human working with an autonomous technological system is the scapegoat for harm and deflects blame from the system. Our findings of agency perception and attribution extend this theory by suggesting that the autonomous system itself may be a moral crumple zone for a “Big Tech” corporation that has inadequate safety guardrails. Designers of autonomous vehicles may need to preempt such risks by mitigating anthropomorphism and ensuring that the vehicle is accurately perceived as incapable of moral responsibility. For example, Waytz et al. \[ [178](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0178)\] showed that giving a vehicle a name, gender, and human-like voice made them believe it was more competent and morally responsible, which can become an important design risk when companies deflect blame from themselves to the technology itself.

Finally, because we find increasing anthropomorphism from 2021 to 2023, system-specific tuning of anthropomorphism may need to quickly adapt as new systems are released. For example, Heyselaar \[ [69](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0069)\] recently found evidence that people no longer treat desktop computers as social actors, failing to replicate results from the well-known CASA studies of the 1990s \[ [136](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0136)\]. As advanced chatbots and other AI systems are released, it is not only designers of these systems that must consider the extent of anthropomorphism but also the designers of conventional systems to which public attitudes and beliefs may change in response.

### 5.2 Implications for policymakers

The AIMS findings have two primary implications for policymakers. First, we found significant public concern about the pace of technological development, which casts doubt on efforts to accelerate AI development, such as some U.S. executive orders, and supports safety-focused policy efforts, such as the E.U. AI Act. Second, analogous to the need for XAI design, our findings of participants’ substantial uncertainty and variation in attitudes and beliefs about advanced AI technologies suggest a need for more engagement between researchers and policymakers to facilitate evidence-based policymaking. It also suggests a need for public education and engagement to ensure democratic participation. These implications are similar to those for designers, but policymakers have unique opportunities and challenges, such as the ability to legally enforce changes but also typically the inability to quickly adapt those changes to individual systems (e.g., a new chatbot-based mobile app).

#### 5.2.1 Public fear and concern.

One of the only areas of significant agreement among survey respondents was widespread concern with the speed and consequences of AI developments, such as the creation of sentient AI. As discussed in Section [4.3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#sec-4-3), very few participants thought that the pace of AI development needed to be sped up, and substantial majorities supported campaigns and regulations to slow down AI development, even when accounting for acquiescence bias. This is particularly notable given the general aversion to government regulation in U.S. public opinion \[ [167](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0167)\]. Indeed, since our data was collected, a number of additional surveys with U.S. voters have shown similar concerns \[e.g., [79](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0079), [132](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0132), [186](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0186)\]. For example, when prompted with an argument that speeding up AI could make us “healthier and happier” but also a counterargument that the pace “poses safety risks and could upend the economy,” 82% said, “We should go slowly and deliberately,” 8% said, “We should speed up development,” and 10% were “Not sure” \[ [186](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0186)\]. When prompted with the statement, “Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war,” 70% agreed, 11% disagreed, and 19% were “not sure” \[ [186](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0186)\].

Our findings strengthen the impetus for guardrails around AI technology and shifting the policy focus from accelerating technology to caution and safety. Well before ChatGPT, national governments took notice of progress in AI technology, but most government action was and continues to be focused on accelerating technological development. The first congressional hearing on AI was in 2016, titled “The Dawn of Artificial Intelligence.” Senator Ted Cruz claimed AI was at an “inflection point” and called for greatly increased investment. Accelerationist statements and policymaking have remained predominant, such as U.S. President Donald Trump’s 2019 and 2020 executive orders calling for more expansive use of AI \[ [137](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0137), [138](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0138)\] and a 2024 memorandum from the administration of U.S. President Joe Biden that called for accelerating AI applications because of their importance to national security \[ [74](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0074)\].

However, there have been increasing efforts to focus on caution and potentially to decelerate technological developments, such as the October 2022 release of the Blueprint for an AI Bill of Rights from the White House Office of Science and Technology Policy \[ [127](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0127)\] and the lauded 2023 executive order that even included technical details, such as additional security measures for models trained in a data center capable of over 1020 FLOPs per second \[ [139](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0139)\], though this executive order nonetheless called for acceleration, as reflected in the aforementioned 2024 memorandum. Safety-focused policy efforts have attempted to keep pace, particularly the widely discussed 2024 E.U. AI Act \[ [32](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0032)\], which was proposed in 2021 but became a lightning rod for AI concerns following the explosion in public awareness. Many efforts, such as Senate Bill 1047 in the 2024 California legislature, have attracted national attention but failed to pass into law \[ [123](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0123)\]. Our findings show additional challenges for safety-focused policy due to the complexity of AI and uncertainty among the U.S. public.

#### 5.2.2 AI literacy and public engagement.

Politicians and legislators are not known for technical aptitude, epitomized in the U.S. Senator Ted Stevens’ 2006 description of the Internet as “a series of tubes” while criticizing net neutrality \[ [156](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0156)\]. While our study was not conducted with politicians or policymakers, our findings evidence the particularly worrying nature of AI as vaguely defined, technically complex, and often unexplainable.

Limited technological literacy is a significant factor in the pernicious and protracted delays between new technologies and technology regulation \[ [44](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0044)\]. Even the term “artificial intelligence” lacks an agreed-upon definition among scholars \[ [84](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0084)\], so it is often unclear what is even in the scope of AI policy. However, since our first wave of data was collected in 2021, there have been substantial efforts to address this challenge in AI by connecting researchers and policymakers. For example, the Stanford Institute for Human-Centered AI has since 2022 hosted an annual “Congressional Boot Camp on AI” to educate Congressional staff, such as aides and policy analysts \[ [171](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0171)\]. Several national governments, such as the U.S., Japan, and Kenya—as well as the E.U.—have created “AI safety institutes” that connect researchers and policymakers, often via “red team” testing of state-of-the-art AI systems before release \[ [32](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0032), [190](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0190)\].

Policymakers should also engage the public, including with educational efforts and democratic participation in weighing the potential harms and benefits of AI technology. AI companies have professed this approach, such as OpenAI’s “democratic AI” \[ [133](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0133)\] and Anthropic’s “collective constitutional AI” \[ [77](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0077)\], but as the putative representation of public interest, elected officials must ensure follow-through. This could have important consequences because of the significant entailments of power and inequality with digital technologies \[ [13](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0013), [17](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0017), [33](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0033)\]. Varying reactions to and interactions with advanced AI systems could reshape these dynamics. Just as our results motivate XAI as the first tool in the designer’s toolbelt, public engagement and education should be the default approach of policymakers in light of AI complexities and public uncertainty. Policymakers should also consider the risks of over- and underattribution described in the previous section, but those issues are currently most relevant at the scale of individual systems rather than at the scale of policy.

A particular concern faced by policymakers—as well as AI designers and researchers—is that people who lack AI literacy tend to be first to raise alarms. If experts and public leaders do not work quickly to become literate and engaged, then the norms of discourse may already be set by the time they exert influence. Indeed, we have already seen signs of this with digital sentience. Popular science fiction has created its own set of challenges (e.g., fixation on _The Terminator_), and early alarm-raisers such as former Google engineer Blake Lemoine \[ [170](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0170)\] could make delays more harmful when they preemptively claim that AIs have faculties such as sentience or general intelligence. This could make it difficult for policymakers to echo these concerns once technological advancement makes them accurate.

### 5.3 Open Research Questions

Researchers have an important role to play in each of the aforementioned mechanisms by which designers and policymakers can address public concern, such as developing evidence-based techniques for XAI and for increasing AI literacy. Here, we foreground three open research questions motivated by AIMS about causal relationships, HCI theory, and global public opinion.

#### 5.3.1 What are the drivers and consequences of differences in opinion?

The AIMS results show wide variation in public opinion across participant characteristics, as shown in Figure [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#fig3) and detailed in the supplementary materials, as well as substantial variation across questions, as shown in Table [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab3). For example, in data from the main 2023 survey, 25.6% of participants aged 18–35 said “yes” when asked, “Do you think any robots/AIs that currently exist (i.e., those that exist in 2023) are sentient?” (36.1% said “not sure,” and 38.3% said “no”), but only 10.7% of participants aged 55 or older said “yes” (41.4% said “not sure,” and 48.0% said “no”)—a substantial generational gap in beliefs about sentient AI with a “yes” rate of less than half in the older group.

We were able to test for statistical associations between attitudes and participant demographics. We found that measures of participant experience with AI, such as owning AI devices and reading or watching AI content, were the strongest predictors. While we leave the details of this primarily to the supplementary materials (A1.3)—and we only conducted exploratory analysis due to a lack of preexisting hypotheses—future research should explore the causal mechanisms that drive these associations. For example, why is frequently reading or watching AI content associated with increased mind perception and concern for AI welfare? These could be because they are both increased by a lurking variable, such as an exposure effect \[ [189](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0189)\] or underlying personality trait, such as openness to experience.

In terms of variation across AIMS questions, even for the least appealing of the protections for sentient AI that we presented, “legal rights,” 37.7% of those who expressed an opinion supported the proposal. Even for the most appealing, protection from sadists (i.e., “protected from people who derive pleasure from inflicting physical or mental pain on them”), 22.8% of those who expressed an opinion opposed the proposal. To compound this, as shown in Table [3](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab3), the differences in agreement with statements that specified “sentient” AIs versus the same wording but without that specification ranged from only a 2.8% difference to a 18.9% difference. Future research can determine the causes of these differences and test other variations, particularly as human language evolves over time.

Future research on digital minds should also test the general mechanisms by which underlying factors shape reactions to advanced AI systems in increasingly social ways, such as whether it is more a matter of social scripts, anthropomorphism, or mind perception. Researchers could present participants with information that strengthens some of these mechanisms more than others. For example, a vignette or real-life scenario could test the effects of social scripts by providing participants with exemplars of nonhuman interactions in which social scripts are useful, such as situations in law and international relations in which another type of nonhuman entity—groups of humans that make decisions and take action together—interact in social-like routines of introduction, reciprocation, and conflict resolution \[ [141](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0141)\]. Exemplars could be drawn from HCI itself, such as the success of social scripts in creating positive user experiences \[ [100](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0100), [162](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0162), [166](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0166)\] as well as the exemplar-based intervention for eliciting support for AI rights from Lima et al. \[ [107](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0107)\].

#### 5.3.2 How can HCI theory be enriched and applied to advanced AI?

For decades, researchers in psychology, HCI, and HRI have studied the perceptions that “computers are social actors” (CASA) \[e.g., [73](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0073), [122](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0122)\], that computers have minds and a variety of particular mental faculties \[e.g., [58](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0058), [152](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0152)\], that computers are moral subjects \[e.g., [82](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0082), [130](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0130)\], and that computers are moral agents \[e.g., [47](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0047), [90](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0090)\]. While there are many new and emerging features of modern AI systems, there is much conceptual and empirical scaffolding on which to build new conceptualizations to make sense of the rise of digital minds and help humanity navigate coexistence.

Amplification of current reactions to computers and AI may occur if those reactions tend to be caused by perceived mental faculties. This would not be the case if, for example, social scripts are being applied but only in a “mindless” \[ [121](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0121)\] manner and not because of perceived mental faculties. Nass and Moon \[ [121](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0121)\] argued that, in their HCI experiments, participants were “wholly aware” that there was no human producing the computer output. However, our results challenge the applicability of these findings in cases of actual and hypothetical AI because many of our participants readily attributed mental faculties to AIs. Further, we found that moral concern was significantly higher when questions were worded in terms of “sentient” AI versus all AI, which suggests this is a substantial driver of attitudes. Many participants, though still a small minority, viewed current AIs as sentient, and a large majority thought AIs could become sentient or were not sure whether that was possible. Taken together, this evidence suggests that we must consider the role of mind perception in social response and that ongoing reactions to AI may be amplified by perceptions of digital minds.

Some established tendencies of interaction may be mitigated by perceived AI developments. For example, given past work that has shown assessments of AIs as moral agents, we may expect AI to have reduced attributions of experience and moral patiency in some contexts: Gray et al. \[ [60](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0060)\] argue from the typecasting literature that, “Those who are moral agents are seen to be incapable of being a moral patient; those who are moral patients are seen to be incapable of being an agent,” based on findings such as that moral agents—whether good or bad—are perceived to feel less pain from injuries. There is recent experimental evidence that the features of an AI that most increase moral concern are prosocial features such as cooperation \[ [96](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0096)\]. Prosocial features may have such a large effect because AIs are perceived as threatening, and if a person is to overcome that typecast, they need direct evidence of prosociality that implies the AI is not a threatening moral agent. Taken together with our results, this suggests that increases in some perceptions of mind and moral concerns may lead to the mitigation of others.

However, it is not clear at this time which existing disparities would be exacerbated or mitigated. For a simplified example, consider that younger adults tend to have more digital literacy than older adults \[ [126](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0126)\]. We found that older age was associated with less mind perception. If mind perception is useful for productive interaction with AI, then the rise of advanced AI could widen the gap in digital literacy, but if mind perception instead leads one to be confused, mistaken, or overreliant \[ [20](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0020)\], this could narrow the gap.

What would it mean to design and develop AI systems in a way that accounts for social responses to digital minds? We were unable to directly build or showcase particular AI systems to study perception and interaction in a more realistic setting, which could be a promising approach for future research that zooms into a narrower set of research questions. McDuff and Czerwinski \[ [114](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0114)\] argue for the design and deployment of “emotionally sentient agents,” which they argue would better understand and adapt to the emotions of humans, a task that requires contextualization and tacit knowledge.

Researchers should ensure they do not conflate the many different types of anthropomorphic cues because there is so much variation in the risks and benefits. Some cues, such as the use of first-person pronouns by LLMs, are already ubiquitous and appear to support clear and efficient human-AI communication. Others, such as the hallucination of life experiences, facilitate inaccurate attributions of human-like characteristics that lead to overreliance, overattachment, and other harmful interaction outcomes. Researchers should conduct sociotechnical studies to more clearly differentiate types of anthropomorphic cues, and researchers should explore the effects of different cues for the different roles of AI in society, taxonomized by Kim et al. \[ [89](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0089)\] as servants, tools, assistants, and mediators.

#### 5.3.3 What do people outside the U.S. think of sentient AI?

Opinions towards sentient AI and other digital minds may be shaped by sociocultural, economic, and technological factors that vary across regions. Global data collection would benefit from best practices for surveys in multinational, multiregional, and multicultural contexts (3MC), such as standardizing meaning across languages, utilizing multi-item scales, accommodating differences in social structure and culture, documenting the process, closely monitoring data quality from survey partners, calibrating for differences in scale responses, and utilizing iterative pilot studies when possible \[ [81](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0081)\].

For example, prior work suggests that AI has a different cultural context in Japan compared to the U.S. This has been attributed in part to spiritual distinctions between Judeo-Christian religions and Shinto and Buddhist religions \[ [53](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0053), [78](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0078)\]. Comparing the U.S. to Japan, Castelo and Sarvary \[ [23](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0023)\] found that increasing physical and mental human-likeness of a robot led Americans to feel uncomfortable with no such effect on Japanese participants. Distinctions have also been identified in domains other than public opinion, such as English-associated images more frequently depicting humans and robots facing each other rather than a human and robot together looking at something else, as is more common in Japanese-associated images and reflects the _ukiyo-e_ style of painting \[ [145](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0145)\]. Cultural variation can also help us imagine different forms of human-AI interaction, such as the design fictions for AI-object associations inspired by Shinto animism explored by Seymour and Van Kleek \[ [154](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0154)\].

There are also a number of open questions for perceptions of digital minds in the Global South. Scholars of global development have theorized the different temporal dynamics of technology introduction in developing economies, such as the “leapfrogging” by which technologies can be popularized at a much faster pace given existing infrastructure in other regions \[ [157](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0157)\]. However, technological adoption is embroiled in the broad challenges faced by developing economies and the Global South, such as the “digital divide” within each region, in which the most marginalized groups are still often left behind \[ [4](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0004)\]. Likewise, the development of AI technology in Western regions often involves labor in the Global South, such as labeling content to train AI systems \[ [117](https://dl.acm.org/doi/full/10.1145/3706598.3713329#Bib0117)\], which may also shape varying perceptions in ways that could be explored in future research.

## 6 Limitations

The AIMS survey data constitutes a broad range of U.S. public opinion. This provides a foundation of data for designers, policymakers, and researchers, but it has a number of methodological and logistic limitations common to survey research. We can say little about causality and user behavior, and we hesitate to extrapolate our results to any non-U.S. region. We asked a variety of questions, including some variations and reversed questions (e.g., “I \[support/oppose\] government regulation that slows down AI development”), but due to concerns about survey length, we did not systematically vary and combine question framings for comparison. Finally, because we aimed to support the study of human-AI interaction beliefs and attitudes over time during a technological transition, questions in the main survey, though not the supplement, were explicitly designed to maximize the likelihood that they will make sense to laypeople for years or decades to come. Therefore, they had to remain fairly abstract in most cases, such as by avoiding the names of specific AI systems or companies and not mentioning specific examples of AI that are common today; future work could take a different approach and contrast their findings with our more generalized results.

## 7 Conclusion

The evolving discourse on sentient AI and digital minds has only scratched the surface of the complex dynamics and effects of perceiving and coexisting with increasingly human-like AI systems. The rise of digital minds is poised to reshape both current human-technology dynamics as well as the long-term trajectory of technological development and existential threats. The initial AIMS survey results from 2021 and 2023 evidence important factors in the future of human-AI interaction: mind perception, moral concern, policy support, and forecasting. We found that people tend to think AI can be sentient, have moral concern for and feel threatened by sentient AI, favor slowing down and banning many AI developments, and think sentient AI already exists or will soon.

These findings have important implications for designers, who should consider prioritizing explainability and tuning anthropomorphism up or down for different AI systems. Policymakers should account for widespread public concern about advanced AI and consider their own technological literacy and public engagement. There are also a wide range of open research questions regarding the rise of digital minds, such as assessing factors that shape new forms of human-AI interaction, updating classical HCI theories to account for human-like AI systems, and considering global perspectives as humanity contemplates possible technological futures. We emphasize that, alongside technical machine learning research, HCI research will play a vital role in steering humanity towards utopia and away from dystopia. The future of the human species will depend on not just the technical developments of AI but on how we choose to interact with them.

## Acknowledgments

We thank David Moss, Alexander Saeri, and Daniel Shank for feedback on the 2021 AIMS survey questions.

## Footnote

1

Up-to-date results for the AI, Morality, and Sentience (AIMS) survey are available at [https://sentienceinstitute.org/aims-survey](https://sentienceinstitute.org/aims-survey).

## Supplemental Material

VTT File - pn4790-talk-video-caption.vtt

presentation

[Download \| VTT (16.32 KB)](https://dl.acm.org/doi/suppl/10.1145/3706598.3713329/suppl_file/pn4790-talk-video-caption.vtt)

PDF File - 3706598.3713329.pdf

Additional results

[Download \| PDF (412.17 KB)](https://dl.acm.org/doi/suppl/10.1145/3706598.3713329/suppl_file/pn4790.pdf)

ZIP File - 3706598.3713329.zip

Supplemental materials

[Download \| ZIP (5.17 MB)](https://dl.acm.org/doi/suppl/10.1145/3706598.3713329/suppl_file/pn4790.zip)

MP4 File - pn4790-talk-video.mp4

presentation

- [Download \| MP4 (252.10 MB)](https://dl.acm.org/doi/suppl/10.1145/3706598.3713329/suppl_file/pn4790-talk-video.mp4)

## References

\[1\]

Gavin Abercrombie, Amanda Cercas Curry, Tanvi Dinkar, Verena Rieser, and Zeerak Talat. 2023. Mirages. On Anthropomorphism in Dialogue Systems. In _Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing_, Houda Bouamor, Juan Pino, and Kalika Bali (Eds.). Association for Computational Linguistics, Singapore, 4776–4790.

[Crossref](https://doi.org/10.18653/v1/2023.emnlp-main.290)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Mirages.+On+Anthropomorphism+in+Dialogue+Systems&author=Gavin+Abercrombie&author=Amanda+Cercas%C2%A0Curry&author=Tanvi+Dinkar&author=Verena+Rieser&author=Zeerak+Talat&publication_year=2023&pages=4776-4790&doi=10.18653%2Fv1%2F2023.emnlp-main.290)

\[2\]

Blaise Agüera y Arcas. 2022. Artificial Neural Networks Are Making Strides towards Consciousness. _[https://www.economist.com/by-invitation/2022/09/02/artificial-neural-networks-are-making-strides-towards-consciousness-according-to-blaise-aguera-y-arcas](https://www.economist.com/by-invitation/2022/09/02/artificial-neural-networks-are-making-strides-towards-consciousness-according-to-blaise-aguera-y-arcas)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Artificial+Neural+Networks+Are+Making+Strides+towards+Consciousness&author=Blaise+Ag%C3%BCera+y+Arcas&publication_year=2022)

\[3\]

Douglas G Altman and Patrick Royston. 2006. The Cost of Dichotomising Continuous Variables. _BMJ_ 332, 7549 (May 2006), 1080.1.

[Crossref](https://doi.org/10.1136/bmj.332.7549.1080)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Cost+of+Dichotomising+Continuous+Variables&author=Douglas%C2%A0G+Altman&author=Patrick+Royston&publication_year=2006&pages=1080.1&doi=10.1136%2Fbmj.332.7549.1080)

\[4\]

Gado Alzouma. 2005. Myths of Digital Technology in Africa: Leapfrogging Development? _Global Media and Communication_ 1, 3 (December 2005), 339–356.

[Crossref](https://doi.org/10.1177/1742766505058128)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Myths+of+Digital+Technology+in+Africa%3A+Leapfrogging+Development%3F&author=Gado+Alzouma&publication_year=2005&pages=339-356&doi=10.1177%2F1742766505058128)

\[5\]

Tawfiq Ammari, Jofish Kaye, Janice Y. Tsai, and Frank Bentley. 2019. Music, Search, and IoT: How People (Really) Use Voice Assistants. _ACM Transactions on Computer-Human Interaction_ 26, 3 (June 2019), 1–28.

[Digital Library](https://dl.acm.org/doi/10.1145/3311956)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Music%2C+Search%2C+and+IoT%3A+How+People+%28Really%29+Use+Voice+Assistants&author=Tawfiq+Ammari&author=Jofish+Kaye&author=Janice%C2%A0Y.+Tsai&author=Frank+Bentley&publication_year=2019&pages=1-28&doi=10.1145%2F3311956)

\[6\]

Jacy Reese Anthis. 2022. Consciousness Semanticism: A Precise Eliminativist Theory of Consciousness. In _Biologically Inspired Cognitive Architectures 2021_, Valentin V. Klimov and David J. Kelley (Eds.). Vol. 1032. Springer International Publishing, Cham, 20–41. Series Title: Studies in Computational Intelligence.

[Crossref](https://doi.org/10.1007/978-3-030-96993-63)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Consciousness+Semanticism%3A+A+Precise+Eliminativist+Theory+of+Consciousness&author=Jacy%C2%A0Reese+Anthis&publication_year=2022&pages=20-41&doi=10.1007%2F978-3-030-96993-63)

\[7\]

Jacy Reese Anthis and Eze Paez. 2021. Moral Circle Expansion: A Promising Strategy to Impact the Far Future. _Futures_ 130 (June 2021), 102756.

[Crossref](https://doi.org/10.1016/j.futures.2021.102756)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Moral+Circle+Expansion%3A+A+Promising+Strategy+to+Impact+the+Far+Future&author=Jacy%C2%A0Reese+Anthis&author=Eze+Paez&publication_year=2021&pages=102756&doi=10.1016%2Fj.futures.2021.102756)

\[8\]

Arthur Aron, Elaine N. Aron, and Danny Smollan. 1992. Inclusion of Other in the Self Scale and the Structure of Interpersonal Closeness. _Journal of Personality and Social Psychology_ 63, 4 (October 1992), 596–612.

[Crossref](https://doi.org/10.1037/0022-3514.63.4.596)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Inclusion+of+Other+in+the+Self+Scale+and+the+Structure+of+Interpersonal+Closeness.&author=Arthur+Aron&author=Elaine%C2%A0N.+Aron&author=Danny+Smollan&publication_year=1992&pages=596-612&doi=10.1037%2F0022-3514.63.4.596)

\[9\]

Grace Augustine, Sara Soderstrom, Daniel Milner, and Klaus Weber. 2019. Constructing a Distant Future: Imaginaries in Geoengineering. _Academy of Management Journal_ 62, 6 (December 2019), 1930–1960.

[Crossref](https://doi.org/10.5465/amj.2018.0059)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Constructing+a+Distant+Future%3A+Imaginaries+in+Geoengineering&author=Grace+Augustine&author=Sara+Soderstrom&author=Daniel+Milner&author=Klaus+Weber&publication_year=2019&pages=1930-1960&doi=10.5465%2Famj.2018.0059)

\[10\]

Jaime Banks and Autumn Edwards. 2019. A Common Social Distance Scale for Robots and Humans. In _2019 28th IEEE International Conference on Robot and Human Interactive Communication (RO-MAN)_. IEEE, New Delhi, India, 1–6.

[Digital Library](https://dl.acm.org/doi/10.1109/RO-MAN46459.2019.8956316)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+Common+Social+Distance+Scale+for+Robots+and+Humans&author=Jaime+Banks&author=Autumn+Edwards&publication_year=2019&pages=1-6&doi=10.1109%2FRO-MAN46459.2019.8956316)

\[11\]

Pablo Barberá, Andreu Casas, Jonathan Nagler, Patrick J. Egan, Richard Bonneau, John T. Jost, and Joshua A. Tucker. 2019. Who Leads? Who Follows? Measuring Issue Attention and Agenda Setting by Legislators and the Mass Public Using Social Media Data. _American Political Science Review_ 113, 4 (November 2019), 883–901.

[Crossref](https://doi.org/10.1017/S0003055419000352)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Who+Leads%3F+Who+Follows%3F+Measuring+Issue+Attention+and+Agenda+Setting+by+Legislators+and+the+Mass+Public+Using+Social+Media+Data&author=Pablo+Barber%C3%A1&author=Andreu+Casas&author=Jonathan+Nagler&author=Patrick%C2%A0J.+Egan&author=Richard+Bonneau&author=John%C2%A0T.+Jost&author=Joshua%C2%A0A.+Tucker&publication_year=2019&pages=883-901&doi=10.1017%2FS0003055419000352)

\[12\]

Emily M. Bender and Alexander Koller. 2020. Climbing towards NLU: On Meaning, Form, and Understanding in the Age of Data. In _Proceedings of the 58th Annual Meeting of the Association for Computational Linguistics_. Association for Computational Linguistics, Online, 5185–5198.

[Crossref](https://doi.org/10.18653/v1/2020.acl-main.463)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Climbing+towards+NLU%3A+On+Meaning%2C+Form%2C+and+Understanding+in+the+Age+of+Data&author=Emily%C2%A0M.+Bender&author=Alexander+Koller&publication_year=2020&pages=5185-5198&doi=10.18653%2Fv1%2F2020.acl-main.463)

\[13\]

Ruha Benjamin. 2019. _Race After Technology: Abolitionist Tools for the New Jim Code_. Polity, Medford, MA.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Race+After+Technology%3A+Abolitionist+Tools+for+the+New+Jim+Code&author=Ruha+Benjamin&publication_year=2019)

\[14\]

Michael Ian Borer. 2010. From Collective Memory to Collective Imagination: Time, Place, and Urban Redevelopment. _Symbolic Interaction_ 33, 1 (January 2010), 96–114.

[Crossref](https://doi.org/10.1525/si.2010.33.1.96)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=From+Collective+Memory+to+Collective+Imagination%3A+Time%2C+Place%2C+and+Urban+Redevelopment&author=Michael%C2%A0Ian+Borer&publication_year=2010&pages=96-114&doi=10.1525%2Fsi.2010.33.1.96)

\[15\]

Nick Bostrom. 2014. _Superintelligence: Paths, Dangers, Strategies (first edition ed.)_. Oxford University Press, Oxford.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Superintelligence%3A+Paths%2C+Dangers%2C+Strategies+%28first+edition+ed.%29&author=Nick+Bostrom&publication_year=2014)

\[16\]

Emma Boulstridge and Marylyn Carrigan. 2000. Do Consumers Really Care about Corporate Responsibility? Highlighting the Attitude—Behaviour Gap. _Journal of Communication Management_ 4, 4 (January 2000), 355–368.

[Crossref](https://doi.org/10.1108/eb023532)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Do+Consumers+Really+Care+about+Corporate+Responsibility%3F+Highlighting+the+Attitude%E2%80%94Behaviour+Gap&author=Emma+Boulstridge&author=Marylyn+Carrigan&publication_year=2000&pages=355-368&doi=10.1108%2Feb023532)

\[17\]

Sarah Brayne. 2021. _Predict and Surveil: Data, Discretion, and the Future of Policing_. Oxford University Press, New York, NY.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Predict+and+Surveil%3A+Data%2C+Discretion%2C+and+the+Future+of+Policing&author=Sarah+Brayne&publication_year=2021)

\[18\]

Casey Breen, Cormac Herley, and Elissa M. Redmiles. 2022. A Large-Scale Measurement of Cybercrime Against Individuals. In _CHI Conference on Human Factors in Computing Systems_. ACM, New Orleans LA USA, 1–41.

[Digital Library](https://dl.acm.org/doi/10.1145/3491102.3517613)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+Large-Scale+Measurement+of+Cybercrime+Against+Individuals&author=Casey+Breen&author=Cormac+Herley&author=Elissa%C2%A0M.+Redmiles&publication_year=2022&pages=1-41&doi=10.1145%2F3491102.3517613)

\[19\]

Dražen Brščić, Hiroyuki Kidokoro, Yoshitaka Suehiro, and Takayuki Kanda. 2015. Escaping from Children’s Abuse of Social Robots. In _Proceedings of the Tenth Annual ACM/IEEE International Conference on Human-Robot Interaction_. ACM, Portland Oregon USA, 59–66.

[Digital Library](https://dl.acm.org/doi/10.1145/2696454.2696468)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Escaping+from+Children%E2%80%99s+Abuse+of+Social+Robots&author=Dra%C5%BEen+Br%C5%A1%C4%8Di%C4%87&author=Hiroyuki+Kidokoro&author=Yoshitaka+Suehiro&author=Takayuki+Kanda&publication_year=2015&pages=59-66&doi=10.1145%2F2696454.2696468)

\[20\]

Zana Buçinca, Maja Barbara Malaya, and Krzysztof Z. Gajos. 2021. To Trust or to Think: Cognitive Forcing Functions Can Reduce Overreliance on AI in AI-assisted Decision-making. _Proceedings of the ACM on Human-Computer Interaction_ 5, CSCW1 (April 2021), 1–21.

[Digital Library](https://dl.acm.org/doi/10.1145/3449287)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=To+Trust+or+to+Think%3A+Cognitive+Forcing+Functions+Can+Reduce+Overreliance+on+AI+in+AI-assisted+Decision-making&author=Zana+Bu%C3%A7inca&author=Maja%C2%A0Barbara+Malaya&author=Krzysztof%C2%A0Z.+Gajos&publication_year=2021&pages=1-21&doi=10.1145%2F3449287)

\[21\]

Paul Burstein. 2003. The Impact of Public Opinion on Public Policy: A Review and an Agenda. _Political Research Quarterly_ 56, 1 (March 2003), 29–40.

[Crossref](https://doi.org/10.1177/106591290305600103)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Impact+of+Public+Opinion+on+Public+Policy%3A+A+Review+and+an+Agenda&author=Paul+Burstein&publication_year=2003&pages=29-40&doi=10.1177%2F106591290305600103)

\[22\]

Ángel Alexander Cabrera, Adam Perer, and Jason I. Hong. 2023. Improving Human-AI Collaboration With Descriptions of AI Behavior. _Proceedings of the ACM on Human-Computer Interaction_ 7, CSCW1 (April 2023), 1–21.

[Digital Library](https://dl.acm.org/doi/10.1145/3579612)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Improving+Human-AI+Collaboration+With+Descriptions+of+AI+Behavior&author=%C3%81ngel%C2%A0Alexander+Cabrera&author=Adam+Perer&author=Jason%C2%A0I.+Hong&publication_year=2023&pages=1-21&doi=10.1145%2F3579612)

\[23\]

Noah Castelo and Miklos Sarvary. 2022. Cross-Cultural Differences in Comfort with Humanlike Robots. _International Journal of Social Robotics_ 14, 8 (October 2022), 1865–1873.

[Crossref](https://doi.org/10.1007/s12369-022-00920-y)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Cross-Cultural+Differences+in+Comfort+with+Humanlike+Robots&author=Noah+Castelo&author=Miklos+Sarvary&publication_year=2022&pages=1865-1873&doi=10.1007%2Fs12369-022-00920-y)

\[24\]

José-Antonio Cervantes, Sonia López, Luis-Felipe Rodríguez, Salvador Cervantes, Francisco Cervantes, and Félix Ramos. 2020. Artificial Moral Agents: A Survey of the Current Status. _Science and Engineering Ethics_ 26, 2 (April 2020), 501–532.

[Crossref](https://doi.org/10.1007/s11948-019-00151-x)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Artificial+Moral+Agents%3A+A+Survey+of+the+Current+Status&author=Jos%C3%A9-Antonio+Cervantes&author=Sonia+L%C3%B3pez&author=Luis-Felipe+Rodr%C3%ADguez&author=Salvador+Cervantes&author=Francisco+Cervantes&author=F%C3%A9lix+Ramos&publication_year=2020&pages=501-532&doi=10.1007%2Fs11948-019-00151-x)

\[25\]

Alan Chan, Maxime Riché, and Jesse Clifton. 2023. Towards the Scalable Evaluation of Cooperativeness in Language Models. arxiv: [https://arXiv.org/abs/2303.13360](https://arxiv.org/abs/2303.13360) \[cs\]

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Towards+the+Scalable+Evaluation+of+Cooperativeness+in+Language+Models&author=Alan+Chan&author=Maxime+Rich%C3%A9&author=Jesse+Clifton&publication_year=2023)

\[26\]

Kirsten Chapman, Melanie Klimes, Braden Wellman, Garrett Smith, Mainack Mondal, Staci Smith, Yunan Chen, Haijing Hao, and Xinru Page. 2022. A Privacy Paradox? Impact of Privacy Concerns on Willingness to Disclose COVID-19 Health Status in the United States. In _Companion Publication of the 2022 Conference on Computer Supported Cooperative Work and Social Computing_. ACM, Virtual Event Taiwan, 159–162.

[Digital Library](https://dl.acm.org/doi/10.1145/3500868.3559471)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+Privacy+Paradox%3F+Impact+of+Privacy+Concerns+on+Willingness+to+Disclose+COVID-19+Health+Status+in+the+United+States&author=Kirsten+Chapman&author=Melanie+Klimes&author=Braden+Wellman&author=Garrett+Smith&author=Mainack+Mondal&author=Staci+Smith&author=Yunan+Chen&author=Haijing+Hao&author=Xinru+Page&publication_year=2022&pages=159-162&doi=10.1145%2F3500868.3559471)

\[27\]

Myra Cheng, Alicia DeVrio, Lisa Egede, Su Lin Blodgett, and Alexandra Olteanu. 2024. "I Am the One and Only, Your Cyber BFF": Understanding the Impact of GenAI Requires Understanding the Impact of Anthropomorphic AI. arxiv: [https://arXiv.org/abs/2410.08526](https://arxiv.org/abs/2410.08526)

[Crossref](https://doi.org/10.48550/arXiv.2410.08526)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=%22I+Am+the+One+and+Only%2C+Your+Cyber+BFF%22%3A+Understanding+the+Impact+of+GenAI+Requires+Understanding+the+Impact+of+Anthropomorphic+AI&author=Myra+Cheng&author=Alicia+DeVrio&author=Lisa+Egede&author=Su%C2%A0Lin+Blodgett&author=Alexandra+Olteanu&publication_year=2024&doi=10.48550%2FarXiv.2410.08526)

\[28\]

Myra Cheng, Kristina Gligoric, Tiziano Piccardi, and Dan Jurafsky. 2024. AnthroScore: A Computational Linguistic Measure of Anthropomorphism. In _Proceedings of the 18th Conference of the European Chapter of the Association for Computational Linguistics (Volume 1: Long Papers)_, Yvette Graham and Matthew Purver (Eds.). Association for Computational Linguistics, St. Julian’s, Malta, 807–825.

[Crossref](https://doi.org/10.18653/v1/2024.eacl-long.49)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=AnthroScore%3A+A+Computational+Linguistic+Measure+of+Anthropomorphism&author=Myra+Cheng&author=Kristina+Gligoric&author=Tiziano+Piccardi&author=Dan+Jurafsky&publication_year=2024&pages=807-825&doi=10.18653%2Fv1%2F2024.eacl-long.49)

\[29\]

Hyojin Chin, Hyeonho Song, Gumhee Baek, Mingi Shin, Chani Jung, Meeyoung Cha, Junghoi Choi, and Chiyoung Cha. 2023. The Potential of Chatbots for Emotional Support and Promoting Mental Well-Being in Different Cultures: Mixed Methods Study. _Journal of Medical Internet Research_ 25 (October 2023), e51712.

[Crossref](https://doi.org/10.2196/51712)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Potential+of+Chatbots+for+Emotional+Support+and+Promoting+Mental+Well-Being+in+Different+Cultures%3A+Mixed+Methods+Study&author=Hyojin+Chin&author=Hyeonho+Song&author=Gumhee+Baek&author=Mingi+Shin&author=Chani+Jung&author=Meeyoung+Cha&author=Junghoi+Choi&author=Chiyoung+Cha&publication_year=2023&pages=e51712&doi=10.2196%2F51712)

\[30\]

Kyong Ah Cho and Yon Hee Seo. 2024. Dual Mediating Effects of Anxiety to Use and Acceptance Attitude of Artificial Intelligence Technology on the Relationship between Nursing Students’ Perception of and Intention to Use Them: A Descriptive Study. _BMC Nursing_ 23, 1 (March 2024), 212.

[Crossref](https://doi.org/10.1186/s12912-024-01887-z)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Dual+Mediating+Effects+of+Anxiety+to+Use+and+Acceptance+Attitude+of+Artificial+Intelligence+Technology+on+the+Relationship+between+Nursing+Students%E2%80%99+Perception+of+and+Intention+to+Use+Them%3A+A+Descriptive+Study&author=Kyong%C2%A0Ah+Cho&author=Yon%C2%A0Hee+Seo&publication_year=2024&pages=212&doi=10.1186%2Fs12912-024-01887-z)

\[31\]

Michelle Cohn, Mahima Pushkarna, Gbolahan O. Olanubi, Joseph M. Moran, Daniel Padgett, Zion Mengesha, and Courtney Heldreth. 2024. Believing Anthropomorphism: Examining the Role of Anthropomorphic Cues on Trust in Large Language Models. In _Extended Abstracts of the CHI Conference on Human Factors in Computing Systems_. ACM, Honolulu HI USA, 1–15.

[Digital Library](https://dl.acm.org/doi/10.1145/3613905.3650818)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Believing+Anthropomorphism%3A+Examining+the+Role+of+Anthropomorphic+Cues+on+Trust+in+Large+Language+Models&author=Michelle+Cohn&author=Mahima+Pushkarna&author=Gbolahan%C2%A0O.+Olanubi&author=Joseph%C2%A0M.+Moran&author=Daniel+Padgett&author=Zion+Mengesha&author=Courtney+Heldreth&publication_year=2024&pages=1-15&doi=10.1145%2F3613905.3650818)

\[32\]

European Commission. 2024. First Meeting of the International Network of AI Safety Institutes \| Shaping Europe’s Digital Future. _[https://digital-strategy.ec.europa.eu/en/news/first-meeting-international-network-ai-safety-institutes](https://digital-strategy.ec.europa.eu/en/news/first-meeting-international-network-ai-safety-institutes)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=First+Meeting+of+the+International+Network+of+AI+Safety+Institutes+%7C+Shaping+Europe%E2%80%99s+Digital+Future&author=European+Commission&publication_year=2024)

\[33\]

Kate Crawford. 2021. _Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence_. Yale University Press, New Haven.

[Crossref](https://doi.org/10.2307/j.ctv1ghv45t)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Atlas+of+AI%3A+Power%2C+Politics%2C+and+the+Planetary+Costs+of+Artificial+Intelligence&author=Kate+Crawford&publication_year=2021&doi=10.2307%2Fj.ctv1ghv45t)

\[34\]

Ewart J. De Visser, Samuel S. Monfort, Ryan McKendrick, Melissa A. B. Smith, Patrick E. McKnight, Frank Krueger, and Raja Parasuraman. 2016. Almost Human: Anthropomorphism Increases Trust Resilience in Cognitive Agents. _Journal of Experimental Psychology: Applied_ 22, 3 (September 2016), 331–349.

[Crossref](https://doi.org/10.1037/xap0000092)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Almost+Human%3A+Anthropomorphism+Increases+Trust+Resilience+in+Cognitive+Agents.&author=Ewart%C2%A0J.+De%C2%A0Visser&author=Samuel%C2%A0S.+Monfort&author=Ryan+McKendrick&author=Melissa+A.%C2%A0B.+Smith&author=Patrick%C2%A0E.+McKnight&author=Frank+Krueger&author=Raja+Parasuraman&publication_year=2016&pages=331-349&doi=10.1037%2Fxap0000092)

\[35\]

Stefano DellaVigna, Devin Pope, and Eva Vivalt. 2019. Predict Science to Improve Science. _Science_ 366, 6464 (October 2019), 428–429.

[Crossref](https://doi.org/10.1126/science.aaz1704)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Predict+Science+to+Improve+Science&author=Stefano+DellaVigna&author=Devin+Pope&author=Eva+Vivalt&publication_year=2019&pages=428-429&doi=10.1126%2Fscience.aaz1704)

\[36\]

W. Edwards Deming and Frederick F. Stephan. 1940. On a Least Squares Adjustment of a Sampled Frequency Table When the Expected Marginal Totals Are Known. _The Annals of Mathematical Statistics_ 11, 4 (1940), 427–444. jstor:2235722

[Google Scholar](https://scholar.google.com/scholar_lookup?title=On+a+Least+Squares+Adjustment+of+a+Sampled+Frequency+Table+When+the+Expected+Marginal+Totals+Are+Known&author=W.%C2%A0Edwards+Deming&author=Frederick%C2%A0F.+Stephan&publication_year=1940&pages=427-444)

\[37\]

Leonard Dung. 2024. The argument for near-term human disempowerment through AI. _AI & SOCIETY_ (April 2024).

[Digital Library](https://dl.acm.org/doi/10.1007/s00146-024-01930-2)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+argument+for+near-term+human+disempowerment+through+AI&author=Leonard+Dung&publication_year=2024&doi=10.1007%2Fs00146-024-01930-2)

\[38\]

Anthony Dunne and Fiona Raby. 2013. _Speculative Everything: Design, Fiction, and Social Dreaming_. The MIT Press, Cambridge, Massachusetts ; London.

[Digital Library](https://dl.acm.org/doi/10.5555/2613526)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Speculative+Everything%3A+Design%2C+Fiction%2C+and+Social+Dreaming&author=Anthony+Dunne&author=Fiona+Raby&publication_year=2013&doi=10.5555%2F2613526)

\[39\]

Upol Ehsan, Q. Vera Liao, Michael Muller, Mark O. Riedl, and Justin D. Weisz. 2021. Expanding Explainability: Towards Social Transparency in AI Systems. In _Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems_. ACM, Yokohama Japan, 1–19.

[Digital Library](https://dl.acm.org/doi/10.1145/3411764.3445188)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Expanding+Explainability%3A+Towards+Social+Transparency+in+AI+Systems&author=Upol+Ehsan&author=Q.%C2%A0Vera+Liao&author=Michael+Muller&author=Mark%C2%A0O.+Riedl&author=Justin%C2%A0D.+Weisz&publication_year=2021&pages=1-19&doi=10.1145%2F3411764.3445188)

\[40\]

Upol Ehsan, Koustuv Saha, Munmun De Choudhury, and Mark O. Riedl. 2023. Charting the Sociotechnical Gap in Explainable AI: A Framework to Address the Gap in XAI. _Proceedings of the ACM on Human-Computer Interaction_ 7, CSCW1 (April 2023), 1–32.

[Digital Library](https://dl.acm.org/doi/10.1145/3579467)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Charting+the+Sociotechnical+Gap+in+Explainable+AI%3A+A+Framework+to+Address+the+Gap+in+XAI&author=Upol+Ehsan&author=Koustuv+Saha&author=Munmun+De%C2%A0Choudhury&author=Mark%C2%A0O.+Riedl&publication_year=2023&pages=1-32&doi=10.1145%2F3579467)

\[41\]

Ben Eisenpress. 2024. Gradual AI Disempowerment. [https://futureoflife.org/existential-risk/gradual-ai-disempowerment/](https://futureoflife.org/existential-risk/gradual-ai-disempowerment/)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Gradual+AI+Disempowerment&author=Ben+Eisenpress&publication_year=2024)

\[42\]

Madeleine Clare Elish. 2019. Moral Crumple Zones: Cautionary Tales in Human-Robot Interaction. _Engaging Science, Technology, and Society_ 5 (March 2019), 40–60.

[Crossref](https://doi.org/10.17351/ests2019.260)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Moral+Crumple+Zones%3A+Cautionary+Tales+in+Human-Robot+Interaction&author=Madeleine%C2%A0Clare+Elish&publication_year=2019&pages=40-60&doi=10.17351%2Fests2019.260)

\[43\]

Nicholas Epley, Adam Waytz, and John T. Cacioppo. 2007. On Seeing Human: A Three-Factor Theory of Anthropomorphism. _Psychological Review_ 114, 4 (2007), 864–886.

[Crossref](https://doi.org/10.1037/0033-295X.114.4.864)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=On+Seeing+Human%3A+A+Three-Factor+Theory+of+Anthropomorphism&author=Nicholas+Epley&author=Adam+Waytz&author=John%C2%A0T.+Cacioppo&publication_year=2007&pages=864-886&doi=10.1037%2F0033-295X.114.4.864)

\[44\]

Mark Fenwick, Wulf A. Kaal, and Erik P. M. Vermeulen. 2016/2017. Regulation Tomorrow: What Happens When Technology Is Faster than the Law. _American University Business Law Review_ 6 (2016/2017), 561.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Regulation+Tomorrow%3A+What+Happens+When+Technology+Is+Faster+than+the+Law&author=Mark+Fenwick&author=Wulf%C2%A0A.+Kaal&author=Erik+P.%C2%A0M.+Vermeulen&publication_year=2016%2F2017&pages=561)

\[45\]

Ines Fernandez, Nicoleta Kyosovska, Jay Luong, and Gabriel Mukobi. 2024. AI Consciousness and Public Perceptions: Four Futures. [http://arxiv.org/abs/2408.04771](http://arxiv.org/abs/2408.04771) arXiv: [https://arXiv.org/abs/2408.04771 \[cs\]](https://arxiv.org/abs/2408.04771[cs]).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=AI+Consciousness+and+Public+Perceptions%3A+Four+Futures&author=Ines+Fernandez&author=Nicoleta+Kyosovska&author=Jay+Luong&author=Gabriel+Mukobi&publication_year=2024)

\[46\]

Marlena R. Fraune, Benjamin C. Oisted, Catherine E. Sembrowski, Kathryn A. Gates, Margaret M. Krupp, and Selma Šabanović. 2020. Effects of Robot-Human versus Robot-Robot Behavior and Entitativity on Anthropomorphism and Willingness to Interact. _Computers in Human Behavior_ 105 (April 2020), 106220.

[Digital Library](https://dl.acm.org/doi/10.1016/j.chb.2019.106220)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Effects+of+Robot-Human+versus+Robot-Robot+Behavior+and+Entitativity+on+Anthropomorphism+and+Willingness+to+Interact&author=Marlena%C2%A0R.+Fraune&author=Benjamin%C2%A0C.+Oisted&author=Catherine%C2%A0E.+Sembrowski&author=Kathryn%C2%A0A.+Gates&author=Margaret%C2%A0M.+Krupp&author=Selma+%C5%A0abanovi%C4%87&publication_year=2020&pages=106220&doi=10.1016%2Fj.chb.2019.106220)

\[47\]

Nathan G. Freier. 2007. Children Distinguish Conventional from Moral Violations in Interactions with a Personified Agent. In _CHI ’07 Extended Abstracts on Human Factors in Computing Systems_. ACM, San Jose CA USA, 2195–2200.

[Digital Library](https://dl.acm.org/doi/10.1145/1240866.1240979)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Children+Distinguish+Conventional+from+Moral+Violations+in+Interactions+with+a+Personified+Agent&author=Nathan%C2%A0G.+Freier&publication_year=2007&pages=2195-2200&doi=10.1145%2F1240866.1240979)

\[48\]

Nathan G. Freier. 2008. Children Attribute Moral Standing to a Personified Agent. In _Proceedings of the SIGCHI Conference on Human Factors in Computing Systems_. ACM, Florence Italy, 343–352.

[Digital Library](https://dl.acm.org/doi/10.1145/1357054.1357113)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Children+Attribute+Moral+Standing+to+a+Personified+Agent&author=Nathan%C2%A0G.+Freier&publication_year=2008&pages=343-352&doi=10.1145%2F1357054.1357113)

\[49\]

Nathan G. Freier, Elia J. Nelson, Amanda Rotondo, and Wai Kay Kong. 2009. The Moral Accountability of a Personified Agent: Young Adults’ Conceptions. In _CHI ’09 Extended Abstracts on Human Factors in Computing Systems_. ACM, Boston MA USA, 4609–4614.

[Digital Library](https://dl.acm.org/doi/10.1145/1520340.1520708)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Moral+Accountability+of+a+Personified+Agent%3A+Young+Adults%E2%80%99+Conceptions&author=Nathan%C2%A0G.+Freier&author=Elia%C2%A0J.+Nelson&author=Amanda+Rotondo&author=Wai%C2%A0Kay+Kong&publication_year=2009&pages=4609-4614&doi=10.1145%2F1520340.1520708)

\[50\]

Batya Friedman. 1995. “It’s the Computer’s Fault”: Reasoning about Computers as Moral Agents. In _Conference Companion on Human Factors in Computing Systems - CHI ’95_. ACM Press, Denver, Colorado, United States, 226–227.

[Digital Library](https://dl.acm.org/doi/10.1145/223355.223537)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=%E2%80%9CIt%E2%80%99s+the+Computer%E2%80%99s+Fault%E2%80%9D%3A+Reasoning+about+Computers+as+Moral+Agents&author=Batya+Friedman&publication_year=1995&pages=226-227&doi=10.1145%2F223355.223537)

\[51\]

Future of Life Institute. 2023. Pause Giant AI Experiments: An Open Letter.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Pause+Giant+AI+Experiments%3A+An+Open+Letter&author=Future+of+Life+Institute&publication_year=2023)

\[52\]

Andrew Gambino, Jesse Fox, and Rabindra Ratan. 2020. Building a Stronger CASA: Extending the Computers Are Social Actors Paradigm. _Human-Machine Communication_ 1 (February 2020), 71–86.

[Crossref](https://doi.org/10.30658/hmc.1.5)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Building+a+Stronger+CASA%3A+Extending+the+Computers+Are+Social+Actors+Paradigm&author=Andrew+Gambino&author=Jesse+Fox&author=Rabindra+Ratan&publication_year=2020&pages=71-86&doi=10.30658%2Fhmc.1.5)

\[53\]

Robert M. Geraci. 2006. Spiritual Robots: Religion and Our Scientific View of the Natural World. _Theology and Science_ 4, 3 (November 2006), 229–246.

[Crossref](https://doi.org/10.1080/14746700600952993)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Spiritual+Robots%3A+Religion+and+Our+Scientific+View+of+the+Natural+World&author=Robert%C2%A0M.+Geraci&publication_year=2006&pages=229-246&doi=10.1080%2F14746700600952993)

\[54\]

Jean-Christophe Giger, Nuno Piçarra, Patrícia Alves-Oliveira, Raquel Oliveira, and Patrícia Arriaga. 2019. Humanization of Robots: Is It Really Such a Good Idea? _Human Behavior and Emerging Technologies_ 1, 2 (April 2019), 111–123.

[Crossref](https://doi.org/10.1002/hbe2.147)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Humanization+of+Robots%3A+Is+It+Really+Such+a+Good+Idea%3F&author=Jean-Christophe+Giger&author=Nuno+Pi%C3%A7arra&author=Patr%C3%ADcia+Alves-Oliveira&author=Raquel+Oliveira&author=Patr%C3%ADcia+Arriaga&publication_year=2019&pages=111-123&doi=10.1002%2Fhbe2.147)

\[55\]

Erving Goffman. 1974. _Frame Analysis: An Essay on the Organization of Experience_. Harvard University Press, Cambridge. ZSCC: 0033320.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Frame+Analysis%3A+An+Essay+on+the+Organization+of+Experience&author=Erving+Goffman&publication_year=1974)

\[56\]

Irving John Good. 1965. Speculations Concerning the First Ultraintelligent Machine. _Advances in Computers_ 6 (1965).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Speculations+Concerning+the+First+Ultraintelligent+Machine&author=Irving%C2%A0John+Good&publication_year=1965)

\[57\]

Katja Grace, Harlan Stewart, Julia Fabienne Sandkühler, Stephen Thomas, Ben Weinstein-Raun, and Jan Brauner. 2024. Thousands of AI Authors on the Future of AI. [http://arxiv.org/abs/2401.02843](http://arxiv.org/abs/2401.02843) arXiv: [https://arXiv.org/abs/2401.02843 \[cs\]](https://arxiv.org/abs/2401.02843[cs]).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Thousands+of+AI+Authors+on+the+Future+of+AI&author=Katja+Grace&author=Harlan+Stewart&author=Julia%C2%A0Fabienne+Sandk%C3%BChler&author=Stephen+Thomas&author=Ben+Weinstein-Raun&author=Jan+Brauner&publication_year=2024)

\[58\]

Heather M. Gray, Kurt Gray, and Daniel M. Wegner. 2007. Dimensions of Mind Perception. _Science_ 315, 5812 (February 2007), 619–619.

[Crossref](https://doi.org/10.1126/science.1134475)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Dimensions+of+Mind+Perception&author=Heather%C2%A0M.+Gray&author=Kurt+Gray&author=Daniel%C2%A0M.+Wegner&publication_year=2007&pages=619-619&doi=10.1126%2Fscience.1134475)

\[59\]

Kurt Gray and Daniel M. Wegner. 2012. Morality Takes Two: Dyadic Morality and Mind Perception. In _The Social Psychology of Morality: Exploring the Causes of Good and Evil_. American Psychological Association, Washington, DC, US, 109–127.

[Crossref](https://doi.org/10.1037/13091-006)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Morality+Takes+Two%3A+Dyadic+Morality+and+Mind+Perception&author=Kurt+Gray&author=Daniel%C2%A0M.+Wegner&publication_year=2012&pages=109-127&doi=10.1037%2F13091-006)

\[60\]

Kurt Gray, Liane Young, and Adam Waytz. 2012. Mind Perception Is the Essence of Morality. _Psychological Inquiry_ 23, 2 (April 2012), 101–124.

[Crossref](https://doi.org/10.1080/1047840X.2012.651387)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Mind+Perception+Is+the+Essence+of+Morality&author=Kurt+Gray&author=Liane+Young&author=Adam+Waytz&publication_year=2012&pages=101-124&doi=10.1080%2F1047840X.2012.651387)

\[61\]

Nina Grgić-Hlača, Christoph Engel, and Krishna P. Gummadi. 2019. Human Decision Making with Machine Assistance: An Experiment on Bailing and Jailing. _Proceedings of the ACM on Human-Computer Interaction_ 3, CSCW (November 2019), 1–25.

[Digital Library](https://dl.acm.org/doi/10.1145/3359280)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Human+Decision+Making+with+Machine+Assistance%3A+An+Experiment+on+Bailing+and+Jailing&author=Nina+Grgi%C4%87-Hla%C4%8Da&author=Christoph+Engel&author=Krishna%C2%A0P.+Gummadi&publication_year=2019&pages=1-25&doi=10.1145%2F3359280)

\[62\]

Naman Gupta, Sanchari Das, Kate Walsh, and Rahul Chatterjee. 2024. A Critical Analysis of the Prevalence of Technology-Facilitated Abuse in US College Students. In _Extended Abstracts of the CHI Conference on Human Factors in Computing Systems_. ACM, Honolulu HI USA, 1–12.

[Digital Library](https://dl.acm.org/doi/10.1145/3613905.3652036)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+Critical+Analysis+of+the+Prevalence+of+Technology-Facilitated+Abuse+in+US+College+Students&author=Naman+Gupta&author=Sanchari+Das&author=Kate+Walsh&author=Rahul+Chatterjee&publication_year=2024&pages=1-12&doi=10.1145%2F3613905.3652036)

\[63\]

Johanna Habicht, Sruthi Viswanathan, Ben Carrington, Tobias U. Hauser, Ross Harper, and Max Rollwage. 2024. Closing the Accessibility Gap to Mental Health Treatment with a Personalized Self-Referral Chatbot. _Nature Medicine_ 30, 2 (February 2024), 595–602.

[Crossref](https://doi.org/10.1038/s41591-023-02766-x)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Closing+the+Accessibility+Gap+to+Mental+Health+Treatment+with+a+Personalized+Self-Referral+Chatbot&author=Johanna+Habicht&author=Sruthi+Viswanathan&author=Ben+Carrington&author=Tobias%C2%A0U.+Hauser&author=Ross+Harper&author=Max+Rollwage&publication_year=2024&pages=595-602&doi=10.1038%2Fs41591-023-02766-x)

\[64\]

M D Romael Haque and Sabirat Rubya. 2023. An Overview of Chatbot-Based Mobile Mental Health Apps: Insights From App Description and User Reviews. _JMIR mHealth and uHealth_ 11 (May 2023), e44838.

[Crossref](https://doi.org/10.2196/44838)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=An+Overview+of+Chatbot-Based+Mobile+Mental+Health+Apps%3A+Insights+From+App+Description+and+User+Reviews&author=M%C2%A0D%C2%A0Romael+Haque&author=Sabirat+Rubya&publication_year=2023&pages=e44838&doi=10.2196%2F44838)

\[65\]

Maximilian Häring, Eva Gerlitz, Matthew Smith, and Christian Tiefenau. 2023. Less About Privacy: Revisiting a Survey about the German COVID-19 Contact Tracing App. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–16.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581537)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Less+About+Privacy%3A+Revisiting+a+Survey+about+the+German+COVID-19+Contact+Tracing+App&author=Maximilian+H%C3%A4ring&author=Eva+Gerlitz&author=Matthew+Smith&author=Christian+Tiefenau&publication_year=2023&pages=1-16&doi=10.1145%2F3544548.3581537)

\[66\]

Jamie Harris and Jacy Reese Anthis. 2021. The Moral Consideration of Artificial Entities: A Literature Review. _Science and Engineering Ethics_ 27, 4 (August 2021), 53.

[Crossref](https://doi.org/10.1007/s11948-021-00331-8)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Moral+Consideration+of+Artificial+Entities%3A+A+Literature+Review&author=Jamie+Harris&author=Jacy%C2%A0Reese+Anthis&publication_year=2021&pages=53&doi=10.1007%2Fs11948-021-00331-8)

\[67\]

Fritz Heider and Marianne Simmel. 1944. An Experimental Study of Apparent Behavior. _The American Journal of Psychology_ 57, 2 (April 1944), 243. jstor:1416950

[Crossref](https://doi.org/10.2307/1416950)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=An+Experimental+Study+of+Apparent+Behavior&author=Fritz+Heider&author=Marianne+Simmel&publication_year=1944&pages=243&doi=10.2307%2F1416950)

\[68\]

Franziska Herbert, Steffen Becker, Leonie Schaewitz, Jonas Hielscher, Marvin Kowalewski, Angela Sasse, Yasemin Acar, and Markus Dürmuth. 2023. A World Full of Privacy and Security (Mis)Conceptions? Findings of a Representative Survey in 12 Countries. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–23.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581410)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+World+Full+of+Privacy+and+Security+%28Mis%29Conceptions%3F+Findings+of+a+Representative+Survey+in+12+Countries&author=Franziska+Herbert&author=Steffen+Becker&author=Leonie+Schaewitz&author=Jonas+Hielscher&author=Marvin+Kowalewski&author=Angela+Sasse&author=Yasemin+Acar&author=Markus+D%C3%BCrmuth&publication_year=2023&pages=1-23&doi=10.1145%2F3544548.3581410)

\[69\]

Evelien Heyselaar. 2023. The CASA Theory No Longer Applies to Desktop Computers. _Scientific Reports_ 13, 1 (November 2023), 19693.

[Crossref](https://doi.org/10.1038/s41598-023-46527-9)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+CASA+Theory+No+Longer+Applies+to+Desktop+Computers&author=Evelien+Heyselaar&publication_year=2023&pages=19693&doi=10.1038%2Fs41598-023-46527-9)

\[70\]

Kevin Anthony Hoff and Masooda Bashir. 2015. Trust in Automation: Integrating Empirical Evidence on Factors That Influence Trust. _Human Factors: The Journal of the Human Factors and Ergonomics Society_ 57, 3 (May 2015), 407–434.

[Crossref](https://doi.org/10.1177/0018720814547570)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Trust+in+Automation%3A+Integrating+Empirical+Evidence+on+Factors+That+Influence+Trust&author=Kevin%C2%A0Anthony+Hoff&author=Masooda+Bashir&publication_year=2015&pages=407-434&doi=10.1177%2F0018720814547570)

\[71\]

Jess Hohenstein and Malte Jung. 2020. AI as a Moral Crumple Zone: The Effects of AI-mediated Communication on Attribution and Trust. _Computers in Human Behavior_ 106 (May 2020), 106190.

[Digital Library](https://dl.acm.org/doi/10.1016/j.chb.2019.106190)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=AI+as+a+Moral+Crumple+Zone%3A+The+Effects+of+AI-mediated+Communication+on+Attribution+and+Trust&author=Jess+Hohenstein&author=Malte+Jung&publication_year=2020&pages=106190&doi=10.1016%2Fj.chb.2019.106190)

\[72\]

Jess Hohenstein, Rene F. Kizilcec, Dominic DiFranzo, Zhila Aghajari, Hannah Mieczkowski, Karen Levy, Mor Naaman, Jeffrey Hancock, and Malte F. Jung. 2023. Artificial Intelligence in Communication Impacts Language and Social Relationships. _Scientific Reports_ 13, 1 (April 2023), 5487.

[Crossref](https://doi.org/10.1038/s41598-023-30938-9)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Artificial+Intelligence+in+Communication+Impacts+Language+and+Social+Relationships&author=Jess+Hohenstein&author=Rene%C2%A0F.+Kizilcec&author=Dominic+DiFranzo&author=Zhila+Aghajari&author=Hannah+Mieczkowski&author=Karen+Levy&author=Mor+Naaman&author=Jeffrey+Hancock&author=Malte%C2%A0F.+Jung&publication_year=2023&pages=5487&doi=10.1038%2Fs41598-023-30938-9)

\[73\]

Yoyo Tsung-Yu Hou, Wen-Ying Lee, and Malte Jung. 2023. “Should I Follow the Human, or Follow the Robot?” — Robots in Power Can Have More Influence Than Humans on Decision-Making. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–13.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581066)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=%E2%80%9CShould+I+Follow+the+Human%2C+or+Follow+the+Robot%3F%E2%80%9D+%E2%80%94+Robots+in+Power+Can+Have+More+Influence+Than+Humans+on+Decision-Making&author=Yoyo+Tsung-Yu+Hou&author=Wen-Ying+Lee&author=Malte+Jung&publication_year=2023&pages=1-13&doi=10.1145%2F3544548.3581066)

\[74\]

The White House. 2024. Memorandum on Advancing the United States’ Leadership in Artificial Intelligence; Harnessing Artificial Intelligence to Fulfill National Security Objectives; and Fostering the Safety, Security, and Trustworthiness of Artificial Intelligence.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Memorandum+on+Advancing+the+United+States%E2%80%99+Leadership+in+Artificial+Intelligence%3B+Harnessing+Artificial+Intelligence+to+Fulfill+National+Security+Objectives%3B+and+Fostering+the+Safety%2C+Security%2C+and+Trustworthiness+of+Artificial+Intelligence&author=The%C2%A0White+House&publication_year=2024)

\[75\]

Siying Hu, Hen Chen Yen, Ziwei Yu, Mingjian Zhao, Katie Seaborn, and Can Liu. 2023. Wizundry: A Cooperative Wizard of Oz Platform for Simulating Future Speech-based Interfaces with Multiple Wizards. _Proceedings of the ACM on Human-Computer Interaction_ 7, CSCW1 (April 2023), 1–34.

[Digital Library](https://dl.acm.org/doi/10.1145/3579591)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Wizundry%3A+A+Cooperative+Wizard+of+Oz+Platform+for+Simulating+Future+Speech-based+Interfaces+with+Multiple+Wizards&author=Siying+Hu&author=Hen%C2%A0Chen+Yen&author=Ziwei+Yu&author=Mingjian+Zhao&author=Katie+Seaborn&author=Can+Liu&publication_year=2023&pages=1-34&doi=10.1145%2F3579591)

\[76\]

Jie Huang and Kevin Chen-Chuan Chang. 2023. Towards Reasoning in Large Language Models: A Survey. In _Findings of the Association for Computational Linguistics: ACL 2023_. Association for Computational Linguistics, Toronto, Canada, 1049–1065.

[Crossref](https://doi.org/10.18653/v1/2023.findings-acl.67)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Towards+Reasoning+in+Large+Language+Models%3A+A+Survey&author=Jie+Huang&author=Kevin+Chen-Chuan+Chang&publication_year=2023&pages=1049-1065&doi=10.18653%2Fv1%2F2023.findings-acl.67)

\[77\]

Saffron Huang, Divya Siddarth, Liane Lovitt, Thomas I. Liao, Esin Durmus, Alex Tamkin, and Deep Ganguli. 2024. Collective Constitutional AI: Aligning a Language Model with Public Input. In _The 2024 ACM Conference on Fairness, Accountability, and Transparency_. ACM, Rio de Janeiro Brazil, 1395–1417.

[Digital Library](https://dl.acm.org/doi/10.1145/3630106.3658979)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Collective+Constitutional+AI%3A+Aligning+a+Language+Model+with+Public+Input&author=Saffron+Huang&author=Divya+Siddarth&author=Liane+Lovitt&author=Thomas%C2%A0I.+Liao&author=Esin+Durmus&author=Alex+Tamkin&author=Deep+Ganguli&publication_year=2024&pages=1395-1417&doi=10.1145%2F3630106.3658979)

\[78\]

Joi Ito. 2018. Why Westerners Fear Robots and the Japanese Do Not. _Wired_ (2018).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Why+Westerners+Fear+Robots+and+the+Japanese+Do+Not&author=Joi+Ito&publication_year=2018)

\[79\]

Chris Jackson, Mallory Newall, Johnny Sawyer, and Bernard Mendez. 2023. _Few Americans Trust the Companies Developing AI Systems to Do so Responsibly_. Technical Report. Ipsos.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Few+Americans+Trust+the+Companies+Developing+AI+Systems+to+Do+so+Responsibly&author=Chris+Jackson&author=Mallory+Newall&author=Johnny+Sawyer&author=Bernard+Mendez&publication_year=2023)

\[80\]

Ryan Blake Jackson and Tom Williams. 2019. On Perceived Social and Moral Agency in Natural Language Capable Robots. In _2019 HRI Workshop on the Dark Side of Human-Robot Interaction_. ACM, Daegu, South Korea, 401–410.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=On+Perceived+Social+and+Moral+Agency+in+Natural+Language+Capable+Robots&author=Ryan%C2%A0Blake+Jackson&author=Tom+Williams&publication_year=2019&pages=401-410)

\[81\]

Timothy P. Johnson (Ed.). 2018. _Advances in Comparative Survey Methods: Multinational, Multiregional, and Multicultural Contexts (3MC)_. John Wiley & Sons, Inc, Hoboken, NJ.

[Crossref](https://doi.org/10.1002/9781118884997)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Advances+in+Comparative+Survey+Methods%3A+Multinational%2C+Multiregional%2C+and+Multicultural+Contexts+%283MC%29&author=Timothy%C2%A0P.+Johnson&publication_year=2018&doi=10.1002%2F9781118884997)

\[82\]

Peter H. Kahn, Batya Friedman, Deanne R. Perez-Granados, and Nathan G. Freier. 2004. Robotic Pets in the Lives of Preschool Children. In _CHI ’04 Extended Abstracts on Human Factors in Computing Systems_. ACM, Vienna Austria, 1449–1452.

[Digital Library](https://dl.acm.org/doi/10.1145/985921.986087)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Robotic+Pets+in+the+Lives+of+Preschool+Children&author=Peter%C2%A0H.+Kahn&author=Batya+Friedman&author=Deanne%C2%A0R.+Perez-Granados&author=Nathan%C2%A0G.+Freier&publication_year=2004&pages=1449-1452&doi=10.1145%2F985921.986087)

\[83\]

Daniel Kahneman and Amos Tversky. 1979. Prospect Theory: An Analysis of Decision under Risk. _Econometrica_ 47, 2 (March 1979), 263. jstor:1914185

[Crossref](https://doi.org/10.2307/1914185)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Prospect+Theory%3A+An+Analysis+of+Decision+under+Risk&author=Daniel+Kahneman&author=Amos+Tversky&publication_year=1979&pages=263&doi=10.2307%2F1914185)

\[84\]

Jerry Kaplan. 2016. _Defining Artificial Intelligence_. Oxford University Press.

[Crossref](https://doi.org/10.1093/wentk/9780190602383.003.0001)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Defining+Artificial+Intelligence&author=Jerry+Kaplan&publication_year=2016&doi=10.1093%2Fwentk%2F9780190602383.003.0001)

\[85\]

Elise Karinshak, Sunny Xun Liu, Joon Sung Park, and Jeffrey T. Hancock. 2023. Working With AI to Persuade: Examining a Large Language Model’s Ability to Generate Pro-Vaccination Messages. _Proceedings of the ACM on Human-Computer Interaction_ 7, CSCW1 (April 2023), 1–29.

[Digital Library](https://dl.acm.org/doi/10.1145/3579592)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Working+With+AI+to+Persuade%3A+Examining+a+Large+Language+Model%E2%80%99s+Ability+to+Generate+Pro-Vaccination+Messages&author=Elise+Karinshak&author=Sunny%C2%A0Xun+Liu&author=Joon%C2%A0Sung+Park&author=Jeffrey%C2%A0T.+Hancock&publication_year=2023&pages=1-29&doi=10.1145%2F3579592)

\[86\]

Atoosa Kasirzadeh. 2025. Two Types of AI Existential Risk: Decisive and Accumulative. arXiv: [https://arXiv.org/abs/2401.07836 \[cs\]](https://arxiv.org/abs/2401.07836[cs]).

[Crossref](https://doi.org/10.48550/arXiv.2401.07836)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Two+Types+of+AI+Existential+Risk%3A+Decisive+and+Accumulative&author=Atoosa+Kasirzadeh&publication_year=2025&doi=10.48550%2FarXiv.2401.07836)

\[87\]

Sage Kelly, Sherrie-Anne Kaye, and Oscar Oviedo-Trespalacios. 2023. What Factors Contribute to the Acceptance of Artificial Intelligence? A Systematic Review. _Telematics and Informatics_ 77 (February 2023), 101925.

[Digital Library](https://dl.acm.org/doi/10.1016/j.tele.2022.101925)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=What+Factors+Contribute+to+the+Acceptance+of+Artificial+Intelligence%3F+A+Systematic+Review&author=Sage+Kelly&author=Sherrie-Anne+Kaye&author=Oscar+Oviedo-Trespalacios&publication_year=2023&pages=101925&doi=10.1016%2Fj.tele.2022.101925)

\[88\]

Jihyun Kim, Kelly Merrill Jr., Kun Xu, and Stephanie Kelly. 2022. Perceived Credibility of an AI Instructor in Online Education: The Role of Social Presence and Voice Features. _Computers in Human Behavior_ 136 (November 2022), 107383.

[Digital Library](https://dl.acm.org/doi/10.1016/j.chb.2022.107383)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Perceived+Credibility+of+an+AI+Instructor+in+Online+Education%3A+The+Role+of+Social+Presence+and+Voice+Features&author=Jihyun+Kim&author=Kelly+Merrill%C2%A0Jr.&author=Kun+Xu&author=Stephanie+Kelly&publication_year=2022&pages=107383&doi=10.1016%2Fj.chb.2022.107383)

\[89\]

Taenyun Kim, Maria D. Molina, Minjin (Mj) Rheu, Emily S. Zhan, and Wei Peng. 2023. One AI Does Not Fit All: A Cluster Analysis of the Laypeople’s Perception of AI Roles. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–20.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581340)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=One+AI+Does+Not+Fit+All%3A+A+Cluster+Analysis+of+the+Laypeople%E2%80%99s+Perception+of+AI+Roles&author=Taenyun+Kim&author=Maria%C2%A0D.+Molina&author=Minjin%C2%A0%28Mj%29+Rheu&author=Emily%C2%A0S.+Zhan&author=Wei+Peng&publication_year=2023&pages=1-20&doi=10.1145%2F3544548.3581340)

\[90\]

Marcus Kneer, David Colaço, Joshua Alexander, and Edouard Machery. 2021. On Second Thought: Reflections on the Reflection Defense. In _Oxford Studies in Experimental Philosophy_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=On+Second+Thought%3A+Reflections+on+the+Reflection+Defense&author=Marcus+Kneer&author=David+Cola%C3%A7o&author=Joshua+Alexander&author=Edouard+Machery&publication_year=2021)

\[91\]

Takanori Komatsu. 2016. How Do People Judge Moral Wrongness in a Robot and in Its Designers and Owners Regarding the Consequences of the Robot’s Behaviors?. In _2016 25th IEEE International Symposium on Robot and Human Interactive Communication (RO-MAN)_. IEEE, New York, NY, USA, 1168–1171.

[Digital Library](https://dl.acm.org/doi/10.1109/ROMAN.2016.7745256)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=How+Do+People+Judge+Moral+Wrongness+in+a+Robot+and+in+Its+Designers+and+Owners+Regarding+the+Consequences+of+the+Robot%E2%80%99s+Behaviors%3F&author=Takanori+Komatsu&publication_year=2016&pages=1168-1171&doi=10.1109%2FROMAN.2016.7745256)

\[92\]

Takanori Komatsu, Bertram F. Malle, and Matthias Scheutz. 2021. Blaming the Reluctant Robot: Parallel Blame Judgments for Robots in Moral Dilemmas across U.S. and Japan. In _Proceedings of the 2021 ACM/IEEE International Conference on Human-Robot Interaction_. ACM, Boulder CO USA, 63–72.

[Digital Library](https://dl.acm.org/doi/10.1145/3434073.3444672)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Blaming+the+Reluctant+Robot%3A+Parallel+Blame+Judgments+for+Robots+in+Moral+Dilemmas+across+U.S.+and+Japan&author=Takanori+Komatsu&author=Bertram%C2%A0F.+Malle&author=Matthias+Scheutz&publication_year=2021&pages=63-72&doi=10.1145%2F3434073.3444672)

\[93\]

Elisa Konya-Baumbach, Miriam Biller, and Sergej Von Janda. 2023. Someone out There? A Study on the Social Presence of Anthropomorphized Chatbots. _Computers in Human Behavior_ 139 (February 2023), 107513.

[Digital Library](https://dl.acm.org/doi/10.1016/j.chb.2022.107513)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Someone+out+There%3F+A+Study+on+the+Social+Presence+of+Anthropomorphized+Chatbots&author=Elisa+Konya-Baumbach&author=Miriam+Biller&author=Sergej+Von%C2%A0Janda&publication_year=2023&pages=107513&doi=10.1016%2Fj.chb.2022.107513)

\[94\]

Jan Kulveit, Raymond Douglas, Nora Ammann, Deger Turan, David Krueger, and David Duvenaud. 2025. Gradual Disempowerment: Systemic Existential Risks from Incremental AI Development. arXiv: [https://arXiv.org/abs/2501.16946 \[cs\]](https://arxiv.org/abs/2501.16946[cs]).

[Crossref](https://doi.org/10.48550/arXiv.2501.16946)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Gradual+Disempowerment%3A+Systemic+Existential+Risks+from+Incremental+AI+Development&author=Jan+Kulveit&author=Raymond+Douglas&author=Nora+Ammann&author=Deger+Turan&author=David+Krueger&author=David+Duvenaud&publication_year=2025&doi=10.48550%2FarXiv.2501.16946)

\[95\]

Ali Ladak. 2023. What Would Qualify an Artificial Intelligence for Moral Standing? _AI and Ethics_ (January 2023).

[Crossref](https://doi.org/10.1007/s43681-023-00260-1)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=What+Would+Qualify+an+Artificial+Intelligence+for+Moral+Standing%3F&author=Ali+Ladak&publication_year=2023&doi=10.1007%2Fs43681-023-00260-1)

\[96\]

Ali Ladak, Jamie Harris, and Jacy Reese Anthis. 2023. _Features of Moral Consideration for Artificial Entities: A Conjoint Experiment_. Preprint. PsyArXiv.

[Crossref](https://doi.org/10.31234/osf.io/235vp)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Features+of+Moral+Consideration+for+Artificial+Entities%3A+A+Conjoint+Experiment&author=Ali+Ladak&author=Jamie+Harris&author=Jacy%C2%A0Reese+Anthis&publication_year=2023&doi=10.31234%2Fosf.io%2F235vp)

\[97\]

Ali Ladak, Jamie Harris, and Jacy Reese Anthis. 2024. Which Artificial Intelligences Do People Care About Most? A Conjoint Experiment on Moral Consideration. In _Proceedings of the CHI Conference on Human Factors in Computing Systems_. ACM, Honolulu HI USA, 1–11.

[Digital Library](https://dl.acm.org/doi/10.1145/3613904.3642403)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Which+Artificial+Intelligences+Do+People+Care+About+Most%3F+A+Conjoint+Experiment+on+Moral+Consideration&author=Ali+Ladak&author=Jamie+Harris&author=Jacy%C2%A0Reese+Anthis&publication_year=2024&pages=1-11&doi=10.1145%2F3613904.3642403)

\[98\]

Ali Ladak, Steve Loughnan, and Matti Wilks. 2023. The Moral Psychology of Artificial Intelligence. _Current Directions in Psychological Science_ 0, 0 (September 2023).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Moral+Psychology+of+Artificial+Intelligence&author=Ali+Ladak&author=Steve+Loughnan&author=Matti+Wilks&publication_year=2023)

\[99\]

Simon M. Laham. 2009. Expanding the Moral Circle: Inclusion and Exclusion Mindsets and the Circle of Moral Regard. _Journal of Experimental Social Psychology_ 45, 1 (January 2009), 250–253.

[Crossref](https://doi.org/10.1016/j.jesp.2008.08.012)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Expanding+the+Moral+Circle%3A+Inclusion+and+Exclusion+Mindsets+and+the+Circle+of+Moral+Regard&author=Simon%C2%A0M.+Laham&publication_year=2009&pages=250-253&doi=10.1016%2Fj.jesp.2008.08.012)

\[100\]

David R. Large, Kyle Harrington, Gary Burnett, Jacob Luton, Peter Thomas, and Pete Bennett. 2019. To Please in a Pod: Employing an Anthropomorphic Agent-Interlocutor to Enhance Trust and User Experience in an Autonomous, Self-Driving Vehicle. In _Proceedings of the 11th International Conference on Automotive User Interfaces and Interactive Vehicular Applications_. ACM, Utrecht Netherlands, 49–59.

[Digital Library](https://dl.acm.org/doi/10.1145/3342197.3344545)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=To+Please+in+a+Pod%3A+Employing+an+Anthropomorphic+Agent-Interlocutor+to+Enhance+Trust+and+User+Experience+in+an+Autonomous%2C+Self-Driving+Vehicle&author=David%C2%A0R.+Large&author=Kyle+Harrington&author=Gary+Burnett&author=Jacob+Luton&author=Peter+Thomas&author=Pete+Bennett&publication_year=2019&pages=49-59&doi=10.1145%2F3342197.3344545)

\[101\]

Sarah Lebovitz, Natalia Levina, and Hila Lifshitz-Assa. 2021. Is AI Ground Truth Really True? The Dangers of Training and Evaluating AI Tools Based on Experts’ Know-What. _MIS Quarterly_ 45, 3 (September 2021), 1501–1526.

[Crossref](https://doi.org/10.25300/MISQ/2021/16564)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Is+AI+Ground+Truth+Really+True%3F+The+Dangers+of+Training+and+Evaluating+AI+Tools+Based+on+Experts%E2%80%99+Know-What&author=Sarah+Lebovitz&author=Natalia+Levina&author=Hila+Lifshitz-Assa&publication_year=2021&pages=1501-1526&doi=10.25300%2FMISQ%2F2021%2F16564)

\[102\]

Minha Lee, Peter Ruijten, Lily Frank, Yvonne De Kort, and Wijnand IJsselsteijn. 2021. People May Punish, But Not Blame Robots. In _Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems_. ACM, Yokohama Japan, 1–11.

[Digital Library](https://dl.acm.org/doi/10.1145/3411764.3445284)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=People+May+Punish%2C+But+Not+Blame+Robots&author=Minha+Lee&author=Peter+Ruijten&author=Lily+Frank&author=Yvonne+De%C2%A0Kort&author=Wijnand+IJsselsteijn&publication_year=2021&pages=1-11&doi=10.1145%2F3411764.3445284)

\[103\]

Yi-Chieh Lee, Naomi Yamashita, and Yun Huang. 2020. Designing a Chatbot as a Mediator for Promoting Deep Self-Disclosure to a Real Mental Health Professional. _Proceedings of the ACM on Human-Computer Interaction_ 4, CSCW1 (May 2020), 1–27.

[Digital Library](https://dl.acm.org/doi/10.1145/3392836)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Designing+a+Chatbot+as+a+Mediator+for+Promoting+Deep+Self-Disclosure+to+a+Real+Mental+Health+Professional&author=Yi-Chieh+Lee&author=Naomi+Yamashita&author=Yun+Huang&publication_year=2020&pages=1-27&doi=10.1145%2F3392836)

\[104\]

Xinge Li and Yongjun Sung. 2021. Anthropomorphism Brings Us Closer: The Mediating Role of Psychological Distance in User–AI Assistant Interactions. _Computers in Human Behavior_ 118 (May 2021), 106680.

[Crossref](https://doi.org/10.1016/j.chb.2021.106680)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Anthropomorphism+Brings+Us+Closer%3A+The+Mediating+Role+of+Psychological+Distance+in+User%E2%80%93AI+Assistant+Interactions&author=Xinge+Li&author=Yongjun+Sung&publication_year=2021&pages=106680&doi=10.1016%2Fj.chb.2021.106680)

\[105\]

Gabriel Lima, Nina Grgić-Hlača, and Meeyoung Cha. 2021. Human Perceptions on Moral Responsibility of AI: A Case Study in AI-Assisted Bail Decision-Making. In _Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems_. ACM, Yokohama Japan, 1–17.

[Digital Library](https://dl.acm.org/doi/10.1145/3411764.3445260)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Human+Perceptions+on+Moral+Responsibility+of+AI%3A+A+Case+Study+in+AI-Assisted+Bail+Decision-Making&author=Gabriel+Lima&author=Nina+Grgi%C4%87-Hla%C4%8Da&author=Meeyoung+Cha&publication_year=2021&pages=1-17&doi=10.1145%2F3411764.3445260)

\[106\]

Gabriel Lima, Nina Grgić-Hlača, and Meeyoung Cha. 2023. Blaming Humans and Machines: What Shapes People’s Reactions to Algorithmic Harm. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–26.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3580953)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Blaming+Humans+and+Machines%3A+What+Shapes+People%E2%80%99s+Reactions+to+Algorithmic+Harm&author=Gabriel+Lima&author=Nina+Grgi%C4%87-Hla%C4%8Da&author=Meeyoung+Cha&publication_year=2023&pages=1-26&doi=10.1145%2F3544548.3580953)

\[107\]

Gabriel Lima, Changyeon Kim, Seungho Ryu, Chihyung Jeon, and Meeyoung Cha. 2020. Collecting the Public Perception of AI and Robot Rights. _Proceedings of the ACM on Human-Computer Interaction_ 4, CSCW2 (October 2020), 1–24.

[Digital Library](https://dl.acm.org/doi/10.1145/3415206)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Collecting+the+Public+Perception+of+AI+and+Robot+Rights&author=Gabriel+Lima&author=Changyeon+Kim&author=Seungho+Ryu&author=Chihyung+Jeon&author=Meeyoung+Cha&publication_year=2020&pages=1-24&doi=10.1145%2F3415206)

\[108\]

Ewa Luger and Abigail Sellen. 2016. "Like Having a Really Bad PA": The Gulf between User Expectation and Experience of Conversational Agents. In _Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems_. ACM, San Jose California USA, 5286–5297.

[Digital Library](https://dl.acm.org/doi/10.1145/2858036.2858288)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=%22Like+Having+a+Really+Bad+PA%22%3A+The+Gulf+between+User+Expectation+and+Experience+of+Conversational+Agents&author=Ewa+Luger&author=Abigail+Sellen&publication_year=2016&pages=5286-5297&doi=10.1145%2F2858036.2858288)

\[109\]

Takuya Maeda and Anabel Quan-Haase. 2024. When Human-AI Interactions Become Parasocial: Agency and Anthropomorphism in Affective Design. In _The 2024 ACM Conference on Fairness, Accountability, and Transparency_. ACM, Rio de Janeiro Brazil, 1068–1077.

[Digital Library](https://dl.acm.org/doi/10.1145/3630106.3658956)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=When+Human-AI+Interactions+Become+Parasocial%3A+Agency+and+Anthropomorphism+in+Affective+Design&author=Takuya+Maeda&author=Anabel+Quan-Haase&publication_year=2024&pages=1068-1077&doi=10.1145%2F3630106.3658956)

\[110\]

Bertram F Malle. 2019. How Many Dimensions of Mind Perception Really Are There?. In _Proceedings of the 41st Annual Meeting of the Cognitive Science Society_. Cognitive Science Society, Montreal, Canada, 2268–2274.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=How+Many+Dimensions+of+Mind+Perception+Really+Are+There%3F&author=Bertram%C2%A0F+Malle&publication_year=2019&pages=2268-2274)

\[111\]

Bertram F. Malle, Stuti Thapa Magar, and Matthias Scheutz. 2019. AI in the Sky: How People Morally Evaluate Human and Machine Decisions in a Lethal Strike Dilemma. In _Robotics and Well-Being_, Maria Isabel Aldinhas Ferreira, João Silva Sequeira, Gurvinder Singh Virk, Mohammad Osman Tokhi, and Endre E. Kadar (Eds.). Vol. 95. Springer International Publishing, Cham, 111–133.

[Crossref](https://doi.org/10.1007/978-3-030-12524-011)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=AI+in+the+Sky%3A+How+People+Morally+Evaluate+Human+and+Machine+Decisions+in+a+Lethal+Strike+Dilemma&author=Bertram%C2%A0F.+Malle&author=Stuti%C2%A0Thapa+Magar&author=Matthias+Scheutz&publication_year=2019&pages=111-133&doi=10.1007%2F978-3-030-12524-011)

\[112\]

Bethanie Maples, Merve Cerit, Aditya Vishwanath, and Roy Pea. 2024. Loneliness and Suicide Mitigation for Students Using GPT3-enabled Chatbots. _npj Mental Health Research_ 3, 1 (January 2024), 4.

[Crossref](https://doi.org/10.1038/s44184-023-00047-6)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Loneliness+and+Suicide+Mitigation+for+Students+Using+GPT3-enabled+Chatbots&author=Bethanie+Maples&author=Merve+Cerit&author=Aditya+Vishwanath&author=Roy+Pea&publication_year=2024&pages=4&doi=10.1038%2Fs44184-023-00047-6)

\[113\]

Bethanie Maples, Roy D. Pea, and David Markowitz. 2023. Learning from Intelligent Social Agents as Social and Intellectual Mirrors. In _AI in Learning: Designing the Future_, Hannele Niemi, Roy D. Pea, and Yu Lu (Eds.). Springer International Publishing, Cham, 73–89.

[Crossref](https://doi.org/10.1007/978-3-031-09687-75)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Learning+from+Intelligent+Social+Agents+as+Social+and+Intellectual+Mirrors&author=Bethanie+Maples&author=Roy%C2%A0D.+Pea&author=David+Markowitz&publication_year=2023&pages=73-89&doi=10.1007%2F978-3-031-09687-75)

\[114\]

Daniel McDuff and Mary Czerwinski. 2018. Designing Emotionally Sentient Agents. _Commun. ACM_ 61, 12 (November 2018), 74–83.

[Digital Library](https://dl.acm.org/doi/10.1145/3186591)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Designing+Emotionally+Sentient+Agents&author=Daniel+McDuff&author=Mary+Czerwinski&publication_year=2018&pages=74-83&doi=10.1145%2F3186591)

\[115\]

Thomas Metzinger. 2021. Artificial Suffering: An Argument for a Global Moratorium on Synthetic Phenomenology. _Journal of Artificial Intelligence and Consciousness_ 08, 01 (March 2021), 43–66.

[Crossref](https://doi.org/10.1142/S270507852150003X)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Artificial+Suffering%3A+An+Argument+for+a+Global+Moratorium+on+Synthetic+Phenomenology&author=Thomas+Metzinger&publication_year=2021&pages=43-66&doi=10.1142%2FS270507852150003X)

\[116\]

Fred Miao, Irina V. Kozlenkova, Haizhong Wang, Tao Xie, and Robert W. Palmatier. 2022. An Emerging Theory of Avatar Marketing. _Journal of Marketing_ 86, 1 (January 2022), 67–90.

[Crossref](https://doi.org/10.1177/0022242921996646)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=An+Emerging+Theory+of+Avatar+Marketing&author=Fred+Miao&author=Irina%C2%A0V.+Kozlenkova&author=Haizhong+Wang&author=Tao+Xie&author=Robert%C2%A0W.+Palmatier&publication_year=2022&pages=67-90&doi=10.1177%2F0022242921996646)

\[117\]

Milagros Miceli and Julian Posada. 2022. The Data-Production Dispositif. _Proceedings of the ACM on Human-Computer Interaction_ 6, CSCW2 (November 2022), 1–37.

[Digital Library](https://dl.acm.org/doi/10.1145/3555561)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Data-Production+Dispositif&author=Milagros+Miceli&author=Julian+Posada&publication_year=2022&pages=1-37&doi=10.1145%2F3555561)

\[118\]

Swati Mishra and Jeffrey M. Rzeszotarski. 2021. Crowdsourcing and Evaluating Concept-driven Explanations of Machine Learning Models. _Proceedings of the ACM on Human-Computer Interaction_ 5, CSCW1 (April 2021), 1–26.

[Digital Library](https://dl.acm.org/doi/10.1145/3449213)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Crowdsourcing+and+Evaluating+Concept-driven+Explanations+of+Machine+Learning+Models&author=Swati+Mishra&author=Jeffrey%C2%A0M.+Rzeszotarski&publication_year=2021&pages=1-26&doi=10.1145%2F3449213)

\[119\]

Meredith Ringel Morris, Michael S. Bernstein, Jeffrey P. Bigham, Juho Kim, and Andrés Monroy-Hernández. Forthcoming. Is Human-AI Interaction CSCW? _CSCW ’24 Companion: Companion Publication of the 2023 Conference on Computer Supported Cooperative Work and Social Computing_ (Forthcoming).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Is+Human-AI+Interaction+CSCW%3F&author=Meredith%C2%A0Ringel+Morris&author=Michael%C2%A0S.+Bernstein&author=Jeffrey%C2%A0P.+Bigham&author=Juho+Kim&author=Andr%C3%A9s+Monroy-Hern%C3%A1ndez&publication_year=Forthcoming)

\[120\]

Sara Moussawi, Marios Koufaris, and Raquel Benbunan-Fich. 2021. How Perceptions of Intelligence and Anthropomorphism Affect Adoption of Personal Intelligent Agents. _Electronic Markets_ 31, 2 (2021), 343–364.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=How+Perceptions+of+Intelligence+and+Anthropomorphism+Affect+Adoption+of+Personal+Intelligent+Agents&author=Sara+Moussawi&author=Marios+Koufaris&author=Raquel+Benbunan-Fich&publication_year=2021&pages=343-364)

\[121\]

Clifford Nass and Youngme Moon. 2000. Machines and Mindlessness: Social Responses to Computers. _Journal of Social Issues_ 56, 1 (January 2000), 81–103.

[Crossref](https://doi.org/10.1111/0022-4537.00153)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Machines+and+Mindlessness%3A+Social+Responses+to+Computers&author=Clifford+Nass&author=Youngme+Moon&publication_year=2000&pages=81-103&doi=10.1111%2F0022-4537.00153)

\[122\]

Clifford Nass, Jonathan Steuer, and Ellen R. Tauber. 1994. Computers Are Social Actors. In _Proceedings of the SIGCHI Conference on Human Factors in Computing Systems Celebrating Interdependence - CHI ’94_. ACM Press, Boston, Massachusetts, United States, 72–78.

[Digital Library](https://dl.acm.org/doi/10.1145/191666.191703)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Computers+Are+Social+Actors&author=Clifford+Nass&author=Jonathan+Steuer&author=Ellen%C2%A0R.+Tauber&publication_year=1994&pages=72-78&doi=10.1145%2F191666.191703)

\[123\]

Gavin Newsom. 2024. Senate Bill 1047 Veto Message.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Senate+Bill+1047+Veto+Message&author=Gavin+Newsom&publication_year=2024)

\[124\]

Richard Ngo, Lawrence Chan, and Sören Mindermann. 2023. The Alignment Problem from a Deep Learning Perspective. arxiv: [https://arXiv.org/abs/2209.00626](https://arxiv.org/abs/2209.00626) \[cs\]

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Alignment+Problem+from+a+Deep+Learning+Perspective&author=Richard+Ngo&author=Lawrence+Chan&author=S%C3%B6ren+Mindermann&publication_year=2023)

\[125\]

Mai Nguyen, Lars-Erik Casper Ferm, Sara Quach, Nicolas Pontes, and Park Thaichon. 2023. Chatbots in Frontline Services and Customer Experience: An Anthropomorphism Perspective. _Psychology & Marketing_ (August 2023), mar.21882.

[Crossref](https://doi.org/10.1002/mar.21882)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Chatbots+in+Frontline+Services+and+Customer+Experience%3A+An+Anthropomorphism+Perspective&author=Mai+Nguyen&author=Lars-Erik+Casper%C2%A0Ferm&author=Sara+Quach&author=Nicolas+Pontes&author=Park+Thaichon&publication_year=2023&pages=mar.21882&doi=10.1002%2Fmar.21882)

\[126\]

Sarah Soyeon Oh, Kyoung-A Kim, Minsu Kim, Jaeuk Oh, Sang Hui Chu, and JiYeon Choi. 2021. Measurement of Digital Literacy Among Older Adults: Systematic Review. _Journal of Medical Internet Research_ 23, 2 (February 2021), e26145.

[Crossref](https://doi.org/10.2196/26145)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Measurement+of+Digital+Literacy+Among+Older+Adults%3A+Systematic+Review&author=Sarah%C2%A0Soyeon+Oh&author=Kyoung-A+Kim&author=Minsu+Kim&author=Jaeuk+Oh&author=Sang%C2%A0Hui+Chu&author=JiYeon+Choi&publication_year=2021&pages=e26145&doi=10.2196%2F26145)

\[127\]

OSTP. 2022. Blueprint for an AI Bill of Rights.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Blueprint+for+an+AI+Bill+of+Rights&author=OSTP&publication_year=2022)

\[128\]

Sharon Oviatt. 2006. Human-Centered Design Meets Cognitive Load Theory: Designing Interfaces That Help People Think. In _Proceedings of the 14th ACM International Conference on Multimedia_. ACM, Santa Barbara CA USA, 871–880.

[Digital Library](https://dl.acm.org/doi/10.1145/1180639.1180831)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Human-Centered+Design+Meets+Cognitive+Load+Theory%3A+Designing+Interfaces+That+Help+People+Think&author=Sharon+Oviatt&publication_year=2006&pages=871-880&doi=10.1145%2F1180639.1180831)

\[129\]

Gain Park, Jiyun Chung, and Seyoung Lee. 2024. Human vs. Machine-like Representation in Chatbot Mental Health Counseling: The Serial Mediation of Psychological Distance and Trust on Compliance Intention. _Current Psychology_ 43, 5 (February 2024), 4352–4363.

[Crossref](https://doi.org/10.1007/s12144-023-04653-7)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Human+vs.+Machine-like+Representation+in+Chatbot+Mental+Health+Counseling%3A+The+Serial+Mediation+of+Psychological+Distance+and+Trust+on+Compliance+Intention&author=Gain+Park&author=Jiyun+Chung&author=Seyoung+Lee&publication_year=2024&pages=4352-4363&doi=10.1007%2Fs12144-023-04653-7)

\[130\]

Janet V.T. Pauketat and Jacy Reese Anthis. 2022. Predicting the moral consideration of artificial intelligences. _Computers in Human Behavior_ 136 (Nov. 2022), 107372. 3 citations (Semantic Scholar/DOI) \[2023-06-28\].

[Digital Library](https://dl.acm.org/doi/10.1016/j.chb.2022.107372)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Predicting+the+moral+consideration+of+artificial+intelligences&author=Janet%C2%A0V.T.+Pauketat&author=Jacy%C2%A0Reese+Anthis&publication_year=2022&pages=107372&doi=10.1016%2Fj.chb.2022.107372)

\[131\]

Janet V.T. Pauketat, Ali Ladak, and Jacy Reese Anthis. 2025. World-making for a future with sentient AI. _British Journal of Social Psychology_ 64, 1 (2025), e12844. \_eprint: [https://onlinelibrary.wiley.com/doi/pdf/10.1111/bjso.12844](https://onlinelibrary.wiley.com/doi/pdf/10.1111/bjso.12844).

[Crossref](https://doi.org/10.1111/bjso.12844)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=World-making+for+a+future+with+sentient+AI&author=Janet%C2%A0V.T.+Pauketat&author=Ali+Ladak&author=Jacy%C2%A0Reese+Anthis&publication_year=2025&pages=e12844&doi=10.1111%2Fbjso.12844)

\[132\]

Mark Penn, Dritan Nesho, and Stephen Ansolabehere. 2023. _July Harvard CAPS / Harris Poll_. Technical Report. The Harris Poll.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=July+Harvard+CAPS+%2F+Harris+Poll&author=Mark+Penn&author=Dritan+Nesho&author=Stephen+Ansolabehere&publication_year=2023)

\[133\]

Billy Perrigo. 2024. Inside OpenAI’s Plan to Make AI More ’Democratic’. _[https://time.com/6684266/openai-democracy-artificial-intelligence/](https://time.com/6684266/openai-democracy-artificial-intelligence/)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Inside+OpenAI%E2%80%99s+Plan+to+Make+AI+More+%E2%80%99Democratic%E2%80%99&author=Billy+Perrigo&publication_year=2024)

\[134\]

Matthew Wray Perry. 2024. Why Sentience Should Be the Only Basis of Moral Status. _The Journal of Ethics_ (July 2024).

[Crossref](https://doi.org/10.1007/s10892-024-09487-4)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Why+Sentience+Should+Be+the+Only+Basis+of+Moral+Status&author=Matthew%C2%A0Wray+Perry&publication_year=2024&doi=10.1007%2Fs10892-024-09487-4)

\[135\]

Séamus A. Power, Tania Zittoun, Sanne Akkerman, Brady Wagoner, Martina Cabra, Flora Cornish, Hana Hawlina, Brett Heasman, Kesi Mahendran, Charis Psaltis, Antti Rajala, Angela Veale, and Alex Gillespie. 2023. Social Psychology of and for World-Making. _Personality and Social Psychology Review_ 27, 4 (November 2023), 378–392.

[Crossref](https://doi.org/10.1177/10888683221145756)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Social+Psychology+of+and+for+World-Making&author=S%C3%A9amus%C2%A0A.+Power&author=Tania+Zittoun&author=Sanne+Akkerman&author=Brady+Wagoner&author=Martina+Cabra&author=Flora+Cornish&author=Hana+Hawlina&author=Brett+Heasman&author=Kesi+Mahendran&author=Charis+Psaltis&author=Antti+Rajala&author=Angela+Veale&publication_year=2023&pages=378-392&doi=10.1177%2F10888683221145756)

\[136\]

Byron Reeves and Clifford Ivar Nass. 1996. _The Media Equation: How People Treat Computers, Television, and New Media Like Real People and Places_. CSLI Publications ; Cambridge University Press, Stanford, Calif. : New York.

[Digital Library](https://dl.acm.org/doi/10.5555/236605)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Media+Equation%3A+How+People+Treat+Computers%2C+Television%2C+and+New+Media+Like+Real+People+and+Places&author=Byron+Reeves&author=Clifford%C2%A0Ivar+Nass&publication_year=1996&doi=10.5555%2F236605)

\[137\]

Federal Register. 2019. Maintaining American Leadership in Artificial Intelligence.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Maintaining+American+Leadership+in+Artificial+Intelligence&author=Federal+Register&publication_year=2019)

\[138\]

Federal Register. 2020. Promoting the Use of Trustworthy Artificial Intelligence in the Federal Government.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Promoting+the+Use+of+Trustworthy+Artificial+Intelligence+in+the+Federal+Government&author=Federal+Register&publication_year=2020)

\[139\]

Federal Register. 2023. Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Safe%2C+Secure%2C+and+Trustworthy+Development+and+Use+of+Artificial+Intelligence&author=Federal+Register&publication_year=2023)

\[140\]

Kathleen Richardson. 2016. Technological Animism: The Uncanny Personhood of Humanoid Machines. _Social Analysis_ 60, 1 (January 2016).

[Crossref](https://doi.org/10.3167/sa.2016.600108)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Technological+Animism%3A+The+Uncanny+Personhood+of+Humanoid+Machines&author=Kathleen+Richardson&publication_year=2016&doi=10.3167%2Fsa.2016.600108)

\[141\]

Susanna Kim Ripken. 2009. Corporations Are People Too: A Multi-dimensional Approach to the Corporate Personhood Puzzle. _Fordham Journal of Corporate and Financial Law_ 15 (2009).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Corporations+Are+People+Too%3A+A+Multi-dimensional+Approach+to+the+Corporate+Personhood+Puzzle&author=Susanna%C2%A0Kim+Ripken&publication_year=2009)

\[142\]

Jason Roy, Shane P. Singh, and Patrick Fournier. 2021. The Power of Polls?: A Cross-National Experimental Analysis of the Effects of Campaign Polls. _Elements in Campaigns and Elections_ (September 2021).

[Crossref](https://doi.org/10.1017/9781108877428)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Power+of+Polls%3F%3A+A+Cross-National+Experimental+Analysis+of+the+Effects+of+Campaign+Polls&author=Jason+Roy&author=Shane%C2%A0P.+Singh&author=Patrick+Fournier&publication_year=2021&doi=10.1017%2F9781108877428)

\[143\]

Jason Roy, Shane P. Singh, Patrick Fournier, and Blake Andrew. 2015. An Experimental Analysis of the Impact of Campaign Polls on Electoral Information Seeking. _Electoral Studies_ 40 (December 2015), 146–157.

[Crossref](https://doi.org/10.1016/j.electstud.2015.08.005)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=An+Experimental+Analysis+of+the+Impact+of+Campaign+Polls+on+Electoral+Information+Seeking&author=Jason+Roy&author=Shane%C2%A0P.+Singh&author=Patrick+Fournier&author=Blake+Andrew&publication_year=2015&pages=146-157&doi=10.1016%2Fj.electstud.2015.08.005)

\[144\]

Stuart J. Russell. 2019. _Human Compatible: Artificial Intelligence and the Problem of Control_. Viking, New York.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Human+Compatible%3A+Artificial+Intelligence+and+the+Problem+of+Control&author=Stuart%C2%A0J.+Russell&publication_year=2019)

\[145\]

Osamu Sakura. 2022. Robot and Ukiyo-e: Implications to Cultural Varieties in Human–Robot Relationships. _AI & SOCIETY_ 37, 4 (December 2022), 1563–1573.

[Digital Library](https://dl.acm.org/doi/10.1007/s00146-021-01243-8)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Robot+and+Ukiyo-e%3A+Implications+to+Cultural+Varieties+in+Human%E2%80%93Robot+Relationships&author=Osamu+Sakura&publication_year=2022&pages=1563-1573&doi=10.1007%2Fs00146-021-01243-8)

\[146\]

Peter Salib and Simon Goldstein. 2024. AI Rights for Human Safety. [https://philarchive.org/rec/SALARF](https://philarchive.org/rec/SALARF)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=AI+Rights+for+Human+Safety&author=Peter+Salib&author=Simon+Goldstein&publication_year=2024)

\[147\]

Jean-Paul Sartre. 1972. _The Psychology of the Imagination_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Psychology+of+the+Imagination&author=Jean-Paul+Sartre&publication_year=1972)

\[148\]

Mike Savage. 2024. In defence of sociological description: A ‘world-making’ perspective. _The British Journal of Sociology_ 75, 3 (2024), 360–365. \_eprint: [https://onlinelibrary.wiley.com/doi/pdf/10.1111/1468-4446.13083](https://onlinelibrary.wiley.com/doi/pdf/10.1111/1468-4446.13083).

[Crossref](https://doi.org/10.1111/1468-4446.13083)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=In+defence+of+sociological+description%3A+A+%E2%80%98world-making%E2%80%99+perspective&author=Mike+Savage&publication_year=2024&pages=360-365&doi=10.1111%2F1468-4446.13083)

\[149\]

Howard Schuman and Stanley Presser. 1981. _Questions and Answers in Attitude Surveys: Experiments on Question Form, Wording, and Context_. Academic Press, New York.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Questions+and+Answers+in+Attitude+Surveys%3A+Experiments+on+Question+Form%2C+Wording%2C+and+Context&author=Howard+Schuman&author=Stanley+Presser&publication_year=1981)

\[150\]

Eric Schwitzgebel. 2023. AI Systems Must Not Confuse Users about Their Sentience or Moral Status. _Patterns_ 4, 8 (August 2023), 100818.

[Crossref](https://doi.org/10.1016/j.patter.2023.100818)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=AI+Systems+Must+Not+Confuse+Users+about+Their+Sentience+or+Moral+Status&author=Eric+Schwitzgebel&publication_year=2023&pages=100818&doi=10.1016%2Fj.patter.2023.100818)

\[151\]

Eric Schwitzgebel and Mara Garza. 2015. A Defense of the Rights of Artificial Intelligences: Defense of the Rights of Artificial Intelligences. _Midwest Studies In Philosophy_ 39, 1 (September 2015), 98–119.

[Crossref](https://doi.org/10.1111/misp.12032)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+Defense+of+the+Rights+of+Artificial+Intelligences%3A+Defense+of+the+Rights+of+Artificial+Intelligences&author=Eric+Schwitzgebel&author=Mara+Garza&publication_year=2015&pages=98-119&doi=10.1111%2Fmisp.12032)

\[152\]

Ava Elizabeth Scott, Daniel Neumann, Jasmin Niess, and Paweł W. Woźniak. 2023. Do You Mind? User Perceptions of Machine Consciousness. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–19.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581296)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Do+You+Mind%3F+User+Perceptions+of+Machine+Consciousness&author=Ava%C2%A0Elizabeth+Scott&author=Daniel+Neumann&author=Jasmin+Niess&author=Pawe%C5%82%C2%A0W.+Wo%C5%BAniak&publication_year=2023&pages=1-19&doi=10.1145%2F3544548.3581296)

\[153\]

Martin E. P. Seligman and Mihaly Csikszentmihalyi. 2000. Positive Psychology: An Introduction. _American Psychologist_ 55, 1 (2000), 5–14.

[Crossref](https://doi.org/10.1037/0003-066X.55.1.5)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Positive+Psychology%3A+An+Introduction.&author=Martin+E.%C2%A0P.+Seligman&author=Mihaly+Csikszentmihalyi&publication_year=2000&pages=5-14&doi=10.1037%2F0003-066X.55.1.5)

\[154\]

William Seymour and Max Van Kleek. 2020. Does Siri Have a Soul? Exploring Voice Assistants Through Shinto Design Fictions. In _Extended Abstracts of the 2020 CHI Conference on Human Factors in Computing Systems_. ACM, Honolulu HI USA, 1–12.

[Digital Library](https://dl.acm.org/doi/10.1145/3334480.3381809)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Does+Siri+Have+a+Soul%3F+Exploring+Voice+Assistants+Through+Shinto+Design+Fictions&author=William+Seymour&author=Max+Van%C2%A0Kleek&publication_year=2020&pages=1-12&doi=10.1145%2F3334480.3381809)

\[155\]

Ben Shneiderman, Catherine Plaisant, Maxine Cohen, Steven M. Jacobs, and Niklas Elmqvist. 2017. _Designing the User Interface: Strategies for Effective Human-Computer Interaction (sixth edition ed.)_. Pearson, Boston.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Designing+the+User+Interface%3A+Strategies+for+Effective+Human-Computer+Interaction+%28sixth+edition+ed.%29&author=Ben+Shneiderman&author=Catherine+Plaisant&author=Maxine+Cohen&author=Steven%C2%A0M.+Jacobs&author=Niklas+Elmqvist&publication_year=2017)

\[156\]

Ryan Singel and Kevin Poulsen. 2006. Your Own Personal Internet. _Wired_ (2006).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Your+Own+Personal+Internet&author=Ryan+Singel&author=Kevin+Poulsen&publication_year=2006)

\[157\]

J. P. Singh. 1999. _Leapfrogging Development? The Political Economy of Telecommunications Restructuring_. State University of New York Press, Albany.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Leapfrogging+Development%3F+The+Political+Economy+of+Telecommunications+Restructuring&author=J.%C2%A0P.+Singh&publication_year=1999)

\[158\]

Daniel Solove. 2020. The Myth of the Privacy Paradox. _GW Law Faculty Publications & Other Works_ (January 2020).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Myth+of+the+Privacy+Paradox&author=Daniel+Solove&publication_year=2020)

\[159\]

Robert Sparrow. 2007. Killer Robots. _Journal of Applied Philosophy_ 24, 1 (February 2007), 62–77.

[Crossref](https://doi.org/10.1111/j.1468-5930.2007.00346.x)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Killer+Robots&author=Robert+Sparrow&publication_year=2007&pages=62-77&doi=10.1111%2Fj.1468-5930.2007.00346.x)

\[160\]

Patric R. Spence, Autumn Edwards, and Chad Edwards. 2018. Attitudes, Prior Interaction, and Petitioner Credibility Predict Support for Considering the Rights of Robots. In _Companion of the 2018 ACM/IEEE International Conference on Human-Robot Interaction_. ACM, Chicago IL USA, 243–244.

[Digital Library](https://dl.acm.org/doi/10.1145/3173386.3177071)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Attitudes%2C+Prior+Interaction%2C+and+Petitioner+Credibility+Predict+Support+for+Considering+the+Rights+of+Robots&author=Patric%C2%A0R.+Spence&author=Autumn+Edwards&author=Chad+Edwards&publication_year=2018&pages=243-244&doi=10.1145%2F3173386.3177071)

\[161\]

Steven J. Spencer, Christine Logel, and Paul G. Davies. 2016. Stereotype Threat. _Annual Review of Psychology_ 67, 1 (January 2016), 415–437.

[Crossref](https://doi.org/10.1146/annurev-psych-073115-103235)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Stereotype+Threat&author=Steven%C2%A0J.+Spencer&author=Christine+Logel&author=Paul%C2%A0G.+Davies&publication_year=2016&pages=415-437&doi=10.1146%2Fannurev-psych-073115-103235)

\[162\]

Vasant Srinivasan and Leila Takayama. 2016. Help Me Please: Robot Politeness Strategies for Soliciting Help From Humans. In _Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems_. ACM, San Jose California USA, 4945–4955.

[Digital Library](https://dl.acm.org/doi/10.1145/2858036.2858217)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Help+Me+Please%3A+Robot+Politeness+Strategies+for+Soliciting+Help+From+Humans&author=Vasant+Srinivasan&author=Leila+Takayama&publication_year=2016&pages=4945-4955&doi=10.1145%2F2858036.2858217)

\[163\]

Megan Strait, Lara Vujovic, Victoria Floerke, Matthias Scheutz, and Heather Urry. 2015. Too Much Humanness for Human-Robot Interaction: Exposure to Highly Humanlike Robots Elicits Aversive Responding in Observers. In _Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems_. ACM, Seoul Republic of Korea, 3593–3602.

[Digital Library](https://dl.acm.org/doi/10.1145/2702123.2702415)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Too+Much+Humanness+for+Human-Robot+Interaction%3A+Exposure+to+Highly+Humanlike+Robots+Elicits+Aversive+Responding+in+Observers&author=Megan+Strait&author=Lara+Vujovic&author=Victoria+Floerke&author=Matthias+Scheutz&author=Heather+Urry&publication_year=2015&pages=3593-3602&doi=10.1145%2F2702123.2702415)

\[164\]

Michael T. Stuart and Markus Kneer. 2021. Guilty Artificial Minds: Folk Attributions of Mens Rea and Culpability to Artificially Intelligent Agents. _Proceedings of the ACM on Human-Computer Interaction_ 5, CSCW2 (October 2021), 1–27.

[Digital Library](https://dl.acm.org/doi/10.1145/3479507)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Guilty+Artificial+Minds%3A+Folk+Attributions+of+Mens+Rea+and+Culpability+to+Artificially+Intelligent+Agents&author=Michael%C2%A0T.+Stuart&author=Markus+Kneer&publication_year=2021&pages=1-27&doi=10.1145%2F3479507)

\[165\]

Ilya Sutskever. 2022. It May Be That Today’s Large Neural Networks Are Slightly Conscious.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=It+May+Be+That+Today%E2%80%99s+Large+Neural+Networks+Are+Slightly+Conscious&author=Ilya+Sutskever&publication_year=2022)

\[166\]

Miriam E. Sweeney. 2016. The Ms. Dewey "Experience": Technoculture, Gender, and Race. In _Digital Sociologies_. Policy Press, 401–420.

[Crossref](https://doi.org/10.2307/j.ctt1t89cfr.31)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Ms.+Dewey+%22Experience%22%3A+Technoculture%2C+Gender%2C+and+Race&author=Miriam%C2%A0E.+Sweeney&publication_year=2016&pages=401-420&doi=10.2307%2Fj.ctt1t89cfr.31)

\[167\]

Art Swift. 2017. Americans’ Views on Government Regulation Remain Steady. _[https://news.gallup.com/poll/220400/americans-views-government-regulation-remain-steady.aspx](https://news.gallup.com/poll/220400/americans-views-government-regulation-remain-steady.aspx)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Americans%E2%80%99+Views+on+Government+Regulation+Remain+Steady&author=Art+Swift&publication_year=2017)

\[168\]

Jagadish Thaker, Xiaoquan Zhao, and Anthony Leiserowitz. 2017. Media Use and Public Perceptions of Global Warming in India. _Environmental Communication_ 11, 3 (May 2017), 353–369.

[Crossref](https://doi.org/10.1080/17524032.2016.1269824)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Media+Use+and+Public+Perceptions+of+Global+Warming+in+India&author=Jagadish+Thaker&author=Xiaoquan+Zhao&author=Anthony+Leiserowitz&publication_year=2017&pages=353-369&doi=10.1080%2F17524032.2016.1269824)

\[169\]

Sam Thellman, Maartje De Graaf, and Tom Ziemke. 2022. Mental State Attribution to Robots: A Systematic Review of Conceptions, Methods, and Findings. _ACM Transactions on Human-Robot Interaction_ 11, 4 (December 2022), 1–51.

[Digital Library](https://dl.acm.org/doi/10.1145/3526112)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Mental+State+Attribution+to+Robots%3A+A+Systematic+Review+of+Conceptions%2C+Methods%2C+and+Findings&author=Sam+Thellman&author=Maartje+De%C2%A0Graaf&author=Tom+Ziemke&publication_year=2022&pages=1-51&doi=10.1145%2F3526112)

\[170\]

Nitasha Tiku. 2022. The Google Engineer Who Thinks the Company’s AI Has Come to Life. _[https://www.washingtonpost.com/technology/2022/06/11/google-ai-lamda-blake-lemoine/](https://www.washingtonpost.com/technology/2022/06/11/google-ai-lamda-blake-lemoine/)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Google+Engineer+Who+Thinks+the+Company%E2%80%99s+AI+Has+Come+to+Life&author=Nitasha+Tiku&publication_year=2022)

\[171\]

Nitasha Tiku. 2023. Stanford University Just Schooled Congress on AI. _Washington Post_ (August 2023).

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Stanford+University+Just+Schooled+Congress+on+AI&author=Nitasha+Tiku&publication_year=2023)

\[172\]

Chandan Kumar Tiwari, Mohd Abass Bhat, Shagufta Tariq Khan, Rajaswaminathan Subramaniam, and Mohammad Atif Irshad Khan. 2023. What Drives Students toward ChatGPT? An Investigation of the Factors Influencing Adoption and Usage of ChatGPT. _Interactive Technology and Smart Education_ 21, 3 (August 2023), 333–355.

[Crossref](https://doi.org/10.1108/ITSE-04-2023-0061)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=What+Drives+Students+toward+ChatGPT%3F+An+Investigation+of+the+Factors+Influencing+Adoption+and+Usage+of+ChatGPT&author=Chandan%C2%A0Kumar+Tiwari&author=Mohd%C2%A0Abass+Bhat&author=Shagufta%C2%A0Tariq+Khan&author=Rajaswaminathan+Subramaniam&author=Mohammad+Atif%C2%A0Irshad+Khan&publication_year=2023&pages=333-355&doi=10.1108%2FITSE-04-2023-0061)

\[173\]

Suzanne Tolmeijer, Markus Christen, Serhiy Kandul, Markus Kneer, and Abraham Bernstein. 2022. Capable but Amoral? Comparing AI and Human Expert Collaboration in Ethical Decision Making. In _CHI Conference on Human Factors in Computing Systems_. ACM, New Orleans LA USA, 1–17.

[Digital Library](https://dl.acm.org/doi/10.1145/3491102.3517732)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Capable+but+Amoral%3F+Comparing+AI+and+Human+Expert+Collaboration+in+Ethical+Decision+Making&author=Suzanne+Tolmeijer&author=Markus+Christen&author=Serhiy+Kandul&author=Markus+Kneer&author=Abraham+Bernstein&publication_year=2022&pages=1-17&doi=10.1145%2F3491102.3517732)

\[174\]

Kallie Tzelios, Lisa A. Williams, John Omerod, and Eliza Bliss-Moreau. 2022. Evidence of the Unidimensional Structure of Mind Perception. _Scientific Reports_ 12, 1 (November 2022), 18978.

[Crossref](https://doi.org/10.1038/s41598-022-23047-6)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Evidence+of+the+Unidimensional+Structure+of+Mind+Perception&author=Kallie+Tzelios&author=Lisa%C2%A0A.+Williams&author=John+Omerod&author=Eliza+Bliss-Moreau&publication_year=2022&pages=18978&doi=10.1038%2Fs41598-022-23047-6)

\[175\]

Qiaosi Wang, Koustuv Saha, Eric Gregori, David Joyner, and Ashok Goel. 2021. Towards Mutual Theory of Mind in Human-AI Interaction: How Language Reflects What Students Perceive About a Virtual Teaching Assistant. In _Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems_. ACM, Yokohama Japan, 1–14.

[Digital Library](https://dl.acm.org/doi/10.1145/3411764.3445645)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Towards+Mutual+Theory+of+Mind+in+Human-AI+Interaction%3A+How+Language+Reflects+What+Students+Perceive+About+a+Virtual+Teaching+Assistant&author=Qiaosi+Wang&author=Koustuv+Saha&author=Eric+Gregori&author=David+Joyner&author=Ashok+Goel&publication_year=2021&pages=1-14&doi=10.1145%2F3411764.3445645)

\[176\]

Xijing Wang and Eva G. Krumhuber. 2018. Mind Perception of Robots Varies With Their Economic Versus Social Function. _Frontiers in Psychology_ 9 (July 2018), 1230.

[Crossref](https://doi.org/10.3389/fpsyg.2018.01230)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Mind+Perception+of+Robots+Varies+With+Their+Economic+Versus+Social+Function&author=Xijing+Wang&author=Eva%C2%A0G.+Krumhuber&publication_year=2018&pages=1230&doi=10.3389%2Ffpsyg.2018.01230)

\[177\]

Adam Waytz, Kurt Gray, Nicholas Epley, and Daniel M. Wegner. 2010. Causes and Consequences of Mind Perception. _Trends in Cognitive Sciences_ 14, 8 (August 2010), 383–388.

[Crossref](https://doi.org/10.1016/j.tics.2010.05.006)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Causes+and+Consequences+of+Mind+Perception&author=Adam+Waytz&author=Kurt+Gray&author=Nicholas+Epley&author=Daniel%C2%A0M.+Wegner&publication_year=2010&pages=383-388&doi=10.1016%2Fj.tics.2010.05.006)

\[178\]

Adam Waytz, Joy Heafner, and Nicholas Epley. 2014. The Mind in the Machine: Anthropomorphism Increases Trust in an Autonomous Vehicle. _Journal of Experimental Social Psychology_ 52 (May 2014), 113–117.

[Crossref](https://doi.org/10.1016/j.jesp.2014.01.005)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Mind+in+the+Machine%3A+Anthropomorphism+Increases+Trust+in+an+Autonomous+Vehicle&author=Adam+Waytz&author=Joy+Heafner&author=Nicholas+Epley&publication_year=2014&pages=113-117&doi=10.1016%2Fj.jesp.2014.01.005)

\[179\]

Kara Weisman, Carol S. Dweck, and Ellen M. Markman. 2017. Rethinking People’s Conceptions of Mental Life. _Proceedings of the National Academy of Sciences_ 114, 43 (October 2017), 11374–11379.

[Crossref](https://doi.org/10.1073/pnas.1704347114)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Rethinking+People%E2%80%99s+Conceptions+of+Mental+Life&author=Kara+Weisman&author=Carol%C2%A0S.+Dweck&author=Ellen%C2%A0M.+Markman&publication_year=2017&pages=11374-11379&doi=10.1073%2Fpnas.1704347114)

\[180\]

Blay Whitby. 2008. Sometimes It’s Hard to Be a Robot: A Call for Action on the Ethics of Abusing Artificial Agents. _Interacting with Computers_ 20, 3 (May 2008), 326–333.

[Digital Library](https://dl.acm.org/doi/10.1016/j.intcom.2008.02.002)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Sometimes+It%E2%80%99s+Hard+to+Be+a+Robot%3A+A+Call+for+Action+on+the+Ethics+of+Abusing+Artificial+Agents&author=Blay+Whitby&publication_year=2008&pages=326-333&doi=10.1016%2Fj.intcom.2008.02.002)

\[181\]

Rhiannon Williams. 2024. A Chatbot Helped More People Access Mental-Health Services. _[https://www.technologyreview.com/2024/02/05/1087690/a-chatbot-helped-more-people-access-mental-health-services/](https://www.technologyreview.com/2024/02/05/1087690/a-chatbot-helped-more-people-access-mental-health-services/)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=A+Chatbot+Helped+More+People+Access+Mental-Health+Services&author=Rhiannon+Williams&publication_year=2024)

\[182\]

Susan Wyche. 2022. Reimagining the Mobile Phone: Investigating Speculative Approaches to Design in Human-Computer Interaction for Development (HCI4D). _Proceedings of the ACM on Human-Computer Interaction_ 6, CSCW2 (November 2022), 1–27.

[Digital Library](https://dl.acm.org/doi/10.1145/3555648)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Reimagining+the+Mobile+Phone%3A+Investigating+Speculative+Approaches+to+Design+in+Human-Computer+Interaction+for+Development+%28HCI4D%29&author=Susan+Wyche&publication_year=2022&pages=1-27&doi=10.1145%2F3555648)

\[183\]

Xuhai Xu, Anna Yu, Tanya R. Jonker, Kashyap Todi, Feiyu Lu, Xun Qian, João Marcelo Evangelista Belo, Tianyi Wang, Michelle Li, Aran Mun, Te-Yen Wu, Junxiao Shen, Ting Zhang, Narine Kokhlikyan, Fulton Wang, Paul Sorenson, Sophie Kim, and Hrvoje Benko. 2023. XAIR: A Framework of Explainable AI in Augmented Reality. In _Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems_. ACM, Hamburg Germany, 1–30.

[Digital Library](https://dl.acm.org/doi/10.1145/3544548.3581500)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=XAIR%3A+A+Framework+of+Explainable+AI+in+Augmented+Reality&author=Xuhai+Xu&author=Anna+Yu&author=Tanya%C2%A0R.+Jonker&author=Kashyap+Todi&author=Feiyu+Lu&author=Xun+Qian&author=Jo%C3%A3o%C2%A0Marcelo+Evangelista%C2%A0Belo&author=Tianyi+Wang&author=Michelle+Li&author=Aran+Mun&author=Te-Yen+Wu&author=Junxiao+Shen&publication_year=2023&pages=1-30&doi=10.1145%2F3544548.3581500)

\[184\]

Heather Hee Jin Yang, Nathanael Fast, Christian Hildebrand, Donna Hoffman, Jennifer Marie Logg, Heather Hee Jin Yang, and Michael Yeomans. 2020. Resisting Artificial Intelligence: When Do Decision-Makers Avoid or Use Algorithmic Input? _Academy of Management Proceedings_ 2020, 1 (August 2020), 17721.

[Crossref](https://doi.org/10.5465/AMBPP.2020.17721symposium)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Resisting+Artificial+Intelligence%3A+When+Do+Decision-Makers+Avoid+or+Use+Algorithmic+Input%3F&author=Heather+Hee%C2%A0Jin+Yang&author=Nathanael+Fast&author=Christian+Hildebrand&author=Donna+Hoffman&author=Jennifer%C2%A0Marie+Logg&author=Heather+Hee%C2%A0Jin+Yang&author=Michael+Yeomans&publication_year=2020&pages=17721&doi=10.5465%2FAMBPP.2020.17721symposium)

\[185\]

Yaqing Yang, Tony W Li, and Haojian Jin. 2024. On the Feasibility of Predicting Users’ Privacy Concerns Using Contextual Labels and Personal Preferences. In _Proceedings of the CHI Conference on Human Factors in Computing Systems_. ACM, Honolulu HI USA, 1–20.

[Digital Library](https://dl.acm.org/doi/10.1145/3613904.3642500)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=On+the+Feasibility+of+Predicting+Users%E2%80%99+Privacy+Concerns+Using+Contextual+Labels+and+Personal+Preferences&author=Yaqing+Yang&author=Tony%C2%A0W+Li&author=Haojian+Jin&publication_year=2024&pages=1-20&doi=10.1145%2F3613904.3642500)

\[186\]

YouGov. 2023. The AI Policy Institute Toplines. _[https://archive.ph/UBR7K](https://archive.ph/UBR7K)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+AI+Policy+Institute+Toplines&author=YouGov&publication_year=2023)

\[187\]

YouGov. 2023. How Concerned, If at All, Are You about the Possibility That AI Will Cause the End of the Human Race on Earth? \| Daily Question. _[https://today.yougov.com/topics/technology/survey-results/daily/2023/04/03/ad825/3](https://today.yougov.com/topics/technology/survey-results/daily/2023/04/03/ad825/3)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=How+Concerned%2C+If+at+All%2C+Are+You+about+the+Possibility+That+AI+Will+Cause+the+End+of+the+Human+Race+on+Earth%3F+%7C+Daily+Question&author=YouGov&publication_year=2023)

\[188\]

YouGov. 2023. More than 1,000 Technology Leaders Recently Signed an Open Letter Calling on Researchers to Pause Development of Certain Large-Scale AI Systems for at Least Six Months World-Wide, Citing Fears of the “Profound Risks to Society and Humanity.” Would You Support or Oppose a Six-Month Pause on Some Kinds of AI Development? \| Daily Question. _[https://today.yougov.com/topics/technology/survey-results/daily/2023/04/03/ad825/2](https://today.yougov.com/topics/technology/survey-results/daily/2023/04/03/ad825/2)_.

[Google Scholar](https://scholar.google.com/scholar_lookup?title=More+than+1%2C000+Technology+Leaders+Recently+Signed+an+Open+Letter+Calling+on+Researchers+to+Pause+Development+of+Certain+Large-Scale+AI+Systems+for+at+Least+Six+Months+World-Wide%2C+Citing+Fears+of+the+%E2%80%9CProfound+Risks+to+Society+and+Humanity.%E2%80%9D+Would+You+Support+or+Oppose+a+Six-Month+Pause+on+Some+Kinds+of+AI+Development%3F+%7C+Daily+Question&author=YouGov&publication_year=2023)

\[189\]

Robert B. Zajonc. 1968. Attitudinal Effects of Mere Exposure. _Journal of Personality and Social Psychology_ 9, 2, Pt.2 (1968), 1–27.

[Crossref](https://doi.org/10.1037/h0025848)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Attitudinal+Effects+of+Mere+Exposure.&author=Robert%C2%A0B.+Zajonc&publication_year=1968&pages=1-27&doi=10.1037%2Fh0025848)

\[190\]

Alice Qian Zhang, Ryland Shaw, Jacy Reese Anthis, Ashlee Milton, Emily Tseng, Jina Suh, Lama Ahmad, Ram Shankar Siva Kumar, Julian Posada, Benjamin Shestakofsky, Sarah T. Roberts, and Mary L. Gray. 2024. The Human Factor in AI Red Teaming: Perspectives from Social and Collaborative Computing. arxiv: [https://arXiv.org/abs/2407.07786](https://arxiv.org/abs/2407.07786) \[cs\]

[Digital Library](https://dl.acm.org/doi/10.1145/3678884.3687147)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=The+Human+Factor+in+AI+Red+Teaming%3A+Perspectives+from+Social+and+Collaborative+Computing&author=Alice%C2%A0Qian+Zhang&author=Ryland+Shaw&author=Jacy%C2%A0Reese+Anthis&author=Ashlee+Milton&author=Emily+Tseng&author=Jina+Suh&author=Lama+Ahmad&author=Ram+Shankar%C2%A0Siva+Kumar&author=Julian+Posada&author=Benjamin+Shestakofsky&author=Sarah%C2%A0T.+Roberts&author=Mary%C2%A0L.+Gray&publication_year=2024&doi=10.1145%2F3678884.3687147)

\[191\]

Yixuan Zhang, Yimeng Wang, Nutchanon Yongsatianchot, Joseph D Gaggiano, Nurul M Suhaimi, Anne Okrah, Miso Kim, Jacqueline Griffin, and Andrea G Parker. 2024. Profiling the Dynamics of Trust & Distrust in Social Media: A Survey Study. In _Proceedings of the CHI Conference on Human Factors in Computing Systems_. ACM, Honolulu HI USA, 1–24.

[Digital Library](https://dl.acm.org/doi/10.1145/3613904.3642927)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Profiling+the+Dynamics+of+Trust+%26+Distrust+in+Social+Media%3A+A+Survey+Study&author=Yixuan+Zhang&author=Yimeng+Wang&author=Nutchanon+Yongsatianchot&author=Joseph%C2%A0D+Gaggiano&author=Nurul%C2%A0M+Suhaimi&author=Anne+Okrah&author=Miso+Kim&author=Jacqueline+Griffin&author=Andrea%C2%A0G+Parker&publication_year=2024&pages=1-24&doi=10.1145%2F3613904.3642927)

\[192\]

John Zoshak and Kristin Dew. 2021. Beyond Kant and Bentham: How Ethical Theories Are Being Used in Artificial Moral Agents. In _Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems_. ACM, Yokohama Japan, 1–15.

[Digital Library](https://dl.acm.org/doi/10.1145/3411764.3445102)

[Google Scholar](https://scholar.google.com/scholar_lookup?title=Beyond+Kant+and+Bentham%3A+How+Ethical+Theories+Are+Being+Used+in+Artificial+Moral+Agents&author=John+Zoshak&author=Kristin+Dew&publication_year=2021&pages=1-15&doi=10.1145%2F3411764.3445102)

## Cited By

[View all](https://dl.acm.org/action/ajaxShowCitedBy?doi=10.1145/3706598.3713329 "View all cited by in new tab")

- Kelly RSaeghe P(2026)Consciousness Commitments in Research, Policy, and Design: the LUCID Framework for Locating Underlying Commitments and Implicit DefinitionsAdjunct Proceedings of the 14th Nordic Conference on Human-Computer Interaction10.1145/3821402.3830120(1-8)Online publication date: 3-Oct-2026
[https://dl.acm.org/doi/10.1145/3821402.3830120](https://dl.acm.org/doi/10.1145/3821402.3830120)

- Ford D(2026)Promotion and ParadoxAI Characters10.1515/9783112249581-005(107-132)Online publication date: 30-Sep-2026
[https://doi.org/10.1515/9783112249581-005](https://doi.org/10.1515/9783112249581-005)

- Liew TTan SLee YGan CChan T(2026)Large language model attributes and perceived moral agency of artificial moral advisorsFrontiers in Artificial Intelligence10.3389/frai.2026.1901532**9**Online publication date: 23-Sep-2026
[https://doi.org/10.3389/frai.2026.1901532](https://doi.org/10.3389/frai.2026.1901532)

- Show More Cited By

## Index Terms

Index Terms (Premium feature)

1. Perceptions of Sentient AI and Other Digital Minds: Evidence from the AI, Morality, and Sentience (AIMS) Survey

1. [Human-centered computing](https://dl.acm.org/doi/full/10.1145/3706598.3713329#)



      1. [Human computer interaction (HCI)](https://dl.acm.org/doi/full/10.1145/3706598.3713329#)



         1. [Empirical studies in HCI](https://dl.acm.org/doi/full/10.1145/3706598.3713329#)

         2. [HCI theory, concepts and models](https://dl.acm.org/doi/full/10.1145/3706598.3713329#)

## Recommendations

Recommendations (Premium feature)

- [**Mental Models of Autonomy and Sentience Shape Reactions to AI**](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Mental Models of Autonomy and Sentience Shape Reactions to AI")

CHI '26: Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems







Narratives about artificial intelligence (AI) entangle autonomy, the capacity to self-govern,
with sentience, the capacity to sense and feel. AI agents that perform tasks autonomously
and companions that recognize and express emotions may activate mental ...







[Read More](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Read More")

- [**Mind in the Machine? Cross-Disciplinary Perceptions of Consciousness in Artificial Intelligence**](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Mind in the Machine? Cross-Disciplinary Perceptions of Consciousness in Artificial Intelligence")

CHI '26: Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems







As AI systems increasingly display human-like behavior, people often attribute consciousness
to these machines, raising questions about anthropomorphism, ethics, and design. We
report findings from an online survey ( _N_ =553), including academics from the ...







[Read More](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Read More")

- [**Robots, Chatbots, Self-Driving Cars: Perceptions of Mind and Morality Across Artificial Intelligences**](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Robots, Chatbots, Self-Driving Cars: Perceptions of Mind and Morality Across Artificial Intelligences")

CHI '25: Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems







AI systems have rapidly advanced, diversified, and proliferated, but our knowledge
of people’s perceptions of mind and morality in them is limited, despite its importance
for outcomes such as whether people trust AIs and how they assign responsibility for
...







[Read More](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Read More")


## Comments

Comments (Premium feature)

Disqus Comments

We were unable to load Disqus. If you are a moderator please see our [troubleshooting guide](https://docs.disqus.com/help/83/).

## DL Comment Policy

Comments should be relevant to the contents of this article, (sign in required).

Got it

- [Share](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3706598.3713329&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&t_d=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)

  - Tweet this discussion
  - Share this discussion on Facebook
  - Share this discussion via email
  - Copy link to discussion

  - [Best](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3706598.3713329&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&t_d=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)
  - [Newest](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3706598.3713329&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&t_d=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)
  - [Oldest](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3706598.3713329&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&t_d=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)

Nothing in this discussion yet.

[Load more comments](https://disqus.com/embed/comments/?base=default&f=acm-prod&t_i=10.1145%2F3706598.3713329&t_u=https%3A%2F%2Fdl.acm.org%2Fdoi%2Ffull%2F10.1145%2F3706598.3713329&t_d=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&t_t=Perceptions%20of%20Sentient%20AI%20and%20Other%20Digital%20Minds%3A%20Evidence%20from%20the%20AI%2C%20Morality%2C%20and%20Sentience%20(AIMS)%20Survey%20%7C%20Proceedings%20of%20the%202025%20CHI%20Conference%20on%20Human%20Factors%20in%20Computing%20Systems&s_o=default#)

### Information

#### Published In

![cover image ACM Conferences](https://dl.acm.org/cms/asset/1909fe6d-d0a7-4568-87af-7f2e65de827e/3706598.cover.jpg)

CHI '25: Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems

April 2025

23705 pages

ISBN:9798400713941

DOI:10.1145/3706598

- **Editors:**
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Naomi Yamashita](https://dl.acm.org/profile/99661567625 "Naomi Yamashita"),
- [![Author Picture](https://dl.acm.org/cms/asset/e2578a2a-e1f7-466b-ba8e-ecd751eafb79/vanessa-1.jpg)Vanessa Evers](https://dl.acm.org/profile/81100133286 "Vanessa Evers"),
- [![Author Picture](https://dl.acm.org/cms/asset/18af9451-c65d-4234-ace4-874ee95ad7ea/me_202010.jpg)Koji Yatani](https://dl.acm.org/profile/81100158260 "Koji Yatani"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Xianghua (Sharon) Ding](https://dl.acm.org/profile/99661566428 "Xianghua (Sharon) Ding"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Bongshin Lee](https://dl.acm.org/profile/99661567600 "Bongshin Lee"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Marshini Chetty](https://dl.acm.org/profile/99661569005 "Marshini Chetty"),
- [![Author Picture](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)Phoebe Toups-Dugas](https://dl.acm.org/profile/99661988201 "Phoebe Toups-Dugas")

Copyright © 2025 Copyright held by the owner/author(s).

This work is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

#### Sponsors

- [SIGCHI: ACM Special Interest Group on Computer-Human Interaction](https://dl.acm.org/sig/sigchi)

#### Publisher

Association for Computing Machinery

New York, NY, United States

#### Publication History

**Published**: 25 April 2025

#### Check for updates

[Check for updates on crossmark](https://dl.acm.org/doi/full/10.1145/3706598.3713329# "Check for updates on crossmark")

#### Badges

- ![](https://dl.acm.org/userimages/na101/home/literatum/publisher/acm/classification/LinkedImages/awarded-papers/honorable-mention/icon-large_201811150829.jpg)Honorable Mention


#### Author Tags

1. [Digital minds](https://dl.acm.org/keyword/Digital+minds?expand=all)
2. [human-AI interaction](https://dl.acm.org/keyword/human-AI+interaction?expand=all)
3. [mind perception](https://dl.acm.org/keyword/mind+perception?expand=all)
4. [anthropomorphism](https://dl.acm.org/keyword/anthropomorphism?expand=all)
5. [morality](https://dl.acm.org/keyword/morality?expand=all)
6. [sociology](https://dl.acm.org/keyword/sociology?expand=all)
7. [psychology](https://dl.acm.org/keyword/psychology?expand=all)
8. [survey](https://dl.acm.org/keyword/survey?expand=all)
9. [public opinion](https://dl.acm.org/keyword/public+opinion?expand=all)

#### Qualifiers

- Research-article

#### Conference

CHI '25

Sponsor:

- [SIGCHI](https://dl.acm.org/sig/sigchi)

[CHI 2025: CHI Conference on Human Factors in Computing Systems](https://chi2025.acm.org/)

April 26 - May 1, 2025

Yokohama, Japan

#### Acceptance Rates

CHI '25 Paper Acceptance Rate Not Available

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

[View Article Metrics](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab-metrics-inner)

### Bibliometrics

#### Article Metrics

- 25

Total Citations
[View Citations](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab-citations)
- 8,489

Total Downloads


- Downloads (Last 12 months)Advanced metrics (Premium feature)...
- Downloads (Last 6 weeks) Advanced metrics (Premium feature)...

Reflects downloads up to 02 Nov 2026

#### Other Metrics

[View Author Metrics](https://dl.acm.org/doi/full/10.1145/3706598.3713329#tab-contributors)

### Citations

## Cited By

[View all](https://dl.acm.org/action/ajaxShowCitedBy?doi=10.1145/3706598.3713329 "View all cited by in new tab")

- Kelly RSaeghe P(2026)Consciousness Commitments in Research, Policy, and Design: the LUCID Framework for Locating Underlying Commitments and Implicit DefinitionsAdjunct Proceedings of the 14th Nordic Conference on Human-Computer Interaction10.1145/3821402.3830120(1-8)Online publication date: 3-Oct-2026
[https://dl.acm.org/doi/10.1145/3821402.3830120](https://dl.acm.org/doi/10.1145/3821402.3830120)

- Ford D(2026)Promotion and ParadoxAI Characters10.1515/9783112249581-005(107-132)Online publication date: 30-Sep-2026
[https://doi.org/10.1515/9783112249581-005](https://doi.org/10.1515/9783112249581-005)

- Liew TTan SLee YGan CChan T(2026)Large language model attributes and perceived moral agency of artificial moral advisorsFrontiers in Artificial Intelligence10.3389/frai.2026.1901532**9**Online publication date: 23-Sep-2026
[https://doi.org/10.3389/frai.2026.1901532](https://doi.org/10.3389/frai.2026.1901532)

- Anthis JBrynjolfsson EEvans J(2026)Method, Mind, and Morality: How People Make Sense of Artificial IntelligenceProceedings of the ACM on Human-Computer Interaction10.1145/3816971**10**:6(1-41)Online publication date: 23-Sep-2026
[https://dl.acm.org/doi/10.1145/3816971](https://dl.acm.org/doi/10.1145/3816971)

- Ivvala PBayramova ARoberts CEdwards DRillie I(2026)Development of a theoretical model for calibrating trust in AI to augment highways safetySmart and Sustainable Built Environment10.1108/SASBE-05-2026-0485(1-36)Online publication date: 23-Sep-2026
[https://doi.org/10.1108/SASBE-05-2026-0485](https://doi.org/10.1108/SASBE-05-2026-0485)

- Ladak APauketat JAnthis JLoughnan SWilks M(2026)SubstratismComputers in Human Behavior10.1016/j.chb.2026.109120**185**:COnline publication date: 18-Aug-2026
[https://dl.acm.org/doi/10.1016/j.chb.2026.109120](https://dl.acm.org/doi/10.1016/j.chb.2026.109120)

- Bariach BSchoenegger PBhaskar MSuleyman M(2026)Seemingly conscious AI risksAI and Ethics10.1007/s43681-026-01294-x**6**:5Online publication date: 10-Aug-2026
[https://doi.org/10.1007/s43681-026-01294-x](https://doi.org/10.1007/s43681-026-01294-x)

- Li JHuang JNi B(2026)Dimensions of AI de-anthropomorphization based on impression integration theoryTechnology in Society10.1016/j.techsoc.2026.103352**87**(103352)Online publication date: Aug-2026
[https://doi.org/10.1016/j.techsoc.2026.103352](https://doi.org/10.1016/j.techsoc.2026.103352)

- Buzato MMestre-Mestre Ede Lima-Lopes RKoga J(2026)“When Machines Care”: The Language of Intimacy and the Illusion of Reciprocity in Human–AI RelationshipsCorpus Pragmatics10.1007/s41701-026-00251-7**10**:1Online publication date: 11-Jul-2026
[https://doi.org/10.1007/s41701-026-00251-7](https://doi.org/10.1007/s41701-026-00251-7)

- Machidon O(2026)Forgetting how to say “Thou”: artificial intelligence and the crisis of relationAI and Ethics10.1007/s43681-026-01225-w**6**:4Online publication date: 26-Jun-2026
[https://doi.org/10.1007/s43681-026-01225-w](https://doi.org/10.1007/s43681-026-01225-w)

- Show More Cited By

### Share

#### Share this Publication link

Copy Link

Copied!

Copying failed.

#### Share on social media

[X](https://dl.acm.org/#twitter "Share on X") [LinkedIn](https://dl.acm.org/#linkedin "Share on LinkedIn") [Reddit](https://dl.acm.org/#reddit "Share on Reddit") [Facebook](https://dl.acm.org/#facebook "Share on Facebook") [Threads](https://dl.acm.org/#threads "Share on Threads") [email](https://dl.acm.org/#email "Share on email")

#### Affiliations

![](https://dl.acm.org/cms/asset/61de40f5-64b5-421f-b85c-ec064dcba108/anthis_headshot_steps__square__zoomed_.jpg)

Jacy ReeseAnthis

University of Chicago, Chicago, USA [jacy@sentienceinstitute.org](mailto:jacy@sentienceinstitute.org)

[https://orcid.org/0000-0002-4684-348X](https://orcid.org/0000-0002-4684-348X)

[View Profile](https://dl.acm.org/profile/99660551475)

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

Janet V.T.Pauketat

Sentience Institute, New York, USA [janet@sentienceinstitute.org](mailto:janet@sentienceinstitute.org)

[https://orcid.org/0000-0003-3280-3345](https://orcid.org/0000-0003-3280-3345)

[View Profile](https://dl.acm.org/profile/99660553262)

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

AliLadak

University of Edinburgh, Edinburgh, United Kingdom [ali@sentienceinstitute.org](mailto:ali@sentienceinstitute.org)

[https://orcid.org/0000-0003-1039-5774](https://orcid.org/0000-0003-1039-5774)

[View Profile](https://dl.acm.org/profile/99661217032)

![](https://dl.acm.org/pb-assets/icons/DOs/default-profile-1543932446943.svg)

AikaterinaManoli

Max Planck Institute for Human Cognitive and Brain Sciences, Leipzig, Germany [katerina@sentienceinstitute.org](mailto:katerina@sentienceinstitute.org)

[https://orcid.org/0000-0003-2562-0380](https://orcid.org/0000-0003-2562-0380)

[View Profile](https://dl.acm.org/profile/99661567226)

[View full text](https://dl.acm.org/doi/full/10.1145/3706598.3713329) \| [Download PDF](https://dl.acm.org/doi/pdf/10.1145/3706598.3713329?download=true)

xrefBack.goTo

xrefBack.goTo

Request permissionsExpand All

Collapse

Expand Table

Show all references

SHOW ALL BOOKS

[Authors Info & Affiliations](about:blank#tab-contributors)

[View Table of Contents](https://dl.acm.org/doi/proceedings/10.1145/3706598)

Your Search Results Download Request

We are preparing your search results for download ...

We will inform you here when the file is ready.

[Download now!](https://dl.acm.org/doi/full/10.1145/3706598.3713329#)

Your Search Results Download Request

Your file of search results citations is now ready.

[Download now!](https://dl.acm.org/doi/full/10.1145/3706598.3713329#)

Your Search Results Download Request

Your search export query has expired. Please try again.

Copy link

✓

Thanks for sharing!

Find any service

[AddToAny](https://www.addtoany.com/ "Share Buttons")

[More…](https://dl.acm.org/doi/full/10.1145/3706598.3713329#addtoany "Show all")

A2A