import React, { useEffect, useState } from 'react';
import { X, Download, ExternalLink, AlertCircle, FileText, Smartphone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ContactSidebar from './ContactSidebar';
import ReactPDFViewer from './ReactPDFViewer';
import { Company, CompanyPdf, ProductCategory } from '@/types/company';

interface PDFPopupProps {
  isOpen: boolean;
  company: Company | null;
  selectedCategory?: ProductCategory;
  onClose: () => void;
}

/** Get all PDFs for a company that match the selected category */
function getMatchingPdfs(company: Company, category?: ProductCategory): CompanyPdf[] {
  const pdfs = company.pdfs ?? [];
  if (!category) return pdfs;
  return pdfs.filter(p => p.categories.length === 0 || p.categories.includes(category));
}

const PDFPopup: React.FC<PDFPopupProps> = ({ isOpen, company, selectedCategory, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [canDisplayPDF, setCanDisplayPDF] = useState(true);
  const [useReactPDF, setUseReactPDF] = useState(false);
  const [activePdfId, setActivePdfId] = useState<string | null>(null);

  // All PDFs matching the selected category
  const matchingPdfs = company ? getMatchingPdfs(company, selectedCategory) : [];

  // Active PDF object
  const activePdf = matchingPdfs.find(p => p.id === activePdfId) ?? matchingPdfs[0] ?? null;

  // Detect mobile
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
    setIsMobile(isMobileDevice);
    if (isMobileDevice && /android|iphone|ipad|ipod/i.test(ua)) {
      setUseReactPDF(true);
      setCanDisplayPDF(false);
    }
  }, []);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setShowSidebar(window.innerWidth >= 1024);
      // Default to first matching PDF
      const pdfs = company ? getMatchingPdfs(company, selectedCategory) : [];
      setActivePdfId(pdfs[0]?.id ?? null);
    }
  }, [isOpen, company?.id, selectedCategory]);

  // Reset loading when active PDF changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [activePdfId]);

  const handleDownload = () => {
    if (!activePdf) return;
    const link = document.createElement('a');
    link.href = activePdf.path;
    link.download = `${company?.name}-${activePdf.title || 'catalog'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExternalLink = () => {
    if (activePdf) window.open(activePdf.path, '_blank');
  };

  if (!company) return null;

  const multiplePdfs = matchingPdfs.length > 1;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-full sm:max-w-[95vw] sm:h-[95vh] p-0 gap-0 overflow-hidden [&>button]:hidden">
        <div className="flex flex-col h-full overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              {useReactPDF ? <Smartphone className="h-5 w-5 text-primary shrink-0" /> : <FileText className="h-5 w-5 text-primary shrink-0" />}
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-foreground truncate">
                  {company.name}
                  {selectedCategory ? ` — ${selectedCategory}` : ''}
                </h2>
                {activePdf && (
                  <p className="text-xs text-muted-foreground truncate">{activePdf.title}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={handleExternalLink} className={useReactPDF ? 'hidden' : 'hidden sm:flex'}>
                <ExternalLink className="h-4 w-4 mr-2" /> Open
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* PDF switcher tabs — shown when there are multiple PDFs */}
          {multiplePdfs && (
            <div className="flex gap-1 px-4 py-2 border-b bg-gray-50 overflow-x-auto shrink-0">
              {matchingPdfs.map(pdf => (
                <button
                  key={pdf.id}
                  onClick={() => setActivePdfId(pdf.id)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    activePdf?.id === pdf.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white border text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5" />
                  {pdf.title || `Catalog ${matchingPdfs.indexOf(pdf) + 1}`}
                </button>
              ))}
            </div>
          )}

          {/* No PDFs state */}
          {matchingPdfs.length === 0 && (
            <div className="flex-1 flex items-center justify-center text-center p-8">
              <div>
                <FileText className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No catalog available</p>
                <p className="text-gray-400 text-sm mt-1">
                  No PDF has been assigned for {selectedCategory ?? 'this company'} yet.
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          {activePdf && (
            <div className="flex flex-1 min-h-0 overflow-hidden">
              {/* PDF Viewer */}
              <div className="flex-1 relative bg-gray-100 overflow-auto">
                {useReactPDF ? (
                  <ReactPDFViewer
                    company={company}
                    selectedCategory={selectedCategory}
                    onRequestQuote={() => {}}
                    onDownloadCatalog={handleDownload}
                  />
                ) : (
                  <>
                    {isLoading && canDisplayPDF && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                          <p className="text-muted-foreground">Loading catalog...</p>
                        </div>
                      </div>
                    )}

                    {(hasError || !canDisplayPDF) ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        <div className="text-center max-w-md p-6">
                          {!canDisplayPDF ? (
                            <>
                              <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                              <h3 className="text-lg font-semibold mb-2">Mobile PDF Viewer</h3>
                              <p className="text-muted-foreground mb-6">Choose how you'd like to view this catalog:</p>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                              <h3 className="text-lg font-semibold mb-2">Unable to Load PDF</h3>
                              <p className="text-muted-foreground mb-6">The catalog couldn't be displayed. You can download it or open it in a new tab.</p>
                            </>
                          )}
                          <div className="flex flex-col gap-3">
                            <Button onClick={handleDownload} className="w-full">
                              <Download className="h-4 w-4 mr-2" /> Download PDF
                            </Button>
                            <Button variant="outline" onClick={handleExternalLink} className="w-full">
                              <ExternalLink className="h-4 w-4 mr-2" /> Open in Browser
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : canDisplayPDF ? (
                      <iframe
                        key={activePdf.id}
                        src={activePdf.path}
                        className="w-full h-full border-0"
                        title={`${company.name} — ${activePdf.title}`}
                        onLoad={() => { setIsLoading(false); setHasError(false); }}
                        onError={() => { setIsLoading(false); setHasError(true); }}
                      />
                    ) : null}
                  </>
                )}
              </div>

              {/* Contact Sidebar */}
              {showSidebar && !useReactPDF && (
                <div className="w-full lg:w-80 border-l bg-background p-4 lg:p-6 overflow-y-auto flex-shrink-0">
                  <ContactSidebar
                    company={company}
                    onRequestQuote={() => {}}
                    onDownloadCatalog={handleDownload}
                  />
                  <div className="lg:hidden mt-6">
                    <Button variant="outline" className="w-full" onClick={() => setShowSidebar(false)}>
                      <X className="h-4 w-4 mr-2" /> Close Sidebar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPopup;
