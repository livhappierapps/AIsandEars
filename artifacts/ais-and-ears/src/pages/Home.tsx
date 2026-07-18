import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useVerifyCheckout, getVerifyCheckoutQueryKey } from "@workspace/api-client-react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar, type TabId } from "@/components/layout/TabBar";
import { HomeTab } from "@/pages/tabs/HomeTab";

const ConversationFeed = lazy(() => import("@/components/feed/ConversationFeed").then(m => ({ default: m.ConversationFeed })));
const PackagesTab = lazy(() => import("@/pages/tabs/PackagesTab").then(m => ({ default: m.PackagesTab })));
const SettingsTab = lazy(() => import("@/pages/tabs/SettingsTab").then(m => ({ default: m.SettingsTab })));

interface DirectSession {
  valid: boolean;
  tier: string;
  sessionId: string;
  expiresAt: string | null;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [directSession, setDirectSession] = useState<DirectSession | null>(null);

  // Handle Whop success redirects — Whop returns ?success=true&tier=audio-monthly&membership_id=mem_xxx
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const membershipId = params.get("membership_id");
    const tier = params.get("tier");
    const cancelled = params.get("cancelled");

    if (success === "true" && membershipId && tier) {
      // Use membership_id as the session identifier for Whop verification
      setSessionId(`whop_${membershipId}_${tier}`);
      window.history.replaceState({}, "", window.location.pathname);
    } else if (success === "true" && tier) {
      // Fallback: no membership_id in redirect — try tier-only path
      setSessionId(`tier_${tier}`);
      window.history.replaceState({}, "", window.location.pathname);
    } else if (cancelled) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Build verify params based on what Whop returned
  const verifyParams = (() => {
    if (!sessionId) return { membership_id: "", tier: "" };
    if (sessionId.startsWith("whop_")) {
      const parts = sessionId.replace("whop_", "").split("_");
      const tier = parts.pop() ?? "";
      const membershipId = parts.join("_");
      return { membership_id: membershipId, tier };
    }
    if (sessionId.startsWith("tier_")) {
      return { membership_id: "", tier: sessionId.replace("tier_", "") };
    }
    return { membership_id: sessionId, tier: "" };
  })();

  const verifyQuery = useVerifyCheckout(verifyParams as any, {
    query: { queryKey: getVerifyCheckoutQueryKey(verifyParams as any), enabled: !!sessionId && !directSession, retry: false },
  });

  const handleCloseFeed = () => {
    setSessionId(null);
    setDirectSession(null);
    setLocation("/");
  };

  const activeSession: DirectSession | null =
    directSession ??
    (verifyQuery.isSuccess && verifyQuery.data?.valid
      ? {
          valid: true,
          tier: verifyQuery.data.tier,
          sessionId: verifyQuery.data.sessionId,
          expiresAt: verifyQuery.data.expiresAt ?? null,
        }
      : null);

  const isVerifying = !!sessionId && !directSession && verifyQuery.isLoading;
  const isVerifyError = !!sessionId && !directSession && verifyQuery.isError;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden">
      <Helmet>
        <title>AIs&amp;Ears — Talk Directly to Leo, Your AI Companion</title>
        <meta name="description" content="Give Leo direct mic and camera access — real-time AI voice powered by xAI Grok. No transcripts. No filters. No middlemen. From $2.99 per session." />
        <link rel="canonical" href="https://livhappierapps.com/apps/ais-and-ears" />
        <meta property="og:url" content="https://livhappierapps.com/apps/ais-and-ears" />
        <meta property="og:title" content="AIs&amp;Ears — Talk Directly to Leo, Your AI Companion" />
        <meta property="og:description" content="Give Leo direct mic and camera access — real-time AI voice powered by xAI Grok. No transcripts. No filters. No middlemen. From $2.99 per session." />
        <meta name="twitter:title" content="AIs&amp;Ears — Talk Directly to Leo, Your AI Companion" />
        <meta name="twitter:description" content="Give Leo direct mic and camera access — real-time AI voice powered by xAI Grok. No transcripts. No filters. No middlemen. From $2.99 per session." />
      </Helmet>

      <Navbar />

      {/* Main content — padded for top navbar (64px) and bottom tab bar (64px) */}
      <main className="flex-1 flex flex-col pt-16 pb-16 relative z-10">

        {/* OVERLAY: Verifying payment */}
        {isVerifying && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin" />
              <div className="absolute inset-2 border-b-2 border-primary/50 rounded-full animate-spin [animation-direction:reverse]" />
              <img
                src={`${import.meta.env.BASE_URL}images/ai-banner.jpg`}
                alt="AI Core"
                className="absolute inset-2 rounded-full object-cover animate-pulse"
              />
            </div>
            <h2 className="text-2xl font-display font-light text-glow">Verifying Uplink...</h2>
          </div>
        )}

        {/* OVERLAY: Verification failed */}
        {isVerifyError && (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl border-destructive/50 text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-display font-light mb-2">Authorization Failed</h2>
              <p className="text-muted-foreground mb-6">
                {(verifyQuery.error as any)?.error || "Could not verify your payment session."}
              </p>
              <Button variant="outline" onClick={() => { setSessionId(null); setDirectSession(null); }}>
                <RefreshCcw className="w-4 h-4 mr-2" /> Return
              </Button>
            </div>
          </div>
        )}

        {/* OVERLAY: Active conversation with Leo */}
        <AnimatePresence>
          {activeSession && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="flex-1 flex flex-col"
            >
              <Suspense fallback={null}>
                <ConversationFeed
                  sessionId={activeSession.sessionId}
                  tier={activeSession.tier}
                  expiresAt={activeSession.expiresAt}
                  onClose={handleCloseFeed}
                />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THREE-TAB CONTENT — hidden when feed is active */}
        {!activeSession && !isVerifying && !isVerifyError && (
          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <HomeTab />
              </motion.div>
            )}
            {activeTab === "packages" && (
              <motion.div
                key="packages"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <Suspense fallback={null}><PackagesTab /></Suspense>
              </motion.div>
            )}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col"
              >
                <Suspense fallback={null}><SettingsTab /></Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        )}

      </main>

      {/* Bottom tab bar — hidden during active session */}
      {!activeSession && (
        <TabBar active={activeTab} onChange={setActiveTab} />
      )}
    </div>
  );
}
