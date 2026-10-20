import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta, SITE_URL } from "./routeMeta";

const setMeta = (selector: string, attr: "content" | "href", value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/** Keeps <title>, description, canonical and Open Graph tags in sync on client-side navigation. */
export const HeadSync = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const url = `${SITE_URL}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[name="robots"]', "content", meta.noindex ? "noindex, nofollow" : "index, follow");
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
  }, [pathname]);

  return null;
};
