import React from 'react';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../../../store/finance';
import clsx from 'clsx';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Transactions</h2>

      <div className="space-y-4">
        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center gap-4">
              <div className={clsx(
                'p-2 rounded-full',
                transaction.type === 'income' 
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              )}>
                {transaction.type === 'income' 
                  ? <ArrowUpRight className="w-5 h-5" />
                  : <ArrowDownLeft className="w-5 h-5" />
                }
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.description}
                </p>
                <p className="text-sm text-gray-500">
                  {format(parseISO(transaction.date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <div className={clsx(
              'text-sm font-medium',
              transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
            )}>
              {transaction.type === 'income' ? '+' : '-'}
              ${transaction.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Transactions
      </button>
    </div>
  );
};