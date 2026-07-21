import { createServer } from 'http';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3000', 10);
const DIST = join(__dirname, 'dist');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

async function serveFile(res, filePath) {
  try {
    const s = await stat(filePath);
    if (s.isDirectory()) {
      return serveFile(res, join(filePath, 'index.html'));
    }
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    createReadStream(filePath).pipe(res);
  } catch {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    createReadStream(join(DIST, 'index.html')).pipe(res);
  }
}

createServer(async (req, res) => {
  let urlPath = (req.url ?? '/').split('?')[0];
  if (urlPath.startsWith('/mobile')) {
    urlPath = urlPath.slice('/mobile'.length) || '/';
  }
  const filePath = urlPath === '/' ? join(DIST, 'index.html') : join(DIST, urlPath);
  await serveFile(res, filePath);
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Serving dist/ on port ${PORT}`);
});
