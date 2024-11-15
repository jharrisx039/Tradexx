import React from 'react';
import { useAuthStore } from '../store/auth';
import type { UserPermissions, Permission } from '../types/permissions';

interface PermissionGuardProps {
  module: keyof UserPermissions['modules'];
  action: keyof Permission;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  module,
  action,
  fallback = null,
  children,
}) => {
  const hasPermission = useAuthStore(state => state.hasPermission(module, action));

  if (!hasPermission) {
    return fallback;
  }

  return <>{children}</>;
};