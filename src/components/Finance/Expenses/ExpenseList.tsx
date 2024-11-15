import React from 'react';
import { format } from 'date-fns';
import { DollarSign, FileText, MoreHorizontal, Download } from 'lucide-react';
import { Transaction } from '../../../store/finance';
import clsx from 'clsx';

interface ExpenseListProps {
  expenses: Transaction[];
}

const categoryColors = {
  office: 'bg-blue-100 text-blue-800',
  travel: 'bg-green-100 text-green-800',
  marketing: 'bg-purple-100 text-purple-800',
  utilities: 'bg-yellow-100 text-yellow-800',
  supplies: 'bg-pink-100 text-pink-800',
  default: 'bg-gray-100 text-gray-800',
};

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {expense.description}
                      </div>
                      {expense.reference && (
                        <div className="text-sm text-gray-500">
                          Ref: {expense.reference}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    categoryColors[expense.category as keyof typeof categoryColors] || categoryColors.default
                  )}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm font-medium text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                    {expense.amount.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {format(new Date(expense.date), 'MMM d, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    expense.status === 'cleared' ? 'bg-green-100 text-green-800' :
                    expense.status === 'reconciled' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  )}>
                    {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center gap-2">
                    {expense.attachments?.length > 0 && (
                      <button className="text-gray-400 hover:text-gray-500">
                        <Download className="h-5 w-5" />
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};