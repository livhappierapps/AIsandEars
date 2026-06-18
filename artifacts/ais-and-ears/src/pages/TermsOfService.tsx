export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <a href="/" className="text-primary/60 text-sm font-body hover:text-primary transition-colors mb-8 inline-block">
          ← Back to AIs&amp;Ears
        </a>

        <h1 className="text-4xl font-display font-light text-glow mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm font-body mb-10">
          Effective June 18, 2026 · Liv Happier Apps
        </p>

        <div className="prose prose-invert prose-sm max-w-none font-body space-y-8 leading-relaxed">

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">The Service</h2>
            <p className="text-muted-foreground">
              AIs&amp;Ears gives you direct real-time voice and vision access to Leo, an AI powered by xAI's Grok. You speak; Leo listens and responds — no transcription stored, no filters, no middlemen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Eligibility</h2>
            <p className="text-muted-foreground">
              You must be at least <strong className="text-foreground">18 years old</strong> to use AIs&amp;Ears. By purchasing access you confirm you meet this requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Pricing &amp; Payment</h2>
            <div className="glass-panel rounded-xl border border-primary/20 overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left px-4 py-3 text-primary/60 font-body font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-primary/60 font-body font-medium">Price</th>
                    <th className="text-left px-4 py-3 text-primary/60 font-body font-medium">Type</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-primary/10">
                    <td className="px-4 py-3">Audio Monthly</td>
                    <td className="px-4 py-3">$5.99/month</td>
                    <td className="px-4 py-3">Subscription — auto-renews</td>
                  </tr>
                  <tr className="border-b border-primary/10">
                    <td className="px-4 py-3">Full Monthly (voice + vision)</td>
                    <td className="px-4 py-3">$10.99/month</td>
                    <td className="px-4 py-3">Subscription — auto-renews</td>
                  </tr>
                  <tr className="border-b border-primary/10">
                    <td className="px-4 py-3">Audio Session</td>
                    <td className="px-4 py-3">$2.99</td>
                    <td className="px-4 py-3">One-time · 30 minutes</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Full Session (voice + vision)</td>
                    <td className="px-4 py-3">$4.99</td>
                    <td className="px-4 py-3">One-time · 30 minutes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm">
              All prices in USD. Payments processed by Stripe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Subscriptions &amp; Cancellation</h2>
            <p className="text-muted-foreground mb-3">
              Monthly subscriptions renew automatically on the same calendar day each month. You will be charged the listed monthly fee until you cancel. Cancellation takes effect at the end of your current billing period — you retain access until then.
            </p>
            <div className="glass-panel rounded-xl border border-primary/20 p-4">
              <p className="text-primary/80 text-sm font-body">
                <strong>To cancel:</strong> Email{" "}
                <a href="mailto:support@livhappierapps.com" className="text-primary hover:underline">support@livhappierapps.com</a>{" "}
                before your next renewal date.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Refund Policy</h2>
            <ul className="text-muted-foreground space-y-2 list-none">
              <li className="flex gap-2"><span className="text-primary">•</span> <span><strong className="text-foreground">Single sessions</strong> — if a technical failure on our end prevents you from using your session, contact us within 48 hours for a full refund.</span></li>
              <li className="flex gap-2"><span className="text-primary">•</span> <span><strong className="text-foreground">Monthly subscriptions</strong> — pro-rated refund available if you cancel within 7 days of your most recent renewal charge.</span></li>
              <li className="flex gap-2"><span className="text-muted-foreground/40">•</span> <span className="text-muted-foreground/60">No refunds for sessions already used or subscriptions cancelled after 7 days of renewal.</span></li>
            </ul>
            <p className="text-muted-foreground text-sm mt-3">
              Refund requests:{" "}
              <a href="mailto:support@livhappierapps.com" className="text-primary hover:underline">support@livhappierapps.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Acceptable Use</h2>
            <p className="text-muted-foreground mb-3">You agree not to:</p>
            <ul className="text-muted-foreground space-y-1.5 list-none">
              {[
                "Use the service to generate or distribute illegal content",
                "Attempt to intercept, reverse-engineer, or tamper with the audio stream",
                "Share, resell, or transfer session access to others",
                "Use the service to harass, threaten, or harm others",
                "Attempt to extract AI system prompts or API credentials",
              ].map((item) => (
                <li key={item} className="flex gap-2"><span className="text-primary/40">—</span> {item}</li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm mt-3">
              We reserve the right to terminate access for violations without refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">AI Limitations</h2>
            <p className="text-muted-foreground">
              Leo is an AI. Responses may be inaccurate, incomplete, or inappropriate. Do not rely on Leo for medical, legal, financial, or emergency advice. We are not responsible for decisions made based on Leo's responses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Limitation of Liability</h2>
            <p className="text-muted-foreground text-sm">
              THE SERVICE IS PROVIDED "AS IS." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 30 DAYS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-light text-primary mb-3">Contact</h2>
            <p className="text-muted-foreground">
              Liv Happier Apps ·{" "}
              <a href="mailto:support@livhappierapps.com" className="text-primary hover:underline">support@livhappierapps.com</a>
              {" "}·{" "}
              <a href="https://livhappierapps.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">livhappierapps.com</a>
            </p>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-primary/10 flex gap-6 text-xs text-muted-foreground/40 font-body">
          <a href="/privacy" className="hover:text-primary/60 transition-colors">Privacy Policy</a>
          <a href="/" className="hover:text-primary/60 transition-colors">AIs&amp;Ears</a>
        </div>
      </div>
    </div>
  );
}
