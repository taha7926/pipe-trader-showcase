import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hdpeBanner from "@/assets/hdpe-banner.jpg";
import boreCasingBanner from "@/assets/bore-casing-banner.jpg";
import upvcBanner from "@/assets/upvc-banner.jpg";
import cpvcBanner from "@/assets/cpvc-banner.jpg";
import pprcBanner from "@/assets/pprc-banner.jpg";

interface Category {
  id: string;
  name: string;
  banner: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "hdpe",
    name: "HDPE",
    banner: hdpeBanner,
    description: "High-Density Polyethylene Pipes & Fittings"
  },
  {
    id: "bore-casing",
    name: "BORE CASING",
    banner: boreCasingBanner,
    description: "Bore Well Casing Pipes"
  },
  {
    id: "upvc",
    name: "UPVC",
    banner: upvcBanner,
    description: "Unplasticized PVC Pipes & Fittings"
  },
  {
    id: "cpvc",
    name: "CPVC",
    banner: cpvcBanner,
    description: "Chlorinated PVC Pipes & Fittings"
  },
  {
    id: "pprc",
    name: "PPRC",
    banner: pprcBanner,
    description: "Polypropylene Random Copolymer Pipes"
  }
];

interface CategorySliderProps {
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
}

export const CategorySlider = ({ onCategorySelect, selectedCategory }: CategorySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg shadow-xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="min-w-full h-full relative cursor-pointer"
            onClick={() => onCategorySelect(category.id)}
          >
            <img
              src={category.banner}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="flex flex-col justify-center h-full p-8 text-white">
                <h2 className="text-5xl font-bold mb-4">{category.name}</h2>
                <p className="text-xl opacity-90">{category.description}</p>
                <Button 
                  className="mt-6 w-fit bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategorySelect(category.id);
                  }}
                >
                  View Products
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {categories.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};