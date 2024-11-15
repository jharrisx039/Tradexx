import React from 'react';
import { Warehouse } from './Warehouse';

interface ServicesProps {
  section: string;
  subsection?: string;
}

export const Services: React.FC<ServicesProps> = ({ section, subsection }) => {
  const renderSection = () => {
    switch (section) {
      case 'warehouse':
        return <Warehouse section={subsection} />;
      case 'ocean':
      case 'air':
      case 'courier':
      case 'land':
      case 'procurement':
      case 'bureau':
      case 'it':
        return (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-900">Coming Soon</h2>
            <p className="mt-2 text-gray-600">This section is under development.</p>
          </div>
        );
      default:
        return (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold text-gray-900">Select a Service</h2>
            <p className="mt-2 text-gray-600">Choose a service from the sidebar to get started</p>
          </div>
        );
    }
  };

  return renderSection();
}