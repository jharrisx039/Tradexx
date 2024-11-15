import { create } from 'zustand';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface Customer extends Contact {
  status: 'active' | 'inactive';
}

interface Vendor extends Contact {
  category: string;
}

interface ContactStore {
  customers: Customer[];
  vendors: Vendor[];
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteCustomer: (id: string) => void;
  deleteVendor: (id: string) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  customers: [],
  vendors: [],
  addCustomer: (customer) =>
    set((state) => ({
      customers: [
        ...state.customers,
        { ...customer, id: crypto.randomUUID() },
      ],
    })),
  addVendor: (vendor) =>
    set((state) => ({
      vendors: [
        ...state.vendors,
        { ...vendor, id: crypto.randomUUID() },
      ],
    })),
  updateCustomer: (id, customer) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, ...customer } : c
      ),
    })),
  updateVendor: (id, vendor) =>
    set((state) => ({
      vendors: state.vendors.map((v) =>
        v.id === id ? { ...v, ...vendor } : v
      ),
    })),
  deleteCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id),
    })),
  deleteVendor: (id) =>
    set((state) => ({
      vendors: state.vendors.filter((v) => v.id !== id),
    })),
}));