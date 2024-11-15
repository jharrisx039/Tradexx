import React from 'react';
import { TimesheetList } from './TimesheetList';
import { TimesheetSummary } from './TimesheetSummary';
import { useHRStore } from '../../../store/hr';
import { Plus, Search, Filter, Calendar } from 'lucide-react';
import { format, startOfWeek, endOfWeek, parseISO } from 'date-fns';

export const Timesheet = () => {
  const [selectedWeek, setSelectedWeek] = React.useState(new Date());
  const [employeeFilter, setEmployeeFilter] = React.useState('all');
  const { employees, timeEntries } = useHRStore();

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedWeek, { weekStartsOn: 1 });

  const filteredEntries = timeEntries.filter(entry => {
    const entryDate = parseISO(entry.date);
    const isInWeek = entryDate >= weekStart && entryDate <= weekEnd;
    const matchesEmployee = employeeFilter === 'all' || entry.employeeId === employeeFilter;
    return isInWeek && matchesEmployee;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={format(selectedWeek, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedWeek(e.target.value ? parseISO(e.target.value) : new Date())}
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
          Add Time Entry
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TimesheetSummary entries={filteredEntries} />
      </div>

      <TimesheetList 
        entries={filteredEntries}
        employees={employees}
        weekStart={weekStart}
      />
    </div>
  );
};