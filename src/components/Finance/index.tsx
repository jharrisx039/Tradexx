import React from 'react';
import { FinanceDashboard } from './Dashboard';
import { Invoices } from './Invoices';
import { Expenses } from './Expenses';
import { Banking } from './Banking';
import { Reports } from './Reports';
import { Accounting } from './Accounting';

interface FinanceProps {
  section: string;
}

export const Finance: React.FC<FinanceProps> = ({ section }) => {
  const renderSection = () => {
    const sectionName = section.split('/')[1];
    
    switch (sectionName) {
      case 'dashboard':
        return <FinanceDashboard />;
      case 'invoices':
        return <Invoices />;
      case 'expenses':
        return <Expenses />;
      case 'banking':
        return <Banking />;
      case 'reports':
        return <Reports />;
      case 'accounting':
        return <Accounting />;
      default:
        return <FinanceDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Finance</h1>
        <p className="mt-2 text-gray-600">Manage your business finances</p>
      </div>
      {renderSection()}
    </div>
  );
};