import React from 'react';
import {Header} from '../components/Header';
import CompanyGrid from '../components/companies/CompanyGrid';
import { CompanyProvider, useCompanies } from '../contexts/CompanyContext';

const CompanyTestContent: React.FC = () => {
  const { companies, filters, setFilters, loading } = useCompanies();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">

        
        <section className="mb-12">

          <CompanyGrid 
            companies={companies}
            filters={filters}
            onFilterChange={setFilters}
            loading={loading}
          />
        </section>
      </main>
    </div>
  );
};

const CompanyTest: React.FC = () => {
  return (
    <CompanyProvider>
      <CompanyTestContent />
    </CompanyProvider>
  );
};

export default CompanyTest;