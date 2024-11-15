import React from 'react';
import { WorkflowList } from './WorkflowList';
import { WorkflowForm } from './WorkflowForm';
import { AutomationMetrics } from './AutomationMetrics';
import { Plus, Search, Filter } from 'lucide-react';

export const Automation = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Mock data - in a real app, this would come from your store
  const workflows = [
    {
      id: '1',
      name: 'Welcome Series',
      description: 'Onboarding email sequence for new subscribers',
      status: 'active',
      triggers: ['signup'],
      steps: 4,
      contacts: 1250,
      performance: {
        delivered: 1200,
        opened: 800,
        clicked: 400,
      },
    },
    // Add more workflows as needed
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AutomationMetrics workflows={workflows} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </select>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Workflow
        </button>
      </div>

      <WorkflowList workflows={workflows} />

      {showForm && (
        <WorkflowForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};