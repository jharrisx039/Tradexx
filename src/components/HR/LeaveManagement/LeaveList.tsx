import React from 'react';
import { format, differenceInDays } from 'date-fns';
import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { LeaveRequest, Employee } from '../../../store/hr';
import clsx from 'clsx';

interface LeaveListProps {
  requests: LeaveRequest[];
  employees: Employee[];
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const typeColors = {
  vacation: 'bg-blue-100 text-blue-800',
  sick: 'bg-purple-100 text-purple-800',
  personal: 'bg-orange-100 text-orange-800',
  other: 'bg-gray-100 text-gray-800',
};

export const LeaveList: React.FC<LeaveListProps> = ({ requests, employees }) => {
  const getEmployee = (employeeId: string) => {
    return employees.find(emp => emp.id === employeeId);
  };

  const getStatusIcon = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => {
              const employee = getEmployee(request.employeeId);
              const StatusIcon = getStatusIcon(request.status);
              const duration = differenceInDays(
                new Date(request.endDate),
                new Date(request.startDate)
              ) + 1;
              
              return (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee?.name}
                        </div>
                        <div className="text-sm text-gray-500">{employee?.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      typeColors[request.type as keyof typeof typeColors]
                    )}>
                      {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(request.startDate), 'MMM d')} - {format(new Date(request.endDate), 'MMM d, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {duration} {duration === 1 ? 'day' : 'days'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
                      statusColors[request.status]
                    )}>
                      <StatusIcon className="h-4 w-4" />
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 max-w-xs truncate">
                      {request.reason}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {request.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button className="text-green-600 hover:text-green-700">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};