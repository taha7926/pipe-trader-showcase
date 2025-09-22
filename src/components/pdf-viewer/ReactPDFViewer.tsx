import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download, Loader2, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Company } from '@/types/company';

// TODO: Once react-pdf is installed, uncomment these imports
// import { Document, Page, pdfjs } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up the worker for react-pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface ReactPDFViewerProps {
  company: Company;
  onRequestQuote?: () => void;
  onDownloadCatalog?: () => void;
}

const ReactPDFViewer: React.FC<ReactPDFViewerProps> = ({
  company,
  onRequestQuote,
  onDownloadCatalog
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);

  // Handle successful document load
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    setShowTimeoutWarning(false);
    setLoadingTime(0);
  }, []);

  // Handle document load error
  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('PDF load error:', error);
    setError('Failed to load PDF document');
    setLoading(false);
    setShowTimeoutWarning(false);
    setLoadingTime(0);
  }, []);

  // Loading timeout effect
  useEffect(() => {
    if (!loading) return;

    const timer = setInterval(() => {
      setLoadingTime(prev => {
        const newTime = prev + 1;
        if (newTime >= 10) {
          setShowTimeoutWarning(true);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  // Continue waiting function
  const continueWaiting = () => {
    setShowTimeoutWarning(false);
    setLoadingTime(0); // Reset timer
  };

  // Navigation functions
  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // Zoom functions
  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  };

  // Rotation function
  const rotate = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
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

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Controls Bar */}
      <div className="flex items-center justify-between p-3 border-b bg-background">
        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium px-3">
            {loading ? '...' : `${pageNumber} / ${numPages || '...'}`}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={!numPages || pageNumber >= numPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          {/* Zoom Controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            disabled={scale <= 0.5 || loading}
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          
          <span className="text-xs font-medium px-2">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            disabled={scale >= 3.0 || loading}
          >
            <ZoomIn className="h-3 w-3" />
          </Button>

          {/* Rotation */}
          <Button
            variant="outline"
            size="sm"
            onClick={rotate}
            disabled={loading}
          >
            <RotateCw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-4 relative">
        {/* Timeout Warning Popup */}
        {showTimeoutWarning && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
              <div className="text-center">
                <WifiOff className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Slow Connection Detected
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Taking longer time to load because of network connectivity. You can wait or download the PDF for offline viewing.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={continueWaiting}
                    className="flex-1"
                  >
                    <Wifi className="h-4 w-4 mr-2" />
                    Wait
                  </Button>
                  <Button 
                    onClick={handleDownload}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue showing PDF loading area even with timeout popup */}
        {loading && (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="font-medium">Loading PDF...</p>
          </div>
        )}

        {error && (
          <div className="text-center p-8">
            <div className="text-destructive mb-4">
              <svg className="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold">Failed to Load PDF</h3>
              <p className="text-sm text-muted-foreground mt-2">{error}</p>
            </div>
            <Button onClick={handleDownload} className="mt-4">
              <Download className="h-4 w-4 mr-2" />
              Download PDF Instead
            </Button>
          </div>
        )}

        {/* TODO: Uncomment when react-pdf is installed */}
        {/*
        {!loading && !error && (
          <Document
            file={company.catalogPdf}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading PDF...</span>
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          </Document>
        )}
        */}

        {/* Temporary placeholder until react-pdf is installed */}
        {!loading && !error && (
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <div className="text-primary mb-4">
              <svg className="h-16 w-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-semibold">React-PDF Viewer Ready</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Install react-pdf package to enable mobile PDF viewing
              </p>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✅ Touch-friendly controls</p>
              <p>✅ Zoom and rotation</p>
              <p>✅ Page navigation</p>
              <p>✅ Mobile optimized</p>
            </div>
            <Button onClick={handleDownload} className="mt-4">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactPDFViewer;
