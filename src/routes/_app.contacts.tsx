import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/contacts")({
  head: () => ({ meta: [{ title: "Contacts — Pulse CRM" }] }),
  component: ContactsLayout,
});

function ContactsLayout() {
  return <Outlet />;
}
