import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store";
import { Loader2, Lock } from "lucide-react";
import type { UserRole } from "../types";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export function RoleProtectedRoute({
  children,
  allowedRoles,
  fallbackPath = "/",
}: RoleProtectedRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading, hasRole } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isLoading) return;

    if (!isAuthenticated) {
      navigate({ to: "/auth/login", replace: true });
      return;
    }

    if (isAuthenticated && user && !hasRole(allowedRoles)) {
      navigate({ to: fallbackPath, replace: true });
    }
  }, [isAuthenticated, isLoading, isClient, hasRole, allowedRoles, fallbackPath, navigate, user]);

  if (isLoading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (user && !hasRole(allowedRoles))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mb-4">
            <Lock className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-sm text-muted-foreground mb-6">
            You don't have permission to access this page. Please contact your administrator if you
            believe this is an error.
          </p>
          <button
            onClick={() => navigate({ to: fallbackPath })}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
