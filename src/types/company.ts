// Company-related TypeScript interfaces and types

export interface CompanyPdf {
  id: string;                        // unique id e.g. "pak-arab-pdf-1"
  title: string;                     // display name e.g. "Full Product Catalog 2024"
  path: string;                      // "/catalogs/pak-arab.pdf" or base64 data URI
  categories: ProductCategory[];     // which categories this PDF applies to (empty = all)
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  categories: ProductCategory[];
  pdfs?: CompanyPdf[];               // NEW: multiple PDFs, each covering selected categories
  catalogPdfs?: {                    // Legacy: kept for backward compat with static data
    [key in ProductCategory]?: string;
  };
  images?: string[];                 // Legacy: kept for backwards compatibility
  categoryImages?: { [key in ProductCategory]?: string[] }; // Per-category product images (up to 25 each)
  whatsappLink?: string;             // Custom WhatsApp link
  isAdminCreated?: boolean;          // True if created/edited via admin panel
  createdAt?: string;
  updatedAt?: string;
}

export type ProductCategory = 'HDPE' | 'uPVC' | 'CPVC' | 'PPRC' | 'Bore Casing' | 'G.I';

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
  activeCategory?: ProductCategory;
}

// PDF Popup related interfaces
export interface PDFPopupProps {
  isOpen: boolean;
  company: Company | null;
  selectedCategory?: ProductCategory;
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
