import React from 'react';
import { ComplianceList } from './ComplianceList';
import { ComplianceSummary } from './ComplianceSummary';
import { useHRStore } from '../../../store/hr';
import { Plus, Search, Filter } from 'lucide-react';

export const Compliance = () => {
  const { employees } = useHRStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  // Mock compliance data - in a real app, this would come from the store
  const complianceItems = [
    {
      id: '1',
      title: 'Annual Ethics Training',
      description: 'Mandatory ethics and compliance training for all employees',
      dueDate: '2024-12-31',
      status: 'active',
      completionRate: 75,
    },
    {
      id: '2',
      title: 'Data Privacy Certification',
      description: 'GDPR and data protection compliance certification',
      dueDate: '2024-06-30',
      status: 'active',
      completionRate: 60,
    },
    {
      id: '3',
      title: 'Workplace Safety Guidelines',
      description: 'Health and safety compliance training',
      dueDate: '2024-09-30',
      status: 'active',
      completionRate: 90,
    },
  ];

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search compliance items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>

          <button
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Compliance Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ComplianceSummary items={filteredItems} totalEmployees={employees.length} />
      </div>

      <ComplianceList items={filteredItems} />
    </div>
  );
};