import React from 'react';
import { format } from 'date-fns';
import { BarChart2, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, Invoice } from '../../../store/finance';
import { ProgressBar } from '../../ProgressBar';
import clsx from 'clsx';

interface ReportListProps {
  transactions: Transaction[];
  invoices: Invoice[];
  dateRange: 'month' | 'quarter' | 'year';
}

interface ReportItem {
  title: string;
  description: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

export const ReportList: React.FC<ReportListProps> = ({
  transactions,
  invoices,
  dateRange,
}) => {
  const reports: ReportItem[] = [
    {
      title: 'Revenue by Category',
      description: 'Top performing revenue streams',
      value: 125000,
      change: 12.5,
      trend: 'up',
      color: 'blue',
    },
    {
      title: 'Expense Categories',
      description: 'Largest expense categories',
      value: 45000,
      change: -5.2,
      trend: 'down',
      color: 'red',
    },
    {
      title: 'Cash Flow',
      description: 'Net cash movement',
      value: 80000,
      change: 8.7,
      trend: 'up',
      color: 'green',
    },
    {
      title: 'Accounts Receivable',
      description: 'Outstanding payments',
      value: 35000,
      change: -2.3,
      trend: 'down',
      color: 'yellow',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reports.map((report) => (
        <div
          key={report.title}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-500">{report.description}</p>
            </div>
            <div className={clsx(
              'p-3 rounded-full',
              `bg-${report.color}-50`
            )}>
              <BarChart2 className={`w-6 h-6 text-${report.color}-600`} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400 mr-1" />
              <span className="text-2xl font-semibold">
                {report.value.toLocaleString()}
              </span>
            </div>
            <div className={clsx(
              'flex items-center px-2.5 py-0.5 rounded-full text-sm',
              report.trend === 'up' ? 'text-green-600 bg-green-50' :
              report.trend === 'down' ? 'text-red-600 bg-red-50' :
              'text-gray-600 bg-gray-50'
            )}>
              {report.trend === 'up' ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {Math.abs(report.change)}%
            </div>
          </div>

          <ProgressBar 
            progress={75} 
            className="h-2 bg-gray-100"
            barClassName={`bg-${report.color}-600`}
          />

          <div className="mt-4 space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Category {item}</span>
                <span className="font-medium text-gray-900">
                  ${(Math.random() * 10000).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};