import { createFileRoute } from "@tanstack/react-router";
import { LeadFormPage } from "@/components/leads/LeadForm";

function CreateLeadPage() {
  return <LeadFormPage mode="create" leadId={null} />;
}

export const Route = createFileRoute("/_app/leads/create")({
  head: () => ({ meta: [{ title: "Create Lead — Pulse CRM" }] }),
  component: CreateLeadPage,
});
