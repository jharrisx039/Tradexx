import React from 'react';
import { format } from 'date-fns';
import { Star, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { Employee } from '../../../store/hr';
import clsx from 'clsx';

interface PerformanceListProps {
  employees: Employee[];
}

export const PerformanceList: React.FC<PerformanceListProps> = ({ employees }) => {
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
                Latest Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Review
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Goals Met
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => {
              const latestPerformance = employee.performance[employee.performance.length - 1];
              const previousPerformance = employee.performance[employee.performance.length - 2];
              const trend = previousPerformance
                ? latestPerformance.rating - previousPerformance.rating
                : 0;
              
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {latestPerformance ? (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900">
                          {latestPerformance.rating}/5
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Not rated</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trend !== 0 && (
                      <div className={clsx(
                        'flex items-center gap-1',
                        trend > 0 ? 'text-green-600' : 'text-red-600'
                      )}>
                        {trend > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">
                          {Math.abs(trend).toFixed(1)}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {latestPerformance ? (
                      format(new Date(latestPerformance.period), 'MMM d, yyyy')
                    ) : (
                      'Never'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {latestPerformance?.goals ? (
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <ProgressBar
                            progress={
                              (latestPerformance.goals.length / 
                               (latestPerformance.goals.length || 1)) * 100
                            }
                            className="h-2 bg-gray-100 w-24"
                            barClassName="bg-blue-600"
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {latestPerformance.goals.length} goals
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No goals set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
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