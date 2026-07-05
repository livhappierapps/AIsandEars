export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-primary/60 text-sm font-body hover:text-primary transition-colors mb-8 inline-block">
          ← Back to AIs&amp;Ears
        </a>

        <h1 className="text-4xl font-display font-light text-glow mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm font-body mb-10">
          Effective June 18, 2026 · Liv Happier Apps
        </p>

        <div className="prose prose-invert prose-sm max-w-none font-body space-y-8 leading-relaxed">

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">What We Collect</h2>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Payment information</strong> — processed exclusively by Whop. We never see or store your card number. We retain only a payment session ID and the tier you purchased.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Session metadata</strong> — session ID, tier, start time, and expiration time. Stored to authenticate your access.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Audio (in transit only)</strong> — your voice streams in real time to xAI's servers. We do not record, store, or transcribe it. Audio exists only in-transit and is discarded once the session ends.
            </p>
            <p className="text-muted-foreground mb-3">
              <strong className="text-foreground">Camera and screen frames (in transit only)</strong> — if you enable Camera or Screen Vision, still frames are sent to xAI's servers every ~3 seconds. We do not store these images.
            </p>
            <div className="glass-panel rounded-xl border border-primary/20 p-4 mt-4">
              <p className="text-primary/80 text-sm">
                We do not store transcripts, audio recordings, or images. We do not build behavioral profiles.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Third-Party Services</h2>
            <p className="text-muted-foreground mb-2">
              <strong className="text-foreground">Whop</strong> — handles all payment processing. Your payment data is governed by{" "}
              <a href="https://whop.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Whop's Privacy Policy</a>.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">xAI</strong> — powers Leo's voice and vision responses. Your real-time audio and frames are transmitted to xAI's API and governed by{" "}
              <a href="https://x.ai/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">xAI's Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Data Retention</h2>
            <div className="glass-panel rounded-xl border border-primary/20 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left px-4 py-3 text-primary/60 font-body font-medium">Data</th>
                    <th className="text-left px-4 py-3 text-primary/60 font-body font-medium">Retention</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-primary/10">
                    <td className="px-4 py-3">Paid session records</td>
                    <td className="px-4 py-3">90 days after session expiry</td>
                  </tr>
                  <tr className="border-b border-primary/10">
                    <td className="px-4 py-3">Audio / camera / screen streams</td>
                    <td className="px-4 py-3">Never stored — real-time transit only</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Payment records</td>
                    <td className="px-4 py-3">Retained by Whop per their policy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Children's Privacy</h2>
            <p className="text-muted-foreground">
              AIs&amp;Ears is intended for users 18 and older. We do not knowingly collect personal information from children under 13. Contact us at{" "}
              <a href="mailto:privacy@livhappierapps.com" className="text-primary hover:underline">privacy@livhappierapps.com</a>{" "}
              if you believe a child has used the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Your Rights</h2>
            <p className="text-muted-foreground">
              You may request access to, or deletion of, your session records at any time. Contact us at{" "}
              <a href="mailto:privacy@livhappierapps.com" className="text-primary hover:underline">privacy@livhappierapps.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Contact</h2>
            <p className="text-muted-foreground">
              Liv Happier Apps ·{" "}
              <a href="mailto:privacy@livhappierapps.com" className="text-primary hover:underline">privacy@livhappierapps.com</a>
              {" "}·{" "}
              <a href="https://livhappierapps.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">livhappierapps.com</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex gap-6 text-xs text-muted-foreground/40 font-body">
          <a href="/terms" className="hover:text-primary/60 transition-colors">Terms of Service</a>
          <a href="/" className="hover:text-primary/60 transition-colors">AIs&amp;Ears</a>
        </div>
      </div>
    </div>
  );
}
