import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hdpeBanner from "@/assets/Banner/hdpe-banner.jpg";
import boreCasingBanner from "@/assets/Banner/bore-casing-banner.jpg";
import upvcBanner from "@/assets/Banner/upvc-banner.jpg";
import cpvcBanner from "@/assets/Banner/cpvc-banner.jpg";
import pprcBanner from "@/assets/Banner/pprc-banner.jpg";

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
  const total = categories.length;
  // Internal index: 0 = clone of last, 1..total = real slides, total+1 = clone of first
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const isTransitioning = useRef(false);

  // The real slide index (0-based) for dots and category clicks
  const realIndex = ((pos - 1) % total + total) % total;

  const goTo = useCallback((nextPos: number) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setPos(nextPos);
  }, []);

  const nextSlide = useCallback(() => goTo(pos + 1), [pos, goTo]);
  const prevSlide = useCallback(() => goTo(pos - 1), [pos, goTo]);

  // Handle transition end — snap to real slide if on a clone
  const handleTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (pos === 0) {
      // On clone of last → jump to real last
      setAnimate(false);
      setPos(total);
    } else if (pos === total + 1) {
      // On clone of first → jump to real first
      setAnimate(false);
      setPos(1);
    }
  }, [pos, total]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [nextSlide]);

  // Build slides: [cloneLast, ...real, cloneFirst]
  const slides = [
    categories[total - 1], // clone of last
    ...categories,
    categories[0],         // clone of first
  ];

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-xl">
      <div
        ref={trackRef}
        className={`flex h-full ${animate ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${pos * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides.map((category, i) => (
          <div
            key={`${category.id}-${i}`}
            className="min-w-full h-full relative cursor-pointer"
            onClick={() => onCategorySelect(category.id)}
          >
            <img
              src={category.banner}
              alt={category.name}
              className="w-full h-full object-cover"
            />
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
              index === realIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => {
              setAnimate(true);
              setPos(index + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
};
