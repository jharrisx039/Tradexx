import React from 'react';
import { ThemeSelector } from './ThemeSelector';
import { APIConnector } from './APIConnector';
import { WorkflowBuilder } from './WorkflowBuilder';
import { DatabasePanel } from './DatabasePanel';
import { 
  Palette, 
  Link, 
  Shield, 
  Bell, 
  Users, 
  Globe,
  Database,
  Workflow
} from 'lucide-react';
import clsx from 'clsx';

type SettingsSection = 
  | 'appearance' 
  | 'database'
  | 'integrations' 
  | 'workflows' 
  | 'security' 
  | 'notifications' 
  | 'users' 
  | 'general';

export const Settings = () => {
  const [activeSection, setActiveSection] = React.useState<SettingsSection>('database');

  const menuItems = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'integrations', label: 'API Integrations', icon: Link },
    { id: 'workflows', label: 'Workflow Builder', icon: Workflow },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'users', label: 'Users & Permissions', icon: Users },
    { id: 'general', label: 'General', icon: Globe },
  ] as const;

  const renderContent = () => {
    switch (activeSection) {
      case 'appearance':
        return <ThemeSelector />;
      case 'database':
        return <DatabasePanel />;
      case 'integrations':
        return <APIConnector />;
      case 'workflows':
        return <WorkflowBuilder />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
            <p className="mt-2 text-sm text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex gap-4">
      {/* Inner Sidebar */}
      <div className="w-64 bg-card rounded-lg shadow-sm border border-border p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        <nav className="space-y-1">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as SettingsSection)}
              className={clsx(
                'w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg',
                activeSection === id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {menuItems.find(item => item.id === activeSection)?.label}
          </h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};