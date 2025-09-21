import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, MessageCircle, Building2 } from 'lucide-react';
import { CompanyCardProps } from '@/types/company';

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onViewCatalog,
  onGetQuote
}) => {
  const handleViewCatalog = () => {
    onViewCatalog(company);
  };

  const handleGetQuote = () => {
    onGetQuote(company);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.nextElementSibling?.classList.remove('hidden');
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-accent/50 bg-background">
      <CardContent className="p-6">
        {/* Company Logo */}
        <div className="flex items-center justify-center h-20 mb-4 bg-muted/30 rounded-lg overflow-hidden">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="max-h-16 max-w-full object-contain"
            onError={handleImageError}
          />
          {/* Fallback logo */}
          <div className="hidden items-center justify-center h-full w-full">
            <Building2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        {/* Company Name */}
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-accent transition-colors">
          {company.name}
        </h3>

        {/* Company Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {company.description}
        </p>

        {/* Product Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
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

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Primary CTA - View Catalog */}
          <Button
            onClick={handleViewCatalog}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-all duration-200"
            size="default"
          >
            <FileText className="h-4 w-4 mr-2" />
            View Catalog
          </Button>

          {/* Secondary CTA - Get Quote */}
          <Button
            onClick={handleGetQuote}
            variant="outline"
            className="w-full border-2 border-primary/20 text-foreground hover:bg-primary/5 hover:border-primary/40 font-semibold transition-all duration-200"
            size="default"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;