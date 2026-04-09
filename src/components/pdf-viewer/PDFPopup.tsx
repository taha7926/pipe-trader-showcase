import React, { useEffect, useState } from 'react';
import { X, ExternalLink, AlertCircle, FileText, Smartphone, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ReactPDFViewer from './ReactPDFViewer';
import { Company, CompanyPdf, ProductCategory } from '@/types/company';

interface PDFPopupProps {
  isOpen: boolean;
  company: Company | null;
  selectedCategory?: ProductCategory;
  onClose: () => void;
}

function getMatchingPdfs(company: Company, category?: ProductCategory): CompanyPdf[] {
  const pdfs = company.pdfs ?? [];
  if (!category) return pdfs;
  return pdfs.filter(p => p.categories.length === 0 || p.categories.includes(category));
}

const PDFPopup: React.FC<PDFPopupProps> = ({ isOpen, company, selectedCategory, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canDisplayPDF, setCanDisplayPDF] = useState(true);
  const [useReactPDF, setUseReactPDF] = useState(false);
  const [activePdfId, setActivePdfId] = useState<string | null>(null);

  const matchingPdfs = company ? getMatchingPdfs(company, selectedCategory) : [];
  const activePdf = matchingPdfs.find(p => p.id === activePdfId) ?? matchingPdfs[0] ?? null;

  // Detect mobile
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
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
      const pdfs = company ? getMatchingPdfs(company, selectedCategory) : [];
      setActivePdfId(pdfs[0]?.id ?? null);
    }
  }, [isOpen, company?.id, selectedCategory]);

  // Reset loading when switching PDFs
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-full sm:max-w-[95vw] sm:h-[95vh] p-0 gap-0 overflow-hidden [&>button]:hidden">
        <div className="flex flex-col h-full">

          {/* ── Header ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-background shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <BookOpen className="h-5 w-5 text-primary shrink-0" />
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
              {activePdf && (
                <Button variant="outline" size="sm" onClick={handleExternalLink} className="hidden sm:flex gap-1.5">
                  <ExternalLink className="h-4 w-4" /> Open
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* ── Body ───────────────────────────────────────────── */}
          <div className="flex flex-1 min-h-0 overflow-hidden">

            {/* Left panel: PDF list (always shown when PDFs exist) */}
            {matchingPdfs.length > 0 && (
              <div className="w-52 shrink-0 border-r bg-gray-50 flex flex-col overflow-hidden">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 pt-3 pb-2">
                  Catalogs ({matchingPdfs.length})
                </p>
                <div className="flex-1 overflow-y-auto space-y-1 px-2 pb-3">
                  {matchingPdfs.map((pdf, idx) => {
                    const isActive = activePdf?.id === pdf.id;
                    return (
                      <button
                        key={pdf.id}
                        onClick={() => setActivePdfId(pdf.id)}
                        className={`w-full text-left flex items-start gap-2.5 px-3 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                        }`}
                      >
                        <FileText className={`h-4 w-4 mt-0.5 shrink-0 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-tight break-words">
                            {pdf.title || `Catalog ${idx + 1}`}
                          </p>
                          {pdf.categories.length > 0 && (
                            <p className={`text-xs mt-0.5 leading-tight ${isActive ? 'text-primary-foreground/70' : 'text-gray-400'}`}>
                              {pdf.categories.join(' · ')}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PDF viewer area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0">
              {matchingPdfs.length === 0 ? (
                /* No PDFs */
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <FileText className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No catalog available</p>
                    <p className="text-gray-400 text-sm mt-1">
                      No PDF has been assigned{selectedCategory ? ` for ${selectedCategory}` : ''} yet.
                    </p>
                  </div>
                </div>
              ) : activePdf ? (
                <div className="flex flex-1 min-h-0 overflow-hidden">
                  {/* Viewer */}
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
                          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                              <p className="text-muted-foreground">Loading catalog…</p>
                            </div>
                          </div>
                        )}

                        {(hasError || !canDisplayPDF) ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-background">
                            <div className="text-center max-w-md p-6">
                              {!canDisplayPDF ? (
                                <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                              ) : (
                                <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                              )}
                              <h3 className="text-lg font-semibold mb-2">
                                {!canDisplayPDF ? 'Mobile PDF Viewer' : 'Unable to Load PDF'}
                              </h3>
                              <p className="text-muted-foreground mb-6">
                                {!canDisplayPDF
                                  ? 'Choose how you\'d like to view this catalog:'
                                  : 'Download it or open it in a new tab.'}
                              </p>
                              <div className="flex flex-col gap-3">
                                <Button onClick={handleDownload} className="w-full gap-2">
                                  <Download className="h-4 w-4" /> Download PDF
                                </Button>
                                <Button variant="outline" onClick={handleExternalLink} className="w-full gap-2">
                                  <ExternalLink className="h-4 w-4" /> Open in Browser
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <object
                            key={activePdf.id}
                            data={`${activePdf.path}?v=${Date.now()}`}
                            type="application/pdf"
                            className="w-full h-full border-0"
                            title={`${company.name} — ${activePdf.title}`}
                            onLoad={() => { setIsLoading(false); setHasError(false); }}
                          >
                            {/* Fallback if object tag fails */}
                            <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                              <FileText className="h-12 w-12 text-gray-300" />
                              <p className="text-gray-500">PDF preview unavailable</p>
                              <div className="flex gap-3">
                                <Button onClick={handleDownload} className="gap-2">
                                  <Download className="h-4 w-4" /> Download PDF
                                </Button>
                                <Button variant="outline" onClick={handleExternalLink} className="gap-2">
                                  <ExternalLink className="h-4 w-4" /> Open in Browser
                                </Button>
                              </div>
                            </div>
                          </object>
                        )}
                      </>
                    )}
                  </div>

                </div>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPopup;
