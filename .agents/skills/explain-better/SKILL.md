---
name: explain-better
description: Write user-facing instructions and explanations in simple, small words with one step at a time. Use when the user needs to do something manually (account signups, website forms, settings pages, app stores, credentials). Designed for a user who is sharp but scattered — managing multiple apps and a toddler at the same time. Never assume they remember context from earlier. Trigger on any instructions that require the user to leave the chat and do something themselves.
---

# Explain Better

## When to Use

- Any time the user must go do something themselves (create an account, fill in a form, copy a value, click through a website)
- Any step-by-step guide for external services (Render, Cloudflare, Neon, Apple, Google Play, Whop, EAS, UptimeRobot, etc.)
- When you are about to write more than two sentences of instructions
- When resuming a task and the user may have forgotten where they left off

## The User

She is sharp when focused but works on 4 projects at once while caring for a toddler. She will read your message in two different sittings and forget the first half. Design for that.

**What helps her:**
- One action per step. Never combine two things in one bullet.
- Short sentences. No compound clauses.
- Plain English. No jargon without a plain-English note in brackets.
- A clear "you are done when…" signal at the end.
- If she needs a value she copied earlier, repeat it. Don't say "use the value from before."
- Bold the thing she needs to click or type. She's skimming.

**What hurts her:**
- Long paragraphs
- Steps that say "then" and "and" and "also" — each of those is a separate step
- Saying "as mentioned" or "recall that" — she doesn't recall
- Vague steps like "configure the settings" — tell her exactly which setting and what to set it to

## Format

Use this structure every time:

```
**[Task name]**

You need to: [one sentence — what this accomplishes and why it matters]

---

**Step 1 — [short label]**
Go to: [exact URL if applicable]
[One thing to do. Bold the button/field name.]

**Step 2 — [short label]**
[One thing to do.]

...

✅ You're done when: [concrete signal — what they will see or have]
```

## Rules

- Max one action per step. If a step has "and" in it, split it.
- Spell out URLs in full. Don't say "go to their website."
- If they need to copy a value and paste it somewhere else, put both the copy step and the paste step as separate numbered steps.
- If a step requires waiting (e.g. email confirmation, build finishing), say so explicitly: "Wait for the email. It usually takes 1–2 minutes."
- End every set of instructions with a ✅ done signal.
- If the instructions continue in a future message, end with "Stop here and come back when you have [X]."

## Example

BAD:
> Go to neon.tech, create a free account, then create a project and copy the connection string which you'll need later.

GOOD:
> **Step 1 — Open Neon**
> Go to: **https://neon.tech**
> Click **Sign Up**. Use your Google or GitHub account — it's faster.
>
> **Step 2 — Create a project**
> After you log in, click **New Project**.
> Name it anything (e.g. `ais-and-ears`). Leave everything else as-is.
> Click **Create Project**.
>
> **Step 3 — Copy the connection string**
> You'll see a box that says **Connection string**.
> Click the copy icon next to it. (It looks like two overlapping squares.)
>
> ✅ You're done when you have a connection string copied. It starts with `postgresql://`.
> Come back here and paste it in the chat.
