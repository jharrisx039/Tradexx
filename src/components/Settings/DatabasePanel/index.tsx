import React from 'react';
import { Database } from 'lucide-react';

export const DatabasePanel = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Database Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Database functionality is currently disabled. This feature will be available in a future update.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <Database className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Database Features Coming Soon</h3>
            <p className="mt-1 text-sm text-gray-500">
              We're working on adding database management capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};