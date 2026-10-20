import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Colors from "./pages/Colors";
import CompanyTest from "./pages/CompanyTest";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Catalogs from "./pages/Catalogs";
import SeoLanding from "./pages/SeoLanding";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { HeadSync } from "./seo/HeadSync";

/** Route table, shared by the browser app (main.tsx) and the build-time prerender (entry-server.tsx). */
export const AppRoutes = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <HeadSync />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/test" element={<CompanyTest />} />
        <Route path="/catalogs" element={<Catalogs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pipes-fittings-supplier-karachi" element={<SeoLanding />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <WhatsAppButton />}
    </>
  );
};
