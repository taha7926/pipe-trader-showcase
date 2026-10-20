---
name: e2e-smoke-test
description: Drive the pipe-trader-showcase site with the Playwright MCP browser tools to smoke-test every route (home, catalogs, colors, admin login flow, SEO landing, 404) after a code change. Use when the user asks to verify the app still works, check for regressions, or test routes/pages before considering a change done.
---

# E2E Smoke Test

There is no existing test suite in this repo (no `*.test.*` / `*.spec.*` files, no CI). This
skill uses the `playwright` MCP browser tools to manually exercise the real running app instead.

## Prerequisites

Start the dev server first if it isn't already running:
```bash
npm run dev
```
Default Vite port is 5173 — confirm the actual port from the command output before navigating.

## Routes to check (from `src/AppRoutes.tsx`)

| Route | Page | What to verify |
|---|---|---|
| `/` | `Index.tsx` | Company grid renders, category filters work, at least one company card shows logo + "View Catalog"/quote actions |
| `/colors` | `Colors.tsx` | Renders without error |
| `/test` | `CompanyTest.tsx` | Renders without error |
| `/catalogs` | `Catalogs.tsx` | PDF catalog list renders per company |
| `/admin` | `Admin.tsx` behind `AdminGuard` | See login flow below |
| `/pipes-fittings-supplier-karachi` | `SeoLanding.tsx` | SEO landing content renders (check this matches actual Karachi pipe business content, not template boilerplate) |
| `/some-nonexistent-route` | `NotFound.tsx` | Catch-all route renders the 404 page, not a blank screen or router error |

## Admin login flow (`/admin`)

1. Navigate to `/admin` — expect the `AdminGuard` password card ("Admin Login").
2. Fill the password `<Input type="password">` with `admin2024` (hardcoded in
   `src/utils/adminAuth.ts:3` — flag to the user if this still hasn't been replaced with a
   real auth mechanism).
3. Submit — expect the company list view with "Add Company" button.
4. Optionally exercise "Add Company" → fill required fields (name, logo, at least one category)
   → save → confirm the new row appears in the list (this only persists to that browser's
   `localStorage`, not the live site — see the `admin-content-entry` skill for real content
   changes).
5. Test wrong password too — expect the "Incorrect password" error message, not a crash.

## Execution

Use `mcp__plugin_playwright_playwright__browser_navigate` to visit each route, then
`browser_snapshot` (accessibility tree) to check rendered content — prefer snapshot over
screenshot for asserting text/structure exists. Use `browser_console_messages` after each
navigation to catch uncaught JS errors the visual render might hide. Use `browser_type` /
`browser_click` for the admin login form interaction.

## Reporting

For each route: pass/fail, and if fail, the console error or the accessibility snapshot showing
what's missing/wrong. Don't just say "looks fine" — cite the specific element or text found.
