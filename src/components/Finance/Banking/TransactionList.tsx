import React from 'react';
import { format } from 'date-fns';
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react';
import { Transaction, Account } from '../../../store/finance';
import clsx from 'clsx';

interface TransactionListProps {
  transactions: Transaction[];
  accounts: Account[];
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  accounts,
}) => {
  const getAccount = (accountId: string) => {
    return accounts.find(a => a.id === accountId);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
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
            {transactions.map((transaction) => {
              const account = getAccount(transaction.accountId);
              const isIncome = transaction.type === 'income';
              
              return (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(transaction.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={clsx(
                          'p-2 rounded-full mr-3',
                          isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        )}
                      >
                        {isIncome ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownLeft className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </div>
                        {transaction.reference && (
                          <div className="text-sm text-gray-500">
                            Ref: {transaction.reference}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{account?.name}</div>
                    <div className="text-sm text-gray-500">{account?.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'text-sm font-medium',
                      isIncome ? 'text-green-600' : 'text-red-600'
                    )}>
                      {isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      transaction.status === 'cleared' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'reconciled' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    )}>
                      {transaction.status === 'cleared' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      )}
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};