export type Permission = 'view' | 'create' | 'edit' | 'delete';

export type ModulePermissions = {
  [key in Permission]?: boolean;
};

export type Module =
  | 'dashboard'
  | 'events'
  | 'tasks'
  | 'contacts'
  | 'tickets'
  | 'documents'
  | 'chat'
  | 'hr'
  | 'finance'
  | 'marketing'
  | 'services'
  | 'settings';

export type RoleType = 
  | 'A1' 
  | 'A2' 
  | 'A3' 
  | 'Supervisor' 
  | 'Manager' 
  | 'Director' 
  | 'Admin' 
  | 'Custom';

export interface Role {
  id: string;
  name: RoleType;
  description: string;
  permissions: {
    [key in Module]?: ModulePermissions;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  customPermissions?: {
    [key in Module]?: ModulePermissions;
  };
}