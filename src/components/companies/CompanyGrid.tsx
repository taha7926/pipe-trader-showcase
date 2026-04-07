import React, { useState } from 'react';
import { Company, CompanyGridProps } from '@/types/company';
import CompanyCard from './CompanyCard';
import { ImageGalleryDialog } from './ImageGalleryDialog';
import { Skeleton } from '@/components/ui/skeleton';

const CompanyGrid: React.FC<CompanyGridProps> = ({
  companies,
  filters,
  onFilterChange,
  loading = false
}) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const activeCategory = filters.categories.length === 1 ? filters.categories[0] : undefined;

  // Loading State
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="space-y-4 p-6 border rounded-lg">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        {filters.categories.length > 0 && (
          <button
            onClick={() => onFilterChange({ categories: [] })}
            className="text-accent hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onViewCatalog={setSelectedCompany}
            onGetQuote={setSelectedCompany}
            activeCategory={activeCategory}
          />
        ))}
      </div>

      <ImageGalleryDialog
        company={selectedCompany}
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        defaultCategory={activeCategory}
      />
    </>
  );
};

export default CompanyGrid;
