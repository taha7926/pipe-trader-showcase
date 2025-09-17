import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold">Mufaddal Traders</h1>
            <p className="text-primary-foreground/90 mt-1">Premium Pipes & Fittings Solutions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button 
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 border-white/30 text-primary-foreground"
              asChild
            >
              <a href="tel:03352906212" className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>03352906212</span>
              </a>
            </Button>
            
            <Button 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 border-white/30 text-primary-foreground"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};