import React from 'react';
import { Link2, Plus, Trash2, Code, Filter } from 'lucide-react';
import clsx from 'clsx';

interface WebhookCondition {
  id: string;
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than';
  value: string;
}

interface Webhook {
  id: string;
  name: string;
  url: string;
  module: string;
  events: string[];
  conditions: WebhookCondition[];
  enabled: boolean;
  secret?: string;
}

const modules = [
  { id: 'tasks', name: 'Tasks', events: ['created', 'updated', 'deleted', 'status_changed', 'assigned'] },
  { id: 'tickets', name: 'Tickets', events: ['created', 'updated', 'closed', 'reopened', 'comment_added'] },
  { id: 'contacts', name: 'Contacts', events: ['created', 'updated', 'deleted'] },
  { id: 'documents', name: 'Documents', events: ['uploaded', 'updated', 'deleted', 'shared'] },
  { id: 'hr', name: 'HR', events: ['employee_added', 'employee_updated', 'leave_requested', 'payroll_processed'] },
  { id: 'finance', name: 'Finance', events: ['invoice_created', 'payment_received', 'expense_added'] },
];

export const WebhookSettings = () => {
  const [webhooks, setWebhooks] = React.useState<Webhook[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [newWebhook, setNewWebhook] = React.useState<Omit<Webhook, 'id'>>({
    name: '',
    url: '',
    module: '',
    events: [],
    conditions: [],
    enabled: true,
  });

  const handleAddCondition = () => {
    setNewWebhook(prev => ({
      ...prev,
      conditions: [
        ...prev.conditions,
        {
          id: crypto.randomUUID(),
          field: '',
          operator: 'equals',
          value: '',
        },
      ],
    }));
  };

  const handleRemoveCondition = (id: string) => {
    setNewWebhook(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== id),
    }));
  };

  const handleCreateWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || !newWebhook.module || newWebhook.events.length === 0) {
      return;
    }

    setWebhooks(prev => [
      ...prev,
      {
        ...newWebhook,
        id: crypto.randomUUID(),
      },
    ]);
    setIsCreating(false);
    setNewWebhook({
      name: '',
      url: '',
      module: '',
      events: [],
      conditions: [],
      enabled: true,
    });
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id));
  };

  const handleToggleWebhook = (id: string) => {
    setWebhooks(prev =>
      prev.map(w =>
        w.id === id ? { ...w, enabled: !w.enabled } : w
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Webhooks</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure webhooks to receive real-time updates for specific events
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Webhook
        </button>
      </div>

      {isCreating && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook Name
              </label>
              <input
                type="text"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., Task Updates Webhook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhook URL
              </label>
              <input
                type="url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="https://api.example.com/webhook"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Module
              </label>
              <select
                value={newWebhook.module}
                onChange={(e) => setNewWebhook(prev => ({ ...prev, module: e.target.value, events: [] }))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a module</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.name}
                  </option>
                ))}
              </select>
            </div>

            {newWebhook.module && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Events
                </label>
                <div className="mt-2 space-y-2">
                  {modules
                    .find(m => m.id === newWebhook.module)
                    ?.events.map(event => (
                      <label key={event} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newWebhook.events.includes(event)}
                          onChange={(e) => {
                            setNewWebhook(prev => ({
                              ...prev,
                              events: e.target.checked
                                ? [...prev.events, event]
                                : prev.events.filter(e => e !== event),
                            }));
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {event.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Conditions
                </label>
                <button
                  type="button"
                  onClick={handleAddCondition}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Condition
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {newWebhook.conditions.map((condition) => (
                  <div key={condition.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={condition.field}
                      onChange={(e) => {
                        setNewWebhook(prev => ({
                          ...prev,
                          conditions: prev.conditions.map(c =>
                            c.id === condition.id ? { ...c, field: e.target.value } : c
                          ),
                        }));
                      }}
                      placeholder="Field"
                      className="block w-1/3 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <select
                      value={condition.operator}
                      onChange={(e) => {
                        setNewWebhook(prev => ({
                          ...prev,
                          conditions: prev.conditions.map(c =>
                            c.id === condition.id ? { ...c, operator: e.target.value as any } : c
                          ),
                        }));
                      }}
                      className="block w-1/3 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="equals">Equals</option>
                      <option value="not_equals">Not Equals</option>
                      <option value="contains">Contains</option>
                      <option value="starts_with">Starts With</option>
                      <option value="ends_with">Ends With</option>
                      <option value="greater_than">Greater Than</option>
                      <option value="less_than">Less Than</option>
                    </select>
                    <input
                      type="text"
                      value={condition.value}
                      onChange={(e) => {
                        setNewWebhook(prev => ({
                          ...prev,
                          conditions: prev.conditions.map(c =>
                            c.id === condition.id ? { ...c, value: e.target.value } : c
                          ),
                        }));
                      }}
                      placeholder="Value"
                      className="block w-1/3 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCondition(condition.id)}
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
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateWebhook}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Create Webhook
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {webhooks.map(webhook => (
          <div
            key={webhook.id}
            className="bg-white shadow-sm rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link2 className="h-5 w-5 text-gray-400" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{webhook.name}</h4>
                  <p className="text-sm text-gray-500">{webhook.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleWebhook(webhook.id)}
                  className={clsx(
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    webhook.enabled ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                >
                  <span
                    className={clsx(
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      webhook.enabled ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </button>
                <button
                  onClick={() => handleDeleteWebhook(webhook.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {webhook.events.map(event => (
                <span
                  key={event}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {event.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              ))}
            </div>

            {webhook.conditions.length > 0 && (
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Conditions</h5>
                <div className="space-y-2">
                  {webhook.conditions.map((condition) => (
                    <div
                      key={condition.id}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Filter className="h-4 w-4" />
                      <span>{condition.field}</span>
                      <span>{condition.operator.replace('_', ' ')}</span>
                      <span>{condition.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};