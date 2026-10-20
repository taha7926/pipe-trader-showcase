// Build-time prerender entry (run in Node by scripts/prerender.mjs, never shipped to the browser).
// Renders a route to static HTML so search engines and link previews see real page content.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "./AppRoutes";

export { getRouteMeta, SITE_URL, OG_IMAGE } from "./seo/routeMeta";
export { FAQS } from "./data/faqs";

export function render(url: string): string {
  const queryClient = new QueryClient();
  return renderToString(
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
