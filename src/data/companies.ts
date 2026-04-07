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
    pdfs: [
      {
        id: 'pak-arab-pdf-1',
        title: 'Full Product Catalog',
        path: '/catalogs/pakarab-upvc-catalog.pdf',
        categories: ['HDPE', 'uPVC', 'CPVC', 'Bore Casing'],
      },
    ],
  },
  {
    id: 'local',
    name: 'Local Pipe',
    logo: localLogo,
    description: 'Cost-effective local manufacturing with quality assurance.',
    categories: ['HDPE', 'Bore Casing'],
    pdfs: [
      {
        id: 'local-pdf-1',
        title: 'Product Catalog',
        path: '/catalogs/local-hdpe-catalog.pdf',
        categories: ['HDPE', 'Bore Casing'],
      },
    ],
  },
  {
    id: 'national-pipe',
    name: 'NATIONAL PIPE',
    logo: nationalPipeLogo,
    description: 'Trusted manufacturer of HDPE pipes with extensive industry experience.',
    categories: ['HDPE'],
    pdfs: [
      {
        id: 'national-pipe-pdf-1',
        title: 'HDPE Catalog',
        path: '/catalogs/national-hdpe-catalog.pdf',
        categories: ['HDPE'],
      },
    ],
  },
  {
    id: 'steelex',
    name: 'STEELEX',
    logo: steelexLogo,
    description: 'Advanced steel and plastic pipe solutions for heavy-duty industrial and infrastructure projects.',
    categories: ['uPVC', 'CPVC'],
    pdfs: [
      {
        id: 'steelex-pdf-1',
        title: 'uPVC & CPVC Catalog',
        path: '/catalogs/steelex-upvc-catalog.pdf',
        categories: ['uPVC', 'CPVC'],
      },
    ],
  },
  {
    id: 'speed',
    name: 'SPEED',
    logo: speedLogo,
    description: 'Innovative pipe solutions with focus on durability and performance for modern construction needs.',
    categories: ['uPVC'],
    pdfs: [
      {
        id: 'speed-pdf-1',
        title: 'uPVC Catalog',
        path: '/catalogs/speed-upvc-catalog.pdf',
        categories: ['uPVC'],
      },
    ],
  },
  {
    id: 'jeddah-polymer',
    name: 'JEDDAH POLYMER',
    logo: jeddahLogo,
    description: 'Premium polymer pipe manufacturing with international quality standards and certifications.',
    categories: ['uPVC'],
    pdfs: [
      {
        id: 'jeddah-pdf-1',
        title: 'uPVC Catalog',
        path: '/catalogs/jeddah-upvc-catalog.pdf',
        categories: ['uPVC'],
      },
    ],
  },
  {
    id: 'mark',
    name: 'MARK',
    logo: markLogo,
    description: 'Reliable and cost-effective piping solutions with nationwide distribution network.',
    categories: ['CPVC'],
    pdfs: [
      {
        id: 'mark-pdf-1',
        title: 'CPVC Catalog',
        path: '/catalogs/mark-cpvc-catalog.pdf',
        categories: ['CPVC'],
      },
    ],
  },
  {
    id: 'minhas',
    name: 'MINHAS',
    logo: minhasLogo,
    description: 'Leading manufacturer of high-quality plastic pipes and fittings for residential and commercial applications.',
    categories: ['PPRC'],
    pdfs: [
      {
        id: 'minhas-pdf-1',
        title: 'PPRC Catalog',
        path: '/catalogs/minhas-pprc-catalog.pdf',
        categories: ['PPRC'],
      },
    ],
  },
  {
    id: 'international-industries',
    name: 'INTERNATIONAL INDUSTRIES LTD',
    logo: iilLogo,
    description: 'Pakistan\'s largest manufacturer of steel pipes with expanding plastic pipe division.',
    categories: ['PPRC'],
    pdfs: [
      {
        id: 'iil-pdf-1',
        title: 'PPRC Catalog',
        path: '/catalogs/international-pprc-catalog.pdf',
        categories: ['PPRC'],
      },
    ],
  },
  {
    id: 'prime',
    name: 'PRIME',
    logo: primeLogo,
    description: 'Premium bore casing and pipe solutions for specialized applications.',
    categories: ['Bore Casing'],
    pdfs: [
      {
        id: 'prime-pdf-1',
        title: 'Bore Casing Catalog',
        path: '/catalogs/prime-bore-casing-catalog.pdf',
        categories: ['Bore Casing'],
      },
    ],
  },
];

// Helper functions
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

/** Get PDFs for a company that apply to a given category (or all if no category given) */
export const getPdfsForCategory = (company: Company, category?: ProductCategory) => {
  const pdfs = company.pdfs ?? [];
  if (!category) return pdfs;
  return pdfs.filter(p => p.categories.length === 0 || p.categories.includes(category));
};
