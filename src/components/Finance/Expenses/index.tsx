import React from 'react';
import { ExpenseList } from './ExpenseList';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseSummary } from './ExpenseSummary';
import { useFinanceStore } from '../../../store/finance';
import { Plus, Search, Filter } from 'lucide-react';

export const Expenses = () => {
  const [showForm, setShowForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const { transactions } = useFinanceStore();

  const expenses = transactions.filter(t => t.type === 'expense');
  const categories = [...new Set(expenses.map(e => e.category))];

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-lg relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExpenseSummary expenses={filteredExpenses} />
      </div>

      <ExpenseList expenses={filteredExpenses} />

      {showForm && (
        <ExpenseForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
};