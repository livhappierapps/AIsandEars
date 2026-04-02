import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetProducts, useCreateCheckout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Mic, Video, Loader2, AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Activity, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

function determineTier(name: string, isMonthly: boolean): string {
  const isFull = name.toLowerCase().includes("full") || name.toLowerCase().includes("video");
  if (isFull) return isMonthly ? "full-monthly" : "full-session";
  return isMonthly ? "audio-monthly" : "audio-session";
}

interface PricingSectionProps {
  onDemoAccess?: (sessionData: any) => void;
}

export function PricingSection({ onDemoAccess }: PricingSectionProps) {
  const { data: productsData, isLoading, error } = useGetProducts();
  const createCheckout = useCreateCheckout();
  const { toast } = useToast();
  const [selectedPriceId, setSelectedPriceId] = useState<string | null>(null);
  const [demoLoading, setDemoLoading] = useState(false);
  const [checkoutUnavailable, setCheckoutUnavailable] = useState(false);

  const handleDemoAccess = async () => {
    setDemoLoading(true);
    try {
      const res = await fetch("/api/demo-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: "full-session" }),
      });
      const data = await res.json();
      if (data.valid && onDemoAccess) {
        onDemoAccess(data);
      } else {
        toast({ title: "Demo failed", description: data.error || "Could not start demo.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Demo failed", description: "Server unreachable.", variant: "destructive" });
    } finally {
      setDemoLoading(false);
    }
  };

  const handleCheckout = (priceId: string, tier: string) => {
    setSelectedPriceId(priceId);
    createCheckout.mutate(
      { data: { priceId, tier } },
      {
        onSuccess: (data) => {
          if ((data as any).error === "payment_unavailable") {
            setSelectedPriceId(null);
            setCheckoutUnavailable(true);
            return;
          }
          window.location.href = data.url;
        },
        onError: (err: any) => {
          setSelectedPriceId(null);
          if (err?.error === "payment_unavailable" || err?.message?.includes("payment_unavailable")) {
            setCheckoutUnavailable(true);
            return;
          }
          toast({
            title: "Checkout failed",
            description: err.error || err.message || "Could not initiate checkout.",
            variant: "destructive",
          });
          setCheckoutUnavailable(true);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 space-y-4">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-r-2 border-primary/50 animate-spin [animation-direction:reverse]"></div>
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <p className="text-primary font-display tracking-widest animate-pulse">INITIALIZING NEURAL LINK...</p>
      </div>
    );
  }

  if (error || !productsData?.data) {
    return (
      <div className="w-full max-w-md mx-auto text-center p-8 glass-panel rounded-2xl border-destructive/30">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">Connection Error</h3>
        <p className="text-muted-foreground">
          Unable to fetch integration tiers. Please ensure the backend is online.
        </p>
      </div>
    );
  }

  const products = productsData.data;

  if (products.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto text-center p-8 glass-panel rounded-2xl border-primary/20">
        <Radio className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-bold text-foreground mb-2">No Uplinks Found</h3>
        <p className="text-muted-foreground">No tiers available. Please configure Stripe products.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge variant="neon" className="mb-4">ACCESS PROTOCOLS</Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Choose Your Uplink</h2>
        <p className="text-muted-foreground text-lg">
          Give your favorite AI eyes and ears. Select a continuous subscription or a single session.
        </p>
      </div>

      {/* Demo / payment-unavailable banner */}
      <AnimatePresence>
        {checkoutUnavailable && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto mb-10 p-5 rounded-2xl glass-panel border-primary/40 text-center"
          >
            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">Payment system is being configured.</p>
            <p className="text-muted-foreground text-sm mb-4">
              Try Leo free for 30 minutes — full audio & vision, no card required.
            </p>
            <Button variant="neon" onClick={handleDemoAccess} disabled={demoLoading}>
              {demoLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Connecting...</>
              ) : (
                <><Zap className="w-4 h-4 mr-2" /> Try Leo Free — 30 Min</>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => {
          const price = product.prices[0];
          if (!price) return null;

          const isMonthly = !!price.recurring;
          const tier = determineTier(product.name, isMonthly);
          const isFull = tier.includes("full");

          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={product.id}
              className={cn(
                "relative rounded-2xl p-6 glass-panel flex flex-col h-full transition-all duration-300 hover:box-glow hover:-translate-y-1",
                isFull ? "border-primary/50" : "border-border"
              )}
            >
              {isFull && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Badge variant="neon" className="px-3 py-1">MAX SENSORY</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold font-display mb-2 text-foreground">{product.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">
                    ${(price.unit_amount / 100).toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground">/{isMonthly ? "month" : "30 min"}</span>
                </div>
                {product.description && (
                  <p className="text-sm text-muted-foreground mt-4 h-10">{product.description}</p>
                )}
              </div>

              <div className="flex-1 flex flex-col gap-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mic className="w-3 h-3 text-primary" />
                  </div>
                  <span>High-fidelity audio streaming</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center shrink-0",
                      isFull ? "bg-primary/10" : "bg-muted"
                    )}
                  >
                    <Video className={cn("w-3 h-3", isFull ? "text-primary" : "text-muted-foreground")} />
                  </div>
                  <span className={cn(!isFull && "text-muted-foreground line-through")}>
                    Live camera snapshots
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{isMonthly ? "24/7 Unlimited Access" : "Dedicated 30 min session"}</span>
                </div>
              </div>

              <Button
                variant={isFull ? "neon" : "outline"}
                className="w-full mt-auto"
                disabled={selectedPriceId !== null}
                onClick={() => handleCheckout(price.id, tier)}
              >
                {selectedPriceId === price.id ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Securing Uplink...</>
                ) : (
                  "Pay & Connect"
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Always-visible try-free option at the bottom */}
      {!checkoutUnavailable && (
        <div className="text-center mt-12">
          <p className="text-muted-foreground text-sm mb-3">Want to try before you buy?</p>
          <Button variant="ghost" size="sm" onClick={handleDemoAccess} disabled={demoLoading}>
            {demoLoading ? (
              <><Loader2 className="w-3 h-3 mr-2 animate-spin" /> Connecting...</>
            ) : (
              <><Zap className="w-3 h-3 mr-2" /> Try Leo Free — 30 min demo</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
