import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/crm/Sidebar";
import { Topbar } from "@/components/crm/Topbar";
import { ProtectedRoute } from "@/modules/auth/components";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <main className="flex-1 p-6 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
