import React from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { TimeEntry, Employee } from '../../../store/hr';
import clsx from 'clsx';

interface TimesheetListProps {
  entries: TimeEntry[];
  employees: Employee[];
  weekStart: Date;
}

export const TimesheetList: React.FC<TimesheetListProps> = ({ 
  entries, 
  employees,
  weekStart 
}) => {
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEmployeeEntries = (employeeId: string) => {
    return weekDays.map(day => {
      return entries.find(entry => 
        entry.employeeId === employeeId && 
        format(parseISO(entry.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
      );
    });
  };

  const getStatusIcon = (status: TimeEntry['status']) => {
    switch (status) {
      case 'approved':
        return CheckCircle;
      case 'rejected':
        return XCircle;
      default:
        return AlertCircle;
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
              {weekDays.map((day) => (
                <th
                  key={format(day, 'yyyy-MM-dd')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {format(day, 'EEE dd')}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Hours
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => {
              const employeeEntries = getEmployeeEntries(employee.id);
              const totalHours = employeeEntries.reduce((acc, entry) => 
                acc + (entry?.totalHours || 0), 0
              );

              return (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                      </div>
                    </div>
                  </td>
                  {employeeEntries.map((entry, index) => {
                    const StatusIcon = entry ? getStatusIcon(entry.status) : Clock;
                    
                    return (
                      <td
                        key={format(weekDays[index], 'yyyy-MM-dd')}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {entry ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <StatusIcon 
                                className={clsx(
                                  'h-4 w-4',
                                  entry.status === 'approved' ? 'text-green-600' :
                                  entry.status === 'rejected' ? 'text-red-600' :
                                  'text-yellow-600'
                                )} 
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {entry.totalHours}h
                              </span>
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(parseISO(`2000-01-01T${entry.clockIn}`), 'h:mm a')} - 
                              {format(parseISO(`2000-01-01T${entry.clockOut}`), 'h:mm a')}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {totalHours}h
                    </span>
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