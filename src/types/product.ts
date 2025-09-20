// Product category related TypeScript interfaces and types

export interface ProductCategoryInfo {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  companies: string[]; // Array of company IDs that offer this category
}

export interface CategoryMapping {
  [key: string]: ProductCategoryInfo;
}

// Re-export the ProductCategory type from company.ts for convenience
export type { ProductCategory } from './company';

// Category display configuration
export interface CategoryDisplayConfig {
  showCompanyCount: boolean;
  showDescription: boolean;
  gridColumns: number;
}

// For the existing category slider/tabs
export interface CategoryTabProps {
  categories: ProductCategoryInfo[];
  activeCategory: string | null;
  onCategorySelect: (categoryId: string) => void;
}

// Category filtering and search
export interface CategoryFilters {
  searchQuery: string;
  hasCompanies: boolean; // Only show categories that have companies
}