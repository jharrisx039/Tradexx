import React from 'react';
import { TrackingTable } from './TrackingTable';
import { ViewManager } from './ViewManager';
import { useWarehouseStore } from '../../../../store/warehouse';
import { Plus, Search, Filter, Download, Eye } from 'lucide-react';

export const WarehouseTracking = () => {
  const [viewType, setViewType] = React.useState<'default' | 'compact' | 'detailed'>('default');
  const [showViewManager, setShowViewManager] = React.useState(false);
  const { trackings, customViews, activeViewId, setActiveView } = useWarehouseStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value as any)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="default">Default View</option>
            <option value="compact">Compact View</option>
            <option value="detailed">Detailed View</option>
          </select>

          <select
            value={activeViewId || ''}
            onChange={(e) => setActiveView(e.target.value || null)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Default View</option>
            {customViews.map(view => (
              <option key={view.id} value={view.id}>{view.name}</option>
            ))}
          </select>

          <button
            onClick={() => setShowViewManager(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Eye className="h-5 w-5" />
            Manage Views
          </button>

          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search trackings..."
              className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export
          </button>

          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            <Plus className="h-5 w-5" />
            Add Tracking
          </button>
        </div>
      </div>

      <TrackingTable 
        trackings={trackings}
        viewType={viewType}
      />

      {showViewManager && (
        <ViewManager onClose={() => setShowViewManager(false)} />
      )}
    </div>
  );
};