import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    const prevTitle = document.title;
    document.title = "404 – Page Not Found";
    return () => {
      document.title = prevTitle;
    };
  }, [location.pathname]);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-24 grid place-items-center">
        <div className="max-w-xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Page not found</h1>
          <p className="mt-3 text-base text-muted-foreground">
            The page you’re looking for doesn’t exist or was moved.
          </p>
          {/* <div className="mt-8 flex justify-center">
            <Button size="lg" variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
