import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { Transaction } from '../../../store/finance';
import { ProgressBar } from '../../ProgressBar';
import { format, startOfMonth, endOfMonth, parseISO } from 'date-fns';

interface ExpenseSummaryProps {
  expenses: Transaction[];
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const currentMonth = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const metrics = React.useMemo(() => {
    const monthlyExpenses = expenses.filter(e => {
      const date = parseISO(e.date);
      return date >= monthStart && date <= monthEnd;
    });

    const totalAmount = expenses.reduce((acc, e) => acc + e.amount, 0);
    const monthlyTotal = monthlyExpenses.reduce((acc, e) => acc + e.amount, 0);
    const averageAmount = totalAmount / (expenses.length || 1);

    const categoryBreakdown = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAmount,
      monthlyTotal,
      averageAmount,
      categoryBreakdown,
    };
  }, [expenses, monthStart, monthEnd]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-red-50 rounded-full">
            <DollarSign className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={75} 
            className="h-2 bg-gray-100"
            barClassName="bg-red-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            75% of monthly budget
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Monthly Expenses</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.monthlyTotal.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          {format(currentMonth, 'MMMM yyyy')}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Average per Transaction</p>
            <p className="mt-1 text-2xl font-semibold">
              ${Math.round(metrics.averageAmount).toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {Object.entries(metrics.categoryBreakdown)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([category, amount]) => (
              <div key={category} className="flex justify-between text-sm">
                <span className="text-gray-500">{category}</span>
                <span className="font-medium text-gray-900">
                  ${amount.toLocaleString()}
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};