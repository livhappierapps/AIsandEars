import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useVerifyCheckout } from "@workspace/api-client-react";
import { Navbar } from "@/components/layout/Navbar";
import { TabBar, type TabId } from "@/components/layout/TabBar";
import { ConversationFeed } from "@/components/feed/ConversationFeed";
import { HomeTab } from "@/pages/tabs/HomeTab";
import { PackagesTab } from "@/pages/tabs/PackagesTab";
import { SettingsTab } from "@/pages/tabs/SettingsTab";

interface DirectSession {
  valid: boolean;
  tier: string;
  sessionId: string;
  expiresAt: string | null;
  demo?: boolean;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [directSession, setDirectSession] = useState<DirectSession | null>(null);

  // Handle Stripe success/cancel redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("session_id");
    const success = params.get("success");
    const tier = params.get("tier");
    const cancelled = params.get("cancelled");

    if (success === "true") {
      if (sid && sid.startsWith("cs_")) {
        setSessionId(sid);
      } else if (tier) {
        setSessionId(`link_${tier}`);
      }
      window.history.replaceState({}, "", window.location.pathname);
    } else if (cancelled) {
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  const verifyParams = sessionId?.startsWith("link_")
    ? { session_id: sessionId, tier: sessionId.replace("link_", "") }
    : { session_id: sessionId || "" };

  const verifyQuery = useVerifyCheckout(verifyParams as any, {
    query: { enabled: !!sessionId && !directSession, retry: false },
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
              <ConversationFeed
                sessionId={activeSession.sessionId}
                tier={activeSession.tier}
                expiresAt={activeSession.expiresAt}
                onClose={handleCloseFeed}
              />
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
                <HomeTab onConnect={setDirectSession} />
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
                <PackagesTab onDemoAccess={setDirectSession} />
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
                <SettingsTab />
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
