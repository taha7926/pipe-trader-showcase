/**
 * Vite plugin: local file upload API
 *
 * Adds two POST endpoints during dev:
 *   POST /api/upload-image  — saves image to public/images/{company}/{category}/{n}.{ext}
 *   POST /api/upload-pdf    — saves PDF   to public/catalogs/{filename}
 *
 * Returns { path: "/images/..." } so the admin panel stores only the static path.
 * In production (Netlify) the files are already committed in /public/ — no API needed.
 */

import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

function parseMultipart(body: Buffer, boundary: string) {
  const parts: { name: string; filename: string; type: string; data: Buffer }[] = [];
  const boundaryBuf = Buffer.from(`--${boundary}`);
  const endBuf = Buffer.from(`--${boundary}--`);

  let start = body.indexOf(boundaryBuf) + boundaryBuf.length;

  while (start < body.length) {
    const end = body.indexOf(boundaryBuf, start);
    if (end === -1) break;

    const part = body.slice(start, end);
    const headerEnd = part.indexOf('\r\n\r\n');
    if (headerEnd === -1) { start = end + boundaryBuf.length; continue; }

    const headerStr = part.slice(0, headerEnd).toString();
    const data = part.slice(headerEnd + 4, part.length - 2); // trim trailing \r\n

    const nameMatch = headerStr.match(/name="([^"]+)"/);
    const filenameMatch = headerStr.match(/filename="([^"]+)"/);
    const typeMatch = headerStr.match(/Content-Type:\s*(.+)/i);

    if (nameMatch) {
      parts.push({
        name: nameMatch[1],
        filename: filenameMatch?.[1] ?? '',
        type: typeMatch?.[1]?.trim() ?? '',
        data,
      });
    }

    start = end + boundaryBuf.length;
    if (body.indexOf(endBuf, end) === end) break;
  }

  return parts;
}

function readBody(req: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function getTextField(parts: ReturnType<typeof parseMultipart>, name: string): string {
  const p = parts.find(p => p.name === name && !p.filename);
  return p ? p.data.toString().trim() : '';
}

export default function uploadPlugin(): Plugin {
  let publicDir = '';

  return {
    name: 'vite-plugin-upload',
    configResolved(config) {
      publicDir = config.publicDir; // e.g. /absolute/path/to/public
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // ── Upload Image ──
        if (req.method === 'POST' && req.url === '/api/upload-image') {
          try {
            const contentType = req.headers['content-type'] ?? '';
            const boundary = contentType.split('boundary=')[1];
            if (!boundary) { res.writeHead(400); res.end('Missing boundary'); return; }

            const body = await readBody(req);
            const parts = parseMultipart(body, boundary);

            const company = getTextField(parts, 'company') || 'unknown';
            const category = getTextField(parts, 'category') || 'general';
            const filePart = parts.find(p => p.name === 'file' && p.filename);

            if (!filePart) { res.writeHead(400); res.end('No file'); return; }

            // Sanitize names
            const safeCompany = company.toLowerCase().replace(/[^a-z0-9-]/g, '-');
            const safeCategory = category.replace(/[^a-zA-Z0-9-.]/g, '-');
            const ext = path.extname(filePart.filename).toLowerCase() || '.png';

            const dir = path.join(publicDir, 'images', safeCompany, safeCategory);
            fs.mkdirSync(dir, { recursive: true });

            // Find next number
            const existing = fs.readdirSync(dir).filter(f => /^\d+\.\w+$/.test(f));
            const maxNum = existing.reduce((max, f) => {
              const n = parseInt(f.split('.')[0], 10);
              return isNaN(n) ? max : Math.max(max, n);
            }, 0);
            const nextNum = maxNum + 1;
            const filename = `${nextNum}${ext}`;

            fs.writeFileSync(path.join(dir, filename), filePart.data);

            const staticPath = `/images/${safeCompany}/${safeCategory}/${filename}`;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ path: staticPath }));
          } catch (e: any) {
            console.error('Upload error:', e);
            res.writeHead(500);
            res.end(e.message);
          }
          return;
        }

        // ── Upload PDF ──
        if (req.method === 'POST' && req.url === '/api/upload-pdf') {
          try {
            const contentType = req.headers['content-type'] ?? '';
            const boundary = contentType.split('boundary=')[1];
            if (!boundary) { res.writeHead(400); res.end('Missing boundary'); return; }

            const body = await readBody(req);
            const parts = parseMultipart(body, boundary);
            const filePart = parts.find(p => p.name === 'file' && p.filename);

            if (!filePart) { res.writeHead(400); res.end('No file'); return; }

            // Clean filename: lowercase, dashes, keep extension
            const rawName = path.basename(filePart.filename, path.extname(filePart.filename));
            const ext = path.extname(filePart.filename).toLowerCase() || '.pdf';
            const safeName = rawName.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-') + ext;

            const dir = path.join(publicDir, 'catalogs');
            fs.mkdirSync(dir, { recursive: true });
            fs.writeFileSync(path.join(dir, safeName), filePart.data);

            const staticPath = `/catalogs/${safeName}`;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ path: staticPath }));
          } catch (e: any) {
            console.error('Upload error:', e);
            res.writeHead(500);
            res.end(e.message);
          }
          return;
        }

        next();
      });
    },
  };
}
