import React from 'react';
import { LeaveList } from './LeaveList';
import { LeaveSummary } from './LeaveSummary';
import { useHRStore } from '../../../store/hr';
import { Plus, Search, Filter, Calendar } from 'lucide-react';

export const LeaveManagement = () => {
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [employeeFilter, setEmployeeFilter] = React.useState('all');
  const { employees, leaveRequests } = useHRStore();

  const filteredRequests = leaveRequests.filter(request => {
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesEmployee = employeeFilter === 'all' || request.employeeId === employeeFilter;
    return matchesStatus && matchesEmployee;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Employees</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>

        <button
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Leave Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LeaveSummary requests={filteredRequests} />
      </div>

      <LeaveList 
        requests={filteredRequests}
        employees={employees}
      />
    </div>
  );
};