import React from 'react';
import { Download, Filter } from 'lucide-react';
import { ProgressBar } from '../../ProgressBar';
import clsx from 'clsx';

export const FinancialStatements = () => {
  const [statementType, setStatementType] = React.useState<'income' | 'balance' | 'cash'>('income');
  const [period, setPeriod] = React.useState('month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={statementType}
            onChange={(e) => setStatementType(e.target.value as any)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="income">Income Statement</option>
            <option value="balance">Balance Sheet</option>
            <option value="cash">Cash Flow</option>
          </select>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          <Download className="h-5 w-5" />
          Export PDF
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          {statementType === 'income' && 'Income Statement'}
          {statementType === 'balance' && 'Balance Sheet'}
          {statementType === 'cash' && 'Cash Flow Statement'}
        </h2>

        {statementType === 'income' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Revenue</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sales Revenue</span>
                  <span className="text-sm font-medium text-gray-900">$125,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Service Revenue</span>
                  <span className="text-sm font-medium text-gray-900">$75,000</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium text-gray-900">Total Revenue</span>
                  <span className="text-sm font-medium text-gray-900">$200,000</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Expenses</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cost of Goods Sold</span>
                  <span className="text-sm font-medium text-gray-900">$80,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Operating Expenses</span>
                  <span className="text-sm font-medium text-gray-900">$40,000</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-medium text-gray-900">Total Expenses</span>
                  <span className="text-sm font-medium text-gray-900">$120,000</span>
                </div>
              </div>
            </section>

            <section className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">Net Income</span>
                <span className="font-medium text-gray-900">$80,000</span>
              </div>
              <div className="mt-4">
                <ProgressBar 
                  progress={40} 
                  className="h-2 bg-gray-100"
                  barClassName="bg-green-600"
                />
                <p className="mt-2 text-sm text-gray-500">
                  40% profit margin
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Add similar sections for Balance Sheet and Cash Flow Statement */}
      </div>
    </div>
  );
};