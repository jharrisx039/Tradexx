export type PermissionLevel = 'A1' | 'A2' | 'A3' | 'Supervisor' | 'Manager' | 'Director' | 'Admin';

export interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface ModulePermissions {
  dashboard: Permission;
  tasks: Permission;
  contacts: Permission;
  tickets: Permission;
  documents: Permission;
  chat: Permission;
  hr: Permission;
  finance: Permission;
  marketing: Permission;
  services: Permission;
  settings: Permission;
}

export interface UserPermissions {
  level: PermissionLevel;
  modules: ModulePermissions;
}

export const DEFAULT_PERMISSIONS: Record<PermissionLevel, ModulePermissions> = {
  A1: {
    dashboard: { view: true, create: false, edit: false, delete: false },
    tasks: { view: true, create: true, edit: true, delete: false },
    contacts: { view: true, create: false, edit: false, delete: false },
    tickets: { view: true, create: true, edit: true, delete: false },
    documents: { view: true, create: false, edit: false, delete: false },
    chat: { view: true, create: true, edit: false, delete: false },
    hr: { view: false, create: false, edit: false, delete: false },
    finance: { view: false, create: false, edit: false, delete: false },
    marketing: { view: false, create: false, edit: false, delete: false },
    services: { view: true, create: true, edit: true, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  A2: {
    dashboard: { view: true, create: true, edit: false, delete: false },
    tasks: { view: true, create: true, edit: true, delete: true },
    contacts: { view: true, create: true, edit: true, delete: false },
    tickets: { view: true, create: true, edit: true, delete: true },
    documents: { view: true, create: true, edit: true, delete: false },
    chat: { view: true, create: true, edit: true, delete: false },
    hr: { view: true, create: false, edit: false, delete: false },
    finance: { view: true, create: false, edit: false, delete: false },
    marketing: { view: true, create: false, edit: false, delete: false },
    services: { view: true, create: true, edit: true, delete: true },
    settings: { view: false, create: false, edit: false, delete: false },
  },
  A3: {
    dashboard: { view: true, create: true, edit: true, delete: false },
    tasks: { view: true, create: true, edit: true, delete: true },
    contacts: { view: true, create: true, edit: true, delete: true },
    tickets: { view: true, create: true, edit: true, delete: true },
    documents: { view: true, create: true, edit: true, delete: true },
    chat: { view: true, create: true, edit: true, delete: true },
    hr: { view: true, create: true, edit: false, delete: false },
    finance: { view: true, create: true, edit: false, delete: false },
    marketing: { view: true, create: true, edit: false, delete: false },
    services: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: false, edit: false, delete: false },
  },
  Supervisor: {
    dashboard: { view: true, create: true, edit: true, delete: true },
    tasks: { view: true, create: true, edit: true, delete: true },
    contacts: { view: true, create: true, edit: true, delete: true },
    tickets: { view: true, create: true, edit: true, delete: true },
    documents: { view: true, create: true, edit: true, delete: true },
    chat: { view: true, create: true, edit: true, delete: true },
    hr: { view: true, create: true, edit: true, delete: false },
    finance: { view: true, create: true, edit: true, delete: false },
    marketing: { view: true, create: true, edit: true, delete: false },
    services: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: true, edit: false, delete: false },
  },
  Manager: {
    dashboard: { view: true, create: true, edit: true, delete: true },
    tasks: { view: true, create: true, edit: true, delete: true },
    contacts: { view: true, create: true, edit: true, delete: true },
    tickets: { view: true, create: true, edit: true, delete: true },
    documents: { view: true, create: true, edit: true, delete: true },
    chat: { view: true, create: true, edit: true, delete: true },
    hr: { view: true, create: true, edit: true, delete: true },
    finance: { view: true, create: true, edit: true, delete: true },
    marketing: { view: true, create: true, edit: true, delete: true },
    services: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: true, edit: true, delete: false },
  },
  Director: {
    dashboard: { view: true, create: true, edit: true, delete: true },
    tasks: { view: true, create: true, edit: true, delete: true },
    contacts: { view: true, create: true, edit: true, delete: true },
    tickets: { view: true, create: true, edit: true, delete: true },
    documents: { view: true, create: true, edit: true, delete: true },
    chat: { view: true, create: true, edit: true, delete: true },
    hr: { view: true, create: true, edit: true, delete: true },
    finance: { view: true, create: true, edit: true, delete: true },
    marketing: { view: true, create: true, edit: true, delete: true },
    services: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: true, edit: true, delete: true },
  },
  Admin: {
    dashboard: { view: true, create: true, edit: true, delete: true },
    tasks: { view: true, create: true, edit: true, delete: true },
    contacts: { view: true, create: true, edit: true, delete: true },
    tickets: { view: true, create: true, edit: true, delete: true },
    documents: { view: true, create: true, edit: true, delete: true },
    chat: { view: true, create: true, edit: true, delete: true },
    hr: { view: true, create: true, edit: true, delete: true },
    finance: { view: true, create: true, edit: true, delete: true },
    marketing: { view: true, create: true, edit: true, delete: true },
    services: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: true, edit: true, delete: true },
  },
};