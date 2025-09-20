import { Company, ProductCategory } from '../types/company';

export const mockCompanies: Company[] = [
  {
    id: 'minhas',
    name: 'MINHAS Pipes & Fittings',
    logo: '/logos/minhas-logo.png',
    description: 'Leading manufacturer of high-quality plastic pipes and fittings for residential and commercial applications.',
    categories: ['HDPE', 'uPVC'],
    catalogPdf: '/catalogs/minhas-catalog.pdf',
    contactInfo: {
      email: 'info@minhas.com',
      phone: '+92-21-1234567',
      website: 'www.minhas.com',
      address: 'Karachi Industrial Area, Pakistan'
    }
  },
  {
    id: 'speed',
    name: 'SPEED Pipes & Fittings',
    logo: '/logos/speed-logo.png',
    description: 'Innovative pipe solutions with focus on durability and performance for modern construction needs.',
    categories: ['uPVC', 'CPVC'],
    catalogPdf: '/catalogs/speed-catalog.pdf',
    contactInfo: {
      email: 'sales@speedpipes.com',
      phone: '+92-21-2345678',
      website: 'www.speedpipes.com',
      address: 'Lahore Industrial Zone, Pakistan'
    }
  },
  {
    id: 'jeddah-polymer',
    name: 'JEDDAH POLYMER',
    logo: '/logos/jeddah-logo.png',
    description: 'Premium polymer pipe manufacturing with international quality standards and certifications.',
    categories: ['HDPE', 'PPRC'],
    catalogPdf: '/catalogs/jeddah-catalog.pdf',
    contactInfo: {
      email: 'contact@jeddahpolymer.com',
      phone: '+92-21-3456789',
      website: 'www.jeddahpolymer.com',
      address: 'Faisalabad Industrial Estate, Pakistan'
    }
  },
  {
    id: 'pak-arab',
    name: 'PAK ARAB Plastic Pipes & Fittings',
    logo: '/logos/pakarab-logo.png',
    description: 'Comprehensive range of plastic piping systems for water supply, drainage, and industrial applications.',
    categories: ['HDPE', 'uPVC', 'CPVC'],
    catalogPdf: '/catalogs/pakarab-catalog.pdf',
    contactInfo: {
      email: 'info@pakarab.com',
      phone: '+92-21-4567890',
      website: 'www.pakarab.com',
      address: 'Sialkot Industrial Area, Pakistan'
    }
  },
  {
    id: 'steelex',
    name: 'STEELEX',
    logo: '/logos/steelex-logo.png',
    description: 'Advanced steel and plastic pipe solutions for heavy-duty industrial and infrastructure projects.',
    categories: ['HDPE', 'Bore Casing'],
    catalogPdf: '/catalogs/steelex-catalog.pdf',
    contactInfo: {
      email: 'sales@steelex.pk',
      phone: '+92-21-5678901',
      website: 'www.steelex.pk',
      address: 'Gujranwala Industrial Complex, Pakistan'
    }
  },
  {
    id: 'mark',
    name: 'MARK',
    logo: '/logos/mark-logo.png',
    description: 'Reliable and cost-effective piping solutions with nationwide distribution network.',
    categories: ['uPVC', 'PPRC'],
    catalogPdf: '/catalogs/mark-catalog.pdf',
    contactInfo: {
      email: 'info@markpipes.com',
      phone: '+92-21-6789012',
      website: 'www.markpipes.com',
      address: 'Multan Industrial Zone, Pakistan'
    }
  },
  {
    id: 'international-industries',
    name: 'INTERNATIONAL INDUSTRIES LTD',
    logo: '/logos/international-logo.png',
    description: 'Pakistan\'s largest manufacturer of steel pipes with expanding plastic pipe division.',
    categories: ['HDPE', 'uPVC', 'CPVC', 'PPRC'],
    catalogPdf: '/catalogs/international-catalog.pdf',
    contactInfo: {
      email: 'sales@iil.com.pk',
      phone: '+92-21-7890123',
      website: 'www.iil.com.pk',
      address: 'Karachi Steel Mills, Pakistan'
    }
  }
];

// Helper functions for working with company data
export const getCompaniesByCategory = (category: ProductCategory): Company[] => {
  return mockCompanies.filter(company => company.categories.includes(category));
};

export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(company => company.id === id);
};

export const searchCompanies = (query: string): Company[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockCompanies.filter(company => 
    company.name.toLowerCase().includes(lowercaseQuery) ||
    company.description.toLowerCase().includes(lowercaseQuery) ||
    company.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
  );
};

export const getAllCategories = (): ProductCategory[] => {
  const allCategories = mockCompanies.flatMap(company => company.categories);
  return Array.from(new Set(allCategories));
};