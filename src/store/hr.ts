import { create } from 'zustand';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'new' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  resume?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
  salary: number;
  status: 'active' | 'inactive';
  manager?: string;
  documents: Array<{
    id: string;
    type: string;
    name: string;
    url: string;
  }>;
  performance: Array<{
    id: string;
    period: string;
    rating: number;
    goals: string[];
    feedback: string;
  }>;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface PayrollEntry {
  id: string;
  employeeId: string;
  period: string;
  baseSalary: number;
  deductions: number;
  bonus: number;
  total: number;
  status: 'pending' | 'paid';
  paidAt?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'vacation' | 'sick' | 'personal' | 'other';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
}

interface HRStore {
  candidates: Candidate[];
  employees: Employee[];
  timeEntries: TimeEntry[];
  payrollEntries: PayrollEntry[];
  leaveRequests: LeaveRequest[];
  
  addCandidate: (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  addTimeEntry: (entry: Omit<TimeEntry, 'id'>) => void;
  updateTimeEntry: (id: string, updates: Partial<TimeEntry>) => void;
  addPayrollEntry: (entry: Omit<PayrollEntry, 'id'>) => void;
  updatePayrollEntry: (id: string, updates: Partial<PayrollEntry>) => void;
  addLeaveRequest: (request: Omit<LeaveRequest, 'id'>) => void;
  updateLeaveRequest: (id: string, updates: Partial<LeaveRequest>) => void;
}

export const useHRStore = create<HRStore>((set) => ({
  candidates: [],
  employees: [],
  timeEntries: [],
  payrollEntries: [],
  leaveRequests: [],

  addCandidate: (candidate) =>
    set((state) => ({
      candidates: [
        ...state.candidates,
        {
          ...candidate,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),

  updateCandidate: (id, updates) =>
    set((state) => ({
      candidates: state.candidates.map((candidate) =>
        candidate.id === id
          ? {
              ...candidate,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : candidate
      ),
    })),

  addEmployee: (employee) =>
    set((state) => ({
      employees: [
        ...state.employees,
        {
          ...employee,
          id: crypto.randomUUID(),
        },
      ],
    })),

  updateEmployee: (id, updates) =>
    set((state) => ({
      employees: state.employees.map((employee) =>
        employee.id === id
          ? {
              ...employee,
              ...updates,
            }
          : employee
      ),
    })),

  addTimeEntry: (entry) =>
    set((state) => ({
      timeEntries: [
        ...state.timeEntries,
        {
          ...entry,
          id: crypto.randomUUID(),
        },
      ],
    })),

  updateTimeEntry: (id, updates) =>
    set((state) => ({
      timeEntries: state.timeEntries.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...updates,
            }
          : entry
      ),
    })),

  addPayrollEntry: (entry) =>
    set((state) => ({
      payrollEntries: [
        ...state.payrollEntries,
        {
          ...entry,
          id: crypto.randomUUID(),
        },
      ],
    })),

  updatePayrollEntry: (id, updates) =>
    set((state) => ({
      payrollEntries: state.payrollEntries.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...updates,
            }
          : entry
      ),
    })),

  addLeaveRequest: (request) =>
    set((state) => ({
      leaveRequests: [
        ...state.leaveRequests,
        {
          ...request,
          id: crypto.randomUUID(),
        },
      ],
    })),

  updateLeaveRequest: (id, updates) =>
    set((state) => ({
      leaveRequests: state.leaveRequests.map((request) =>
        request.id === id
          ? {
              ...request,
              ...updates,
            }
          : request
      ),
    })),
}));