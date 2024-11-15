import React from 'react';
import { Save, TestTube, RefreshCw, Plus, ChevronDown, ChevronRight, Code } from 'lucide-react';
import clsx from 'clsx';

interface FieldMapping {
  source: string;
  target: string;
  transform?: string;
}

interface APIEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  fieldMappings: FieldMapping[];
  targetTable: string;
}

const availableTables = [
  { id: 'trackings', name: 'Warehouse Trackings', 
    fields: ['contact', 'invNo', 'dimensions', 'weight', 'type', 'warehouse', 'status'] },
  { id: 'contacts', name: 'Contacts', 
    fields: ['name', 'email', 'phone', 'company', 'type'] },
  { id: 'tickets', name: 'Support Tickets', 
    fields: ['title', 'description', 'status', 'priority', 'assignee'] },
];

export const APIConnector = () => {
  const [endpoints, setEndpoints] = React.useState<APIEndpoint[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp API',
      url: 'https://api.example.com/whatsapp',
      method: 'GET',
      status: 'disconnected',
      targetTable: 'contacts',
      fieldMappings: [
        { source: 'wa_id', target: 'phone' },
        { source: 'profile.name', target: 'name' },
        { source: 'business.description', target: 'company' },
      ]
    },
    {
      id: 'shipments',
      name: 'Shipments API',
      url: 'https://api.example.com/shipments',
      method: 'GET',
      status: 'disconnected',
      targetTable: 'trackings',
      fieldMappings: [
        { source: 'customer.name', target: 'contact' },
        { source: 'invoice_number', target: 'invNo' },
        { source: 'package.weight', target: 'weight' },
        { source: 'shipment_type', target: 'type' },
        { source: 'location', target: 'warehouse' },
      ]
    }
  ]);

  const [editingEndpoint, setEditingEndpoint] = React.useState<string | null>(null);
  const [expandedEndpoint, setExpandedEndpoint] = React.useState<string | null>(null);
  const [sampleResponse, setSampleResponse] = React.useState<string>('');

  const handleTest = async (endpointId: string) => {
    // Simulate API test and get sample response
    const sampleData = {
      wa_id: '+1234567890',
      profile: { name: 'John Doe' },
      business: { description: 'ACME Corp' }
    };
    setSampleResponse(JSON.stringify(sampleData, null, 2));
  };

  const handleSync = async (endpointId: string) => {
    // Implement sync logic with field mappings
    const endpoint = endpoints.find(ep => ep.id === endpointId);
    if (!endpoint) return;

    console.log('Syncing endpoint:', endpointId);
    console.log('Field mappings:', endpoint.fieldMappings);
  };

  const addFieldMapping = (endpointId: string) => {
    setEndpoints(prev => prev.map(ep => 
      ep.id === endpointId 
        ? {
            ...ep,
            fieldMappings: [...ep.fieldMappings, { source: '', target: '' }]
          }
        : ep
    ));
  };

  const updateFieldMapping = (
    endpointId: string, 
    index: number, 
    field: keyof FieldMapping, 
    value: string
  ) => {
    setEndpoints(prev => prev.map(ep => 
      ep.id === endpointId 
        ? {
            ...ep,
            fieldMappings: ep.fieldMappings.map((mapping, i) => 
              i === index ? { ...mapping, [field]: value } : mapping
            )
          }
        : ep
    ));
  };

  const removeFieldMapping = (endpointId: string, index: number) => {
    setEndpoints(prev => prev.map(ep => 
      ep.id === endpointId 
        ? {
            ...ep,
            fieldMappings: ep.fieldMappings.filter((_, i) => i !== index)
          }
        : ep
    ));
  };

  return (
    <div className="space-y-6">
      <div className="prose prose-sm">
        <p>
          Configure your API endpoints and map their data fields to your application's data structure.
          Test the connection and preview the data mapping before syncing.
        </p>
      </div>

      <div className="space-y-4">
        {endpoints.map(endpoint => (
          <div
            key={endpoint.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setExpandedEndpoint(
                    expandedEndpoint === endpoint.id ? null : endpoint.id
                  )}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedEndpoint === endpoint.id ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                <div
                  className={clsx(
                    'h-2.5 w-2.5 rounded-full',
                    endpoint.status === 'connected' && 'bg-green-500',
                    endpoint.status === 'disconnected' && 'bg-gray-400',
                    endpoint.status === 'error' && 'bg-red-500'
                  )}
                />
                <h3 className="text-sm font-medium text-gray-900">
                  {endpoint.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTest(endpoint.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <TestTube className="h-4 w-4" />
                  Test
                </button>
                <button
                  onClick={() => handleSync(endpoint.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4" />
                  Sync
                </button>
              </div>
            </div>

            {expandedEndpoint === endpoint.id && (
              <div className="mt-4 space-y-4 border-t pt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Endpoint URL
                  </label>
                  {editingEndpoint === endpoint.id ? (
                    <div className="mt-1 flex gap-2">
                      <input
                        type="text"
                        value={endpoint.url}
                        onChange={(e) =>
                          setEndpoints(prev =>
                            prev.map(ep =>
                              ep.id === endpoint.id
                                ? { ...ep, url: e.target.value }
                                : ep
                            )
                          )
                        }
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => setEditingEndpoint(null)}
                        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <div
                      className="mt-1 cursor-pointer rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      onClick={() => setEditingEndpoint(endpoint.id)}
                    >
                      {endpoint.url}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Method
                    </label>
                    <select
                      value={endpoint.method}
                      onChange={(e) =>
                        setEndpoints(prev =>
                          prev.map(ep =>
                            ep.id === endpoint.id
                              ? { ...ep, method: e.target.value as APIEndpoint['method'] }
                              : ep
                          )
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Target Table
                    </label>
                    <select
                      value={endpoint.targetTable}
                      onChange={(e) =>
                        setEndpoints(prev =>
                          prev.map(ep =>
                            ep.id === endpoint.id
                              ? { ...ep, targetTable: e.target.value }
                              : ep
                          )
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {availableTables.map(table => (
                        <option key={table.id} value={table.id}>
                          {table.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Field Mappings
                    </label>
                    <button
                      onClick={() => addFieldMapping(endpoint.id)}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Mapping
                    </button>
                  </div>

                  <div className="space-y-2">
                    {endpoint.fieldMappings.map((mapping, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={mapping.source}
                          onChange={(e) => updateFieldMapping(
                            endpoint.id, 
                            index, 
                            'source', 
                            e.target.value
                          )}
                          placeholder="API field path"
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <span className="text-gray-500">→</span>
                        <select
                          value={mapping.target}
                          onChange={(e) => updateFieldMapping(
                            endpoint.id,
                            index,
                            'target',
                            e.target.value
                          )}
                          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Select field</option>
                          {availableTables
                            .find(t => t.id === endpoint.targetTable)
                            ?.fields.map(field => (
                              <option key={field} value={field}>
                                {field}
                              </option>
                            ))}
                        </select>
                        <button
                          onClick={() => removeFieldMapping(endpoint.id, index)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {sampleResponse && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sample Response
                    </label>
                    <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto">
                      <code>{sampleResponse}</code>
                    </pre>
                  </div>
                )}

                {endpoint.lastSync && (
                  <p className="text-sm text-gray-500">
                    Last synced: {new Date(endpoint.lastSync).toLocaleString()}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setEndpoints(prev => [
            ...prev,
            {
              id: crypto.randomUUID(),
              name: 'New Endpoint',
              url: 'https://',
              method: 'GET',
              status: 'disconnected',
              targetTable: availableTables[0].id,
              fieldMappings: []
            }
          ])
        }
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Add Endpoint
      </button>
    </div>
  );
};