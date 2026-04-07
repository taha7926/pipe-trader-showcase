import React, { useRef, useState } from 'react';
import { X, Plus, ImageIcon, Link } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
}

const MAX_SIZE_BYTES = 500 * 1024; // 500KB warning

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  maxImages = 25,
  label = 'Images'
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pathInput, setPathInput] = useState('');
  const [showPathInput, setShowPathInput] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxImages - images.length;
    const toProcess = Array.from(files).slice(0, remaining);

    toProcess.forEach(file => {
      if (file.size > MAX_SIZE_BYTES) {
        alert(`"${file.name}" is larger than 500KB. For deployment, consider placing the file in /public/images/ and using the path option instead.`);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) onChange([...images, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addPath = () => {
    const trimmed = pathInput.trim();
    if (!trimmed) return;
    if (images.length >= maxImages) return;
    // Normalise: ensure it starts with /
    const path = trimmed.startsWith('/') || trimmed.startsWith('http') ? trimmed : `/${trimmed}`;
    onChange([...images, path]);
    setPathInput('');
    setShowPathInput(false);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const isBase64 = (s: string) => s.startsWith('data:');

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">{label} (up to {maxImages})</p>
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => setShowPathInput(v => !v)}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <Link className="h-3 w-3" />
            {showPathInput ? 'Cancel' : 'Use file path'}
          </button>
        )}
      </div>

      {/* Path input row */}
      {showPathInput && (
        <div className="flex gap-2 mb-3">
          <Input
            value={pathInput}
            onChange={e => setPathInput(e.target.value)}
            placeholder="/images/pak-arab/uPVC/product1.jpg"
            className="text-xs h-8"
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addPath())}
          />
          <Button type="button" size="sm" onClick={addPath} className="h-8 shrink-0">
            Add
          </Button>
        </div>
      )}

      {/* Image grid */}
      <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto py-1">
        {images.map((img, i) => (
          <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <img
              src={img}
              alt={`upload-${i}`}
              className="w-full h-full object-cover"
              onError={e => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
                (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove('hidden');
              }}
            />
            {/* fallback for broken paths */}
            <div className="hidden absolute inset-0 flex items-center justify-center bg-gray-100">
              <span className="text-xs text-gray-400 text-center px-1 break-all leading-tight">
                {isBase64(img) ? 'preview' : img.split('/').pop()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => removeImage(i)}
              className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
            {/* Badge: path vs uploaded */}
            {!isBase64(img) && (
              <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] text-center py-0.5 truncate px-1">
                static
              </span>
            )}
          </div>
        ))}

        {/* Add slot */}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Upload</span>
          </button>
        )}
      </div>

      {/* Static path hint */}
      <p className="text-xs text-gray-400 mt-2">
        💡 For deployment: drop image files into <code className="bg-gray-100 px-1 rounded">public/images/</code> then use <em>file path</em> instead of uploading.
      </p>

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
