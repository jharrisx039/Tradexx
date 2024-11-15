import React from 'react';
import { ReportList } from './ReportList';
import { ReportMetrics } from './ReportMetrics';
import { useFinanceStore } from '../../../store/finance';
import { Download, Filter } from 'lucide-react';

export const Reports = () => {
  const { transactions, invoices } = useFinanceStore();
  const [dateRange, setDateRange] = React.useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Download className="h-5 w-5" />
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReportMetrics 
          transactions={transactions}
          invoices={invoices}
          dateRange={dateRange}
        />
      </div>

      <ReportList 
        transactions={transactions}
        invoices={invoices}
        dateRange={dateRange}
      />
    </div>
  );
};