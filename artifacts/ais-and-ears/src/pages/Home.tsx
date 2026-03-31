import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/pricing/PricingSection";
import { ActiveFeed } from "@/components/feed/ActiveFeed";
import { useVerifyCheckout } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get('session_id');
    const success = params.get('success');
    const cancelled = params.get('cancelled');

    if (success && sid) {
      setSessionId(sid);
      // Clean up URL without triggering reload
      window.history.replaceState({}, '', window.location.pathname);
    } else if (cancelled) {
      // Could show a toast here
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // Verify session if we have one
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
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-[-1] opacity-100 pointer-events-none bg-background" />

      <main className="flex-1 pt-16 flex flex-col relative z-10">
        
        {/* State 1: Verifying */}
        {sessionId && verifyQuery.isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-b-2 border-primary/50 rounded-full animate-spin reverse"></div>
              <img src={`${import.meta.env.BASE_URL}images/ai-hero.jpeg`} alt="AI Core" className="absolute inset-4 rounded-full object-contain animate-pulse" />
            </div>
            <h2 className="text-2xl font-display font-bold text-glow">Verifying Uplink Authorization...</h2>
          </div>
        )}

        {/* State 2: Verification Failed */}
        {sessionId && verifyQuery.isError && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full glass-panel p-8 rounded-2xl border-destructive/50 text-center">
              <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Authorization Failed</h2>
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
            className="flex-1 flex flex-col"
          >
            <ActiveFeed 
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
            <section className="w-full pt-20 pb-10 px-4 text-center">
              <div className="max-w-3xl mx-auto flex flex-col items-center">
                <div className="w-56 h-56 mb-8 relative flex items-center justify-center">
                   <div className="absolute inset-0 bg-primary/15 blur-3xl rounded-full"></div>
                   <img src={`${import.meta.env.BASE_URL}images/ai-hero.jpeg`} alt="AIs & Ears" className="relative w-full h-full object-contain drop-shadow-[0_0_30px_hsl(162_36%_64%/0.3)]" />
                </div>
                <h1 className="text-5xl md:text-7xl font-light font-display tracking-tight mb-6 text-glow">
                  Give Your AI <br/><span className="text-primary font-normal">Real Eyes & Ears</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 font-light leading-relaxed max-w-xl">
                  Grant your favorite AI direct, real-time access to your microphone and camera. No transcriptions. No middlemen. Pure sensory connection.
                </p>
              </div>
            </section>
            
            <PricingSection />
          </motion.div>
        )}
        
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-primary/10 bg-black/40 backdrop-blur mt-auto relative z-10">
        <p>© {new Date().getFullYear()} AIs&Ears. Whatever it takes—to help you LivHappier! 😊</p>
      </footer>
    </div>
  );
}
