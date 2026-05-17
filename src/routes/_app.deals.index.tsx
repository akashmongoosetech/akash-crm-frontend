import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Deal } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, LayoutGrid, List, Eye, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OwnerCell, StatusBadge } from "@/components/crm/cells";
import { DataTable, type Column } from "@/components/crm/DataTable";
import { cn } from "@/lib/utils";
import { DeleteDealModal } from "@/components/deals/DeleteDealModal";

export const Route = createFileRoute("/_app/deals/")({
  head: () => ({ meta: [{ title: "Deals — Pulse CRM" }] }),
  component: DealsPage,
});

const stages = [
  "Qualification",
  "Needs Analysis",
  "Proposal",
  "Negotiation",
  "Closed Won",
] as const;

function DealsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealToDelete, setDealToDelete] = useState<Deal | null>(null);

  const handleView = (id: string) => {
    navigate({ to: "/deals/$id", params: { id } });
  };

  const handleEdit = (id: string) => {
    navigate({ to: "/deals/edit/$id", params: { id } });
  };

  const handleDeleteClick = (deal: Deal) => {
    setDealToDelete(deal);
    setShowDeleteModal(true);
  };

  const loadDeals = () => {
    crmService.getDeals().then((data) => {
      setDeals(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadDeals();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const cols: Column<Deal>[] = [
    { key: "name", header: "Deal" },
    { key: "account", header: "Account" },
    {
      key: "amount",
      header: "Amount",
      accessor: (r) => r.amount,
      render: (r) => `$${r.amount.toLocaleString()}`,
    },
    { key: "stage", header: "Stage", render: (r) => <StatusBadge value={r.stage} /> },
    { key: "probability", header: "Probability", render: (r) => `${r.probability}%` },
    {
      key: "closeDate",
      header: "Close date",
      render: (r) => new Date(r.closeDate).toLocaleDateString(),
    },
    { key: "owner", header: "Owner", render: (r) => <OwnerCell name={r.owner} /> },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigate({ to: "/deals/$id", params: { id: r.id } })}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigate({ to: "/deals/edit/$id", params: { id: r.id } })}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive"
            onClick={() => {
              setDealToDelete(r);
              setShowDeleteModal(true);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Deals</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Active opportunities in your pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-border p-0.5 bg-muted/50">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "px-2.5 py-1.5 rounded text-xs flex items-center gap-1.5",
                view === "kanban" ? "bg-background shadow-sm" : "text-muted-foreground",
              )}
            >
              <LayoutGrid className="size-3.5" /> Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-2.5 py-1.5 rounded text-xs flex items-center gap-1.5",
                view === "list" ? "bg-background shadow-sm" : "text-muted-foreground",
              )}
            >
              <List className="size-3.5" /> List
            </button>
          </div>
          <Button className="gap-1.5" onClick={() => navigate({ to: "/deals/create" })}>
            <Plus className="size-4" /> New Deal
          </Button>
        </div>
      </div>

      {view === "list" ? (
        <DataTable data={deals} columns={cols} searchKeys={["name", "account", "owner"]} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {stages.map((stage) => {
            const items = deals.filter((d) => d.stage === stage);
            const total = items.reduce((s, d) => s + d.amount, 0);
            return (
              <div
                key={stage}
                className="rounded-lg border border-border bg-muted/30 flex flex-col min-h-[400px]"
              >
                <div className="px-3 py-2.5 border-b border-border flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide">{stage}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {items.length} · ${total.toLocaleString()}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-7"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView("");
                        }}
                      >
                        <Eye className="size-4 mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit("");
                        }}
                      >
                        <Pencil className="size-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick({} as Deal);
                        }}
                      >
                        <Trash2 className="size-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex-1 p-2 space-y-2 overflow-y-auto scrollbar-thin">
                  {items.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => navigate({ to: "/deals/$id", params: { id: d.id } })}
                      className="rounded-md bg-card border border-border p-3 hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className="text-sm font-medium leading-tight">{d.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{d.account}</div>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="text-sm font-semibold">${d.amount.toLocaleString()}</span>
                        <span className="text-[11px] text-muted-foreground">{d.probability}%</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
                        <OwnerCell name={d.owner} />
                        <span className="text-[11px] text-muted-foreground">
                          {new Date(d.closeDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <DeleteDealModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          if (dealToDelete) {
            await crmService.deleteDeal(dealToDelete.id);
            loadDeals();
          }
        }}
        dealName={dealToDelete?.name || ""}
      />
    </div>
  );
}
