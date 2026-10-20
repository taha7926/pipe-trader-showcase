# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start Vite dev server
npm run build       # production build: client bundle + SSR bundle + static prerender (dist/, published by Vercel)
npm run build:client # client bundle only (no prerender)
npm run build:dev   # build in development mode (unminified, for debugging a build issue)
npm run lint        # eslint .
npm run preview     # preview the production build locally
```

There is no test suite or CI configured (no `*.test.*`/`*.spec.*` files, no `.github/workflows`). A `.claude/agents/test-writer.md` subagent exists to bootstrap Vitest when tests are needed — check whether it has already added a test runner before assuming there is none.

Both `package-lock.json` and `bun.lockb` are present; `npm` is the lockfile actually referenced by the README and scripts.

## Architecture

Vite + React 18 + TypeScript SPA, shadcn/ui (Radix primitives) + Tailwind, `react-router-dom`. Path alias `@/*` → `src/*` (see `tsconfig.json` and `components.json`). **There is no backend** — this is a static showcase site for a Karachi plumbing/pipe trading business, deployed to Vercel.

### Prerendering & SEO

`npm run build` runs three steps: `vite build` (client), `vite build --ssr src/entry-server.tsx --outDir dist-server` (Node bundle), then `scripts/prerender.mjs`, which renders `/`, `/catalogs` and `/pipes-fittings-supplier-karachi` to static HTML (`dist/index.html`, `dist/catalogs.html` + `dist/catalogs/index.html`, `dist/pipes-fittings-supplier-karachi.html`), plus `dist/404.html` and a client-only `dist/app-shell.html`. `vercel.json` uses `cleanUrls`; only `/admin`, `/colors`, `/test` are rewritten to the app shell, and unknown URLs get a real 404.

- Per-route `<title>`/description/robots live in `src/seo/routeMeta.ts` (used by the prerender and by `<HeadSync />` (src/seo/HeadSync.tsx) on client navigation). Add new public routes there **and** in the `pages` list in `scripts/prerender.mjs`.
- FAQ text lives in `src/data/faqs.ts`; the FAQPage JSON-LD is generated from it for the guide page only.
- Code that runs during render must not touch `window`/`localStorage` at module or render time (guard with `typeof window === 'undefined'`), or the prerender step fails.
- Contact details (phone, WhatsApp, email, address) are centralised in `src/config/contact.ts`.

### Data flow: static data + localStorage overlay

Company/brand data lives in `src/data/companies.ts` (typed by `src/types/company.ts`). There is no database — `src/contexts/CompanyContext.tsx` merges the static `mockCompanies` array with admin-created/edited overrides read from `localStorage` at `CompanyProvider` mount:

- Admin adds/edits a company → stored under the `pipe-trader-admin-companies` localStorage key (base64 image/PDF data is stripped before persisting, to avoid hitting the ~5MB quota).
- Admin deletes a *static* company → its id is tracked in `pipe-trader-deleted-static-ids` rather than actually removing it from the source file.
- On next load, `getInitialCompanies()` filters out deleted/overridden static entries and appends the admin ones.

This means **admin panel changes are scoped to one browser and never touch `src/data/companies.ts`** — they aren't visible to other site visitors. To change what real visitors see, edit `src/data/companies.ts` and the assets under `public/images/<company-id>/<Category>/` / `public/catalogs/` directly (a `.claude/skills/admin-content-entry/SKILL.md` skill documents this exact flow).

### Admin auth

`src/components/admin/AdminGuard.tsx` gates `/admin` behind a password check in `src/utils/adminAuth.ts`, which is a **hardcoded plaintext password checked entirely client-side**, with the session flag stored in `sessionStorage`. There is no server to enforce this — treat it as a soft gate, not real access control.

### Routing

All routes are declared in `src/AppRoutes.tsx` (shared by `src/App.tsx` in the browser and `src/entry-server.tsx` for prerendering). The catch-all `*` → `NotFound` route must stay last; a comment in the file marks where new routes should be added.

### PDF viewing

`src/components/pdf-viewer/PDFPopup.tsx` renders `ReactPDFViewer.tsx`. `react-pdf` is an installed dependency, but its imports are still commented out in `ReactPDFViewer.tsx` (a stale TODO — see `docs/REACT_PDF_SETUP.md`) — don't assume `react-pdf` is actually doing the PDF rendering without checking that file's current state first.

### Dependencies that look wired up but aren't

- `@tanstack/react-query`'s `QueryClientProvider` wraps the app in `App.tsx`, but there are no `useQuery`/`useMutation` calls anywhere in `src/` — it's unused boilerplate from the template, not an active data-fetching layer.
- `react-hook-form` is only referenced through the generic shadcn `src/components/ui/form.tsx` primitive. The actual admin form (`src/components/admin/CompanyForm.tsx`) manages its own validation with plain `useState`, not `react-hook-form`.

### TypeScript/lint configuration

`tsconfig.json` has `noImplicitAny`, `strictNullChecks`, `noUnusedLocals`, and `noUnusedParameters` all turned off, and `eslint.config.js` explicitly disables `@typescript-eslint/no-unused-vars`. Don't assume standard strict-TS behavior when reasoning about type errors.

## Repo-local Claude Code config

- **Hooks** (`.claude/settings.json` + `.claude/hooks/`): type-check and eslint run automatically after every Write/Edit to a `.ts`/`.tsx` file.
- **Skills**: `admin-content-entry` (how to add/edit a company so it's visible to real visitors — see Data flow above) and `e2e-smoke-test` (drives all routes via the `playwright` MCP tools — see Plugins below).
- **Subagents** (`.claude/agents/`): `security-reviewer` (auth/credential review, calibrated on the `adminAuth.ts` hardcoded-password issue) and `test-writer` (bootstraps Vitest, prioritizes `companyUtils.ts`/`adminAuth.ts`/`CompanyForm.tsx`).

### Plugins

Only one plugin is an actual dependency of committed repo tooling — the rest are general workflow plugins, not required to work on this codebase:

| Plugin | Required? | Why |
|---|---|---|
| `playwright@claude-plugins-official` | **Yes** | `.claude/skills/e2e-smoke-test/SKILL.md` calls its MCP browser tools directly (`mcp__plugin_playwright_playwright__*`) — that skill can't run without it |
| `context7@claude-plugins-official` | No | Generic library-docs lookup, not referenced by any committed file |
| `claude-code-setup`, `claude-md-management`, `claude-security`, `security-guidance`, `frontend-design`, `mattpocock-skills`, `remember`, `ui-theme-designer` (all `@claude-plugins-official`) | No | General productivity plugins, not project-specific |
| `caveman@caveman` (marketplace `JuliusBrussee/caveman`) | No | Drives the terse response style in Response style below — only needed if you want that enforced |
| `ponytail@ponytail` (marketplace `DietrichGebert/ponytail`) | No | Anti-over-engineering review skill, not project-specific |

Install with `claude plugin install <name>@<marketplace>`; `caveman` and `ponytail` need their marketplaces added first (`claude plugin marketplace add JuliusBrussee/caveman` / `DietrichGebert/ponytail`).

## Project origin

This repo was scaffolded via Lovable (see README.md) — pushes made through the Lovable UI commit directly to this repo. `docs/development-plan.md` and `docs/workplan.md` contain the original sprint-planned build-out of the company display system.

## Response style

`.cursor/rules/caveman.mdc`, `.windsurf/rules/caveman.md`, `.clinerules/caveman.md`, `.github/copilot-instructions.md`, and `AGENTS.md` all carry an always-on "caveman" terse-response rule (drop filler/hedging, keep technical substance and code exact, resume normal prose for security warnings or irreversible actions).
