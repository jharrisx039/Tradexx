import React from 'react';
import { useWorkflowStore } from '../../../store/workflow';

export const WorkflowCanvas = () => {
  return (
    <div className="flex-1 bg-gray-50 p-4 overflow-auto">
      <div className="min-h-full rounded-lg border-2 border-dashed border-gray-300 bg-white p-4">
        <div className="flex items-center justify-center h-full text-gray-500">
          Drag and drop nodes to create your workflow
        </div>
      </div>
    </div>
  );
};