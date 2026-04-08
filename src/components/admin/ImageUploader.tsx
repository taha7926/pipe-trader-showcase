import React, { useRef, useState, useCallback } from 'react';
import { X, UploadCloud, Images, Plus, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  /** Company ID for folder naming (e.g. "pak-arab") */
  companyId?: string;
  /** Category name for folder naming (e.g. "HDPE") */
  category?: string;
}

/** Upload a single image file to the dev server and get back a static path */
async function uploadImageFile(
  file: File,
  company: string,
  category: string
): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  form.append('company', company);
  form.append('category', category);

  const res = await fetch('/api/upload-image', { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
  const data = await res.json();
  return data.path; // e.g. "/images/pak-arab/HDPE/21.png"
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 25,
  label = 'Images',
  companyId = 'unknown',
  category = 'general',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pathInput, setPathInput] = useState('');
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const remaining = maxImages - images.length;

  /* ── Single path add ──────────────────────────── */
  const addPath = () => {
    const trimmed = pathInput.trim();
    if (!trimmed || remaining <= 0) return;
    const path = trimmed.startsWith('/') || trimmed.startsWith('http') ? trimmed : `/${trimmed}`;
    onChange([...images, path]);
    setPathInput('');
  };

  /* ── File upload → saves to disk, returns path ── */
  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (remaining <= 0) return;

    const toProcess = Array.from(files).slice(0, remaining);
    setLoading(true);
    setUploadStatus(`Saving ${toProcess.length} image${toProcess.length > 1 ? 's' : ''} to disk...`);

    try {
      const paths = await Promise.all(
        toProcess.map(file => uploadImageFile(file, companyId, category))
      );
      onChange([...images, ...paths]);
      setUploadStatus(`${paths.length} image${paths.length > 1 ? 's' : ''} saved to public/images/`);
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (err: any) {
      console.error('Upload failed:', err);
      setUploadStatus(`Upload failed: ${err.message}`);
      setTimeout(() => setUploadStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  }, [images, onChange, remaining, companyId, category]);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const isBase64 = (s: string) => s.startsWith('data:');

  /* Drag-and-drop handlers */
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const staticCount = images.filter(i => !isBase64(i)).length;

  return (
    <div className="space-y-3">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700">
          {label}
          <span className="ml-1.5 text-xs font-normal text-gray-400">
            ({images.length}/{maxImages})
          </span>
        </p>
      </div>

      {/* Upload status */}
      {uploadStatus && (
        <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
          uploadStatus.includes('failed')
            ? 'bg-red-50 text-red-700 border border-red-200'
            : 'bg-green-50 text-green-700 border border-green-200'
        }`}>
          {!uploadStatus.includes('failed') && <CheckCircle className="h-3.5 w-3.5" />}
          {uploadStatus}
        </div>
      )}

      {/* Drag & drop upload zone */}
      {remaining > 0 && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center gap-2 w-full py-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
            dragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-primary" />
              <p className="text-sm text-gray-500">Saving images to disk...</p>
            </>
          ) : (
            <>
              <UploadCloud className={`h-8 w-8 ${dragging ? 'text-primary' : 'text-gray-400'}`} />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">
                  {dragging ? 'Drop images here' : 'Click or drag & drop images'}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Files auto-save to <code className="bg-gray-100 px-1 rounded">public/images/{companyId}/{category}/</code>
                </p>
                <p className="text-xs text-gray-400">
                  Up to {remaining} more image{remaining !== 1 ? 's' : ''}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Manual path input */}
      {remaining > 0 && (
        <div className="flex gap-2">
          <Input
            value={pathInput}
            onChange={e => setPathInput(e.target.value)}
            placeholder="Or type a path: /images/pak-arab/hdpe/1.jpg"
            className="text-xs h-8"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPath())}
          />
          <Button type="button" size="sm" onClick={addPath} className="h-8 shrink-0 gap-1">
            <Plus className="h-3 w-3" /> Add
          </Button>
        </div>
      )}

      {/* Image grid preview */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Images className="h-3.5 w-3.5" /> {images.length} image{images.length !== 1 ? 's' : ''}
            </p>
            <button
              type="button"
              onClick={() => onChange([])}
              className="text-xs text-red-400 hover:text-red-600 hover:underline"
            >
              Remove all
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto pr-1">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
                  }}
                />
                {/* Fallback for broken/missing paths */}
                <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100 p-1">
                  <span className="text-[10px] text-gray-400 text-center break-all leading-tight">
                    {isBase64(img) ? 'preview' : img.split('/').pop()}
                  </span>
                </div>
                {/* Badge */}
                <span className="absolute bottom-0 left-0 right-0 bg-green-600/70 text-white text-[9px] text-center py-0.5 truncate px-1">
                  {img.split('/').pop()}
                </span>
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
                {/* Index */}
                <span className="absolute top-0 left-0 bg-black/40 text-white text-[9px] px-1 py-0.5 rounded-br">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
        onClick={e => { (e.target as HTMLInputElement).value = ''; }}
      />
    </div>
  );
};
