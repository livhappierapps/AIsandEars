---
name: storage.createSession signature
description: createSession requires an explicit id field — it does NOT auto-generate a UUID.
---

## Rule
`storage.createSession({ id, stripeSessionId, tier, expiresAt })` — the `id` field is **required** and must be provided by the caller as `crypto.randomUUID()`.

**Why:** The InsertSession Zod schema (generated from the DB schema) marks `id` as a required `z.ZodString`. The DB does not auto-generate it — the application layer owns UUID generation.

**How to apply:** Always pass `id: crypto.randomUUID()` when calling `storage.createSession()`. See `checkout.ts` lines ~131 and ~168 for the canonical pattern.
