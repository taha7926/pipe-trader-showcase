import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Images } from 'lucide-react';
import { CompanyCardProps } from '@/types/company';

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onViewCatalog, activeCategory }) => {
  // Show images for the active category only; never fall back to a different category
  const previewImages = (() => {
    if (activeCategory) {
      // Strict: only show images for the selected category
      return company.categoryImages?.[activeCategory] ?? [];
    }
    // No specific category selected (All tab) — show first available
    for (const cat of company.categories) {
      if (company.categoryImages?.[cat]?.length) {
        return company.categoryImages[cat]!;
      }
    }
    // Legacy fallback
    return company.images ?? [];
  })();

  const hasImages = previewImages.length > 0;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
  };

  return (
    <Card
      onClick={() => onViewCatalog(company)}
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-accent/50 bg-background h-full"
    >
      <CardContent className="p-6 h-full flex flex-col">
        {/* Company Logo */}
        <div className="flex items-center justify-center h-20 mb-4 bg-transparent rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="max-h-16 max-w-full object-contain"
            onError={handleImageError}
          />
          <div className="hidden items-center justify-center h-full w-full">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        {/* Company Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors min-h-[28px]">
          {company.name}
        </h3>

        {/* Company Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed min-h-[40px]">
          {company.description}
        </p>

        {/* Product Categories */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[32px]">
          {company.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="bg-accent/10 text-accent hover:bg-accent/20 text-xs font-medium"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Product image previews — fixed-height placeholder for consistency */}
        <div className="mt-auto h-20 flex items-center">
          {hasImages ? (
            <div className="flex gap-1.5 w-full">
              {previewImages.slice(0, 3).map((img, i) => (
                <div
                  key={i}
                  className="flex-1 h-20 rounded overflow-hidden bg-gray-50 border border-gray-100 min-w-0"
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {previewImages.length > 3 && (
                <div className="flex-1 h-20 rounded overflow-hidden bg-gray-100 border border-gray-100 flex items-center justify-center min-w-0">
                  <span className="text-xs font-semibold text-gray-500">
                    +{previewImages.length - 3}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60 group-hover:text-accent/60 transition-colors">
              <Images className="h-3.5 w-3.5" />
              <span>Tap to view details</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
