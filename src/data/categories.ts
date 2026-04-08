import { ProductCategoryInfo, CategoryMapping } from '../types/product';

export const productCategories: ProductCategoryInfo[] = [
  {
    id: 'hdpe',
    name: 'HDPE',
    description: 'High Density Polyethylene pipes for water supply, gas distribution, and industrial applications.',
    bannerImage: '/assets/hdpe-banner.jpg',
    companies: ['pak-arab', 'local', 'national-pipe']
  },
  {
    id: 'upvc',
    name: 'UPVC',
    description: 'Unplasticized Polyvinyl Chloride pipes ideal for sewerage, drainage, and water supply systems.',
    bannerImage: '/assets/upvc-banner.jpg',
    companies: ['pak-arab', 'steelex', 'speed', 'jeddah-polymer']
  },
  {
    id: 'cpvc',
    name: 'CPVC',
    description: 'Chlorinated Polyvinyl Chloride pipes designed for hot water applications and fire sprinkler systems.',
    bannerImage: '/assets/cpvc-banner.jpg',
    companies: ['pak-arab', 'steelex', 'mark']
  },
  {
    id: 'pprc',
    name: 'PPRC',
    description: 'Polypropylene Random Copolymer pipes for hot and cold water supply in residential and commercial buildings.',
    bannerImage: '/assets/pprc-banner.jpg',
    companies: ['minhas', 'international-industries']
  },
  {
    id: 'bore-casing',
    name: 'Bore Casing',
    description: 'Specialized casing pipes for water bore wells and deep drilling applications.',
    bannerImage: '/assets/bore-casing-banner.jpg',
    companies: ['pak-arab', 'prime', 'local']
  },
  {
    id: 'gi',
    name: 'G.I',
    description: 'Galvanized Iron pipes for water supply, gas lines, and structural applications.',
    bannerImage: '/assets/bore-casing-banner.jpg',
    companies: ['international-industries']
  }
];

// Create category mapping for easy lookup
export const categoryMapping: CategoryMapping = productCategories.reduce((acc, category) => {
  acc[category.id] = category;
  return acc;
}, {} as CategoryMapping);

// Helper functions for category operations
export const getCategoryById = (id: string): ProductCategoryInfo | undefined => {
  return productCategories.find(category => category.id === id);
};

export const getCategoriesByCompany = (companyId: string): ProductCategoryInfo[] => {
  return productCategories.filter(category => category.companies.includes(companyId));
};

export const getCategoryCompanyCount = (categoryId: string): number => {
  const category = getCategoryById(categoryId);
  return category ? category.companies.length : 0;
};

// Get categories with company counts for display
export const getCategoriesWithCounts = () => {
  return productCategories.map(category => ({
    ...category,
    companyCount: category.companies.length
  }));
};

// Filter categories that have companies
export const getCategoriesWithCompanies = (): ProductCategoryInfo[] => {
  return productCategories.filter(category => category.companies.length > 0);
};