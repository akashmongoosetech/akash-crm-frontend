export type UserRole = "super_admin" | "admin" | "manager" | "user";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  designation?: string;
  avatar?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  designation: string;
  password: string;
  confirmPassword: string;
  avatar?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RolePermissions {
  canManageUsers: boolean;
  canManageRoles: boolean;
  canManageModules: boolean;
  canManageTeams: boolean;
  canManageLeads: boolean;
  canManageDeals: boolean;
  canManageTasks: boolean;
  canManageContacts: boolean;
  canManageAccounts: boolean;
  canViewAnalytics: boolean;
  canExportData: boolean;
  canManageSettings: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  super_admin: {
    canManageUsers: true,
    canManageRoles: true,
    canManageModules: true,
    canManageTeams: true,
    canManageLeads: true,
    canManageDeals: true,
    canManageTasks: true,
    canManageContacts: true,
    canManageAccounts: true,
    canViewAnalytics: true,
    canExportData: true,
    canManageSettings: true,
  },
  admin: {
    canManageUsers: true,
    canManageRoles: true,
    canManageModules: true,
    canManageTeams: true,
    canManageLeads: true,
    canManageDeals: true,
    canManageTasks: true,
    canManageContacts: true,
    canManageAccounts: true,
    canViewAnalytics: true,
    canExportData: true,
    canManageSettings: true,
  },
  manager: {
    canManageUsers: false,
    canManageRoles: false,
    canManageModules: false,
    canManageTeams: true,
    canManageLeads: true,
    canManageDeals: true,
    canManageTasks: true,
    canManageContacts: true,
    canManageAccounts: true,
    canViewAnalytics: true,
    canExportData: true,
    canManageSettings: false,
  },
  user: {
    canManageUsers: false,
    canManageRoles: false,
    canManageModules: false,
    canManageTeams: false,
    canManageLeads: false,
    canManageDeals: false,
    canManageTasks: true,
    canManageContacts: true,
    canManageAccounts: true,
    canViewAnalytics: false,
    canExportData: false,
    canManageSettings: false,
  },
};

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  user: "User",
};

export const ROLE_COLORS: Record<UserRole, string> = {
  super_admin: "bg-primary text-primary-foreground",
  admin: "bg-chart-2 text-white",
  manager: "bg-chart-3 text-white",
  user: "bg-muted text-muted-foreground",
};
