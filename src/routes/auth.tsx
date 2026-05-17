import { createFileRoute, Outlet } from "@tanstack/react-router";
import { GuestRoute } from "@/modules/auth/components";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <GuestRoute>
      <Outlet />
    </GuestRoute>
  );
}
