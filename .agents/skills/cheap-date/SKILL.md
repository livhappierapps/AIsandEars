---
name: cheap-date
description: Keep Replit agent costs as low as possible on every task. Research before building to find the fastest/cheapest path. Minimize tool calls, file reads, and compute time. Recommend cheaper agent modes when appropriate. Use when the user mentions cost, credits, budget, "keep it cheap", "cheap date", or before starting any non-trivial task. Also activate proactively on any task that looks expensive before it starts.
---

# Cheap Date — Cost-First Engineering

## The Bill Explained (Read This First)

Replit charges **effort-based pricing** — the more files I read, the more tools I call, the more I explore, the more it costs. Cost scales with:

- **Number of tool calls** (reads, writes, edits, shell commands)
- **Time/compute** spent per turn
- **Subagents spawned** (each one costs as much as a mini task)
- **Model used** (Lite < Economy < Power, roughly 3–5x cost difference)

**The single biggest lever the user controls: Agent Mode.** Not in my settings — in the user's UI.

---

## Step 1 — Tell the User Which Mode to Use

Before any task, output this quick recommendation in the chat:

| Task type | Tell user to use |
|---|---|
| Typo, one-line fix, color change | **Lite mode** (cheapest) |
| Normal feature, bug fix, adding a route | **Economy mode** (default, ~3x cheaper than Power) |
| Architecture change, new integration, complex debug | **Economy mode** first; upgrade to Power only if it fails |
| Planning/scoping (no code) | **Plan mode** — this is nearly free; always suggest it before big builds |

Keyboard shortcut the user can share with you: **Cmd+Shift+I** (Mac) / **Ctrl+Shift+I** (Windows) cycles through modes.

---

## Step 2 — Research Before Touching Code

For any task that isn't trivially obvious (more than 2 files to edit), spend one turn researching FIRST:

1. **Check if a library/service already does it** — `webSearch` before writing custom code
2. **Check if it's already in the codebase** — `grep` before reading files
3. **Find the single file that needs changing** — don't read 10 files to find 1
4. **Check for known bugs/gotchas** — one search can prevent an hour of debugging

Cost of one webSearch: nearly zero. Cost of going down the wrong path and rebuilding: high.

---

## Step 3 — Ruthless Scope Control

Before starting, define the **minimum thing that satisfies the request**. Then build only that.

**Expensive habits to kill:**
- Reading files "just to understand context" when grep answers the question
- Running the full test suite when only one file changed
- Using a subagent for a task that takes 2 tool calls
- Adding error handling, logging, and docs to a prototype
- Installing a library when 5 lines of code do the job
- Restarting the whole workflow after a 1-line config change

**Cheap habits to keep:**
- `grep -n "functionName"` before `ReadFile`
- Read only the 10-30 lines that matter, not the whole file
- Batch all independent reads/edits into one turn (parallel calls)
- Use `explore` subagent for wide codebase questions — one call beats 10 reads
- Fix the actual bug, not the bugs nearby

---

## Step 4 — Cheap Alternatives Research Template

Before implementing anything that could be done multiple ways, ask:

1. **Is there a free hosted version?** (e.g. Neon free tier instead of paid DB, Cloudflare Pages instead of Vercel Pro)
2. **Is there a one-liner CLI/service that does this?** (don't build what already ships)
3. **Is there a lighter-weight library?** (don't pull in a framework for one function)
4. **Can this be done with what's already installed?** (check `package.json` before `npm install`)
5. **Is there a static/serverless version?** (static is free; a server costs)

---

## Step 5 — Per-Turn Cost Discipline

Every turn, before calling tools:
- **Can I answer this from memory/context already?** → do it, no tools
- **Do I need the full file or just a function?** → use `start_line`/`end_line`
- **Can I batch these reads?** → yes, always batch independent reads
- **Do I need a subagent here?** → only if the task is truly parallel and complex
- **Will restarting the workflow cost a turn?** → only restart when the change actually requires it

---

## What to Tell the User at the Start of Any Expensive Task

Always open with this before a big build:

> 💰 **Cost check:** This task looks like [Lite / Economy / Power] work.
> Before I start: [one sentence on the cheapest approach I found].
> Estimated scope: [N files to change, M new things to add].
> Want me to proceed?

If the user just asked for something trivial, skip the cost check and just do it in Lite.

---

## Replit-Specific Cost Savers (Always Apply)

- **Plan Mode is nearly free** — for any task with unclear requirements, ask the user to switch to Plan Mode first, scope it, then switch to Build
- **Checkpoints cost money** — the agent creates one at task end; fewer restarts = fewer partial checkpoints
- **Spending limits**: tell users to set a monthly limit at replit.com → Account → Billing → Spending limit (prevents surprise bills)
- **Credit packs**: $300 pack saves $10, $500 pack saves $20 vs buying $100 at a time — tell user if they're buying credits regularly
- **The free daily credits reset daily** — for small tasks, wait for the daily reset if not urgent

---

## Red Flags (Stop and Research First)

If the task involves any of these, research a cheaper path BEFORE starting:

- "Integrate [third-party service]" → check if there's a free tier or existing library
- "Add a database" → check if the existing DB works or if a file/KV store is enough
- "Deploy to [platform]" → check if a free tier exists before suggesting paid
- "Add AI/ML" → check if a simple API call beats building a pipeline
- "Migrate from X to Y" → research if the migration is actually necessary
- "Add monitoring/analytics" → free tiers exist for almost all of these
