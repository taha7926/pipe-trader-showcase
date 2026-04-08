import React, { useRef, useState } from 'react';
import { FileText, X, Plus, Link, ChevronDown, ChevronUp, AlertTriangle, Info, UploadCloud, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CompanyPdf, ProductCategory } from '@/types/company';

/** Upload a PDF file to disk via the dev server */
async function uploadPdfFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch('/api/upload-pdf', { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  const data = await res.json();
  return data.path; // e.g. "/catalogs/steelex-catalog.pdf"
}

interface PdfsManagerProps {
  pdfs: CompanyPdf[];
  availableCategories: ProductCategory[];
  onChange: (pdfs: CompanyPdf[]) => void;
}

const emptyPdf = (availableCategories: ProductCategory[]): CompanyPdf => ({
  id: `pdf-${Date.now()}`,
  title: '',
  path: '',
  categories: availableCategories,
});

export const PdfsManager: React.FC<PdfsManagerProps> = ({
  pdfs,
  availableCategories,
  onChange,
}) => {
  const [expanded, setExpanded] = useState<string | null>(pdfs[0]?.id ?? null);
  const [pathInputs, setPathInputs] = useState<{ [id: string]: string }>({});
  const [uploadingPdfId, setUploadingPdfId] = useState<string | null>(null);
  const [uploadMsg, setUploadMsg] = useState<{ id: string; msg: string; ok: boolean } | null>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const [activePdfUploadId, setActivePdfUploadId] = useState<string | null>(null);

  const handlePdfFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, pdfId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingPdfId(pdfId);
    try {
      const path = await uploadPdfFile(file);
      updatePdf(pdfId, { path, title: pdfs.find(p => p.id === pdfId)?.title || file.name.replace(/\.pdf$/i, '') });
      setUploadMsg({ id: pdfId, msg: `Saved to ${path}`, ok: true });
    } catch (err: any) {
      setUploadMsg({ id: pdfId, msg: `Failed: ${err.message}`, ok: false });
    } finally {
      setUploadingPdfId(null);
      e.target.value = '';
      setTimeout(() => setUploadMsg(null), 4000);
    }
  };

  const addPdf = () => {
    const newPdf = emptyPdf(availableCategories);
    onChange([...pdfs, newPdf]);
    setExpanded(newPdf.id);
  };

  const removePdf = (id: string) => {
    onChange(pdfs.filter(p => p.id !== id));
  };

  const updatePdf = (id: string, patch: Partial<CompanyPdf>) => {
    onChange(pdfs.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  const toggleCategory = (pdfId: string, cat: ProductCategory) => {
    const pdf = pdfs.find(p => p.id === pdfId);
    if (!pdf) return;
    const cats = pdf.categories.includes(cat)
      ? pdf.categories.filter(c => c !== cat)
      : [...pdf.categories, cat];
    updatePdf(pdfId, { categories: cats });
  };

  const applyPath = (id: string) => {
    const raw = (pathInputs[id] ?? '').trim();
    if (!raw) return;
    const path = raw.startsWith('/') || raw.startsWith('http') ? raw : `/${raw}`;
    updatePdf(id, { path });
    setPathInputs(prev => ({ ...prev, [id]: '' }));
  };

  const isBase64 = (s: string) => s.startsWith('data:');

  return (
    <div className="space-y-3">
      {/* Explanation banner */}
      <div className="flex gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-blue-500" />
        <div>
          <p className="font-semibold mb-0.5">Add PDF catalogs:</p>
          <p className="text-blue-600">Upload a PDF below or type a path manually. Files are saved to <code className="bg-blue-100 px-1 rounded">public/catalogs/</code> automatically.</p>
        </div>
      </div>

      {/* Hidden PDF file input */}
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={e => activePdfUploadId && handlePdfFileSelect(e, activePdfUploadId)}
      />

      {pdfs.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4 border border-dashed rounded-lg">
          No PDFs added yet. Click below to add one.
        </p>
      )}

      {pdfs.map((pdf, index) => {
        const hasBase64 = isBase64(pdf.path);
        return (
          <div key={pdf.id} className="border rounded-lg overflow-hidden">
            {/* Row header */}
            <div
              className="flex items-center gap-3 px-3 py-2 bg-gray-50 cursor-pointer select-none"
              onClick={() => setExpanded(expanded === pdf.id ? null : pdf.id)}
            >
              <FileText className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="flex-1 text-sm font-medium text-gray-700 truncate">
                {pdf.title || `PDF ${index + 1}`}
              </span>

              {/* Status badge */}
              {!pdf.path ? (
                <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> No path
                </span>
              ) : hasBase64 ? (
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Use path instead
                </span>
              ) : (
                <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                  ✓ ready
                </span>
              )}

              <div className="flex items-center gap-1">
                {expanded === pdf.id
                  ? <ChevronUp className="h-4 w-4 text-gray-400" />
                  : <ChevronDown className="h-4 w-4 text-gray-400" />}
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); removePdf(pdf.id); }}
                  className="text-red-400 hover:text-red-600 p-0.5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Expanded details */}
            {expanded === pdf.id && (
              <div className="p-3 space-y-3">
                {/* Title */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">PDF Title / Label</label>
                  <Input
                    value={pdf.title}
                    onChange={e => updatePdf(pdf.id, { title: e.target.value })}
                    placeholder="e.g. Full Product Catalog 2024"
                    className="h-8 text-sm"
                  />
                </div>

                {/* Path input */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">
                    File Path <span className="text-red-500">*</span>
                  </label>

                  {/* Warning if base64 is stored */}
                  {hasBase64 && (
                    <div className="flex gap-1.5 p-2 mb-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>
                        This PDF was uploaded directly — it may be too large to save reliably.
                        Replace it with a file path instead (see steps above).
                      </span>
                    </div>
                  )}

                  {/* Upload status message */}
                  {uploadMsg?.id === pdf.id && (
                    <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg mb-2 ${
                      uploadMsg.ok
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {uploadMsg.ok && <CheckCircle className="h-3.5 w-3.5" />}
                      {uploadMsg.msg}
                    </div>
                  )}

                  {pdf.path && !hasBase64 ? (
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded px-2 py-1.5">
                      <FileText className="h-4 w-4 text-green-500 shrink-0" />
                      <span className="truncate flex-1 text-green-700 font-mono text-xs">{pdf.path}</span>
                      <button type="button" onClick={() => updatePdf(pdf.id, { path: '' })} className="text-red-400 hover:text-red-600 shrink-0">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {/* Upload PDF button */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 border-dashed h-9"
                        disabled={uploadingPdfId === pdf.id}
                        onClick={() => {
                          setActivePdfUploadId(pdf.id);
                          pdfInputRef.current?.click();
                        }}
                      >
                        {uploadingPdfId === pdf.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-primary" />
                            Saving PDF...
                          </>
                        ) : (
                          <>
                            <UploadCloud className="h-4 w-4" />
                            Upload PDF file
                          </>
                        )}
                      </Button>

                      {/* Or type path manually */}
                      <div className="flex gap-2">
                        <Input
                          value={pathInputs[pdf.id] ?? ''}
                          onChange={e => setPathInputs(prev => ({ ...prev, [pdf.id]: e.target.value }))}
                          placeholder="Or type path: /catalogs/catalog.pdf"
                          className="h-8 text-xs font-mono"
                          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), applyPath(pdf.id))}
                        />
                        <Button type="button" size="sm" className="h-8 text-xs shrink-0 gap-1" onClick={() => applyPath(pdf.id)}>
                          <Link className="h-3.5 w-3.5" /> Set
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                    Tick all categories this PDF covers
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {availableCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-1.5 cursor-pointer select-none">
                        <Checkbox
                          checked={pdf.categories.includes(cat)}
                          onCheckedChange={() => toggleCategory(pdf.id, cat)}
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                  {pdf.categories.length === 0 && (
                    <p className="text-xs text-amber-600 mt-1">⚠ Tick at least one category.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addPdf}
        className="w-full gap-1.5 border-dashed"
      >
        <Plus className="h-4 w-4" />
        Add Another PDF
      </Button>
    </div>
  );
};
