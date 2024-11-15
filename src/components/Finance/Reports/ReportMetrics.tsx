import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, Invoice } from '../../../store/finance';
import { ProgressBar } from '../../ProgressBar';
import {
  startOfMonth,
  startOfQuarter,
  startOfYear,
  endOfMonth,
  endOfQuarter,
  endOfYear,
  parseISO,
} from 'date-fns';

interface ReportMetricsProps {
  transactions: Transaction[];
  invoices: Invoice[];
  dateRange: 'month' | 'quarter' | 'year';
}

export const ReportMetrics: React.FC<ReportMetricsProps> = ({
  transactions,
  invoices,
  dateRange,
}) => {
  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case 'month':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'quarter':
        return { start: startOfQuarter(now), end: endOfQuarter(now) };
      case 'year':
        return { start: startOfYear(now), end: endOfYear(now) };
    }
  };

  const metrics = React.useMemo(() => {
    const { start, end } = getDateRange();
    
    const periodTransactions = transactions.filter(t => {
      const date = parseISO(t.date);
      return date >= start && date <= end;
    });

    const income = periodTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = periodTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const profit = income - expenses;
    const profitMargin = income > 0 ? (profit / income) * 100 : 0;

    const periodInvoices = invoices.filter(i => {
      const date = parseISO(i.date);
      return date >= start && date <= end;
    });

    const totalInvoiced = periodInvoices.reduce((acc, i) => acc + i.total, 0);
    const paidInvoices = periodInvoices
      .filter(i => i.status === 'paid')
      .reduce((acc, i) => acc + i.total, 0);
    const collectionRate = totalInvoiced > 0 ? (paidInvoices / totalInvoiced) * 100 : 0;

    return {
      income,
      expenses,
      profit,
      profitMargin,
      collectionRate,
    };
  }, [transactions, invoices, dateRange]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Net Profit</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.profit.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={Math.max(0, metrics.profitMargin)} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.profitMargin.toFixed(1)}% profit margin
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.income.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.collectionRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.collectionRate.toFixed(1)}% collection rate
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Expenses</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.expenses.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-full">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={(metrics.expenses / metrics.income) * 100} 
            className="h-2 bg-gray-100"
            barClassName="bg-red-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {((metrics.expenses / metrics.income) * 100).toFixed(1)}% of revenue
          </p>
        </div>
      </div>
    </>
  );
};