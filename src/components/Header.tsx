import { useEffect, useState } from "react";
import { Phone, MessageCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logoMark from "@/assets/brand/logo-mark.png";
import {
  BUSINESS_NAME,
  DEFAULT_WHATSAPP_MESSAGE,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsappLink,
} from "@/config/contact";

const ctaClass =
  "bg-accent hover:bg-accent/90 text-accent-foreground border-0 font-semibold px-3 sm:px-5 py-2 shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base";

export const Header = () => {
  // Shrink the sticky header once the user scrolls, so it takes less screen space.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg">
      <div
        className={`container mx-auto px-4 transition-[padding] duration-200 ${
          scrolled ? "py-2" : "py-3 lg:py-5"
        }`}
      >
        <div className="flex flex-col lg:flex-row justify-between items-center gap-2 lg:gap-6">
          <Link to="/" className="flex items-center gap-3 group" aria-label={`${BUSINESS_NAME} – home`}>
            <img
              src={logoMark}
              alt=""
              width={48}
              height={48}
              className={`rounded-full transition-all duration-200 ${scrolled ? "h-9 w-9" : "h-10 w-10 md:h-12 md:w-12"}`}
            />
            <div className="text-left">
              <span className="block text-2xl md:text-3xl font-bold tracking-tight leading-tight">
                {BUSINESS_NAME}
              </span>
              {!scrolled && (
                <span className="hidden sm:block text-primary-foreground/90 text-sm font-medium">
                  Pipes &amp; Fittings Wholesale · Karachi
                </span>
              )}
            </div>
          </Link>

          <nav aria-label="Primary" className="flex flex-row items-center gap-2 sm:gap-3">
            <Button size="sm" className={ctaClass} asChild>
              <a href={PHONE_TEL} className="flex items-center gap-1 sm:gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Call: {PHONE_DISPLAY}</span>
                <span className="sm:hidden">Call</span>
              </a>
            </Button>

            <Button size="sm" className={ctaClass} asChild>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-2"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Get Free Quote</span>
                <span className="sm:hidden">Quote</span>
              </a>
            </Button>

            <Button size="sm" className={ctaClass} asChild>
              <Link to="/catalogs" className="flex items-center gap-1 sm:gap-2">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                <span>Catalogs</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
