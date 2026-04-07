import React from 'react';
import { Company } from '@/types/company';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, RotateCcw } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { mockCompanies } from '@/data/companies';

interface AdminCompanyRowProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
  onReset?: (id: string) => void;
}

export const AdminCompanyRow: React.FC<AdminCompanyRowProps> = ({
  company,
  onEdit,
  onDelete,
  onReset,
}) => {
  const isStaticOriginal = mockCompanies.some(c => c.id === company.id) && !company.isAdminCreated;
  const isEditedStatic = mockCompanies.some(c => c.id === company.id) && company.isAdminCreated;

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      {/* Logo */}
      <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <span className="text-lg font-bold text-gray-300">
            {company.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-gray-800 truncate">{company.name}</span>
          {isEditedStatic && (
            <Badge variant="outline" className="text-xs text-amber-600 border-amber-300 bg-amber-50">
              Edited
            </Badge>
          )}
          {company.isAdminCreated && !isEditedStatic && (
            <Badge variant="outline" className="text-xs text-blue-600 border-blue-300 bg-blue-50">
              Custom
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {company.categories.map(cat => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(company)}
          className="h-8 w-8 p-0 text-gray-500 hover:text-primary"
        >
          <Pencil className="h-4 w-4" />
        </Button>

        {isEditedStatic && onReset ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-amber-500 hover:text-amber-700"
                title="Reset to original"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset to original?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will discard your edits to <strong>{company.name}</strong> and restore the original data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onReset(company.id)}>
                  Reset
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : !isStaticOriginal ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete company?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete <strong>{company.name}</strong>. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(company.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          // Static company — show delete with warning
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Hide company?</AlertDialogTitle>
                <AlertDialogDescription>
                  <strong>{company.name}</strong> is a built-in company. Hiding it will remove it from the storefront. You can restore it by clicking "Reset to Default" or clearing admin data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(company.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Hide
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};
