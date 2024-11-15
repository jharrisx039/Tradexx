import React from 'react';
import { Shield, Clock, AlertTriangle } from 'lucide-react';
import { ProgressBar } from '../../ProgressBar';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  completionRate: number;
}

interface ComplianceSummaryProps {
  items: ComplianceItem[];
  totalEmployees: number;
}

export const ComplianceSummary: React.FC<ComplianceSummaryProps> = ({ items, totalEmployees }) => {
  const metrics = React.useMemo(() => {
    const totalCompletionRate = items.reduce((acc, item) => acc + item.completionRate, 0) / items.length;
    const overdueItems = items.filter(item => new Date(item.dueDate) < new Date());
    const activeItems = items.filter(item => item.status === 'active');

    return {
      totalCompletionRate,
      overdueCount: overdueItems.length,
      activeCount: activeItems.length,
    };
  }, [items]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Overall Compliance</p>
            <p className="mt-1 text-2xl font-semibold">{Math.round(metrics.totalCompletionRate)}%</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.totalCompletionRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Requirements</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.activeCount}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Affecting {totalEmployees} employees
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Overdue Items</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.overdueCount}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Require immediate attention
        </p>
      </div>
    </>
  );
};