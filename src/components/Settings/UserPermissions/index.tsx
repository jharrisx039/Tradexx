import React from 'react';
import { Shield, Save, Plus, Users, Lock } from 'lucide-react';
import { PermissionLevel, DEFAULT_PERMISSIONS } from '../../../types/permissions';
import { RolePermissions } from './RolePermissions';
import { UserList } from './UserList';
import clsx from 'clsx';

const permissionLevels: PermissionLevel[] = ['A1', 'A2', 'A3', 'Supervisor', 'Manager', 'Director', 'Admin'];

export const UserPermissions = () => {
  const [activeTab, setActiveTab] = React.useState<'users' | 'roles'>('roles');
  const [selectedLevel, setSelectedLevel] = React.useState<PermissionLevel>('A1');
  const [permissions, setPermissions] = React.useState(DEFAULT_PERMISSIONS);
  const [showAddUser, setShowAddUser] = React.useState(false);

  const handleSavePermissions = () => {
    // In a real app, this would save to the backend
    console.log('Saving permissions:', permissions);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-900">User Permissions</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage user access levels and role permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          {activeTab === 'users' && (
            <button
              onClick={() => setShowAddUser(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Plus className="h-5 w-5" />
              Add User
            </button>
          )}
          <button
            onClick={handleSavePermissions}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('roles')}
            className={clsx(
              'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'roles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            <Lock
              className={clsx(
                'mr-3 h-5 w-5',
                activeTab === 'roles' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            Role Permissions
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={clsx(
              'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === 'users'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            <Users
              className={clsx(
                'mr-3 h-5 w-5',
                activeTab === 'users' ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            User Management
          </button>
        </nav>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        {activeTab === 'roles' ? (
          <RolePermissions
            selectedLevel={selectedLevel}
            permissions={permissions}
            onLevelChange={setSelectedLevel}
            onPermissionChange={setPermissions}
          />
        ) : (
          <UserList showAddUser={showAddUser} onCloseAddUser={() => setShowAddUser(false)} />
        )}
      </div>
    </div>
  );
};