import React from 'react';
import { Shield, Users, Key } from 'lucide-react';
import { RolePermissions } from './RolePermissions';
import { UserPermissions } from './UserPermissions';
import clsx from 'clsx';

type Tab = 'roles' | 'users';

export const RBACSettings = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>('roles');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Access Control</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage roles and permissions for users
        </p>
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
            <Shield
              className={clsx(
                'mr-3 h-5 w-5',
                activeTab === 'roles'
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            Roles & Permissions
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
                activeTab === 'users'
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            User Permissions
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'roles' ? <RolePermissions /> : <UserPermissions />}
      </div>
    </div>
  );
};