import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CompanyProvider, useCompanies } from '@/contexts/CompanyContext';
import { PDFPopup } from '@/components/pdf-viewer';
import { Company } from '@/types/company';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Building2, FileText } from 'lucide-react';

/* Single company catalog card */
const CompanyCatalogCard: React.FC<{
  company: Company;
  onOpen: (company: Company) => void;
}> = ({ company, onOpen }) => {
  const pdfCount = company.pdfs?.length ?? 0;

  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardContent className="p-4 h-full flex flex-col items-center text-center">
        {/* Logo — fixed height */}
        <div className="w-24 h-16 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 overflow-hidden shrink-0">
          {company.logo
            ? <img src={company.logo} alt={company.name} className="w-full h-full object-contain p-1" />
            : <Building2 className="h-6 w-6 text-gray-300" />
          }
        </div>

        {/* Name — fixed min-height for 2 lines */}
        <div className="min-h-[2.5rem] flex items-center justify-center mt-3">
          <p className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">{company.name}</p>
        </div>

        {/* Category badges — fixed min-height so varying badge counts don't shift button */}
        <div className="min-h-[3.5rem] flex flex-wrap justify-center items-start gap-1 mt-2">
          {company.categories.map(cat => (
            <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
          ))}
        </div>

        {/* PDF count — always occupies the same space */}
        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1 h-5">
          {pdfCount > 0 && (
            <><FileText className="h-3 w-3" />{pdfCount} catalog{pdfCount !== 1 ? 's' : ''}</>
          )}
        </p>

        {/* Button — always at the bottom */}
        <div className="w-full mt-auto pt-3">
          <Button
            size="sm"
            onClick={() => onOpen(company)}
            disabled={pdfCount === 0}
            className="w-full gap-1.5"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {pdfCount === 0 ? 'No Catalog' : 'View Catalog'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CatalogsContent: React.FC = () => {
  const {
    allCompanies,
    openPDFPopup,
    closePDFPopup,
    isPDFPopupOpen,
    selectedCompany,
    selectedCategory: pdfCategory,
  } = useCompanies();

  const companiesWithPdfs = allCompanies.filter(c => (c.pdfs?.length ?? 0) > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Product Catalogs</h1>
          </div>
          <p className="text-gray-500 text-sm">
            Click any company to open its catalog
          </p>
        </div>

        {companiesWithPdfs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No catalogs available yet.</p>
            <p className="text-sm mt-1">Add PDFs via the admin panel to see them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-stretch">
            {companiesWithPdfs.map(company => (
              <CompanyCatalogCard
                key={company.id}
                company={company}
                onOpen={c => openPDFPopup(c)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />

      <PDFPopup
        isOpen={isPDFPopupOpen}
        company={selectedCompany}
        selectedCategory={pdfCategory || undefined}
        onClose={closePDFPopup}
      />
    </div>
  );
};

const Catalogs: React.FC = () => (
  <CompanyProvider>
    <CatalogsContent />
  </CompanyProvider>
);

export default Catalogs;
