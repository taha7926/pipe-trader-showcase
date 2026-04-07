import React from 'react';
import { Company, ProductCategory } from '@/types/company';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export interface CatalogEntry {
  company: Company;
  category: ProductCategory;
  pdfUrl: string;
}

interface CatalogCardProps {
  entry: CatalogEntry;
  onViewCatalog: () => void;
}

export const CatalogCard: React.FC<CatalogCardProps> = ({ entry, onViewCatalog }) => {
  const { company, category } = entry;

  return (
    <Card className="group hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4 flex flex-col items-center text-center gap-3">
        {/* Logo */}
        <div className="w-20 h-16 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-xl font-bold text-gray-300">{company.name.charAt(0)}</span>
          )}
        </div>

        {/* Company name */}
        <p className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">
          {company.name}
        </p>

        {/* Category badge */}
        <Badge variant="secondary" className="text-xs">
          {category}
        </Badge>

        {/* View button */}
        <Button
          size="sm"
          onClick={onViewCatalog}
          className="w-full gap-1.5 mt-auto"
        >
          <FileText className="h-3.5 w-3.5" />
          View Catalog
        </Button>
      </CardContent>
    </Card>
  );
};
