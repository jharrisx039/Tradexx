import { create } from 'zustand';
import { Role, User, Module, Permission } from '../types/rbac';

interface AuthStore {
  currentUser: User | null;
  roles: Role[];
  setCurrentUser: (user: User | null) => void;
  hasPermission: (module: Module, permission: Permission) => boolean;
  updateRolePermissions: (roleId: string, module: Module, permissions: Record<Permission, boolean>) => void;
  updateUserCustomPermissions: (userId: string, module: Module, permissions: Record<Permission, boolean>) => void;
}

// Default admin permissions for all modules
const fullPermissions = {
  view: true,
  create: true,
  edit: true,
  delete: true,
};

// Create full permissions object for all modules
const createFullModulePermissions = () => {
  const modules: Module[] = [
    'dashboard',
    'events',
    'tasks',
    'contacts',
    'tickets',
    'documents',
    'chat',
    'hr',
    'finance',
    'marketing',
    'services',
    'settings'
  ];

  return modules.reduce((acc, module) => ({
    ...acc,
    [module]: { ...fullPermissions }
  }), {});
};

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full System Access',
    permissions: createFullModulePermissions(),
  }
];

// Create a default admin user
const defaultUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@example.com',
  roleId: '1',
  customPermissions: createFullModulePermissions(),
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  currentUser: defaultUser,
  roles: defaultRoles,

  setCurrentUser: (user) => set({ currentUser: user }),

  hasPermission: (module, permission) => {
    const { currentUser, roles } = get();
    if (!currentUser) return false;

    // Check custom permissions first
    if (currentUser.customPermissions?.[module]?.[permission]) {
      return true;
    }

    // Then check role permissions
    const role = roles.find((r) => r.id === currentUser.roleId);
    return !!role?.permissions[module]?.[permission];
  },

  updateRolePermissions: (roleId, module, permissions) => {
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === roleId
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [module]: permissions,
              },
            }
          : role
      ),
    }));
  },

  updateUserCustomPermissions: (userId, module, permissions) => {
    set((state) => ({
      currentUser:
        state.currentUser?.id === userId
          ? {
              ...state.currentUser,
              customPermissions: {
                ...state.currentUser.customPermissions,
                [module]: permissions,
              },
            }
          : state.currentUser,
    }));
  },
}));