import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contacts/ContactForm";

export const Route = createFileRoute("/_app/contacts/create")({
  head: () => ({ meta: [{ title: "Create Contact — Pulse CRM" }] }),
  component: CreateContactPage,
});

function CreateContactPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create New Contact</h1>
        <p className="text-muted-foreground mt-1">Add a new contact to your CRM</p>
      </div>
      <ContactForm mode="create" />
    </div>
  );
}
