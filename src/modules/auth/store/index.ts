import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserRole } from "../types";
import { ROLE_PERMISSIONS } from "../types";
import { api } from "@/lib/api";

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (identifier: string, password: string) => Promise<void>;
  register: (
    userData: Partial<User> & { password: string; confirmPassword?: string },
  ) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  clearError: () => void;
  setUser: (user: User) => void;
  hasPermission: (permission: keyof (typeof ROLE_PERMISSIONS)["super_admin"]) => boolean;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
  fetchCurrentUser: () => Promise<void>;
  initialize: () => Promise<void>;
  updateProfile: (
    data: Partial<User> & { password?: string; newPassword?: string },
  ) => Promise<void>;
}

const mapBackendUserToFrontend = (backendUser: any): User => ({
  id: backendUser._id || backendUser.id,
  email: backendUser.email,
  firstName: backendUser.firstName,
  lastName: backendUser.lastName,
  phone: backendUser.mobile,
  address: backendUser.address,
  designation: backendUser.designation,
  avatar: backendUser.profilePic,
  role: backendUser.role,
  createdAt: backendUser.createdAt,
  updatedAt: backendUser.updatedAt,
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (identifier: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<{ user: any; token: string }>("/auth/login", {
            identifier,
            password,
          });

          if (response.success && response.data) {
            set({
              user: mapBackendUserToFrontend(response.data.user),
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || "Login failed");
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Invalid email/mobile or password",
          });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<{ user: any; token: string }>("/auth/register", {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            mobile: userData.phone,
            countryCode: userData.countryCode || "+91",
            address: userData.address,
            designation: userData.designation,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
          });

          if (response.success && response.data) {
            set({
              user: mapBackendUserToFrontend(response.data.user),
              token: response.data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error(response.message || "Registration failed");
          }
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Registration failed. Please try again.",
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch {
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      fetchCurrentUser: async () => {
        try {
          const response = await api.get<{ user: any }>("/auth/me");
          if (response.success && response.data) {
            set({ user: mapBackendUserToFrontend(response.data.user) });
          }
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      },

      initialize: async () => {
        const { token, isAuthenticated } = get();
        if (token && isAuthenticated) {
          await get().fetchCurrentUser();
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          set({ isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to process request. Please try again.",
          });
          throw error;
        }
      },

      resetPassword: async (token: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          set({ isLoading: false });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || "Failed to reset password. Please try again.",
          });
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setUser: (user: User) => {
        set({ user });
      },

      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.put<{ user: any }>("/auth/profile", {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobile: data.phone,
            address: data.address,
            designation: data.designation,
            profilePic: data.avatar,
            ...(data.newPassword && {
              currentPassword: data.password,
              newPassword: data.newPassword,
            }),
          });
          if (response.success && response.data) {
            set({ user: mapBackendUserToFrontend(response.data.user), isLoading: false });
          } else {
            throw new Error(response.message || "Update failed");
          }
        } catch (error: any) {
          set({ isLoading: false, error: error.message || "Failed to update profile" });
          throw error;
        }
      },

      hasPermission: (permission) => {
        const { user } = get();
        if (!user) return false;
        return ROLE_PERMISSIONS[user.role][permission];
      },

      hasRole: (roles) => {
        const { user } = get();
        if (!user) return false;
        const roleArray = Array.isArray(roles) ? roles : [roles];
        return roleArray.includes(user.role);
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
