import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { PricingSection } from "@/components/pricing/PricingSection";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AIs & Ears",
  description:
    "Real-time AI voice companion. Give Leo direct mic and camera access — no transcriptions, no filters, no middlemen.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web, Android",
  url: "https://livhappierapps.com/apps/ais-and-ears",
  offers: [
    {
      "@type": "Offer",
      name: "Audio Session",
      price: "2.99",
      priceCurrency: "USD",
      description: "30-minute single session — high-fidelity audio streaming to Leo",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Full Session",
      price: "4.99",
      priceCurrency: "USD",
      description: "30-minute single session — audio streaming plus live camera snapshots",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Audio Monthly",
      price: "5.99",
      priceCurrency: "USD",
      description: "Monthly subscription — unlimited audio sessions, 24/7 access",
      availability: "https://schema.org/InStock",
    },
    {
      "@type": "Offer",
      name: "Full Monthly",
      price: "10.99",
      priceCurrency: "USD",
      description: "Monthly subscription — unlimited audio and live camera sessions, 24/7 access",
      availability: "https://schema.org/InStock",
    },
  ],
});

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Pricing — AIs&amp;Ears | AI Voice Sessions from $2.99</title>
        <meta
          name="description"
          content="Choose your AIs&amp;Ears uplink. Single sessions from $2.99 or monthly subscriptions from $5.99. Raw PCM16 audio and live camera access for your AI companion Leo."
        />
        <link rel="canonical" href="https://livhappierapps.com/apps/ais-and-ears/pricing" />
        <meta property="og:url" content="https://livhappierapps.com/apps/ais-and-ears/pricing" />
        <meta property="og:title" content="Pricing — AIs&amp;Ears | AI Voice Sessions from $2.99" />
        <meta
          property="og:description"
          content="Choose your AIs&amp;Ears uplink. Single sessions from $2.99 or monthly subscriptions from $5.99. Raw PCM16 audio and live camera access for your AI companion Leo."
        />
        <meta name="twitter:title" content="Pricing — AIs&amp;Ears | AI Voice Sessions from $2.99" />
        <meta
          name="twitter:description"
          content="Choose your AIs&amp;Ears uplink. Single sessions from $2.99 or monthly subscriptions from $5.99."
        />
        <script type="application/ld+json">{JSON_LD}</script>
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-16 pb-12">
        <div className="px-6 pt-6 max-w-lg mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
        </div>

        <div className="px-6 pt-4 pb-2 text-center">
          <h1 className="text-3xl font-display font-light text-glow mb-1">Uplink Packages</h1>
          <p className="text-sm text-muted-foreground">
            Choose a subscription or a single session.
          </p>
        </div>

        <PricingSection />
      </main>

      <footer className="px-6 py-8 border-t border-primary/10">
        <div className="max-w-lg mx-auto flex flex-col items-center gap-3">
          <div className="flex gap-6 text-xs text-muted-foreground/40">
            <a href="/privacy" className="hover:text-primary/60 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary/60 transition-colors">
              Terms of Service
            </a>
            <a
              href="https://livhappierapps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary/60 transition-colors"
            >
              Liv Happier Apps
            </a>
          </div>
          <p className="text-xs text-muted-foreground/20">© 2026 Liv Happier Apps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
