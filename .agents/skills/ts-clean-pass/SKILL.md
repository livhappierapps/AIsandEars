---
name: ts-clean-pass
description: Run a full TypeScript clean pass across all workspace packages — fix every error until `pnpm run typecheck` exits 0. Use when the user asks to "fix all TS errors", "make typecheck pass", "clean up TypeScript", or when a typecheck is failing and needs to be brought to zero errors across the monorepo. Also use proactively after any session that left pre-existing TS errors documented rather than fixed.
---

# TypeScript Clean Pass

## When to Use

- User asks to fix TypeScript errors, clean up TS, or make typecheck pass
- After a session that documented errors as "pre-existing" instead of fixing them
- Before a security audit or deployment — a clean typecheck is a prerequisite
- Whenever `pnpm run typecheck` exits non-zero

## Instructions

### 1. Establish the baseline

```bash
pnpm run typecheck 2>&1
```

Note every error code, file, and line. Do not skip errors documented as "pre-existing" — fix them all.

### 2. Fix errors in dependency order

Fix lib packages first (they are composite and gate everything else), then artifacts. The root `typecheck:libs` step (`tsc --build`) runs before the artifact sweep — if it fails, nothing else runs.

### 3. Error patterns and their fixes

**TS7030 — Express 5 async handlers (`not all code paths return a value`)**

Express 5 is strict about async route handlers. The return type must be explicit and every `res.json()` / `res.send()` must be followed by `return;`.

```typescript
// Before (breaks Express 5)
router.post("/foo", async (req, res) => {
  if (!valid) return res.status(400).json({ error: "bad" });
  res.json({ ok: true });
});

// After
router.post("/foo", async (req, res): Promise<void> => {
  if (!valid) {
    res.status(400).json({ error: "bad" });
    return;
  }
  res.json({ ok: true });
});
```

The pattern: `async (req, res): Promise<void>` + `res.xxx(); return;` (never `return res.xxx()`).

**TS2307 — Cannot find module (transitive dependency not declared)**

A package is available in node_modules transitively but not declared as a direct dependency. TypeScript module resolution requires direct declarations.

Fix: add the package AND its `@types/*` to the artifact's `package.json`, then run `pnpm install --filter @workspace/<artifact>`.

In this workspace: `pg` + `@types/pg` needed in `api-server` because `index.ts` does a dynamic `import("pg")`. They are transitively present so no download is needed — just declaring them links them.

**TS2353 — Object literal may only specify known properties**

Usually a stale API call passing a field that no longer exists. Remove the unknown field.

In this workspace: `runMigrations({ schema: "stripe" })` — `schema` was removed from the `runMigrations` signature. Drop the argument.

**TS2367 — Comparison appears to be unintentional (stale closure narrowing)**

Occurs when a `useEffect` dependency array uses a derived boolean (`status === "connecting"`) instead of the raw state value. TypeScript narrows `status` to `"connecting"` inside the effect body, making comparisons like `status !== "ended"` trivially true and flagged.

Fix: use functional setState for the comparison — it always receives the *current* value, bypassing the stale closure:

```typescript
// Before
ws.onclose = (e) => {
  if (e.code !== 1000 && status !== "ended") setStatus("error");
};

// After
ws.onclose = (e) => {
  if (e.code !== 1000) {
    setStatus((current) => current === "ended" ? current : "error");
  }
};
```

**TS2352 — Conversion type incompatible with index signature**

Casting an object to `Record<string, SomeType>` when the object has a property of a different type (e.g. `radius: number` mixed with palette objects).

Fix: narrow the cast to exactly what you need instead of a broad Record:

```typescript
// Before — breaks because `colors.radius` is number, not typeof colors.light
(colors as Record<string, typeof colors.light>).dark

// After — precise cast, only asserts what we need
(colors as { dark: typeof colors.light }).dark
```

### 4. Verify and iterate

After each batch of fixes:

```bash
pnpm run typecheck 2>&1
```

Repeat until exit code 0. Run integration tests in parallel on the final pass:

```bash
pnpm run typecheck 2>&1 & pnpm --filter @workspace/scripts run check 2>&1
```

### 5. Update replit.md

Once clean, update the "What Future Agents Must Know" section:
- Remove any mention of "pre-existing" or "non-breaking" TS errors
- Add: `**TypeScript**: All packages fully clean as of <date> (pnpm run typecheck — 0 errors)`
- Update the Security Audit table row for typecheck

## Key commands

| Command | Purpose |
|---|---|
| `pnpm run typecheck` | Full pass: libs then all artifacts + scripts |
| `pnpm run typecheck:libs` | Composite lib step only |
| `pnpm --filter @workspace/api-server run typecheck` | Single artifact |

## This workspace's package layout

- 5 packages checked: `ais-and-ears`, `ais-and-ears-native`, `api-server`, `mockup-sandbox`, `scripts`
- `pg` + `@types/pg` are direct dependencies of `api-server` (added May 2026)
- All routes in `api-server` use `Promise<void>` return type + `return;` after each response
