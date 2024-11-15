import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';
import { LeaveRequest } from '../../../store/hr';
import { ProgressBar } from '../../ProgressBar';
import { differenceInDays } from 'date-fns';

interface LeaveSummaryProps {
  requests: LeaveRequest[];
}

export const LeaveSummary: React.FC<LeaveSummaryProps> = ({ requests }) => {
  const metrics = React.useMemo(() => {
    const totalDays = requests.reduce((acc, req) => {
      return acc + differenceInDays(new Date(req.endDate), new Date(req.startDate)) + 1;
    }, 0);

    const approvedRequests = requests.filter(req => req.status === 'approved');
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const approvalRate = (approvedRequests.length / (requests.length || 1)) * 100;

    const typeBreakdown = requests.reduce((acc, req) => {
      acc[req.type] = (acc[req.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalDays,
      approvalRate,
      pendingCount: pendingRequests.length,
      typeBreakdown,
    };
  }, [requests]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Leave Days</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.totalDays} days</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          {Object.entries(metrics.typeBreakdown).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between text-sm text-gray-500">
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
              <span>{count} requests</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Approval Rate</p>
            <p className="mt-1 text-2xl font-semibold">{Math.round(metrics.approvalRate)}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <CheckCircle className="w-6 h-6 text-green-600" />
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
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="mt-1 text-2xl font-semibold">{metrics.pendingCount}</p>
          </div>
          <div className="p-3 bg-yellow-50 rounded-full">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Awaiting approval
        </p>
      </div>
    </>
  );
};