import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ConversationFeed } from "@/components/feed/ConversationFeed";
import { useVerifyCheckout } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session_id');
    const success = params.get('success');
    const cancelled = params.get('cancelled');

    if (success && sid) {
      setSessionId(sid);
      window.history.replaceState({}, '', window.location.pathname);
    } else if (cancelled) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const verifyQuery = useVerifyCheckout(
    { session_id: sessionId || '' },
    { query: { enabled: !!sessionId, retry: false } }
  );

  const handleCloseFeed = () => {
    setSessionId(null);
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-x-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col relative z-10">

        {/* State 1: Verifying */}
        {sessionId && verifyQuery.isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center pt-16">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-b-2 border-primary/50 rounded-full animate-spin [animation-direction:reverse]"></div>
              <img
                src={`${import.meta.env.BASE_URL}images/ai-banner.png`}
                alt="AI Core"
                className="absolute inset-2 rounded-full object-cover animate-pulse"
              />
            </div>
            <h2 className="text-2xl font-display font-light text-glow">Verifying Uplink Authorization...</h2>
          </div>
        )}

        {/* State 2: Verification Failed */}
        {sessionId && verifyQuery.isError && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 pt-16">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl border-destructive/50 text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-display font-light mb-2">Authorization Failed</h2>
              <p className="text-muted-foreground mb-6">
                {verifyQuery.error?.error || "Could not verify your payment session. The link may have expired."}
              </p>
              <Button variant="outline" onClick={() => setSessionId(null)}>
                <RefreshCcw className="w-4 h-4 mr-2" /> Return to Tiers
              </Button>
            </div>
          </div>
        )}

        {/* State 3: Active Feed */}
        {sessionId && verifyQuery.isSuccess && verifyQuery.data?.valid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col pt-16"
          >
            <ConversationFeed
              sessionId={verifyQuery.data.sessionId}
              tier={verifyQuery.data.tier}
              expiresAt={verifyQuery.data.expiresAt || null}
              onClose={handleCloseFeed}
            />
          </motion.div>
        )}

        {/* State 4: Landing Page / Pricing */}
        {!sessionId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            {/* Full-width Hero Banner */}
            <div className="relative w-full" style={{ marginTop: '4rem' }}>
              <img
                src={`${import.meta.env.BASE_URL}images/ai-banner.png`}
                alt="AIs & Ears — Give Your AI Real Eyes & Ears"
                className="w-full object-cover"
                style={{ maxHeight: '52vh', objectPosition: 'center top' }}
              />
              {/* Fade bottom into background */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
              {/* Subtle side fades */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
            </div>

            {/* Hero Text */}
            <section className="w-full pb-4 px-4 text-center -mt-8 relative z-10">
              <div className="max-w-3xl mx-auto flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-light font-display tracking-tight mb-5 text-glow">
                  Give Your AI<br />
                  <span className="text-primary font-normal">Real Eyes & Ears</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed max-w-xl">
                  Grant your favorite AI direct, real-time access to your microphone and camera.
                  No transcriptions. No middlemen. Pure sensory connection.
                </p>
              </div>
            </section>

            <PricingSection />
          </motion.div>
        )}

      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-primary/10 bg-background/80 backdrop-blur mt-auto relative z-10">
        <p>© {new Date().getFullYear()} AIs&Ears. Whatever it takes—to help you LivHappier! 😊</p>
      </footer>
    </div>
  );
}
