import React from 'react';
import { Save, Play, Pause, Settings, Plus, Database, Code } from 'lucide-react';
import clsx from 'clsx';

export const WorkflowToolbar = () => {
  const [activeTab, setActiveTab] = React.useState<'visual' | 'code'>('visual');

  return (
    <div className="flex items-center justify-between border-b border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setActiveTab('visual')}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded',
              activeTab === 'visual'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:text-gray-900'
            )}
          >
            Visual Editor
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded',
              activeTab === 'code'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:text-gray-900'
            )}
          >
            Code View
          </button>
        </div>

        <div className="h-6 border-l border-gray-200" />

        <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded">
          <Plus className="h-5 w-5" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded">
          <Database className="h-5 w-5" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 rounded">
          <Code className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Save className="h-4 w-4" />
          Save
        </button>
        <button className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
          <Play className="h-4 w-4" />
          Run
        </button>
      </div>
    </div>
  );
};