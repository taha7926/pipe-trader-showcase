// Company-related TypeScript interfaces and types

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  categories: ProductCategory[];
  catalogPdf: string;
  createdAt?: string; // Optional for future database integration
  updatedAt?: string; // Optional for future database integration
}

export type ProductCategory = 'HDPE' | 'uPVC' | 'CPVC' | 'PPRC' | 'Bore Casing';

export interface CompanyFilters {
  categories: ProductCategory[];
}

export interface CompanyGridProps {
  companies: Company[];
  filters: CompanyFilters;
  onFilterChange: (filters: CompanyFilters) => void;
  loading?: boolean;
}

export interface CompanyCardProps {
  company: Company;
  onViewCatalog: (company: Company) => void;
  onGetQuote: (company: Company) => void;
}

// PDF Popup related interfaces
export interface PDFPopupProps {
  isOpen: boolean;
  company: Company | null;
  onClose: () => void;
}

export interface QuoteRequestData {
  customerName: string;
  email: string;
  phone?: string;
  companyId: string;
  companyName: string;
  message: string;
  productCategories: ProductCategory[];
}
