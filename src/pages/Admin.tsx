import React, { useState } from 'react';
import { CompanyProvider, useCompanies } from '@/contexts/CompanyContext';
import { AdminGuard } from '@/components/admin/AdminGuard';
import { AdminCompanyRow } from '@/components/admin/AdminCompanyRow';
import { CompanyForm } from '@/components/admin/CompanyForm';
import { Company } from '@/types/company';
import { logoutAdmin } from '@/utils/adminAuth';
import { mockCompanies } from '@/data/companies';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, LogOut, ArrowLeft, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminContent: React.FC = () => {
  const { allCompanies, addCompany, updateCompany, deleteCompany } = useCompanies();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | undefined>(undefined);
  const [, forceRerender] = useState(0);

  const handleLogout = () => {
    logoutAdmin();
    forceRerender(n => n + 1);
  };

  const handleAdd = () => {
    setEditingCompany(undefined);
    setDialogOpen(true);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setDialogOpen(true);
  };

  const handleSave = (company: Company) => {
    const exists = allCompanies.some(c => c.id === company.id);
    if (exists) {
      updateCompany(company);
    } else {
      addCompany(company);
    }
    setDialogOpen(false);
    setEditingCompany(undefined);
  };

  const handleDelete = (id: string) => {
    deleteCompany(id);
  };

  const handleReset = (id: string) => {
    // Remove from localStorage override by calling deleteCompany (which removes the override)
    // then the static one will reappear from merge on next context init
    // We need to reload to re-merge — simplest approach: remove from localStorage and reload
    try {
      const raw = localStorage.getItem('pipe-trader-admin-companies');
      if (raw) {
        const adminCompanies: Company[] = JSON.parse(raw);
        const updated = adminCompanies.filter(c => c.id !== id);
        localStorage.setItem('pipe-trader-admin-companies', JSON.stringify(updated));
      }
    } catch { /* ignore */ }
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-1.5">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Site</span>
              </Button>
            </Link>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <h1 className="font-bold text-gray-900 text-lg">Admin Panel</h1>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5 text-gray-500">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-700 font-semibold">
              Companies
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({allCompanies.length} total, {mockCompanies.length} built-in)
              </span>
            </h2>
          </div>
          <Button onClick={handleAdd} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>

        {/* Company list */}
        <div className="space-y-2">
          {allCompanies.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p>No companies yet. Add one to get started.</p>
            </div>
          ) : (
            allCompanies.map(company => (
              <AdminCompanyRow
                key={company.id}
                company={company}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onReset={handleReset}
              />
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={open => { if (!open) { setDialogOpen(false); setEditingCompany(undefined); } }}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>
              {editingCompany ? `Edit: ${editingCompany.name}` : 'Add New Company'}
            </DialogTitle>
          </DialogHeader>
          <CompanyForm
            company={editingCompany}
            onSave={handleSave}
            onCancel={() => { setDialogOpen(false); setEditingCompany(undefined); }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Admin: React.FC = () => (
  <CompanyProvider>
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  </CompanyProvider>
);

export default Admin;
