import React from 'react';
import { WarehouseNav } from './WarehouseNav';
import { WarehouseMaster } from './Master';
import { WarehouseList } from './List';
import { WarehouseTracking } from './Tracking';
import { PreAlerts } from './PreAlerts';

interface WarehouseProps {
  section?: string;
}

export const Warehouse: React.FC<WarehouseProps> = ({ section = 'master' }) => {
  const [activeSection, setActiveSection] = React.useState(section);

  React.useEffect(() => {
    setActiveSection(section || 'master');
  }, [section]);

  const renderSection = () => {
    switch (activeSection) {
      case 'master':
        return <WarehouseMaster />;
      case 'list':
        return <WarehouseList />;
      case 'tracking':
        return <WarehouseTracking />;
      case 'alerts':
        return <PreAlerts />;
      default:
        return <WarehouseMaster />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Warehouse Management</h1>
        <p className="mt-2 text-gray-600">Track and manage warehouse operations</p>
      </div>

      <WarehouseNav 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      {renderSection()}
    </div>
  );
}