import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useFinanceStore } from '../../../store/finance';
import clsx from 'clsx';

interface InvoiceFormProps {
  onClose: () => void;
  customers: any[];
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose, customers }) => {
  const { createInvoice } = useFinanceStore();
  const [formData, setFormData] = React.useState({
    customerId: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [{ id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }],
    notes: '',
    terms: '',
  });

  const calculateSubtotal = () => {
    return formData.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax rate
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInvoice({
      ...formData,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      status: 'draft',
      items: formData.items.map(item => ({
        ...item,
        amount: item.quantity * item.rate,
      })),
    });
    onClose();
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 },
      ],
    }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">New Invoice</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-8rem)]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer
              </label>
              <select
                required
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">Items</h4>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="relative px-3 py-2">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formData.items.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        required
                        value={item.description}
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                        placeholder="Item description"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        required
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                        className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value))}
                        className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-3 py-2 text-sm text-gray-900">
                      ${(item.quantity * item.rate).toFixed(2)}
                    </td>
                    <td className="px-3 py-2">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Additional notes..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Terms & Conditions
              </label>
              <textarea
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Terms and conditions..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 border-t pt-4">
            <div className="text-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-500">Subtotal:</span>
                <span className="text-gray-900">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-medium text-gray-500">Tax (10%):</span>
                <span className="text-gray-900">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2 text-lg font-medium">
                <span className="text-gray-900">Total:</span>
                <span className="text-gray-900">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};