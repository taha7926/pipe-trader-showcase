import { Company, ProductCategory } from '../types/company';
import pdf from '../assets/Resume.pdf';
export const mockCompanies: Company[] = [
  {
    id: 'minhas',
    name: 'MINHAS Pipes & Fittings',
    logo: '/logos/minhas-logo.png',
    description: 'Leading manufacturer of high-quality plastic pipes and fittings for residential and commercial applications.',
    categories: ['HDPE', 'uPVC'],
    catalogPdf: pdf,
  },
  {
    id: 'speed',
    name: 'SPEED Pipes & Fittings',
    logo: '/logos/speed-logo.png',
    description: 'Innovative pipe solutions with focus on durability and performance for modern construction needs.',
    categories: ['uPVC', 'CPVC'],
    catalogPdf: '/catalogs/speed-catalog.pdf'
  },
  {
    id: 'jeddah-polymer',
    name: 'JEDDAH POLYMER',
    logo: '/logos/jeddah-logo.png',
    description: 'Premium polymer pipe manufacturing with international quality standards and certifications.',
    categories: ['HDPE', 'PPRC'],
    catalogPdf: '/catalogs/jeddah-catalog.pdf'
  },
  {
    id: 'pak-arab',
    name: 'PAK ARAB Plastic Pipes & Fittings',
    logo: '/logos/pakarab-logo.png',
    description: 'Comprehensive range of plastic piping systems for water supply, drainage, and industrial applications.',
    categories: ['HDPE', 'uPVC', 'CPVC'],
    catalogPdf: '/catalogs/pakarab-catalog.pdf'
  },
  {
    id: 'steelex',
    name: 'STEELEX',
    logo: '/logos/steelex-logo.png',
    description: 'Advanced steel and plastic pipe solutions for heavy-duty industrial and infrastructure projects.',
    categories: ['HDPE', 'Bore Casing'],
    catalogPdf: '/catalogs/steelex-catalog.pdf'
  },
  {
    id: 'mark',
    name: 'MARK',
    logo: '/logos/mark-logo.png',
    description: 'Reliable and cost-effective piping solutions with nationwide distribution network.',
    categories: ['uPVC', 'PPRC'],
    catalogPdf: '/catalogs/mark-catalog.pdf'
  },
  {
    id: 'international-industries',
    name: 'INTERNATIONAL INDUSTRIES LTD',
    logo: '/logos/international-logo.png',
    description: 'Pakistan\'s largest manufacturer of steel pipes with expanding plastic pipe division.',
    categories: ['HDPE', 'uPVC', 'CPVC', 'PPRC'],
    catalogPdf: '/catalogs/international-catalog.pdf'
  }
];

// Helper functions for working with company data
export const getCompaniesByCategory = (category: ProductCategory): Company[] => {
  return mockCompanies.filter(company => company.categories.includes(category));
};

export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(company => company.id === id);
};

export const getAllCategories = (): ProductCategory[] => {
  const allCategories = mockCompanies.flatMap(company => company.categories);
  return Array.from(new Set(allCategories));
};