import { Company, CompanyFilters, ProductCategory } from '../types/company';

// Company filtering utilities
export const filterCompaniesByCategory = (
  companies: Company[], 
  categories: ProductCategory[]
): Company[] => {
  if (categories.length === 0) return companies;
  
  return companies.filter(company =>
    categories.some(category => company.categories.includes(category))
  );
};

// Apply all filters and sorting
export const applyCompanyFilters = (
  companies: Company[], 
  filters: CompanyFilters
): Company[] => {
  let filtered = companies;
  
  // Apply category filter
  filtered = filterCompaniesByCategory(filtered, filters.categories);
  
  return filtered;
};

// Company lookup utilities
export const getCompanyById = (companies: Company[], id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getCompaniesByCategory = (
  companies: Company[], 
  category: ProductCategory
): Company[] => {
  return companies.filter(company => company.categories.includes(category));
};

// Category-related utilities
export const getAllCategoriesFromCompanies = (companies: Company[]): ProductCategory[] => {
  const allCategories = companies.flatMap(company => company.categories);
  return Array.from(new Set(allCategories));
};

export const getCategoryCompanyCount = (
  companies: Company[], 
  category: ProductCategory
): number => {
  return companies.filter(company => company.categories.includes(category)).length;
};

// Validation utilities
export const validateCompanyData = (company: Partial<Company>): string[] => {
  const errors: string[] = [];
  
  if (!company.name?.trim()) {
    errors.push('Company name is required');
  }
  
  if (!company.description?.trim()) {
    errors.push('Company description is required');
  }
  
  if (!company.categories || company.categories.length === 0) {
    errors.push('At least one product category is required');
  }
  
  if (!company.catalogPdf?.trim()) {
    errors.push('Catalog PDF path is required');
  }
  
  return errors;
};

// URL and file utilities
export const isValidPDFUrl = (url: string): boolean => {
  return url.trim().length > 0 && (url.endsWith('.pdf') || url.includes('.pdf'));
};

export const isValidImageUrl = (url: string): boolean => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp'];
  return validExtensions.some(ext => url.toLowerCase().includes(ext));
};

// Search highlighting utilities
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// Filter management utilities
export const createDefaultFilters = (): CompanyFilters => ({
  categories: [],
});

export const isFiltersEmpty = (filters: CompanyFilters): boolean => {
  return filters.categories.length === 0
};

export const clearFilters = (): CompanyFilters => createDefaultFilters();

// Statistics utilities
export const getCompanyStatistics = (companies: Company[]) => {
  const totalCompanies = companies.length;
  const categories = getAllCategoriesFromCompanies(companies);
  const totalCategories = categories.length;
  
  const categoryStats = categories.map(category => ({
    category,
    count: getCategoryCompanyCount(companies, category)
  }));
  
  return {
    totalCompanies,
    totalCategories,
    categoryStats,
    averageCompaniesPerCategory: totalCompanies > 0 ? totalCompanies / totalCategories : 0
  };
};