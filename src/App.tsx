import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Colors from "./pages/Colors";
import CompanyTest from "./pages/CompanyTest";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Catalogs from "./pages/Catalogs";
import SeoLanding from "./pages/SeoLanding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
