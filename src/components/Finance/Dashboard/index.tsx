import React from 'react';
import { AccountBalances } from './AccountBalances';
import { RecentTransactions } from './RecentTransactions';
import { FinancialMetrics } from './FinancialMetrics';
import { useFinanceStore } from '../../../store/finance';

export const FinanceDashboard = () => {
  const { accounts, transactions, invoices } = useFinanceStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AccountBalances accounts={accounts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialMetrics 
          transactions={transactions}
          invoices={invoices}
        />
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};