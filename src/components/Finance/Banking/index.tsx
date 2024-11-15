import React from 'react';
import { AccountList } from './AccountList';
import { AccountSummary } from './AccountSummary';
import { TransactionList } from './TransactionList';
import { useFinanceStore } from '../../../store/finance';
import { Plus, Search, Filter } from 'lucide-react';

export const Banking = () => {
  const { accounts, transactions } = useFinanceStore();
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction => 
    !selectedAccount || transaction.accountId === selectedAccount
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AccountSummary accounts={accounts} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedAccount || ''}
            onChange={(e) => setSelectedAccount(e.target.value || null)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Accounts</option>
            {accounts.map(account => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>

          <button
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <AccountList 
            accounts={accounts}
            selectedAccount={selectedAccount}
            onSelectAccount={setSelectedAccount}
          />
        </div>

        <div className="col-span-9">
          <TransactionList 
            transactions={filteredTransactions}
            accounts={accounts}
          />
        </div>
      </div>
    </div>
  );
};