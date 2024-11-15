import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Transaction, Invoice } from '../../../store/finance';
import { ProgressBar } from '../../ProgressBar';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';

interface FinancialMetricsProps {
  transactions: Transaction[];
  invoices: Invoice[];
}

export const FinancialMetrics = ({ transactions, invoices }: FinancialMetricsProps) => {
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const metrics = React.useMemo(() => {
    const monthlyTransactions = transactions.filter(t => {
      const date = parseISO(t.date);
      return date >= monthStart && date <= monthEnd;
    });

    const income = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const unpaidInvoices = invoices
      .filter(i => i.status === 'sent' || i.status === 'overdue')
      .reduce((acc, i) => acc + i.total, 0);

    return { income, expenses, unpaidInvoices };
  }, [transactions, invoices, monthStart, monthEnd]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        {format(currentMonth, 'MMMM yyyy')} Overview
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">Income</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${metrics.income.toLocaleString()}
            </span>
          </div>
          <ProgressBar 
            progress={75} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Expenses</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${metrics.expenses.toLocaleString()}
            </span>
          </div>
          <ProgressBar 
            progress={45} 
            className="h-2 bg-gray-100"
            barClassName="bg-red-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Unpaid Invoices</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              ${metrics.unpaidInvoices.toLocaleString()}
            </span>
          </div>
          <ProgressBar 
            progress={60} 
            className="h-2 bg-gray-100"
            barClassName="bg-yellow-500"
          />
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Net Income</span>
            <span className="text-lg font-semibold text-gray-900">
              ${(metrics.income - metrics.expenses).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};