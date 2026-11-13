import { useState, type FormEvent } from "react";
import { normalizeApiOrigin } from "@workspace/media-utils";
import { KeyRound, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Same-origin unless the API lives on another host (e.g. Render).
const API_BASE = import.meta.env.VITE_API_BASE_URL
  ? normalizeApiOrigin(import.meta.env.VITE_API_BASE_URL)
  : "";

export interface OwnerSession {
  valid: boolean;
  tier: string;
  sessionId: string;
  expiresAt: string | null;
}

/**
 * Small, collapsed "Owner access" link. Posts the private owner pass to
 * /api/owner-pass and hands the resulting session to the same place a
 * verified Whop session goes.
 */
export function OwnerAccess({ onSession }: { onSession: (s: OwnerSession) => void }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim() || busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/owner-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as Partial<OwnerSession> & { error?: string };
      if (!res.ok || !data.sessionId || !data.tier) {
        throw new Error(
          res.status === 404
            ? "Owner access isn't turned on for this server."
            : data.error ?? "That code didn't work.",
        );
      }
      setCode("");
      onSession({ valid: true, tier: data.tier, sessionId: data.sessionId, expiresAt: data.expiresAt ?? null });
    } catch (err) {
      setError(err instanceof Error ? err.message : "That code didn't work.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto mt-6 flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-muted-foreground"
        data-testid="owner-access-toggle"
      >
        <KeyRound className="w-3 h-3" /> Owner access
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-6 w-full max-w-sm px-6 space-y-2" data-testid="owner-access-form">
      <Input
        type="password"
        autoComplete="current-password"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="Owner pass"
        aria-label="Owner pass"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="flex-1" disabled={busy || !code.trim()}>
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
        </Button>
        <Button type="button" size="sm" variant="ghost" onClick={() => { setOpen(false); setError(null); }}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
