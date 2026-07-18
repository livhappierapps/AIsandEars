import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/context/SettingsContext";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

/**
 * A dead-simple static location hook for SSR prerendering.
 *
 * Wouter's built-in memoryLocation uses useSyncExternalStore without a
 * getServerSnapshot, which React 19's renderToString rejects. This hook
 * returns the path directly — no subscriptions, no external stores —
 * which is all we need for a single static render pass.
 */
function makeStaticHook(path: string) {
  return () => [path, () => {}] as [string, (to: string) => void];
}

export function render(url: string): { html: string; helmet: HelmetServerState | null } {
  const helmetContext: { helmet?: HelmetServerState | null } = {};
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <SettingsProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <WouterRouter hook={makeStaticHook(url)} base="">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/pricing" component={Pricing} />
                <Route path="/privacy" component={PrivacyPolicy} />
                <Route path="/terms" component={TermsOfService} />
              </Switch>
            </WouterRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </SettingsProvider>
    </HelmetProvider>
  );

  return { html, helmet: helmetContext.helmet ?? null };
}
