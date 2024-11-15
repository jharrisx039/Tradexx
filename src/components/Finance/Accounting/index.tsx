import React from 'react';
import { AccountingTabs } from './AccountingTabs';
import { ChartOfAccounts } from './ChartOfAccounts';
import { JournalEntries } from './JournalEntries';
import { FinancialStatements } from './FinancialStatements';

export const Accounting = () => {
  const [activeTab, setActiveTab] = React.useState<'chart' | 'journal' | 'statements'>('chart');

  return (
    <div className="space-y-6">
      <AccountingTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'chart' && <ChartOfAccounts />}
      {activeTab === 'journal' && <JournalEntries />}
      {activeTab === 'statements' && <FinancialStatements />}
    </div>
  );
};