import React, { useState } from 'react';
import { Company, CompanyPdf, ProductCategory } from '@/types/company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUploader } from './ImageUploader';
import { PdfsManager } from './PdfsManager';

const ALL_CATEGORIES: ProductCategory[] = ['HDPE', 'uPVC', 'CPVC', 'PPRC', 'Bore Casing'];

interface CompanyFormProps {
  company?: Company;
  onSave: (company: Company) => void;
  onCancel: () => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ company, onSave, onCancel }) => {
  const isEdit = !!company;

  const [name, setName] = useState(company?.name ?? '');
  const [description, setDescription] = useState(company?.description ?? '');
  const [logo, setLogo] = useState<string>(company?.logo ?? '');
  const [categories, setCategories] = useState<ProductCategory[]>(company?.categories ?? []);
  const [pdfs, setPdfs] = useState<CompanyPdf[]>(company?.pdfs ?? []);
  const [categoryImages, setCategoryImages] = useState<{ [key in ProductCategory]?: string[] }>(
    company?.categoryImages ?? {}
  );
  const [whatsappLink, setWhatsappLink] = useState(
    company?.whatsappLink ?? 'https://wa.me/message/AZLLSHJVYUYJP1'
  );
  const [errors, setErrors] = useState<{ name?: string; categories?: string; logo?: string }>({});

  const toggleCategory = (cat: ProductCategory) => {
    setCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const updateCategoryImages = (cat: ProductCategory, imgs: string[]) => {
    setCategoryImages(prev => ({ ...prev, [cat]: imgs }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Company name is required';
    if (categories.length === 0) errs.categories = 'Select at least one category';
    if (!logo) errs.logo = 'A logo image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const id = isEdit
      ? company.id
      : name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const result: Company = {
      id,
      name: name.trim(),
      logo,
      description: description.trim(),
      categories,
      pdfs,
      categoryImages,
      whatsappLink,
      isAdminCreated: true,
      updatedAt: new Date().toISOString(),
      ...(isEdit ? {} : { createdAt: new Date().toISOString() }),
    };

    onSave(result);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[75vh] pr-1">

      {/* Company Name */}
      <div className="space-y-1">
        <Label htmlFor="name">Company Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Pak Arab"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Short Description */}
      <div className="space-y-1">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Brief description of the company and its products..."
          rows={3}
        />
      </div>

      {/* Logo */}
      <div className="space-y-1">
        <ImageUploader
          images={logo ? [logo] : []}
          onChange={imgs => setLogo(imgs[0] ?? '')}
          maxImages={1}
          label="Company Logo *"
        />
        {errors.logo && <p className="text-red-500 text-xs">{errors.logo}</p>}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <Label>Product Categories *</Label>
        <div className="flex flex-wrap gap-3">
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox
                checked={categories.includes(cat)}
                onCheckedChange={() => toggleCategory(cat)}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
        {errors.categories && <p className="text-red-500 text-xs">{errors.categories}</p>}
      </div>

      {/* PDFs — one card, pick which categories each PDF covers */}
      <div className="space-y-2">
        <Label>Product Catalogs (PDFs)</Label>
        <p className="text-xs text-gray-500">
          Upload one PDF and tick which categories it covers — the same PDF will show for all ticked categories.
        </p>
        <PdfsManager
          pdfs={pdfs}
          availableCategories={categories.length > 0 ? categories : ALL_CATEGORIES}
          onChange={setPdfs}
        />
      </div>

      {/* Per-category product images */}
      {categories.length > 0 && (
        <div className="space-y-4">
          <Label>Product Images per Category (up to 25 each)</Label>
          {categories.map(cat => (
            <div key={cat} className="border rounded-lg p-3">
              <p className="text-sm font-semibold text-gray-700 mb-2">{cat}</p>
              <ImageUploader
                images={categoryImages[cat] ?? []}
                onChange={imgs => updateCategoryImages(cat, imgs)}
                maxImages={25}
                label={`${cat} images`}
              />
            </div>
          ))}
        </div>
      )}

      {/* WhatsApp Link */}
      <div className="space-y-1">
        <Label htmlFor="whatsapp">WhatsApp Link</Label>
        <Input
          id="whatsapp"
          value={whatsappLink}
          onChange={e => setWhatsappLink(e.target.value)}
          placeholder="https://wa.me/..."
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEdit ? 'Save Changes' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
};
