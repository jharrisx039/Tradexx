import { create } from 'zustand';

export interface Tracking {
  id: string;
  contact: string;
  invNo: string;
  attachment?: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  volumetricWeight: number;
  cubicFeet: number;
  weight: number;
  total: number;
  type: string;
  warehouse: string;
  date: string;
  createdTime: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  procurement: string;
  eventStatus: string;
  notified: boolean;
  comments: string;
}

export interface CustomView {
  id: string;
  name: string;
  columns: string[];
  filters?: Record<string, any>;
  sortBy?: { field: string; direction: 'asc' | 'desc' };
}

interface WarehouseStore {
  trackings: Tracking[];
  columnOrder: string[];
  hiddenColumns: string[];
  customViews: CustomView[];
  activeViewId: string | null;
  
  addTracking: (tracking: Omit<Tracking, 'id' | 'createdTime'>) => void;
  updateTracking: (id: string, updates: Partial<Tracking>) => void;
  deleteTracking: (id: string) => void;
  bulkUpdate: (ids: string[], updates: Partial<Tracking>) => void;
  reorderColumns: (newOrder: string[]) => void;
  toggleColumn: (columnId: string) => void;
  addCustomView: (view: Omit<CustomView, 'id'>) => void;
  updateCustomView: (id: string, updates: Partial<CustomView>) => void;
  deleteCustomView: (id: string) => void;
  setActiveView: (id: string | null) => void;
  showAllColumns: () => void;
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  trackings: [],
  columnOrder: [
    'contact',
    'invNo',
    'attachment',
    'dimensions',
    'volumetricWeight',
    'cubicFeet',
    'weight',
    'total',
    'type',
    'warehouse',
    'date',
    'createdTime',
    'status',
    'procurement',
    'eventStatus',
    'notified',
    'comments',
  ],
  hiddenColumns: [],
  customViews: [],
  activeViewId: null,

  addTracking: (tracking) =>
    set((state) => ({
      trackings: [
        ...state.trackings,
        {
          ...tracking,
          id: crypto.randomUUID(),
          createdTime: new Date().toISOString(),
        },
      ],
    })),

  updateTracking: (id, updates) =>
    set((state) => ({
      trackings: state.trackings.map((tracking) =>
        tracking.id === id ? { ...tracking, ...updates } : tracking
      ),
    })),

  deleteTracking: (id) =>
    set((state) => ({
      trackings: state.trackings.filter((tracking) => tracking.id !== id),
    })),

  bulkUpdate: (ids, updates) =>
    set((state) => ({
      trackings: state.trackings.map((tracking) =>
        ids.includes(tracking.id) ? { ...tracking, ...updates } : tracking
      ),
    })),

  reorderColumns: (newOrder) =>
    set({ columnOrder: newOrder }),

  toggleColumn: (columnId) =>
    set((state) => ({
      hiddenColumns: state.hiddenColumns.includes(columnId)
        ? state.hiddenColumns.filter((id) => id !== columnId)
        : [...state.hiddenColumns, columnId],
    })),

  addCustomView: (view) =>
    set((state) => ({
      customViews: [
        ...state.customViews,
        { ...view, id: crypto.randomUUID() },
      ],
    })),

  updateCustomView: (id, updates) =>
    set((state) => ({
      customViews: state.customViews.map((view) =>
        view.id === id ? { ...view, ...updates } : view
      ),
    })),

  deleteCustomView: (id) =>
    set((state) => ({
      customViews: state.customViews.filter((view) => view.id !== id),
      activeViewId: state.activeViewId === id ? null : state.activeViewId,
    })),

  setActiveView: (id) =>
    set((state) => {
      const view = state.customViews.find((v) => v.id === id);
      return {
        activeViewId: id,
        hiddenColumns: view ? state.columnOrder.filter((col) => !view.columns.includes(col)) : state.hiddenColumns,
      };
    }),

  showAllColumns: () =>
    set({ hiddenColumns: [] }),
}));