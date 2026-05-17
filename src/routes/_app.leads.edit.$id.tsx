import { createFileRoute } from "@tanstack/react-router";
import { LeadFormPage } from "@/components/leads/LeadForm";

function EditLeadPage() {
  const { id } = Route.useParams();
  return <LeadFormPage mode="edit" leadId={id} />;
}

export const Route = createFileRoute("/_app/leads/edit/$id")({
  head: () => ({ meta: [{ title: "Edit Lead — Pulse CRM" }] }),
  component: EditLeadPage,
});
