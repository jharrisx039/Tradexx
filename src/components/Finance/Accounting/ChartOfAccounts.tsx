import React from 'react';
import { Plus, Search, ChevronRight, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
  children?: Account[];
}

const accounts: Account[] = [
  {
    id: '1',
    code: '1000',
    name: 'Assets',
    type: 'asset',
    balance: 150000,
    children: [
      {
        id: '1.1',
        code: '1100',
        name: 'Current Assets',
        type: 'asset',
        balance: 75000,
        children: [
          {
            id: '1.1.1',
            code: '1110',
            name: 'Cash',
            type: 'asset',
            balance: 50000,
          },
          {
            id: '1.1.2',
            code: '1120',
            name: 'Accounts Receivable',
            type: 'asset',
            balance: 25000,
          },
        ],
      },
    ],
  },
  // Add more account categories as needed
];

export const ChartOfAccounts = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [expandedAccounts, setExpandedAccounts] = React.useState<string[]>(['1']);

  const toggleExpand = (accountId: string) => {
    setExpandedAccounts(prev =>
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const renderAccount = (account: Account, level: number = 0) => {
    const hasChildren = account.children && account.children.length > 0;
    const isExpanded = expandedAccounts.includes(account.id);

    return (
      <React.Fragment key={account.id}>
        <tr className={clsx(
          'hover:bg-gray-50',
          level > 0 && 'text-sm'
        )}>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(account.id)}
                  className="p-1 rounded-full hover:bg-gray-100 mr-2"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              )}
              <span className="font-medium text-gray-900">{account.code}</span>
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="text-gray-900">{account.name}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <span className={clsx(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              account.type === 'asset' && 'bg-green-100 text-green-800',
              account.type === 'liability' && 'bg-red-100 text-red-800',
              account.type === 'equity' && 'bg-blue-100 text-blue-800',
              account.type === 'revenue' && 'bg-purple-100 text-purple-800',
              account.type === 'expense' && 'bg-yellow-100 text-yellow-800'
            )}>
              {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
            </span>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right">
            <span className="text-gray-900 font-medium">
              ${account.balance.toLocaleString()}
            </span>
          </td>
        </tr>
        {hasChildren && isExpanded && account.children.map(child =>
          renderAccount(child, level + 1)
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Plus className="h-5 w-5" />
          Add Account
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map(account => renderAccount(account))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};