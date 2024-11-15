import React from 'react';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';
import { PayrollEntry } from '../../../store/hr';
import { ProgressBar } from '../../ProgressBar';

interface PayrollSummaryProps {
  entries: PayrollEntry[];
}

export const PayrollSummary: React.FC<PayrollSummaryProps> = ({ entries }) => {
  const metrics = React.useMemo(() => {
    const totalPayroll = entries.reduce((acc, entry) => acc + entry.total, 0);
    const totalDeductions = entries.reduce((acc, entry) => acc + entry.deductions, 0);
    const totalBonus = entries.reduce((acc, entry) => acc + entry.bonus, 0);
    const paidEntries = entries.filter(entry => entry.status === 'paid');
    const paymentRate = (paidEntries.length / (entries.length || 1)) * 100;

    return {
      totalPayroll,
      totalDeductions,
      totalBonus,
      paymentRate,
      pendingPayments: entries.length - paidEntries.length,
    };
  }, [entries]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Payroll</p>
            <p className="mt-1 text-2xl font-semibold">
              ${metrics.totalPayroll.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Deductions: -${metrics.totalDeductions.toLocaleString()}</span>
          <span>Bonus: +${metrics.totalBonus.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Payment Rate</p>
            <p className="mt-1 text-2xl font-semibold">{Math.round(metrics.paymentRate)}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.paymentRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Payments</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.pendingPayments}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-full">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Payments awaiting processing
        </p>
      </div>
    </>
  );
};