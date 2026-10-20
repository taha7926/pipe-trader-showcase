// Build-time prerender. Runs after `vite build` (client) and `vite build --ssr` (server bundle).
// For each public route it writes static HTML containing the rendered page plus route-specific
// <head> tags, so Google, Bing and WhatsApp/Facebook link previews see real content.
//
// Output (served by Vercel with cleanUrls: true):
//   dist/index.html                              -> /
//   dist/catalogs.html                           -> /catalogs
//   dist/pipes-fittings-supplier-karachi.html    -> /pipes-fittings-supplier-karachi
//   dist/404.html                                -> any unknown URL (real 404 status)
//   dist/app-shell.html                          -> empty client-only shell for /admin etc.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const { render, getRouteMeta, SITE_URL, FAQS } = await import(pathToFileURL(serverEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escapeAttr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeText = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON inside <script> must not contain "</script>"
const jsonLd = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;

const replaceOrFail = (html, regex, replacement, label) => {
  if (!regex.test(html)) throw new Error(`prerender: could not find ${label} in index.html`);
  return html.replace(regex, replacement);
};

function applyHead(html, { title, description, noindex }, canonicalUrl, extraHead = "") {
  const t = escapeText(title);
  const ta = escapeAttr(title);
  const d = escapeAttr(description);
  html = replaceOrFail(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`, "<title>");
  html = replaceOrFail(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${d}" />`, "description");
  html = replaceOrFail(html, /<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${noindex ? "noindex, nofollow" : "index, follow"}" />`, "robots");
  html = replaceOrFail(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${ta}" />`, "og:title");
  html = replaceOrFail(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${d}" />`, "og:description");
  html = replaceOrFail(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${ta}" />`, "twitter:title");
  html = replaceOrFail(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`, "twitter:description");

  if (canonicalUrl) {
    html = replaceOrFail(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonicalUrl}" />`, "canonical");
    html = replaceOrFail(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonicalUrl}" />`, "og:url");
  } else {
    // Non-indexable pages (404, admin shell) should not declare a canonical URL.
    html = html.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, "");
  }

  return html.replace("<!--route-jsonld-->", extraHead);
}

const injectBody = (html, appHtml) =>
  replaceOrFail(html, /<div id="root"><\/div>/, `<div id="root">${appHtml}</div>`, '<div id="root">');

// Structured data that belongs to specific pages only (it must match visible content).
const seoLandingJsonLd = [
  jsonLd({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }),
  jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Pipe guide & FAQ", item: `${SITE_URL}/pipes-fittings-supplier-karachi` },
    ],
  }),
].join("\n    ");

const pages = [
  { route: "/", file: "index.html" },
  { route: "/catalogs", file: "catalogs.html" },
  { route: "/pipes-fittings-supplier-karachi", file: "pipes-fittings-supplier-karachi.html", extraHead: seoLandingJsonLd },
];

for (const { route, file, extraHead = "" } of pages) {
  const meta = getRouteMeta(route);
  const canonical = `${SITE_URL}${route === "/" ? "/" : route}`;
  const html = injectBody(applyHead(template, meta, canonical, extraHead), render(route));
  fs.writeFileSync(path.join(dist, file), html);
  // /catalogs is also a folder of PDFs (public/catalogs), so write a directory index too.
  if (route === "/catalogs") fs.writeFileSync(path.join(dist, "catalogs", "index.html"), html);
  console.log(`prerendered ${route.padEnd(36)} -> dist/${file} (${Math.round(html.length / 1024)} KB)`);
}

// Real 404 page: rendered NotFound content, noindex.
{
  const meta = getRouteMeta("/__not-found__");
  const html = injectBody(applyHead(template, meta, null), render("/__not-found__"));
  fs.writeFileSync(path.join(dist, "404.html"), html);
  console.log("prerendered 404                                  -> dist/404.html");
}

// Client-only shell (no prerendered content) for admin/dev routes.
{
  const html = applyHead(template, { title: "Mufaddal Traders", description: "Mufaddal Traders", noindex: true }, null);
  fs.writeFileSync(path.join(dist, "app-shell.html"), html);
  console.log("wrote client-only shell                          -> dist/app-shell.html");
}
