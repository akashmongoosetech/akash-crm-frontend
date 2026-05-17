import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/accounts")({
  head: () => ({ meta: [{ title: "Accounts — Pulse CRM" }] }),
  component: AccountsLayout,
});

function AccountsLayout() {
  return <Outlet />;
}
