import React from 'react';
import { Clock, UserCheck, AlertTriangle } from 'lucide-react';
import { TimeEntry } from '../../../store/hr';
import { ProgressBar } from '../../ProgressBar';

interface TimesheetSummaryProps {
  entries: TimeEntry[];
}

export const TimesheetSummary: React.FC<TimesheetSummaryProps> = ({ entries }) => {
  const metrics = React.useMemo(() => {
    const totalHours = entries.reduce((acc, entry) => acc + entry.totalHours, 0);
    const approvedEntries = entries.filter(entry => entry.status === 'approved');
    const pendingEntries = entries.filter(entry => entry.status === 'pending');

    return {
      totalHours,
      averageHours: totalHours / (entries.length || 1),
      approvalRate: (approvedEntries.length / (entries.length || 1)) * 100,
      pendingCount: pendingEntries.length,
    };
  }, [entries]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Hours</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.totalHours}h</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Average {metrics.averageHours.toFixed(1)}h per entry
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Approval Rate</p>
            <p className="mt-1 text-2xl font-semibold">{Math.round(metrics.approvalRate)}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.approvalRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending Entries</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.pendingCount}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-full">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Requires manager approval
        </p>
      </div>
    </>
  );
};