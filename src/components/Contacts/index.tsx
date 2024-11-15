import React from 'react';
import { ContactTabs } from './ContactTabs';
import { CustomerList } from './CustomerList';
import { VendorList } from './VendorList';

export const Contacts = () => {
  const [activeTab, setActiveTab] = React.useState<'customers' | 'vendors'>('customers');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        <p className="mt-2 text-gray-600">Manage your customers and vendors</p>
      </div>

      <ContactTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'customers' ? <CustomerList /> : <VendorList />}
    </div>
  );
};