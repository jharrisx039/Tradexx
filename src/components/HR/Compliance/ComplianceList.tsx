import React from 'react';
import { format } from 'date-fns';
import { Shield, Clock, CheckCircle, AlertTriangle, MoreHorizontal, Users } from 'lucide-react';
import { ProgressBar } from '../../ProgressBar';
import clsx from 'clsx';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  completionRate: number;
}

interface ComplianceListProps {
  items: ComplianceItem[];
}

export const ComplianceList: React.FC<ComplianceListProps> = ({ items }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completion
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              const isOverdue = new Date(item.dueDate) < new Date();
              const daysRemaining = Math.ceil(
                (new Date(item.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Shield className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(item.dueDate), 'MMM d, yyyy')}
                    </div>
                    <div className={clsx(
                      'text-sm',
                      isOverdue ? 'text-red-500' : 'text-gray-500'
                    )}>
                      {isOverdue 
                        ? `${Math.abs(daysRemaining)} days overdue`
                        : `${daysRemaining} days remaining`
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      item.status === 'active' ? 'bg-green-100 text-green-800' :
                      item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    )}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <ProgressBar 
                          progress={item.completionRate}
                          className="h-2 bg-gray-100"
                          barClassName={clsx(
                            item.completionRate >= 90 ? 'bg-green-500' :
                            item.completionRate >= 70 ? 'bg-blue-500' :
                            item.completionRate >= 50 ? 'bg-yellow-500' :
                            'bg-red-500'
                          )}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.completionRate}%
                      </span>
                    </div>
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