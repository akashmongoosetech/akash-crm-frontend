import { createFileRoute } from "@tanstack/react-router";
import { DealForm } from "@/components/deals/DealForm";

export const Route = createFileRoute("/_app/deals/create")({
  head: () => ({ meta: [{ title: "Create Deal — Pulse CRM" }] }),
  component: CreateDealPage,
});

function CreateDealPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create New Deal</h1>
        <p className="text-muted-foreground mt-1">Add a new opportunity to your pipeline</p>
      </div>
      <DealForm mode="create" />
    </div>
  );
}
