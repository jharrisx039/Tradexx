import React from 'react';
import { Shield } from 'lucide-react';
import { PermissionLevel, DEFAULT_PERMISSIONS } from '../../../types/permissions';
import clsx from 'clsx';

const permissionLevels: PermissionLevel[] = ['A1', 'A2', 'A3', 'Supervisor', 'Manager', 'Director', 'Admin'];
const modules = Object.keys(DEFAULT_PERMISSIONS.Admin) as Array<keyof typeof DEFAULT_PERMISSIONS.Admin>;

interface RolePermissionsProps {
  selectedLevel: PermissionLevel;
  permissions: typeof DEFAULT_PERMISSIONS;
  onLevelChange: (level: PermissionLevel) => void;
  onPermissionChange: (permissions: typeof DEFAULT_PERMISSIONS) => void;
}

export const RolePermissions: React.FC<RolePermissionsProps> = ({
  selectedLevel,
  permissions,
  onLevelChange,
  onPermissionChange,
}) => {
  const handlePermissionChange = (
    module: keyof typeof DEFAULT_PERMISSIONS.Admin,
    action: 'view' | 'create' | 'edit' | 'delete',
    value: boolean
  ) => {
    onPermissionChange({
      ...permissions,
      [selectedLevel]: {
        ...permissions[selectedLevel],
        [module]: {
          ...permissions[selectedLevel][module],
          [action]: value,
        },
      },
    });
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {permissionLevels.map(level => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={clsx(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap',
              selectedLevel === level
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            )}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Module
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                View
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Create
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {modules.map(module => (
              <tr key={module}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">
                      {module.charAt(0).toUpperCase() + module.slice(1)}
                    </span>
                  </div>
                </td>
                {(['view', 'create', 'edit', 'delete'] as const).map(action => (
                  <td key={action} className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={permissions[selectedLevel][module][action]}
                      onChange={(e) => handlePermissionChange(module, action, e.target.checked)}
                      disabled={selectedLevel === 'Admin'} // Admin always has full access
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};