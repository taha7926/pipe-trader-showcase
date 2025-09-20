// Company-related TypeScript interfaces and types

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  categories: ProductCategory[];
  catalogPdf: string;
  contactInfo: ContactInfo;
  createdAt?: string; // Optional for future database integration
  updatedAt?: string; // Optional for future database integration
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export type ProductCategory = 'HDPE' | 'uPVC' | 'CPVC' | 'PPRC' | 'Bore Casing';

export interface CompanyFilters {
  categories: ProductCategory[];
  searchQuery: string;
  sortBy: CompanySortOption;
}

export type CompanySortOption = 'name' | 'categories' | 'newest' | 'oldest';

// UI State interfaces for components
export interface CompanyCardProps {
  company: Company;
  onViewCatalog: (company: Company) => void;
  onGetQuote: (company: Company) => void;
}

export interface CompanyGridProps {
  companies: Company[];
  filters: CompanyFilters;
  onFilterChange: (filters: CompanyFilters) => void;
  loading?: boolean;
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
