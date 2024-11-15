import React from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { createRelation, getRelations } from '../../../lib/database';
import clsx from 'clsx';

interface Relation {
  name: string;
  sourceTable: string;
  targetTable: string;
  sourceColumn: string;
  targetColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export const RelationManager: React.FC = () => {
  const [relations, setRelations] = React.useState<Relation[]>([]);
  const [newRelation, setNewRelation] = React.useState<Relation>({
    name: '',
    sourceTable: '',
    targetTable: '',
    sourceColumn: '',
    targetColumn: '',
    type: 'one-to-many',
  });
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    loadRelations();
  }, []);

  const loadRelations = async () => {
    try {
      const result = await getRelations();
      setRelations(result);
    } catch (err) {
      setError('Failed to load relations');
    }
  };

  const handleCreateRelation = async () => {
    try {
      setError('');
      await createRelation(newRelation);
      await loadRelations();
      setNewRelation({
        name: '',
        sourceTable: '',
        targetTable: '',
        sourceColumn: '',
        targetColumn: '',
        type: 'one-to-many',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create relation');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Table Relations</h3>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relation Name
              </label>
              <input
                type="text"
                value={newRelation.name}
                onChange={(e) => setNewRelation({ ...newRelation, name: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., user_posts"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Relation Type
              </label>
              <select
                value={newRelation.type}
                onChange={(e) => setNewRelation({ ...newRelation, type: e.target.value as Relation['type'] })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="one-to-one">One-to-One</option>
                <option value="one-to-many">One-to-Many</option>
                <option value="many-to-many">Many-to-Many</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Source Table
              </label>
              <input
                type="text"
                value={newRelation.sourceTable}
                onChange={(e) => setNewRelation({ ...newRelation, sourceTable: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., users"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Source Column
              </label>
              <input
                type="text"
                value={newRelation.sourceColumn}
                onChange={(e) => setNewRelation({ ...newRelation, sourceColumn: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., id"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Table
              </label>
              <input
                type="text"
                value={newRelation.targetTable}
                onChange={(e) => setNewRelation({ ...newRelation, targetTable: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., posts"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Column
              </label>
              <input
                type="text"
                value={newRelation.targetColumn}
                onChange={(e) => setNewRelation({ ...newRelation, targetColumn: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="e.g., user_id"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCreateRelation}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Relation
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Existing Relations</h4>
          <div className="space-y-2">
            {relations.map((relation, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <div>
                  <h5 className="text-sm font-medium text-gray-900">{relation.name}</h5>
                  <p className="text-sm text-gray-500">
                    {relation.sourceTable}.{relation.sourceColumn} →{' '}
                    {relation.targetTable}.{relation.targetColumn}
                  </p>
                  <span className={clsx(
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2',
                    relation.type === 'one-to-one' && 'bg-blue-100 text-blue-800',
                    relation.type === 'one-to-many' && 'bg-green-100 text-green-800',
                    relation.type === 'many-to-many' && 'bg-purple-100 text-purple-800'
                  )}>
                    {relation.type}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};