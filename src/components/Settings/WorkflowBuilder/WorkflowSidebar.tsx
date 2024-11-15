import React from 'react';
import { Play, Pause, Settings, ChevronRight, ChevronDown } from 'lucide-react';
import { Workflow } from '../../../store/workflow';
import clsx from 'clsx';

interface WorkflowSidebarProps {
  workflows: Workflow[];
  selectedWorkflow: string | null;
  onSelectWorkflow: (id: string | null) => void;
}

export const WorkflowSidebar: React.FC<WorkflowSidebarProps> = ({
  workflows,
  selectedWorkflow,
  onSelectWorkflow,
}) => {
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['active']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const activeWorkflows = workflows.filter(w => w.status === 'active');
  const draftWorkflows = workflows.filter(w => w.status === 'draft');

  return (
    <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-sm font-medium text-gray-900 mb-4">Workflows</h2>

      <div className="space-y-4">
        <div>
          <button
            onClick={() => toggleSection('active')}
            className="flex items-center gap-2 w-full text-left text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            {expandedSections.includes('active') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Active Workflows
          </button>

          {expandedSections.includes('active') && (
            <div className="mt-2 space-y-1">
              {activeWorkflows.map(workflow => (
                <button
                  key={workflow.id}
                  onClick={() => onSelectWorkflow(workflow.id)}
                  className={clsx(
                    'flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg',
                    selectedWorkflow === workflow.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <span>{workflow.name}</span>
                  <Play className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection('drafts')}
            className="flex items-center gap-2 w-full text-left text-sm font-medium text-gray-900 hover:text-gray-700"
          >
            {expandedSections.includes('drafts') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            Draft Workflows
          </button>

          {expandedSections.includes('drafts') && (
            <div className="mt-2 space-y-1">
              {draftWorkflows.map(workflow => (
                <button
                  key={workflow.id}
                  onClick={() => onSelectWorkflow(workflow.id)}
                  className={clsx(
                    'flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg',
                    selectedWorkflow === workflow.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <span>{workflow.name}</span>
                  <Settings className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};