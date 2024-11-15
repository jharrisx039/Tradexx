import React from 'react';
import { Play, Pause, Settings, MoreHorizontal, Mail, Users, MousePointer } from 'lucide-react';
import { ProgressBar } from '../../ProgressBar';
import clsx from 'clsx';

interface WorkflowListProps {
  workflows: any[];
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  draft: 'bg-gray-100 text-gray-800',
  paused: 'bg-yellow-100 text-yellow-800',
};

export const WorkflowList: React.FC<WorkflowListProps> = ({ workflows }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Workflow
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacts
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workflows.map((workflow) => {
              const openRate = (workflow.performance.opened / workflow.performance.delivered) * 100;
              const clickRate = (workflow.performance.clicked / workflow.performance.opened) * 100;
              
              return (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {workflow.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {workflow.description}
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          {workflow.triggers.map((trigger: string) => (
                            <span
                              key={trigger}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {trigger}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      statusColors[workflow.status as keyof typeof statusColors]
                    )}>
                      {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <ProgressBar 
                            progress={openRate}
                            className="h-1.5 bg-gray-100"
                            barClassName="bg-blue-600"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {openRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MousePointer className="h-4 w-4 text-gray-400" />
                        <div className="flex-1">
                          <ProgressBar 
                            progress={clickRate}
                            className="h-1.5 bg-gray-100"
                            barClassName="bg-green-600"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {clickRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {workflow.contacts.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center gap-2 justify-end">
                      {workflow.status === 'active' ? (
                        <button className="p-1 text-gray-400 hover:text-gray-500">
                          <Pause className="h-5 w-5" />
                        </button>
                      ) : (
                        <button className="p-1 text-gray-400 hover:text-gray-500">
                          <Play className="h-5 w-5" />
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <Settings className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-500">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
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