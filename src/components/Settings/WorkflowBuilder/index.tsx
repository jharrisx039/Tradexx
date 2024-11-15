import React from 'react';
import { WorkflowCanvas } from './WorkflowCanvas';
import { WorkflowSidebar } from './WorkflowSidebar';
import { WorkflowToolbar } from './WorkflowToolbar';
import { useWorkflowStore } from '../../../store/workflow';
import { Plus, Search } from 'lucide-react';

export const WorkflowBuilder = () => {
  const [selectedWorkflow, setSelectedWorkflow] = React.useState<string | null>(null);
  const { workflows, addWorkflow } = useWorkflowStore();

  const handleCreateWorkflow = () => {
    const newWorkflow = {
      name: 'New Workflow',
      description: '',
      nodes: [],
      edges: [],
      triggers: [],
      actions: [],
    };
    addWorkflow(newWorkflow);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search workflows..."
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleCreateWorkflow}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Create Workflow
        </button>
      </div>

      <div className="flex gap-4 h-[calc(100vh-16rem)]">
        <WorkflowSidebar
          workflows={workflows}
          selectedWorkflow={selectedWorkflow}
          onSelectWorkflow={setSelectedWorkflow}
        />
        
        <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <WorkflowToolbar />
          <WorkflowCanvas />
        </div>
      </div>
    </div>
  );
};