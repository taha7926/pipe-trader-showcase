import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Company, CompanyFilters, ProductCategory } from '../types/company';
import { mockCompanies } from '../data/companies';

// State interface
interface CompanyState {
  companies: Company[];
  filteredCompanies: Company[];
  filters: CompanyFilters;
  selectedCompany: Company | null;
  isPDFPopupOpen: boolean;
  loading: boolean;
}

// Action types
type CompanyAction =
  | { type: 'SET_COMPANIES'; payload: Company[] }
  | { type: 'SET_FILTERS'; payload: CompanyFilters }
  | { type: 'SET_SELECTED_COMPANY'; payload: Company | null }
  | { type: 'OPEN_PDF_POPUP'; payload: Company }
  | { type: 'CLOSE_PDF_POPUP' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'FILTER_COMPANIES' };

// Initial state
const initialFilters: CompanyFilters = {
  categories: [],
  searchQuery: '',
  sortBy: 'name'
};

const initialState: CompanyState = {
  companies: mockCompanies,
  filteredCompanies: mockCompanies,
  filters: initialFilters,
  selectedCompany: null,
  isPDFPopupOpen: false,
  loading: false
};

// Utility function to filter and sort companies
const filterAndSortCompanies = (companies: Company[], filters: CompanyFilters): Company[] => {
  let filtered = companies;

  // Filter by categories
  if (filters.categories.length > 0) {
    filtered = filtered.filter(company =>
      filters.categories.some(category => company.categories.includes(category))
    );
  }

  // Filter by search query
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(company =>
      company.name.toLowerCase().includes(query) ||
      company.description.toLowerCase().includes(query) ||
      company.categories.some(category => category.toLowerCase().includes(query))
    );
  }

  // Sort companies
  switch (filters.sortBy) {
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'categories':
      filtered.sort((a, b) => b.categories.length - a.categories.length);
      break;
    case 'newest':
      filtered.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      break;
    case 'oldest':
      filtered.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
      break;
    default:
      break;
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

    case 'SET_FILTERS':
      const newFilters = action.payload;
      return {
        ...state,
        filters: newFilters,
        filteredCompanies: filterAndSortCompanies(state.companies, newFilters)
      };

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
        selectedCompany: action.payload,
        isPDFPopupOpen: true
      };

    case 'CLOSE_PDF_POPUP':
      return {
        ...state,
        isPDFPopupOpen: false,
        selectedCompany: null
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

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

  const openPDFPopup = (company: Company) => {
    dispatch({ type: 'OPEN_PDF_POPUP', payload: company });
  };

  const closePDFPopup = () => {
    dispatch({ type: 'CLOSE_PDF_POPUP' });
  };

  const setSelectedCompany = (company: Company | null) => {
    dispatch({ type: 'SET_SELECTED_COMPANY', payload: company });
  };

  return {
    companies: state.filteredCompanies,
    allCompanies: state.companies,
    filters: state.filters,
    selectedCompany: state.selectedCompany,
    isPDFPopupOpen: state.isPDFPopupOpen,
    loading: state.loading,
    setFilters,
    openPDFPopup,
    closePDFPopup,
    setSelectedCompany
  };
};