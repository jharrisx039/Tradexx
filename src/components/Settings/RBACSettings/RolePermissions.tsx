import React from 'react';
import { useAuthStore } from '../../../store/auth';
import { Module, Permission, Role } from '../../../types/rbac';
import { Shield, Check, X, Plus } from 'lucide-react';
import clsx from 'clsx';

export const RolePermissions = () => {
  const { roles, updateRolePermissions } = useAuthStore();
  const [selectedRole, setSelectedRole] = React.useState<Role>(roles[0]);
  const [showAddRole, setShowAddRole] = React.useState(false);
  const [newRoleName, setNewRoleName] = React.useState('');

  const modules: Module[] = [
    'dashboard',
    'events',
    'tasks',
    'contacts',
    'tickets',
    'documents',
    'chat',
    'hr',
    'finance',
    'marketing',
    'services',
    'settings',
  ];

  const permissions: Permission[] = ['view', 'create', 'edit', 'delete'];

  const handlePermissionChange = (
    module: Module,
    permission: Permission,
    value: boolean
  ) => {
    const currentPermissions = selectedRole.permissions[module] || {};
    updateRolePermissions(selectedRole.id, module, {
      ...currentPermissions,
      [permission]: value,
    });
  };

  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    setShowAddRole(false);
    setNewRoleName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium',
                selectedRole.id === role.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {role.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddRole(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add Role
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {selectedRole.name} Role
              </h3>
              <p className="text-sm text-gray-500">{selectedRole.description}</p>
            </div>
          </div>

          <div className="space-y-6">
            {modules.map((module) => (
              <div key={module} className="border-t pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  {module.charAt(0).toUpperCase() + module.slice(1)} Permissions
                </h4>

                <div className="grid grid-cols-4 gap-4">
                  {permissions.map((permission) => {
                    const hasPermission = selectedRole.permissions[module]?.[permission];

                    return (
                      <div
                        key={permission}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {permission.charAt(0).toUpperCase() + permission.slice(1)}
                        </span>
                        <button
                          onClick={() => handlePermissionChange(module, permission, !hasPermission)}
                          className={clsx(
                            'p-1 rounded-full',
                            hasPermission
                              ? 'text-green-600 bg-green-100 hover:bg-green-200'
                              : 'text-red-600 bg-red-100 hover:bg-red-200'
                          )}
                        >
                          {hasPermission ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New Role</h3>
              <button
                onClick={() => setShowAddRole(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddRole} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Name
                </label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddRole(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Add Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};