import React from 'react';
import { InvoiceList } from './InvoiceList';
import { InvoiceForm } from './InvoiceForm';
import { useFinanceStore } from '../../../store/finance';
import { useContactStore } from '../../../store/contacts';
import { Plus, Search, Filter } from 'lucide-react';

export const Invoices = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const { invoices } = useFinanceStore();
  const { customers } = useContactStore();

  const filteredInvoices = invoices.filter(invoice => {
    const customer = customers.find(c => c.id === invoice.customerId);
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            New Invoice
          </button>
        </div>
      </div>

      <InvoiceList 
        invoices={filteredInvoices}
        customers={customers}
      />

      {showForm && (
        <InvoiceForm 
          onClose={() => setShowForm(false)}
          customers={customers}
        />
      )}
    </div>
  );
};