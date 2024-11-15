import React from 'react';
import { format } from 'date-fns';
import { DollarSign, Clock, CheckCircle, AlertTriangle, Download, Send } from 'lucide-react';
import { Invoice } from '../../../store/finance';
import clsx from 'clsx';

interface InvoiceListProps {
  invoices: Invoice[];
  customers: any[];
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
};

export const InvoiceList: React.FC<InvoiceListProps> = ({ invoices, customers }) => {
  const getCustomer = (customerId: string) => {
    return customers.find(c => c.id === customerId);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => {
              const customer = getCustomer(invoice.customerId);
              const isOverdue = invoice.status === 'overdue';
              
              return (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{invoice.number}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(invoice.date), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {customer?.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer?.company}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm font-medium text-gray-900">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                      {invoice.total.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      statusColors[invoice.status]
                    )}>
                      {invoice.status === 'overdue' && (
                        <AlertTriangle className="h-4 w-4 mr-1" />
                      )}
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={clsx(
                      'text-sm',
                      isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
                    )}>
                      {format(new Date(invoice.dueDate), 'MMM d, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {invoice.status === 'draft' && (
                        <button className="text-blue-600 hover:text-blue-700">
                          <Send className="h-5 w-5" />
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-500">
                        <Download className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};