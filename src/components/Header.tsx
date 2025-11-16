import { Phone, MapPin, Palette, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex-1 text-center lg:text-left">
            <Link to="/" className="block group">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <div className="bg-white/10 p-2 rounded-full">
                  <Award className="h-6 w-6" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary-foreground/90 transition-colors">
                  Mufaddal Traders
                </h1>
              </div>
              <p className="text-primary-foreground/90 text-sm md:text-base font-medium">
                Premium Pipes & Fittings Solutions
              </p>
            </Link>
          </div>
          
          <div className="flex flex-row items-center gap-2 sm:gap-3">
            <Button 
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 font-semibold px-3 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-sm sm:text-base"
              asChild
            >
              <a href="tel:03352906212" className="flex items-center gap-1 sm:gap-2">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Call: 0335-2906212</span>
                <span className="sm:hidden">Call</span>
              </a>
            </Button>
            
            <Button
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground border-0 font-semibold px-3 sm:px-6 py-2 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                onClick={() => window.open('https://wa.me/message/AZLLSHJVYUYJP1', '_blank')}
              >
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Get Free Quote</span>
              <span className="sm:hidden">Get Quote</span>
            </Button>
            
            {/* <Button 
              variant="ghost"
              className="bg-white/5 hover:bg-white/10 text-primary-foreground/70 hover:text-primary-foreground text-sm px-3"
              asChild
            >
              <Link to="/colors" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Colors</span>
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
};