import React from 'react';
import { Plus, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';

interface JournalEntry {
  id: string;
  date: string;
  reference: string;
  description: string;
  entries: Array<{
    id: string;
    accountCode: string;
    accountName: string;
    debit?: number;
    credit?: number;
  }>;
  status: 'draft' | 'posted' | 'reconciled';
}

const journalEntries: JournalEntry[] = [
  {
    id: '1',
    date: '2024-03-15',
    reference: 'JE-2024-001',
    description: 'Monthly rent payment',
    entries: [
      {
        id: '1.1',
        accountCode: '6200',
        accountName: 'Rent Expense',
        debit: 2500,
      },
      {
        id: '1.2',
        accountCode: '1010',
        accountName: 'Cash',
        credit: 2500,
      },
    ],
    status: 'posted',
  },
  // Add more entries as needed
];

export const JournalEntries = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search journal entries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            New Entry
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Debit
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {journalEntries.map((entry) => (
                <React.Fragment key={entry.id}>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(entry.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.reference}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ${entry.entries.reduce((acc, e) => acc + (e.debit || 0), 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      ${entry.entries.reduce((acc, e) => acc + (e.credit || 0), 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        entry.status === 'draft' && 'bg-yellow-100 text-yellow-800',
                        entry.status === 'posted' && 'bg-green-100 text-green-800',
                        entry.status === 'reconciled' && 'bg-blue-100 text-blue-800'
                      )}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                  {entry.entries.map((line) => (
                    <tr key={line.id} className="hover:bg-gray-50">
                      <td className="px-6 py-2" />
                      <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
                        {line.accountCode}
                      </td>
                      <td className="px-6 py-2 text-sm text-gray-500">
                        {line.accountName}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-right text-sm text-gray-900">
                        {line.debit && `$${line.debit.toLocaleString()}`}
                      </td>
                      <td className="px-6 py-2 whitespace-nowrap text-right text-sm text-gray-900">
                        {line.credit && `$${line.credit.toLocaleString()}`}
                      </td>
                      <td className="px-6 py-2" />
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};