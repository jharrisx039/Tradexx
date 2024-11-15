import React from 'react';
import { PerformanceList } from './PerformanceList';
import { PerformanceMetrics } from './PerformanceMetrics';
import { useHRStore } from '../../../store/hr';
import { Search, Filter } from 'lucide-react';

export const Performance = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('all');
  const { employees } = useHRStore();

  const departments = [...new Set(employees.map(emp => emp.department))];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceMetrics employees={employees} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <PerformanceList employees={filteredEmployees} />
    </div>
  );
};