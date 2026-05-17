import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type DealFormData } from "@/lib/crm-service";
import { DealForm } from "@/components/deals/DealForm";

export const Route = createFileRoute("/_app/deals/edit/$id")({
  head: () => ({ meta: [{ title: "Edit Deal — Pulse CRM" }] }),
  component: EditDealPage,
});

function EditDealPage() {
  const { id } = Route.useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crmService.getDealById(id).then((deal) => {
      if (deal) {
        setInitialData({
          name: deal.name,
          account: deal.account,
          amount: deal.amount,
          stage: deal.stage,
          closeDate: deal.closeDate.split("T")[0],
          probability: deal.probability,
          owner: deal.owner,
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Edit Deal</h1>
      </div>
      <DealForm mode="edit" dealId={id} initialData={initialData} />
    </div>
  );
}
