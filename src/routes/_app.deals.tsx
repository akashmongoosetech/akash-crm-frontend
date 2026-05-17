import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/deals")({
  head: () => ({ meta: [{ title: "Deals — Pulse CRM" }] }),
  component: DealsLayout,
});

function DealsLayout() {
  return <Outlet />;
}
