import React from 'react';
import { useAuthStore } from '../../../store/auth';
import { Module, Permission, User } from '../../../types/rbac';
import { Shield, Check, X, User as UserIcon, Plus, Search } from 'lucide-react';
import clsx from 'clsx';

interface UserFormData {
  name: string;
  email: string;
  roleId: string;
}

export const UserPermissions = () => {
  const { currentUser, roles, updateUserCustomPermissions } = useAuthStore();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [showAddUser, setShowAddUser] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [formData, setFormData] = React.useState<UserFormData>({
    name: '',
    email: '',
    roleId: roles[0]?.id || '',
  });

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
    if (!selectedUser) return;

    const currentPermissions = selectedUser.customPermissions?.[module] || {};
    updateUserCustomPermissions(selectedUser.id, module, {
      ...currentPermissions,
      [permission]: value,
    });
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    setShowAddUser(false);
    setFormData({ name: '', email: '', roleId: roles[0]?.id || '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setShowAddUser(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          Add User
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Users</h3>
            <div className="space-y-1">
              {[currentUser].map((user) => (
                <button
                  key={user?.id}
                  onClick={() => setSelectedUser(user)}
                  className={clsx(
                    'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-lg',
                    selectedUser?.id === user?.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <UserIcon className="h-4 w-4" />
                  <span className="flex-1 text-left">{user?.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-9">
          {selectedUser ? (
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedUser.name}
                    </h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Role:</span>
                    <select
                      value={selectedUser.roleId}
                      onChange={(e) => {
                        // In a real app, this would update the user's role
                      }}
                      className="rounded-md border border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
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
                          const hasPermission = selectedUser.customPermissions?.[module]?.[permission];

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
          ) : (
            <div className="text-center py-12">
              <UserIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No User Selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a user to manage their permissions
              </p>
            </div>
          )}
        </div>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
              <button
                onClick={() => setShowAddUser(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  required
                  value={formData.roleId}
                  onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};