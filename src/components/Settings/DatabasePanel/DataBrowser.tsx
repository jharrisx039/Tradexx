import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

export const DataBrowser: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Data Browser</h3>
        
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search data..."
              className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-5 w-5" />
              Export
            </button>
          </div>
        </div>

        <div className="text-center py-12 text-gray-500">
          <p>Select a table to browse its data</p>
        </div>
      </div>
    </div>
  );
};