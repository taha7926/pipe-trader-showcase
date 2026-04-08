import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Company, CompanyFilters, ProductCategory } from '../types/company';
import { mockCompanies } from '../data/companies';

const ADMIN_COMPANIES_KEY = 'pipe-trader-admin-companies';
const DELETED_STATIC_IDS_KEY = 'pipe-trader-deleted-static-ids';

/** Strip base64 data from a company before persisting — only static paths survive */
function stripBase64(company: Company): Company {
  const isBase64 = (s: string) => s.startsWith('data:');

  // Strip base64 logo (keep only paths)
  const logo = isBase64(company.logo) ? '' : company.logo;

  // Strip base64 images from categoryImages
  const categoryImages: typeof company.categoryImages = {};
  if (company.categoryImages) {
    for (const [cat, imgs] of Object.entries(company.categoryImages)) {
      const staticOnly = (imgs || []).filter(i => !isBase64(i));
      if (staticOnly.length > 0) {
        categoryImages[cat as keyof typeof categoryImages] = staticOnly;
      }
    }
  }

  // Strip base64 from pdfs paths
  const pdfs = (company.pdfs || []).map(p => ({
    ...p,
    path: isBase64(p.path) ? '' : p.path,
  }));

  // Strip legacy images array
  const images = (company.images || []).filter(i => !isBase64(i));

  return { ...company, logo, categoryImages, pdfs, images };
}

/** Auto-cleanup: strip base64 blobs from stored data on startup to prevent quota issues */
function cleanupLocalStorage() {
  try {
    const raw = localStorage.getItem(ADMIN_COMPANIES_KEY);
    if (!raw) return;
    const sizeKB = Math.round(raw.length / 1024);
    // If stored data is over 500KB, it likely has base64 blobs — strip them
    if (sizeKB > 500) {
      const companies: Company[] = JSON.parse(raw);
      const cleaned = companies.map(stripBase64);
      const cleanedStr = JSON.stringify(cleaned);
      const cleanedKB = Math.round(cleanedStr.length / 1024);
      if (cleanedKB < sizeKB) {
        localStorage.setItem(ADMIN_COMPANIES_KEY, cleanedStr);
        console.log(`Auto-cleaned localStorage: ${sizeKB}KB → ${cleanedKB}KB (stripped base64 data)`);
      }
    }
  } catch {
    // If parsing fails, remove corrupted data
    localStorage.removeItem(ADMIN_COMPANIES_KEY);
    console.log('Removed corrupted admin data from localStorage');
  }
}

// Run cleanup on load
cleanupLocalStorage();

// Merge static companies with admin-overrides from localStorage
function getInitialCompanies(): Company[] {
  try {
    const stored = localStorage.getItem(ADMIN_COMPANIES_KEY);
    const adminCompanies: Company[] = stored ? JSON.parse(stored) : [];

    const deletedRaw = localStorage.getItem(DELETED_STATIC_IDS_KEY);
    const deletedStaticIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];

    const adminIds = new Set(adminCompanies.map(c => c.id));
    // Static companies not overridden and not deleted
    const unmodifiedStatic = mockCompanies.filter(
      c => !adminIds.has(c.id) && !deletedStaticIds.includes(c.id)
    );
    return [...unmodifiedStatic, ...adminCompanies];
  } catch {
    return mockCompanies;
  }
}

// Persist only admin-created/edited companies (not static originals)
function persistAdminCompanies(companies: Company[]) {
  try {
    const adminOnes = companies.filter(c => c.isAdminCreated).map(stripBase64);
    const serialized = JSON.stringify(adminOnes);
    const sizeKB = Math.round(serialized.length / 1024);
    if (sizeKB > 4000) {
      alert(`⚠️ Storage warning: your data is ${sizeKB}KB which is near the browser limit (5MB).\n\nUse static file paths instead of uploading files directly.`);
    }
    localStorage.setItem(ADMIN_COMPANIES_KEY, serialized);
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError' || e?.code === 22) {
      alert('❌ Save failed: browser storage is full.\n\nSolution: Place files in /public/images/ and /public/catalogs/, then use the path input in the admin panel instead of uploading directly.');
    } else {
      alert('❌ Save failed: ' + (e?.message || 'Unknown error'));
    }
    console.error('Failed to persist companies to localStorage:', e);
  }
}

function persistDeletedStaticIds(ids: string[]) {
  try {
    localStorage.setItem(DELETED_STATIC_IDS_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to persist deleted static IDs:', e);
  }
}

// State interface
interface CompanyState {
  companies: Company[];
  filteredCompanies: Company[];
  filters: CompanyFilters;
  selectedCompany: Company | null;
  selectedCategory: ProductCategory | null;
  isPDFPopupOpen: boolean;
  loading: boolean;
}

// Action types
type CompanyAction =
  | { type: 'SET_COMPANIES'; payload: Company[] }
  | { type: 'SET_FILTERS'; payload: CompanyFilters }
  | { type: 'SET_SELECTED_COMPANY'; payload: Company | null }
  | { type: 'OPEN_PDF_POPUP'; payload: { company: Company; category?: ProductCategory } }
  | { type: 'CLOSE_PDF_POPUP' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'FILTER_COMPANIES' }
  | { type: 'ADD_COMPANY'; payload: Company }
  | { type: 'UPDATE_COMPANY'; payload: Company }
  | { type: 'DELETE_COMPANY'; payload: string };

// Initial state
const initialFilters: CompanyFilters = {
  categories: [],
};

const initialState: CompanyState = {
  companies: getInitialCompanies(),
  filteredCompanies: getInitialCompanies(),
  filters: initialFilters,
  selectedCompany: null,
  selectedCategory: null,
  isPDFPopupOpen: false,
  loading: false
};

// Utility function to filter and sort companies
const filterAndSortCompanies = (companies: Company[], filters: CompanyFilters): Company[] => {
  let filtered = companies;

  if (filters.categories.length > 0) {
    filtered = filtered.filter(company =>
      filters.categories.some(category => company.categories.includes(category))
    );
  }

  return filtered;
};

// Reducer function
const companyReducer = (state: CompanyState, action: CompanyAction): CompanyState => {
  switch (action.type) {
    case 'SET_COMPANIES':
      return {
        ...state,
        companies: action.payload,
        filteredCompanies: filterAndSortCompanies(action.payload, state.filters)
      };

    case 'SET_FILTERS': {
      const newFilters = action.payload;
      return {
        ...state,
        filters: newFilters,
        filteredCompanies: filterAndSortCompanies(state.companies, newFilters)
      };
    }

    case 'FILTER_COMPANIES':
      return {
        ...state,
        filteredCompanies: filterAndSortCompanies(state.companies, state.filters)
      };

    case 'SET_SELECTED_COMPANY':
      return {
        ...state,
        selectedCompany: action.payload
      };

    case 'OPEN_PDF_POPUP':
      return {
        ...state,
        selectedCompany: action.payload.company,
        selectedCategory: action.payload.category || null,
        isPDFPopupOpen: true
      };

    case 'CLOSE_PDF_POPUP':
      return {
        ...state,
        isPDFPopupOpen: false,
        selectedCompany: null,
        selectedCategory: null
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'ADD_COMPANY': {
      const newCompany = { ...action.payload, isAdminCreated: true };
      const updated = [...state.companies, newCompany];
      persistAdminCompanies(updated);
      return {
        ...state,
        companies: updated,
        filteredCompanies: filterAndSortCompanies(updated, state.filters)
      };
    }

    case 'UPDATE_COMPANY': {
      const updatedCompany = { ...action.payload, isAdminCreated: true };
      const updated = state.companies.map(c =>
        c.id === updatedCompany.id ? updatedCompany : c
      );
      persistAdminCompanies(updated);
      return {
        ...state,
        companies: updated,
        filteredCompanies: filterAndSortCompanies(updated, state.filters)
      };
    }

    case 'DELETE_COMPANY': {
      const idToDelete = action.payload;
      const isStatic = mockCompanies.some(c => c.id === idToDelete);
      if (isStatic) {
        // Track deleted static IDs separately
        try {
          const raw = localStorage.getItem(DELETED_STATIC_IDS_KEY);
          const existing: string[] = raw ? JSON.parse(raw) : [];
          if (!existing.includes(idToDelete)) {
            persistDeletedStaticIds([...existing, idToDelete]);
          }
        } catch { /* ignore */ }
      }
      const updated = state.companies.filter(c => c.id !== idToDelete);
      persistAdminCompanies(updated);
      return {
        ...state,
        companies: updated,
        filteredCompanies: filterAndSortCompanies(updated, state.filters)
      };
    }

    default:
      return state;
  }
};

// Context creation
const CompanyContext = createContext<{
  state: CompanyState;
  dispatch: React.Dispatch<CompanyAction>;
} | null>(null);

// Provider component
interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider: React.FC<CompanyProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialState);

  return (
    <CompanyContext.Provider value={{ state, dispatch }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook for using the company context
export const useCompanyContext = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyProvider');
  }
  return context;
};

// Custom hooks for common operations
export const useCompanies = () => {
  const { state, dispatch } = useCompanyContext();

  const setFilters = (filters: CompanyFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const openPDFPopup = (company: Company, category?: ProductCategory) => {
    dispatch({ type: 'OPEN_PDF_POPUP', payload: { company, category } });
  };

  const closePDFPopup = () => {
    dispatch({ type: 'CLOSE_PDF_POPUP' });
  };

  const setSelectedCompany = (company: Company | null) => {
    dispatch({ type: 'SET_SELECTED_COMPANY', payload: company });
  };

  const addCompany = (company: Company) => {
    dispatch({ type: 'ADD_COMPANY', payload: company });
  };

  const updateCompany = (company: Company) => {
    dispatch({ type: 'UPDATE_COMPANY', payload: company });
  };

  const deleteCompany = (id: string) => {
    dispatch({ type: 'DELETE_COMPANY', payload: id });
  };

  return {
    companies: state.filteredCompanies,
    allCompanies: state.companies,
    filters: state.filters,
    selectedCompany: state.selectedCompany,
    selectedCategory: state.selectedCategory,
    isPDFPopupOpen: state.isPDFPopupOpen,
    loading: state.loading,
    setFilters,
    openPDFPopup,
    closePDFPopup,
    setSelectedCompany,
    addCompany,
    updateCompany,
    deleteCompany
  };
};
