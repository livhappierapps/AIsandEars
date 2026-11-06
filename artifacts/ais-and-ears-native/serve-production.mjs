import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, relative, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const defaultDist = resolve(dirname(fileURLToPath(import.meta.url)), "dist");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

/** Exported for local regression tests; importing never opens a port. */
export function createStaticServer(dist = defaultDist) {
  const root = resolve(dist);
  return createServer(async (req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent((req.url ?? "/").split("?")[0]);
    } catch {
      res.writeHead(400);
      res.end("Invalid URL");
      return;
    }
    if (pathname === "/mobile" || pathname.startsWith("/mobile/"))
      pathname = pathname.slice(7) || "/";
    const target = resolve(
      root,
      `.${pathname === "/" ? "/index.html" : pathname}`,
    );
    const fromRoot = relative(root, target);
    if (
      fromRoot.startsWith("..") ||
      fromRoot.startsWith("/") ||
      pathname.includes("\0")
    ) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }
    try {
      const data = await readFile(target);
      res.writeHead(200, {
        "Content-Type":
          MIME[extname(target).toLowerCase()] ?? "application/octet-stream",
      });
      res.end(data);
    } catch {
      if (extname(pathname)) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }
      try {
        const data = await readFile(resolve(root, "index.html"));
        res.writeHead(200, { "Content-Type": MIME[".html"] });
        res.end(data);
      } catch {
        res.writeHead(503);
        res.end("Preview not exported. Run the web build first.");
      }
    }
  });
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const port = Number.parseInt(process.env.PORT || "3000", 10);
  createStaticServer().listen(port, "0.0.0.0", () =>
    console.log(`Serving dist/ on port ${port}`),
  );
}
