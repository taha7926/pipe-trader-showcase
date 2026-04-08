import React, { useState, useEffect } from 'react';
import { Company, ProductCategory } from '@/types/company';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

interface ImageGalleryDialogProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: ProductCategory;
}

export const ImageGalleryDialog: React.FC<ImageGalleryDialogProps> = ({
  company,
  isOpen,
  onClose,
  defaultCategory,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset index when dialog opens
  useEffect(() => {
    if (isOpen) setActiveIndex(0);
  }, [isOpen, company?.id, defaultCategory]);

  if (!company) return null;

  // Show only the selected category's images — no tabs
  const activeCategory = defaultCategory ?? company.categories[0];
  const displayImages: string[] = activeCategory
    ? (company.categoryImages?.[activeCategory] ?? [])
    : (company.images ?? []);

  const hasImages = displayImages.length > 0;

  const prev = () => setActiveIndex(i => (i - 1 + displayImages.length) % displayImages.length);
  const next = () => setActiveIndex(i => (i + 1) % displayImages.length);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActiveIndex(0);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl w-full p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-10 w-16 object-contain" />
            ) : (
              <Building2 className="h-8 w-8 text-muted-foreground" />
            )}
            <div>
              <DialogTitle className="text-lg leading-tight">{company.name}</DialogTitle>
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {activeCategory}
                </Badge>
                {hasImages && (
                  <span className="text-xs text-muted-foreground">
                    {displayImages.length} image{displayImages.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        {hasImages ? (
          <div className="px-5 pb-5">
            {/* Main image — fixed height container */}
            <div className="relative bg-white rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 h-[350px]">
              <img
                src={displayImages[activeIndex]}
                alt={`${company.name} product ${activeIndex + 1}`}
                className="max-h-full max-w-full object-contain p-2"
              />

              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <span className="absolute bottom-2 right-3 text-xs text-white bg-black/50 rounded px-2 py-0.5">
                    {activeIndex + 1} / {displayImages.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnails — wrapping grid, no horizontal scroll */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-8 gap-1.5 mt-3 max-h-[140px] overflow-y-auto">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`aspect-square rounded overflow-hidden border-2 bg-white transition-colors ${
                      i === activeIndex ? 'border-primary' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-contain p-0.5" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="px-5 pb-8 text-center text-gray-400">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">No product images available for this company.</p>
            <p className="text-xs mt-1 opacity-70">Add images via the admin panel.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
