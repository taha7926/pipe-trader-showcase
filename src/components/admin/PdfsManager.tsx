import React, { useRef, useState } from 'react';
import { FileText, X, Upload, Plus, Link, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CompanyPdf, ProductCategory } from '@/types/company';

interface PdfsManagerProps {
  pdfs: CompanyPdf[];
  availableCategories: ProductCategory[];
  onChange: (pdfs: CompanyPdf[]) => void;
}

const ALL_CATEGORIES: ProductCategory[] = ['HDPE', 'uPVC', 'CPVC', 'PPRC', 'Bore Casing'];

const emptyPdf = (availableCategories: ProductCategory[]): CompanyPdf => ({
  id: `pdf-${Date.now()}`,
  title: '',
  path: '',
  categories: availableCategories,   // default: all company categories selected
});

export const PdfsManager: React.FC<PdfsManagerProps> = ({
  pdfs,
  availableCategories,
  onChange,
}) => {
  const [expanded, setExpanded] = useState<string | null>(pdfs[0]?.id ?? null);
  const inputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});
  const [pathInputs, setPathInputs] = useState<{ [id: string]: string }>({});

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

  const handleFileUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) updatePdf(id, { path: result });
    };
    reader.readAsDataURL(file);
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
      {pdfs.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4 border border-dashed rounded-lg">
          No PDFs added yet. Click below to add one.
        </p>
      )}

      {pdfs.map((pdf, index) => (
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
            {pdf.path && (
              <span className={`text-xs px-1.5 py-0.5 rounded ${isBase64(pdf.path) ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                {isBase64(pdf.path) ? 'uploaded' : 'static'}
              </span>
            )}
            <div className="flex items-center gap-1">
              {expanded === pdf.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
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

              {/* File / Path */}
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">PDF File</label>
                {pdf.path ? (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded px-2 py-1.5">
                    <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                    <span className="truncate flex-1">
                      {isBase64(pdf.path) ? 'Uploaded PDF (local)' : pdf.path.split('/').pop()}
                    </span>
                    <button type="button" onClick={() => updatePdf(pdf.id, { path: '' })} className="text-red-400 hover:text-red-600 shrink-0">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs gap-1"
                      onClick={() => inputRefs.current[pdf.id]?.click()}
                    >
                      <Upload className="h-3.5 w-3.5" /> Upload PDF
                    </Button>
                    <div className="flex gap-1 flex-1">
                      <Input
                        value={pathInputs[pdf.id] ?? ''}
                        onChange={e => setPathInputs(prev => ({ ...prev, [pdf.id]: e.target.value }))}
                        placeholder="/catalogs/my-catalog.pdf"
                        className="h-8 text-xs"
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), applyPath(pdf.id))}
                      />
                      <Button type="button" size="sm" className="h-8 text-xs shrink-0" onClick={() => applyPath(pdf.id)}>
                        <Link className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )}
                <input
                  ref={el => { inputRefs.current[pdf.id] = el; }}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileUpload(pdf.id, e.target.files[0])}
                  onClick={e => { (e.target as HTMLInputElement).value = ''; }}
                />
              </div>

              {/* Categories this PDF applies to */}
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1.5 block">
                  Applies to categories — tick all that this PDF covers
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
                  <p className="text-xs text-amber-600 mt-1">⚠ Select at least one category so this PDF appears on the site.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

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

      <p className="text-xs text-gray-400">
        💡 For deployment: place PDFs in <code className="bg-gray-100 px-1 rounded">public/catalogs/</code> and use the path option (e.g. <code className="bg-gray-100 px-1 rounded">/catalogs/my-file.pdf</code>).
      </p>
    </div>
  );
};
