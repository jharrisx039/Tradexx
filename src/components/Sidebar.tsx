import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Ticket,
  FileText,
  MessageSquare,
  UserCog,
  DollarSign,
  Bell,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Megaphone,
  Zap,
  Calendar,
  Ship,
  Plane,
  Package,
  Truck,
  Warehouse as WarehouseIcon,
  ShoppingBag,
  FileSpreadsheet,
  Laptop,
  RotateCcw,
  Repeat,
  Headphones,
  Settings2,
  Power,
  ClipboardList,
} from 'lucide-react';
import clsx from 'clsx';

interface SubItem {
  id: string;
  label: string;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  expanded?: boolean;
  onClick?: () => void;
  subItems?: SubItem[];
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
    <div className="space-y-1">
      <button
        onClick={onClick}
        className={clsx(
          'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg',
          active
            ? 'bg-primary/10 text-primary'
            : 'text-gray-700 hover:bg-gray-100'
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="flex-1 text-left">{label}</span>
        {subItems && (
          expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {expanded && subItems && (
        <div className="pl-10 space-y-1">
          {subItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSubItemClick?.(item.id)}
              className={clsx(
                'w-full text-left px-3 py-2 text-sm font-medium rounded-lg',
                activeSubItem === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 hover:bg-gray-100'
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

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleExpanded = (item: string) => {
    setExpandedItems(prev =>
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [item] // Only keep the newly expanded item
    );
  };

  const isExpanded = (item: string) => expandedItems.includes(item);

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">TradExx</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={activeSection === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />

        <NavItem
          icon={Calendar}
          label="Events"
          active={activeSection === 'events'}
          onClick={() => onNavigate('events')}
        />

        <NavItem
          icon={CheckSquare}
          label="Tasks"
          active={activeSection === 'tasks'}
          onClick={() => onNavigate('tasks')}
        />

        <NavItem
          icon={Users}
          label="Contacts"
          active={activeSection === 'contacts'}
          onClick={() => onNavigate('contacts')}
        />

        <NavItem
          icon={Ticket}
          label="Tickets"
          active={activeSection === 'tickets'}
          onClick={() => onNavigate('tickets')}
        />

        <NavItem
          icon={FileText}
          label="Documents"
          active={activeSection === 'documents'}
          onClick={() => onNavigate('documents')}
        />

        <NavItem
          icon={MessageSquare}
          label="Chat"
          active={activeSection === 'chat'}
          onClick={() => onNavigate('chat')}
        />

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
          ]}
          onSubItemClick={onNavigate}
          activeSubItem={activeSection}
        />

        <NavItem
          icon={DollarSign}
          label="Finance"
          active={activeSection.startsWith('finance/')}
          expanded={isExpanded('finance')}
          onClick={() => toggleExpanded('finance')}
          subItems={[
            { id: 'finance/dashboard', label: 'Dashboard' },
            { id: 'finance/invoices', label: 'Invoices' },
            { id: 'finance/expenses', label: 'Expenses' },
            { id: 'finance/banking', label: 'Banking' },
            { id: 'finance/reports', label: 'Reports' },
            { id: 'finance/accounting', label: 'Accounting' },
          ]}
          onSubItemClick={onNavigate}
          activeSubItem={activeSection}
        />

        <NavItem
          icon={Megaphone}
          label="Marketing"
          active={activeSection.startsWith('marketing/')}
          expanded={isExpanded('marketing')}
          onClick={() => toggleExpanded('marketing')}
          subItems={[
            { id: 'marketing/dashboard', label: 'Dashboard' },
            { id: 'marketing/calendar', label: 'Content Calendar' },
            { id: 'marketing/social', label: 'Social Media' },
            { id: 'marketing/campaigns', label: 'Campaigns' },
            { id: 'marketing/analytics', label: 'Analytics' },
            { id: 'marketing/audience', label: 'Audience' },
            { id: 'marketing/assets', label: 'Brand Assets' },
            { id: 'marketing/automation', label: 'Automation' },
          ]}
          onSubItemClick={onNavigate}
          activeSubItem={activeSection}
        />

        <NavItem
          icon={Ship}
          label="Services"
          active={activeSection.startsWith('services/')}
          expanded={isExpanded('services')}
          onClick={() => toggleExpanded('services')}
          subItems={[
            { id: 'services/ocean', label: 'Ocean Freight' },
            { id: 'services/air', label: 'Air Freight' },
            { id: 'services/courier', label: 'Courier Services' },
            { id: 'services/land', label: 'Land Freight' },
            { id: 'services/warehouse', label: 'Warehouse' },
            { id: 'services/procurement', label: 'Procurement' },
            { id: 'services/bureau', label: 'Bureau Services' },
            { id: 'services/it', label: 'IT Support' },
          ]}
          onSubItemClick={onNavigate}
          activeSubItem={activeSection}
        />

        <NavItem
          icon={RotateCcw}
          label="Account Recovery"
          active={activeSection.startsWith('recovery/')}
          expanded={isExpanded('recovery')}
          onClick={() => toggleExpanded('recovery')}
          subItems={[
            { id: 'recovery/collection', label: 'Collection' },
            { id: 'recovery/renewal', label: 'Renewal & Retention' },
            { id: 'recovery/support', label: 'Dedicated Support' },
            { id: 'recovery/optimization', label: 'Service Optimization' },
            { id: 'recovery/reactivation', label: 'Reactivation Programs' },
            { id: 'recovery/survey', label: 'Survey & Follow-Up' },
          ]}
          onSubItemClick={onNavigate}
          activeSubItem={activeSection}
        />
      </div>

      <div className="p-4 border-t border-border space-y-1">
        <NavItem
          icon={Bell}
          label="Notifications"
          active={activeSection === 'notifications'}
          onClick={() => onNavigate('notifications')}
        />

        <NavItem
          icon={Settings}
          label="Settings"
          active={activeSection === 'settings'}
          onClick={() => onNavigate('settings')}
        />

        <NavItem
          icon={HelpCircle}
          label="Help & Support"
          active={activeSection === 'help'}
          onClick={() => onNavigate('help')}
        />
      </div>
    </aside>
  );
};