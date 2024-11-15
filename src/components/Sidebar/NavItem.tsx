import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

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

export const NavItem: React.FC<NavItemProps> = ({
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