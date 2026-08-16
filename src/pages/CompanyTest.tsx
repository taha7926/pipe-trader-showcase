import React from 'react';
import {Header} from '../components/Header';
import {Footer} from '../components/Footer';
import CompanyGrid from '../components/companies/CompanyGrid';
import { PDFPopup } from '../components/pdf-viewer';
import { CompanyProvider, useCompanies } from '../contexts/CompanyContext';

const CompanyTestContent: React.FC = () => {
  const { companies, filters, setFilters, loading, selectedCompany, isPDFPopupOpen, closePDFPopup } = useCompanies();

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

        {/* PDF Popup */}
        <PDFPopup
          isOpen={isPDFPopupOpen}
          company={selectedCompany}
          onClose={closePDFPopup}
        />
      </main>

      <Footer />
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