import React from 'react';
import { Plus, Trash2, Save, Table as TableIcon } from 'lucide-react';
import { createTable, deleteTable, getTables } from '../../../lib/database';
import clsx from 'clsx';

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
}

interface Table {
  name: string;
  columns: Column[];
}

export const TableManager: React.FC = () => {
  const [tables, setTables] = React.useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null);
  const [newTable, setNewTable] = React.useState<Table>({
    name: '',
    columns: [{ name: '', type: 'text', nullable: true }],
  });
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const result = await getTables();
      setTables(result);
    } catch (err) {
      setError('Failed to load tables');
    }
  };

  const handleAddColumn = () => {
    setNewTable(prev => ({
      ...prev,
      columns: [...prev.columns, { name: '', type: 'text', nullable: true }],
    }));
  };

  const handleRemoveColumn = (index: number) => {
    setNewTable(prev => ({
      ...prev,
      columns: prev.columns.filter((_, i) => i !== index),
    }));
  };

  const handleCreateTable = async () => {
    try {
      setError('');
      await createTable(newTable);
      await loadTables();
      setNewTable({ name: '', columns: [{ name: '', type: 'text', nullable: true }] });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create table');
    }
  };

  const handleDeleteTable = async (tableName: string) => {
    try {
      setError('');
      await deleteTable(tableName);
      await loadTables();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete table');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Tables</h3>
            <button
              onClick={() => setSelectedTable(null)}
              className="p-1 text-gray-400 hover:text-gray-500"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-1">
            {tables.map(table => (
              <button
                key={table.name}
                onClick={() => setSelectedTable(table.name)}
                className={clsx(
                  'flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg',
                  selectedTable === table.name
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <div className="flex items-center gap-2">
                  <TableIcon className="h-4 w-4" />
                  <span>{table.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTable(table.name);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-9">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            {selectedTable ? `Edit Table: ${selectedTable}` : 'Create New Table'}
          </h3>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Table Name
              </label>
              <input
                type="text"
                value={newTable.name}
                onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Columns
                </label>
                <button
                  type="button"
                  onClick={handleAddColumn}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Column
                </button>
              </div>

              <div className="space-y-2">
                {newTable.columns.map((column, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={column.name}
                      onChange={(e) => {
                        const newColumns = [...newTable.columns];
                        newColumns[index] = { ...column, name: e.target.value };
                        setNewTable({ ...newTable, columns: newColumns });
                      }}
                      placeholder="Column name"
                      className="flex-1 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={column.type}
                      onChange={(e) => {
                        const newColumns = [...newTable.columns];
                        newColumns[index] = { ...column, type: e.target.value };
                        setNewTable({ ...newTable, columns: newColumns });
                      }}
                      className="rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="integer">Integer</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                      <option value="timestamp">Timestamp</option>
                      <option value="decimal">Decimal</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(index)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCreateTable}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Table
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};