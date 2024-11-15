import React from 'react';
import { useContactStore } from '../../store/contacts';
import { ContactTable } from './ContactTable';
import { Search, Plus, Download } from 'lucide-react';

export const VendorList = () => {
  const { vendors, addVendor } = useContactStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-md border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
          <button
            onClick={() => addVendor({
              name: 'New Vendor',
              email: 'vendor@example.com',
              phone: '+1234567890',
              company: 'Company Name',
              category: 'supplies'
            })}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Add Vendor
          </button>
        </div>
      </div>

      <ContactTable
        data={filteredVendors}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'phone', header: 'Phone' },
          { key: 'company', header: 'Company' },
          { key: 'category', header: 'Category' }
        ]}
      />
    </div>
  );
};