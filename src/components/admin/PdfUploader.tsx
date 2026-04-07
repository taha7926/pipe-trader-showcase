import React, { useRef, useState } from 'react';
import { FileText, X, Upload, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProductCategory } from '@/types/company';

interface PdfUploaderProps {
  category: ProductCategory;
  pdfValue: string | undefined;
  onChange: (dataUrl: string | undefined) => void;
}

export const PdfUploader: React.FC<PdfUploaderProps> = ({ category, pdfValue, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pathInput, setPathInput] = useState('');
  const [showPathInput, setShowPathInput] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const addPath = () => {
    const trimmed = pathInput.trim();
    if (!trimmed) return;
    const path = trimmed.startsWith('/') || trimmed.startsWith('http') ? trimmed : `/${trimmed}`;
    onChange(path);
    setPathInput('');
    setShowPathInput(false);
  };

  const isBase64 = (s: string) => s.startsWith('data:');

  const displayName = pdfValue
    ? isBase64(pdfValue)
      ? 'Uploaded PDF (local preview)'
      : pdfValue.split('/').pop() || pdfValue
    : null;

  return (
    <div className="py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="w-28 text-sm font-medium text-gray-700 shrink-0">{category}</span>

        {pdfValue ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FileText className="h-4 w-4 text-blue-500 shrink-0" />
            <span className="text-sm text-gray-600 truncate">{displayName}</span>
            {!isBase64(pdfValue) && (
              <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded shrink-0">static</span>
            )}
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="ml-auto text-red-400 hover:text-red-600 shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1 h-7 text-xs"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </Button>
            <button
              type="button"
              onClick={() => setShowPathInput(v => !v)}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <Link className="h-3 w-3" />
              Use path
            </button>
          </div>
        )}
      </div>

      {/* Path input */}
      {showPathInput && !pdfValue && (
        <div className="flex gap-2 mt-2 ml-[7.5rem]">
          <Input
            value={pathInput}
            onChange={e => setPathInput(e.target.value)}
            placeholder="/catalogs/pak-arab-upvc.pdf"
            className="text-xs h-7"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPath())}
          />
          <Button type="button" size="sm" onClick={addPath} className="h-7 text-xs shrink-0">
            Add
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        onClick={e => { (e.target as HTMLInputElement).value = ''; }}
      />
    </div>
  );
};
