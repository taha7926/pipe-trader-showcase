import { Company, ProductCategory } from '../types/company';
import pakArabLogo from '../assets/Logos/pak-arab.png';
import steelexLogo from '../assets/Logos/steelex_logo.png';
import jeddahLogo from '../assets/Logos/Jeddah.png';
import minhasLogo from '../assets/Logos/minhas.png';
import iilLogo from '../assets/Logos/IIL.png';
import localLogo from '../assets/Logos/local-pipe.png';
import markLogo from '../assets/Logos/Mark.png';
import primeLogo from '../assets/Logos/Prime.png';
import speedLogo from '../assets/Logos/speed.png';
import nationalPipeLogo from '../assets/Logos/national-pipe.png';

export const mockCompanies: Company[] = [
  {
    id: 'pak-arab',
    name: 'PAK ARAB',
    logo: pakArabLogo,
    description: 'Comprehensive range of plastic piping systems for water supply, drainage, and industrial applications.',
    categories: ['HDPE', 'uPVC', 'CPVC', 'Bore Casing'],
    catalogPdfs: {
      'HDPE': '/catalogs/pakarab-hdpe-catalog.pdf',
      'uPVC': '/catalogs/pakarab-upvc-catalog.pdf',
      'CPVC': '/catalogs/pakarab-cpvc-catalog.pdf',
      'Bore Casing': '/catalogs/pakarab-bore-casing-catalog.pdf'
    }
  },
  {
    id: 'local',
    name: 'Local Pipe',
    logo: localLogo,
    description: 'Cost-effective local manufacturing with quality assurance.',
    categories: ['HDPE', 'Bore Casing'],
    catalogPdfs: {
      'HDPE': '/catalogs/local-hdpe-catalog.pdf',
      'Bore Casing': '/catalogs/local-bore-casing-catalog.pdf'
    }
  },
  {
    id: 'national-pipe',
    name: 'NATIONAL PIPE',
    logo: nationalPipeLogo,
    description: 'Trusted manufacturer of HDPE pipes with extensive industry experience.',
    categories: ['HDPE'],
    catalogPdfs: {
      'HDPE': '/catalogs/national-hdpe-catalog.pdf'
    }
  },
  {
    id: 'steelex',
    name: 'STEELEX',
    logo: steelexLogo,
    description: 'Advanced steel and plastic pipe solutions for heavy-duty industrial and infrastructure projects.',
    categories: ['uPVC', 'CPVC'],
    catalogPdfs: {
      'uPVC': '/catalogs/steelex-upvc-catalog.pdf',
      'CPVC': '/catalogs/steelex-cpvc-catalog.pdf'
    }
  },
  {
    id: 'speed',
    name: 'SPEED',
    logo: speedLogo,
    description: 'Innovative pipe solutions with focus on durability and performance for modern construction needs.',
    categories: ['uPVC'],
    catalogPdfs: {
      'uPVC': '/catalogs/speed-upvc-catalog.pdf'
    }
  },
  {
    id: 'jeddah-polymer',
    name: 'JEDDAH POLYMER',
    logo: jeddahLogo,
    description: 'Premium polymer pipe manufacturing with international quality standards and certifications.',
    categories: ['uPVC'],
    catalogPdfs: {
      'uPVC': '/catalogs/jeddah-upvc-catalog.pdf'
    }
  },
  {
    id: 'mark',
    name: 'MARK',
    logo: markLogo,
    description: 'Reliable and cost-effective piping solutions with nationwide distribution network.',
    categories: ['CPVC'],
    catalogPdfs: {
      'CPVC': '/catalogs/mark-cpvc-catalog.pdf'
    }
  },
  {
    id: 'minhas',
    name: 'MINHAS',
    logo: minhasLogo,
    description: 'Leading manufacturer of high-quality plastic pipes and fittings for residential and commercial applications.',
    categories: ['PPRC'],
    catalogPdfs: {
      'PPRC': '/catalogs/minhas-pprc-catalog.pdf'
    }
  },
  {
    id: 'international-industries',
    name: 'INTERNATIONAL INDUSTRIES LTD',
    logo: iilLogo,
    description: 'Pakistan\'s largest manufacturer of steel pipes with expanding plastic pipe division.',
    categories: ['PPRC'],
    catalogPdfs: {
      'PPRC': '/catalogs/international-pprc-catalog.pdf'
    }
  },
  {
    id: 'prime',
    name: 'PRIME',
    logo: primeLogo,
    description: 'Premium bore casing and pipe solutions for specialized applications.',
    categories: ['Bore Casing'],
    catalogPdfs: {
      'Bore Casing': '/catalogs/prime-bore-casing-catalog.pdf'
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

export const getAllCategories = (): ProductCategory[] => {
  const allCategories = mockCompanies.flatMap(company => company.categories);
  return Array.from(new Set(allCategories));
};