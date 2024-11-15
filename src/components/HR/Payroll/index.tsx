import React from 'react';
import { PayrollList } from './PayrollList';
import { PayrollSummary } from './PayrollSummary';
import { useHRStore } from '../../../store/hr';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const Payroll = () => {
  const [selectedPeriod, setSelectedPeriod] = React.useState(new Date());
  const [employeeFilter, setEmployeeFilter] = React.useState('all');
  const { employees, payrollEntries } = useHRStore();

  const filteredEntries = payrollEntries.filter(entry => {
    const matchesEmployee = employeeFilter === 'all' || entry.employeeId === employeeFilter;
    const matchesPeriod = format(new Date(entry.period), 'yyyy-MM') === format(selectedPeriod, 'yyyy-MM');
    return matchesEmployee && matchesPeriod;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="month"
            value={format(selectedPeriod, 'yyyy-MM')}
            onChange={(e) => setSelectedPeriod(new Date(e.target.value))}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
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
          Process Payroll
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PayrollSummary entries={filteredEntries} />
      </div>

      <PayrollList 
        entries={filteredEntries}
        employees={employees}
      />
    </div>
  );
};