import React from 'react';
import { Server, Key, Database, RefreshCw } from 'lucide-react';
import { testConnection, saveConnection } from '../../../lib/database';

interface DatabaseConnectionProps {
  onConnectionChange: (connected: boolean) => void;
  isConnected: boolean;
}

export const DatabaseConnection: React.FC<DatabaseConnectionProps> = ({
  onConnectionChange,
  isConnected,
}) => {
  const [formData, setFormData] = React.useState({
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
    ssl: false,
  });
  const [testing, setTesting] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleTest = async () => {
    try {
      setTesting(true);
      setError('');
      const result = await testConnection(formData);
      if (result.success) {
        onConnectionChange(true);
      } else {
        setError(result.error || 'Connection failed');
        onConnectionChange(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      onConnectionChange(false);
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      await saveConnection(formData);
      onConnectionChange(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save connection');
      onConnectionChange(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          PostgreSQL Connection
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Host
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Server className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={formData.host}
                  onChange={(e) => setFormData({ ...formData, host: e.target.value })}
                  className="block w-full pl-10 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="localhost"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Port
              </label>
              <input
                type="text"
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Database Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Database className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                className="block w-full pl-10 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full pl-10 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="ssl"
              checked={formData.ssl}
              onChange={(e) => setFormData({ ...formData, ssl: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="ssl" className="ml-2 block text-sm text-gray-700">
              Enable SSL
            </label>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {testing ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Database className="h-4 w-4 mr-2" />
              )}
              Test Connection
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isConnected}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              Save Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};