import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logoMark from "@/assets/brand/logo-mark.png";
import {
  ADDRESS,
  BUSINESS_NAME,
  EMAIL,
  HOURS,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SINCE_YEAR,
} from "@/config/contact";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-24 sm:pb-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-3 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img src={logoMark} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full" />
              <span className="text-2xl font-bold tracking-tight">{BUSINESS_NAME}</span>
            </div>
            <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              Wholesale supplier of water, agriculture, boring and cable pipes and fittings in Karachi — serving
              contractors, plumbers and farmers since {SINCE_YEAR}.
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Contact</h2>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a href={PHONE_TEL} className="hover:underline">{PHONE_DISPLAY}</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a href={`mailto:${EMAIL}`} className="hover:underline break-all">{EMAIL}</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">{ADDRESS}</a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                <span>{HOURS}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Explore</h2>
            <ul className="space-y-2 text-sm text-primary-foreground/90">
              <li><Link to="/" className="hover:underline">Home &amp; brands</Link></li>
              <li><Link to="/catalogs" className="hover:underline">Product catalogs</Link></li>
              <li><Link to="/pipes-fittings-supplier-karachi" className="hover:underline">Pipe guide &amp; FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-10 pt-6 text-center">
          <p className="text-sm text-primary-foreground/80">
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
