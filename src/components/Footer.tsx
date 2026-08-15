import { Award } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/10 p-2 rounded-full">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight">Mufaddal Traders</h3>
          </div>
          <p className="text-primary-foreground/90 mb-6 text-base max-w-md mx-auto leading-relaxed">
            Your trusted partner for quality pipes and fittings. Serving the industry with excellence since 2009.
          </p>
          <div className="border-t border-primary-foreground/20 pt-6">
            <p className="text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} Mufaddal Traders. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
