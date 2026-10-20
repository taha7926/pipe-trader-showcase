// Per-route <head> metadata. Used at build time by scripts/prerender.mjs (static HTML for
// crawlers and link previews) and at runtime by <HeadSync /> (client-side navigation).

export const SITE_URL = "https://mufaddaltrader.com";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface RouteMetaEntry {
  title: string;
  description: string;
  /** Exclude from search results (e.g. admin, 404). */
  noindex?: boolean;
}

export const ROUTE_META: Record<string, RouteMetaEntry> = {
  "/": {
    title: "Mufaddal Traders | Pipes & Fittings Wholesale Supplier in Karachi since 2009",
    description:
      "Wholesale supplier of water, agriculture, boring and cable pipes and fittings in Karachi since 2009. uPVC, CPVC, HDPE, PPRC and G.I from Pak Arab, Steelex, IIL, Speed, Minhas and more. Call or WhatsApp 0335-2906212.",
  },
  "/catalogs": {
    title: "Pipe Brand Catalogs – Pak Arab, Steelex, IIL, Speed & more | Mufaddal Traders",
    description:
      "View and download product catalogs for Pak Arab, Steelex, National Pipe, Speed, Jeddah Polymer, Mark, Minhas, IIL and Prime pipes and fittings, available at Mufaddal Traders, Karachi.",
  },
  "/pipes-fittings-supplier-karachi": {
    title: "Water, Agriculture, Boring & Cable Pipes Supplier Karachi – Guide & FAQ | Mufaddal Traders",
    description:
      "Which pipe do you need? Guide to uPVC, CPVC, HDPE, PPRC, G.I and bore casing pipes for water supply, irrigation, boring, cable conduit and drainage — with sizes, brands and FAQs. Wholesale rates in Karachi.",
  },
  "/admin": {
    title: "Admin | Mufaddal Traders",
    description: "Admin panel.",
    noindex: true,
  },
};

export const NOT_FOUND_META: RouteMetaEntry = {
  title: "Page not found | Mufaddal Traders",
  description: "The page you are looking for does not exist.",
  noindex: true,
};

export const getRouteMeta = (pathname: string): RouteMetaEntry =>
  ROUTE_META[pathname.replace(/\/+$/, "") || "/"] ?? NOT_FOUND_META;
