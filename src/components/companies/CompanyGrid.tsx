import React from 'react';
import { CompanyGridProps } from '@/types/company';
import { useCompanies } from '@/contexts/CompanyContext';
import CompanyCard from './CompanyCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Building2, Search } from 'lucide-react';

const CompanyGrid: React.FC<CompanyGridProps> = ({
  companies,
  filters,
  onFilterChange,
  loading = false
}) => {
  const { openPDFPopup, setSelectedCompany } = useCompanies();

  const handleViewCatalog = (company: any) => {
    // If there's a single category filter active, use it for the PDF
    const activeCategory = filters.categories.length === 1 ? filters.categories[0] : undefined;
    openPDFPopup(company, activeCategory);
  };

  const handleGetQuote = (company: any) => {
    // Redirect to WhatsApp for quote
    window.open('https://wa.me/message/AZLLSHJVYUYJP1', '_blank');
  };

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
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">

        {(filters.categories.length > 0) && (
          <button
            onClick={() => onFilterChange({
              categories: [],
            })}
            className="text-accent hover:underline font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  // Companies Grid
  return (
    <div className="space-y-6">
      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onViewCatalog={handleViewCatalog}
            onGetQuote={handleGetQuote}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyGrid;