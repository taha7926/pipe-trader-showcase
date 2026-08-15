---
name: admin-content-entry
description: Add or edit a company/brand entry (logo, categories, PDFs, product images) in the pipe-trader-showcase site by editing the static data file and public assets directly. Use when the user asks to add a new brand/company, add product images or a catalog PDF for an existing company, or update a company's description/categories/WhatsApp link.
disable-model-invocation: true
---

# Admin Content Entry

Adds or edits a company entry so it's visible to **every** visitor of the live site.

## Important: this is NOT the same as the `/admin` panel

`src/pages/Admin.tsx` and `src/contexts/CompanyContext.tsx` write admin-created/edited
companies to `localStorage` (`pipe-trader-admin-companies`), scoped to one browser. That
data never reaches the deployed site other visitors see — it's a local preview tool only,
gated by a hardcoded password in `src/utils/adminAuth.ts:3`.

To make a company change visible to real visitors, edit the static source directly:
`src/data/companies.ts`. That's what this skill does.

## Steps

1. **Pick the company `id`** — kebab-case, matches the folder name under `public/images/<id>/`
   and asset filenames under `public/catalogs/` (e.g. `pak-arab`, `national-pipe`).

2. **Place assets first**, so paths in the data entry resolve:
   - Logo: add to `src/assets/Logos/<file>` and `import` it at the top of `src/data/companies.ts`
     (existing entries all import their logo this way — do not use a public/ path for logos).
   - Category product images: `public/images/<id>/<Category>/1.png`, `2.png`, ... — folder name
     must match the `ProductCategory` string exactly (`HDPE`, `uPVC`, `CPVC`, `PPRC`,
     `Bore Casing`, `G.I`). Use `Array.from({ length: N }, (_, i) => \`/images/<id>/<Category>/${i+1}.png\`)`
     for sequential filenames, or list paths explicitly if filenames are irregular (see the
     `steelex` entry in `src/data/companies.ts` for the irregular-filename pattern).
   - PDFs: `public/catalogs/<id>-<category>-catalog.pdf`.

3. **Add the entry** to the `mockCompanies` array in `src/data/companies.ts`, matching the
   `Company` shape in `src/types/company.ts`:
   ```ts
   {
     id: 'brand-id',
     name: 'BRAND NAME',
     logo: brandLogo,               // imported image
     description: '...',
     categories: ['uPVC', 'CPVC'],  // must be valid ProductCategory values
     pdfs: [{ id: 'brand-id-pdf-1', title: '...', path: '/catalogs/brand-id-catalog.pdf', categories: [...] }],
     categoryImages: { 'uPVC': [...paths] },
   }
   ```
   Do not set `isAdminCreated`, `createdAt`, or `updatedAt` — those are only stamped by the
   `/admin` panel's runtime code for its localStorage entries.

4. **If the company should also appear on a product-category landing page**, add its `id` to
   the matching category's `companies` array in `src/data/categories.ts`.

5. **Verify**: run `npm run dev`, visit `/`, confirm the new company card renders with correct
   categories, PDFs, and product images, then check `/catalogs` and any category filter that
   includes it.

## Editing an existing company

Find its object literal in `src/data/companies.ts` by `id` and edit fields directly — same
rules as above for asset paths.
