import React from 'react';
import { Recruitment } from './Recruitment';
import { Employees } from './Employees';
import { Performance } from './Performance';
import { Timesheet } from './Timesheet';
import { Payroll } from './Payroll';
import { LeaveManagement } from './LeaveManagement';
import { Compliance } from './Compliance';

interface HRProps {
  section: string;
}

export const HR: React.FC<HRProps> = ({ section }) => {
  const renderSection = () => {
    const sectionName = section.split('/')[1];
    
    switch (sectionName) {
      case 'recruitment':
        return <Recruitment />;
      case 'employees':
        return <Employees />;
      case 'performance':
        return <Performance />;
      case 'timesheet':
        return <Timesheet />;
      case 'payroll':
        return <Payroll />;
      case 'leave':
        return <LeaveManagement />;
      case 'compliance':
        return <Compliance />;
      default:
        return <Recruitment />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">HR Management</h1>
        <p className="mt-2 text-gray-600">Manage your human resources efficiently</p>
      </div>
      {renderSection()}
    </div>
  );
};