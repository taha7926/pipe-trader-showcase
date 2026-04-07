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
  // Categories that actually have images
  const categoriesWithImages: ProductCategory[] = company
    ? company.categories.filter(
        cat => (company.categoryImages?.[cat]?.length ?? 0) > 0
      )
    : [];

  // Also check legacy images[] as fallback — attach them to first category or show under company
  const hasLegacyImages = (company?.images?.length ?? 0) > 0 && categoriesWithImages.length === 0;

  const initialTab =
    defaultCategory && categoriesWithImages.includes(defaultCategory)
      ? defaultCategory
      : categoriesWithImages[0] ?? null;

  const [activeTab, setActiveTab] = useState<ProductCategory | null>(initialTab);
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset when dialog opens with new company / default category
  useEffect(() => {
    if (isOpen) {
      const tab =
        defaultCategory && categoriesWithImages.includes(defaultCategory)
          ? defaultCategory
          : categoriesWithImages[0] ?? null;
      setActiveTab(tab);
      setActiveIndex(0);
    }
  }, [isOpen, company?.id, defaultCategory]);

  // Reset index when tab changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  if (!company) return null;

  const images: string[] = activeTab
    ? (company.categoryImages?.[activeTab] ?? [])
    : (company.images ?? []);

  const hasImages = images.length > 0 || hasLegacyImages;
  const displayImages = activeTab ? images : (company.images ?? []);

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
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-3">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="h-10 w-16 object-contain" />
            ) : (
              <Building2 className="h-8 w-8 text-muted-foreground" />
            )}
            <div>
              <DialogTitle className="text-lg leading-tight">{company.name}</DialogTitle>
              <div className="flex flex-wrap gap-1 mt-1">
                {company.categories.map(cat => (
                  <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Category tabs — only shown if multiple categories have images */}
        {categoriesWithImages.length > 1 && (
          <div className="flex gap-1 px-5 pb-1 overflow-x-auto">
            {categoriesWithImages.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeTab === cat
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
                <span className="ml-1 opacity-70">
                  ({company.categoryImages?.[cat]?.length ?? 0})
                </span>
              </button>
            ))}
          </div>
        )}

        {hasImages || displayImages.length > 0 ? (
          <div className="px-5 pb-5">
            {/* Main image */}
            <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
              {displayImages.length > 0 ? (
                <img
                  src={displayImages[activeIndex]}
                  alt={`${company.name} product ${activeIndex + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-300 text-sm">No images for this category</div>
              )}

              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <span className="absolute bottom-2 right-3 text-xs text-white bg-black/40 rounded px-2 py-0.5">
                    {activeIndex + 1} / {displayImages.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-colors ${
                      i === activeIndex ? 'border-primary' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
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
