import React from 'react';
import { useAuthStore } from '../store/auth';
import { Module } from '../types/rbac';
import {
  LayoutDashboard,
  Calendar,
  ListTodo,
  Users,
  MessageSquare,
  FileText,
  UserCog,
  DollarSign,
  Megaphone,
  Boxes,
  Settings,
  ChevronDown,
  ChevronRight,
  Zap
} from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);
  const { hasPermission } = useAuthStore();

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev =>
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const isExpanded = (item: string) => expandedItems.includes(item);

  const hasModuleAccess = (module: Module) => {
    return hasPermission(module, 'view');
  };

  const hasSubModuleAccess = (module: Module, subModule: string) => {
    return hasPermission(module, 'view') && hasPermission(subModule as Module, 'view');
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">TradExx</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        {hasModuleAccess('dashboard') && (
          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={activeSection === 'dashboard'}
            onClick={() => onNavigate('dashboard')}
          />
        )}

        {hasModuleAccess('events') && (
          <NavItem
            icon={Calendar}
            label="Events"
            active={activeSection === 'events'}
            onClick={() => onNavigate('events')}
          />
        )}

        {hasModuleAccess('tasks') && (
          <NavItem
            icon={ListTodo}
            label="Tasks"
            active={activeSection === 'tasks'}
            onClick={() => onNavigate('tasks')}
          />
        )}

        {hasModuleAccess('contacts') && (
          <NavItem
            icon={Users}
            label="Contacts"
            active={activeSection === 'contacts'}
            onClick={() => onNavigate('contacts')}
          />
        )}

        {hasModuleAccess('tickets') && (
          <NavItem
            icon={MessageSquare}
            label="Tickets"
            active={activeSection === 'tickets'}
            onClick={() => onNavigate('tickets')}
          />
        )}

        {hasModuleAccess('documents') && (
          <NavItem
            icon={FileText}
            label="Documents"
            active={activeSection === 'documents'}
            onClick={() => onNavigate('documents')}
          />
        )}

        {hasModuleAccess('hr') && (
          <NavItem
            icon={UserCog}
            label="HR"
            active={activeSection.startsWith('hr/')}
            expanded={isExpanded('hr')}
            onClick={() => toggleExpanded('hr')}
            subItems={[
              { id: 'hr/recruitment', label: 'Recruitment' },
              { id: 'hr/employees', label: 'Employees' },
              { id: 'hr/performance', label: 'Performance' },
              { id: 'hr/timesheet', label: 'Timesheet' },
              { id: 'hr/payroll', label: 'Payroll' },
              { id: 'hr/leave', label: 'Leave Management' },
              { id: 'hr/compliance', label: 'Compliance' },
            ].filter(item => hasSubModuleAccess('hr', item.id.split('/')[1]))}
            onSubItemClick={onNavigate}
            activeSubItem={activeSection}
          />
        )}

        {hasModuleAccess('finance') && (
          <NavItem
            icon={DollarSign}
            label="Finance"
            active={activeSection.startsWith('finance/')}
            expanded={isExpanded('finance')}
            onClick={() => toggleExpanded('finance')}
            subItems={[
              { id: 'finance/dashboard', label: 'Overview' },
              { id: 'finance/invoices', label: 'Invoices' },
              { id: 'finance/expenses', label: 'Expenses' },
              { id: 'finance/banking', label: 'Banking' },
              { id: 'finance/reports', label: 'Reports' },
              { id: 'finance/accounting', label: 'Accounting' },
            ].filter(item => hasSubModuleAccess('finance', item.id.split('/')[1]))}
            onSubItemClick={onNavigate}
            activeSubItem={activeSection}
          />
        )}

        {hasModuleAccess('marketing') && (
          <NavItem
            icon={Megaphone}
            label="Marketing"
            active={activeSection.startsWith('marketing/')}
            expanded={isExpanded('marketing')}
            onClick={() => toggleExpanded('marketing')}
            subItems={[
              { id: 'marketing/dashboard', label: 'Overview' },
              { id: 'marketing/calendar', label: 'Content Calendar' },
              { id: 'marketing/social', label: 'Social Media' },
              { id: 'marketing/campaigns', label: 'Campaigns' },
              { id: 'marketing/analytics', label: 'Analytics' },
              { id: 'marketing/audience', label: 'Audience' },
              { id: 'marketing/assets', label: 'Brand Assets' },
              { id: 'marketing/automation', label: 'Automation' },
            ].filter(item => hasSubModuleAccess('marketing', item.id.split('/')[1]))}
            onSubItemClick={onNavigate}
            activeSubItem={activeSection}
          />
        )}

        {hasModuleAccess('services') && (
          <NavItem
            icon={Boxes}
            label="Services"
            active={activeSection.startsWith('services/')}
            expanded={isExpanded('services')}
            onClick={() => toggleExpanded('services')}
            subItems={[
              { id: 'services/warehouse', label: 'Warehouse' },
              { id: 'services/ocean', label: 'Ocean Freight' },
              { id: 'services/air', label: 'Air Freight' },
              { id: 'services/courier', label: 'Courier' },
              { id: 'services/land', label: 'Land Transport' },
              { id: 'services/procurement', label: 'Procurement' },
              { id: 'services/bureau', label: 'Bureau' },
              { id: 'services/it', label: 'IT Services' },
            ].filter(item => hasSubModuleAccess('services', item.id.split('/')[1]))}
            onSubItemClick={onNavigate}
            activeSubItem={activeSection}
          />
        )}
      </div>

      <div className="p-4 border-t border-border space-y-1">
        {hasModuleAccess('settings') && (
          <NavItem
            icon={Settings}
            label="Settings"
            active={activeSection === 'settings'}
            onClick={() => onNavigate('settings')}
          />
        )}
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  expanded?: boolean;
  onClick: () => void;
  subItems?: Array<{ id: string; label: string }>;
  onSubItemClick?: (id: string) => void;
  activeSubItem?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon: Icon,
  label,
  active,
  expanded,
  onClick,
  subItems,
  onSubItemClick,
  activeSubItem,
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={clsx(
          'w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg',
          active ? 'bg-primary/10 text-primary' : 'text-text hover:bg-gray-100'
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="flex-1 text-left">{label}</span>
        {subItems && (
          expanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )
        )}
      </button>

      {subItems && expanded && (
        <div className="mt-1 ml-4 space-y-1">
          {subItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSubItemClick?.(item.id)}
              className={clsx(
                'w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg',
                activeSubItem === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text hover:bg-gray-100'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};