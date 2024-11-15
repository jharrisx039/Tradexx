import { create } from 'zustand';
import { PermissionLevel, UserPermissions, DEFAULT_PERMISSIONS } from '../types/permissions';

interface User {
  id: string;
  name: string;
  email: string;
  level: PermissionLevel;
  permissions: UserPermissions;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isDevelopment: boolean;
  login: (user: Omit<User, 'permissions'>) => void;
  logout: () => void;
  hasPermission: (module: keyof UserPermissions['modules'], action: keyof Permission) => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isDevelopment: process.env.NODE_ENV === 'development',

  login: (userData) => {
    const permissions: UserPermissions = {
      level: userData.level,
      modules: DEFAULT_PERMISSIONS[userData.level],
    };

    set({
      user: { ...userData, permissions },
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  hasPermission: (module, action) => {
    const { user, isDevelopment } = get();

    // In development, allow all actions
    if (isDevelopment) {
      return true;
    }

    // If not authenticated, deny access
    if (!user) {
      return false;
    }

    // Admin always has full access in production
    if (user.level === 'Admin') {
      return true;
    }

    // Check specific permission
    return user.permissions.modules[module][action];
  },
}));