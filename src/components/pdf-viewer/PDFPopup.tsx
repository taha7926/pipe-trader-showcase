import React, { useEffect, useState } from 'react';
import { X, Download, ExternalLink, AlertCircle, FileText, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ContactSidebar from './ContactSidebar';
import { Company } from '@/types/company';

interface PDFPopupProps {
  isOpen: boolean;
  company: Company | null;
  onClose: () => void;
}

const PDFPopup: React.FC<PDFPopupProps> = ({ isOpen, company, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [canDisplayPDF, setCanDisplayPDF] = useState(true);

  // Detect mobile device and PDF support
  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      setIsMobile(isMobileDevice);
      
      // Check if device can display PDFs inline
      const isAndroid = /android/i.test(userAgent);
      const isIOS = /iphone|ipad|ipod/i.test(userAgent);
      
      // Most mobile browsers, especially Android, don't support inline PDF viewing
      if (isMobileDevice && (isAndroid || isIOS)) {
        setCanDisplayPDF(false);
      }
    };

    detectMobile();
  }, []);

  // Reset states when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
      setShowSidebar(window.innerWidth >= 1024); // Show sidebar on desktop by default
    }
  }, [isOpen, company]);

  // Handle PDF load success
  const handlePDFLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  // Handle PDF load error
  const handlePDFError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Handle download
  const handleDownload = () => {
    if (company?.catalogPdf) {
      const link = document.createElement('a');
      link.href = company.catalogPdf;
      link.download = `${company.name}-catalog.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle external link
  const handleExternalLink = () => {
    if (company?.catalogPdf) {
      window.open(company.catalogPdf, '_blank');
    }
  };

  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-full sm:max-w-[95vw] sm:h-[95vh] p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-background">
            <div className="flex items-center gap-3">
              {isMobile && !canDisplayPDF ? (
                <Smartphone className="h-5 w-5 text-primary" />
              ) : (
                <FileText className="h-5 w-5 text-primary" />
              )}
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  {company.name} - Product Catalog
                </h2>
                <p className="text-sm text-muted-foreground">
                  {!canDisplayPDF ? 'Mobile-Optimized Viewing' : `${company.categories.join(', ')} Products`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Mobile sidebar toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                Contact
              </Button>
              
              {/* Download button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="hidden sm:flex"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              
              {/* External link button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExternalLink}
                className="hidden sm:flex"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
              
              {/* Close button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* PDF Viewer */}
            <div className="flex-1 relative bg-gray-100">
              {isLoading && canDisplayPDF && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading catalog...</p>
                  </div>
                </div>
              )}

              {hasError || !canDisplayPDF ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <div className="text-center max-w-md p-6">
                    {!canDisplayPDF ? (
                      <>
                        <Smartphone className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Mobile PDF Viewer
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Your device works best with external PDF viewing. Choose how you'd like to view the catalog:
                        </p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Unable to Load PDF
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          The catalog couldn't be displayed in your browser. You can download it directly or open it in a new tab.
                        </p>
                      </>
                    )}
                    <div className="flex flex-col gap-3">
                      <Button onClick={handleDownload} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" onClick={handleExternalLink} className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open in Browser
                      </Button>
                      {!canDisplayPDF && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Tip: Downloaded PDFs can be viewed offline anytime
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : canDisplayPDF ? (
                <iframe
                  src={company.catalogPdf}
                  className="w-full h-full border-0"
                  title={`${company.name} Product Catalog`}
                  onLoad={handlePDFLoad}
                  onError={handlePDFError}
                />
              ) : null}
            </div>

            {/* Contact Sidebar */}
            {showSidebar && (
              <div className="w-full lg:w-80 border-l bg-background p-4 lg:p-6 overflow-y-auto">
                <ContactSidebar 
                  company={company}
                  onRequestQuote={() => {
                    // Will integrate with quote form later
                    console.log('Request quote for:', company.name);
                  }}
                  onDownloadCatalog={handleDownload}
                />
                
                {/* Mobile-specific close button */}
                <div className="lg:hidden mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowSidebar(false)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Close Sidebar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPopup;