import React from 'react';
import { Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { useWarehouseStore, CustomView } from '../../../../store/warehouse';
import clsx from 'clsx';

interface ViewManagerProps {
  onClose: () => void;
}

export const ViewManager: React.FC<ViewManagerProps> = ({ onClose }) => {
  const { 
    columnOrder,
    hiddenColumns,
    customViews,
    activeViewId,
    addCustomView,
    updateCustomView,
    deleteCustomView,
    toggleColumn,
    showAllColumns,
  } = useWarehouseStore();

  const [newViewName, setNewViewName] = React.useState('');
  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(
    columnOrder.filter(col => !hiddenColumns.includes(col))
  );

  const handleCreateView = () => {
    if (newViewName.trim()) {
      addCustomView({
        name: newViewName.trim(),
        columns: selectedColumns,
      });
      setNewViewName('');
    }
  };

  const handleToggleColumn = (columnId: string) => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(prev => prev.filter(id => id !== columnId));
    } else {
      setSelectedColumns(prev => [...prev, columnId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Manage Views</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <Eye className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Column Visibility</h4>
            <div className="grid grid-cols-3 gap-2">
              {columnOrder.map(columnId => (
                <label
                  key={columnId}
                  className="flex items-center gap-2 p-2 rounded hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={!hiddenColumns.includes(columnId)}
                    onChange={() => toggleColumn(columnId)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            <button
              onClick={showAllColumns}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700"
            >
              Show All Columns
            </button>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Custom Views</h4>
            <div className="space-y-2">
              {customViews.map(view => (
                <div
                  key={view.id}
                  className={clsx(
                    'flex items-center justify-between p-2 rounded',
                    activeViewId === view.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <span className="text-sm font-medium text-gray-900">{view.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => deleteCustomView(view.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
                placeholder="New view name..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateView}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Create View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};