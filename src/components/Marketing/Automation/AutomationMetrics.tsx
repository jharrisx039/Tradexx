import React from 'react';
import { Zap, Mail, Users } from 'lucide-react';
import { ProgressBar } from '../../ProgressBar';

interface AutomationMetricsProps {
  workflows: any[];
}

export const AutomationMetrics: React.FC<AutomationMetricsProps> = ({ workflows }) => {
  const metrics = React.useMemo(() => {
    const totalContacts = workflows.reduce((acc, w) => acc + w.contacts, 0);
    const totalDelivered = workflows.reduce((acc, w) => acc + w.performance.delivered, 0);
    const totalOpened = workflows.reduce((acc, w) => acc + w.performance.opened, 0);
    const totalClicked = workflows.reduce((acc, w) => acc + w.performance.clicked, 0);

    return {
      activeWorkflows: workflows.filter(w => w.status === 'active').length,
      totalContacts,
      deliveryRate: (totalDelivered / totalContacts) * 100,
      openRate: (totalOpened / totalDelivered) * 100,
      clickRate: (totalClicked / totalOpened) * 100,
    };
  }, [workflows]);

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Workflows</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.activeWorkflows}
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={75} 
            className="h-2 bg-gray-100"
            barClassName="bg-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            75% increase from last month
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Email Performance</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.openRate.toFixed(1)}%
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.openRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-green-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            Average open rate
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Contacts</p>
            <p className="mt-1 text-2xl font-semibold">
              {metrics.totalContacts.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-full">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar 
            progress={metrics.deliveryRate} 
            className="h-2 bg-gray-100"
            barClassName="bg-purple-600"
          />
          <p className="mt-2 text-sm text-gray-500">
            {metrics.deliveryRate.toFixed(1)}% delivery rate
          </p>
        </div>
      </div>
    </>
  );
};