import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Deal } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/crm/cells";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { DeleteDealModal } from "@/components/deals/DeleteDealModal";

export const Route = createFileRoute("/_app/deals/$id")({
  head: () => ({ meta: [{ title: "Deal Details — Pulse CRM" }] }),
  component: DealDetailsPage,
});

function DealDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    crmService.getDealById(id).then((data) => {
      setDeal(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!deal) return <div className="p-8">Deal not found</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/deals" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{deal.name}</h1>
          <p className="text-muted-foreground">{deal.account}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <StatusBadge value={deal.stage as string} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/deals/edit/$id", params: { id } })}
          >
            <Edit className="size-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setShowDeleteModal(true)}>
            <Trash2 className="size-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Deal Overview</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Value</span>
                <div className="font-medium text-xl">${deal.amount.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Probability</span>
                <div className="font-medium">{deal.probability}%</div>
              </div>
              <div>
                <span className="text-muted-foreground">Close Date</span>
                <div>{new Date(deal.closeDate).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Owner</span>
                <div>{deal.owner}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Pipeline Progress</h3>
            <div className="text-sm text-muted-foreground">
              Current Stage: <span className="font-medium text-foreground">{deal.stage}</span>
            </div>
          </div>
        </div>
      </div>

      <DeleteDealModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await crmService.deleteDeal(id);
          navigate({ to: "/deals" });
        }}
        dealName={deal.name}
      />
    </div>
  );
}
