/**
 * Post-build prerender script.
 *
 * Run via: tsx prerender.ts
 * Called automatically after `vite build` as part of the `build` npm script.
 *
 * Strategy
 * --------
 * react-helmet-async v3 injects head tags inline at the TOP of the
 * renderToString output (not into helmetContext.helmet), so extracting them
 * via context is unreliable. Instead:
 *
 *  1. Head metadata is defined statically per route in this script — single
 *     source of truth, 100% reliable for crawlers.
 *  2. The renderToString body is trimmed to start at the first <div so any
 *     inline Helmet tags emitted before the app root are discarded.
 *  3. A post-write validation step asserts that each generated file has the
 *     expected tags in <head> (not in body) and fails the build if not.
 *
 * The <Helmet> components in the React pages continue to work on the client —
 * they update document.title and meta tags on navigation after hydration.
 */

import { build } from "vite";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// vite.config.ts validates PORT and BASE_PATH — provide values for the SSR build
process.env.PORT = process.env.PORT ?? "3000";
process.env.BASE_PATH = process.env.BASE_PATH ?? "/";

// ---------------------------------------------------------------------------
// Per-route static head metadata
// These are injected verbatim into <!--app-head--> in <head>.
// Keep in sync with <Helmet> tags in the React page components.
// ---------------------------------------------------------------------------
const ROUTE_HEAD: Record<string, string> = {
  "/": `
    <title>AIs&amp;Ears — Talk Directly to Leo, Your AI Companion</title>
    <meta name="description" content="Give Leo direct mic and camera access — real-time AI voice powered by xAI Grok. No transcripts. No filters. No middlemen. From $2.99 per session." />
    <link rel="canonical" href="https://livhappierapps.com/apps/ais-and-ears" />
    <meta property="og:url" content="https://livhappierapps.com/apps/ais-and-ears" />
    <meta property="og:title" content="AIs&amp;Ears — Talk Directly to Leo, Your AI Companion" />
    <meta property="og:description" content="Give Leo direct mic and camera access — real-time AI voice powered by xAI Grok. No transcripts. No filters. No middlemen. From $2.99 per session." />
    <meta name="twitter:title" content="AIs&amp;Ears — Talk Directly to Leo, Your AI Companion" />
    <meta name="twitter:description" content="Give Leo direct mic and camera access — real-time AI voice powered by xAI Grok. No transcripts. No filters. No middlemen. From $2.99 per session." />`,

  "/privacy": `
    <title>Privacy Policy — AIs&amp;Ears</title>
    <meta name="description" content="AIs&amp;Ears privacy policy. We do not store audio, video, or transcripts. Only payment session metadata is retained, for 90 days." />
    <link rel="canonical" href="https://livhappierapps.com/apps/ais-and-ears/privacy" />
    <meta property="og:url" content="https://livhappierapps.com/apps/ais-and-ears/privacy" />
    <meta property="og:title" content="Privacy Policy — AIs&amp;Ears" />
    <meta property="og:description" content="AIs&amp;Ears privacy policy. We do not store audio, video, or transcripts. Only payment session metadata is retained, for 90 days." />
    <meta name="twitter:title" content="Privacy Policy — AIs&amp;Ears" />
    <meta name="twitter:description" content="AIs&amp;Ears privacy policy. We do not store audio, video, or transcripts. Only payment session metadata is retained, for 90 days." />
    <meta name="robots" content="noindex, follow" />`,

  "/terms": `
    <title>Terms of Service — AIs&amp;Ears</title>
    <meta name="description" content="AIs&amp;Ears terms of service. Pricing, subscription auto-renewal, refund policy, acceptable use, and contact information for Liv Happier Apps." />
    <link rel="canonical" href="https://livhappierapps.com/apps/ais-and-ears/terms" />
    <meta property="og:url" content="https://livhappierapps.com/apps/ais-and-ears/terms" />
    <meta property="og:title" content="Terms of Service — AIs&amp;Ears" />
    <meta property="og:description" content="AIs&amp;Ears terms of service. Pricing, subscription auto-renewal, refund policy, acceptable use, and contact information for Liv Happier Apps." />
    <meta name="twitter:title" content="Terms of Service — AIs&amp;Ears" />
    <meta name="twitter:description" content="AIs&amp;Ears terms of service. Pricing, subscription auto-renewal, refund policy, acceptable use, and contact information for Liv Happier Apps." />
    <meta name="robots" content="noindex, follow" />`,
};

const routes: Array<{ path: string; outFile: string }> = [
  { path: "/", outFile: "index.html" },
  { path: "/privacy", outFile: "privacy/index.html" },
  { path: "/terms", outFile: "terms/index.html" },
];

// ---------------------------------------------------------------------------
// 1. Build SSR bundle
// ---------------------------------------------------------------------------
console.log("[prerender] Building SSR bundle...");

await build({
  configFile: resolve(__dirname, "vite.config.ts"),
  ssr: {
    // Force-bundle react-helmet-async so Node ESM can resolve its named exports
    noExternal: ["react-helmet-async"],
  },
  build: {
    ssr: resolve(__dirname, "src/entry-server.tsx"),
    outDir: resolve(__dirname, "dist/server"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.mjs",
        format: "esm",
      },
    },
  },
  mode: "production",
});

// ---------------------------------------------------------------------------
// 2. Render each route and write output files
// ---------------------------------------------------------------------------
const templatePath = resolve(__dirname, "dist/public/index.html");
const template = readFileSync(templatePath, "utf-8");

const entryServerPath = pathToFileURL(
  resolve(__dirname, "dist/server/entry-server.mjs"),
).href;

const { render } = (await import(entryServerPath)) as {
  render: (url: string) => { html: string };
};

for (const route of routes) {
  console.log(`[prerender] Rendering ${route.path}...`);

  const { html: appHtml } = render(route.path);

  // react-helmet-async v3 injects <title>/<meta>/<link> tags at the very start
  // of renderToString output before the actual app markup. Find the first <div
  // and discard everything before it so those tags don't land inside #root.
  const firstDivIdx = appHtml.indexOf("<div");
  const bodyHtml = firstDivIdx >= 0 ? appHtml.slice(firstDivIdx) : appHtml;

  const headMeta = ROUTE_HEAD[route.path] ?? "";

  const finalHtml = template
    .replace("<!--app-head-->", headMeta.trim())
    .replace("<!--app-html-->", bodyHtml);

  const outPath = resolve(__dirname, "dist/public", route.outFile);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, finalHtml, "utf-8");

  console.log(`[prerender]   → dist/public/${route.outFile}`);
}

// ---------------------------------------------------------------------------
// 3. Validate: assert head tags are in <head>, not in body
// ---------------------------------------------------------------------------
console.log("[prerender] Validating output...");

let valid = true;

for (const route of routes) {
  const content = readFileSync(
    resolve(__dirname, "dist/public", route.outFile),
    "utf-8",
  );

  const headEnd = content.indexOf("</head>");
  const bodyStart = content.indexOf("<body>");

  if (headEnd === -1 || bodyStart === -1) {
    console.error(`[prerender] INVALID: ${route.outFile} missing <head> or <body>`);
    valid = false;
    continue;
  }

  const headSection = content.slice(0, headEnd);
  const bodySection = content.slice(bodyStart);

  const checks: Array<[string, RegExp]> = [
    ["<title>", /<title>[^<]+<\/title>/],
    ["description meta", /name="description"/],
    ["canonical link", /rel="canonical"/],
    ["og:title", /property="og:title"/],
    ["twitter:title", /name="twitter:title"/],
  ];

  let routeOk = true;
  for (const [label, re] of checks) {
    if (!re.test(headSection)) {
      console.error(`[prerender] MISSING in <head> of ${route.outFile}: ${label}`);
      valid = false;
      routeOk = false;
    }
  }

  // Warn (not fatal) if any <title> leaked into body
  if (/<title>/.test(bodySection)) {
    console.warn(`[prerender] WARN: stray <title> tag found in <body> of ${route.outFile}`);
  }

  if (routeOk) {
    console.log(`[prerender]   ✓ ${route.outFile}`);
  }
}

if (!valid) {
  console.error("[prerender] Build failed: metadata not in <head>. See above.");
  process.exit(1);
}

console.log("[prerender] Done.");
