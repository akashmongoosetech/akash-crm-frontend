import { useEffect, useState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuthStore } from "../store";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isAuthRoute = routerState.location.pathname.startsWith("/auth");

  useEffect(() => {
    if (!isClient || isLoading) return;

    if (!isAuthenticated && !isAuthRoute) {
      navigate({
        to: "/auth/login",
        search: { redirect: routerState.location.pathname },
        replace: true,
      });
    }

    if (isAuthenticated && isAuthRoute) {
      navigate({ to: "/", replace: true });
    }
  }, [isAuthenticated, isLoading, isClient, isAuthRoute, navigate, routerState.location.pathname]);

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

  if (!isAuthenticated && !isAuthRoute) {
    return null;
  }

  if (isAuthenticated && isAuthRoute) {
    return null;
  }

  return <>{children}</>;
}
