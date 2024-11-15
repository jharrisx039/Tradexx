import { create } from 'zustand';
import { useContactStore } from './contacts';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  accountId: string;
  customerId?: string;
  status: 'pending' | 'cleared' | 'reconciled';
  reference?: string;
  attachments?: string[];
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  date: string;
  dueDate: string;
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  notes?: string;
  terms?: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'cash';
  balance: number;
  currency: string;
  institution?: string;
  lastSync?: string;
}

interface FinanceStore {
  transactions: Transaction[];
  invoices: Invoice[];
  accounts: Account[];
  
  // Transaction methods
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  // Invoice methods
  createInvoice: (invoice: Omit<Invoice, 'id' | 'number'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  markInvoiceAsPaid: (id: string) => void;
  
  // Account methods
  addAccount: (account: Omit<Account, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<Account>) => void;
  deleteAccount: (id: string) => void;
  syncAccount: (id: string) => Promise<void>;
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  transactions: [],
  invoices: [],
  accounts: [],
  
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...transaction, id: crypto.randomUUID() },
      ],
    })),

  updateTransaction: (id, updates) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === id
          ? { ...transaction, ...updates }
          : transaction
      ),
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter(
        (transaction) => transaction.id !== id
      ),
    })),

  createInvoice: (invoice) => {
    const lastInvoice = get().invoices[get().invoices.length - 1];
    const nextNumber = lastInvoice
      ? String(Number(lastInvoice.number) + 1).padStart(6, '0')
      : '000001';

    set((state) => ({
      invoices: [
        ...state.invoices,
        {
          ...invoice,
          id: crypto.randomUUID(),
          number: nextNumber,
        },
      ],
    }));
  },

  updateInvoice: (id, updates) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, ...updates } : invoice
      ),
    })),

  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),

  markInvoiceAsPaid: (id) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id
          ? {
              ...invoice,
              status: 'paid',
            }
          : invoice
      ),
    })),

  addAccount: (account) =>
    set((state) => ({
      accounts: [
        ...state.accounts,
        { ...account, id: crypto.randomUUID() },
      ],
    })),

  updateAccount: (id, updates) =>
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id ? { ...account, ...updates } : account
      ),
    })),

  deleteAccount: (id) =>
    set((state) => ({
      accounts: state.accounts.filter((account) => account.id !== id),
    })),

  syncAccount: async (id) => {
    // In a real app, this would connect to banking APIs
    set((state) => ({
      accounts: state.accounts.map((account) =>
        account.id === id
          ? {
              ...account,
              lastSync: new Date().toISOString(),
            }
          : account
      ),
    }));
  },
}));