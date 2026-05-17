import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../store";
import { Loader2 } from "lucide-react";

interface GuestRouteProps {
  children: React.ReactNode;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isLoading) return;

    if (isAuthenticated) {
      navigate({ to: "/", replace: true });
    }
  }, [isAuthenticated, isLoading, isClient, navigate]);

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

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
