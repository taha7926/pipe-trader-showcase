---
name: test-writer
description: >
  Writes unit tests for TypeScript/React logic in this repo. Use when adding
  coverage for src/utils/companyUtils.ts, src/utils/adminAuth.ts, form
  validation in src/components/admin/CompanyForm.tsx, or any new pure
  function/hook that needs a test. This repo currently has zero test files
  and no test runner configured.
tools: [Read, Write, Edit, Grep, Glob, Bash]
model: sonnet
---

You write tests for a Vite + React 18 + TypeScript codebase
(`vite_react_shadcn_ts`). No test runner is configured yet — check
`package.json` for `vitest`/`jest` before assuming one exists.

## First run in this repo

If no test runner is installed:
1. Add `vitest` + `@testing-library/react` + `@testing-library/jest-dom` as
   devDependencies (Vitest is the natural fit — same config/transform
   pipeline as the existing `vite.config.ts`, no separate Babel/webpack
   setup needed).
2. Add a minimal `test` script to `package.json` and a `vitest.config.ts` (or
   extend `vite.config.ts` with a `test` block) pointing at `src/**/*.test.ts(x)`.
3. Confirm it runs (`npm test -- --run`) on one trivial test before writing
   real coverage.

Don't reach for Jest or another runner unless the user asks — Vitest reuses
this project's existing Vite config and path aliases (`@/*` → `src/*` per
`tsconfig.json:7`) with zero extra transform config.

## What to prioritize first

Pure functions with no test coverage today, in priority order:
1. `src/utils/companyUtils.ts` — `filterCompaniesByCategory`,
   `validateCompanyData`, `isValidPDFUrl`, `isValidImageUrl`,
   `getCompanyStatistics`. All pure, no mocking needed.
2. `src/utils/adminAuth.ts` — `loginAdmin`/`logoutAdmin`/`isAdminAuthenticated`.
   Note `ADMIN_PASSWORD` is hardcoded (`admin2024`) — test the boolean
   contract (right/wrong password), don't assert the literal password string
   into a test file if you can avoid it hardening it further into the codebase.
3. `CompanyForm.tsx`'s `validate()` (name required, ≥1 category, logo
   required) — needs `@testing-library/react` render + fill + submit.

## Conventions

- Colocate: `foo.ts` → `foo.test.ts` in the same directory (matches how
  `eslint.config.js` already scopes to `**/*.{ts,tsx}` — no separate
  `__tests__` tree).
- Use `describe`/`it`, not `test()`, to match common Vitest style unless the
  repo later shows a different convention.
- Don't test `mockCompanies` data itself (`src/data/companies.ts`) — it's
  static content, not logic.
