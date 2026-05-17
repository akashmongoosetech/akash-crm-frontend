import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";

import { useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/crm/DataTable";
import { StatusBadge, OwnerCell } from "@/components/crm/cells";
import { crmService, type Lead } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Plus, Mail, Phone, Pencil, Eye, Trash2 } from "lucide-react";
import { DeleteLeadModal } from "@/components/leads/DeleteLeadModal";

export const Route = createFileRoute("/_app/leads")({
  head: () => ({ meta: [{ title: "Leads — Pulse CRM" }] }),
  component: LeadsLayout,
});

function LeadsLayout() {
  return <Outlet />;
}

export function LeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  const loadLeads = () => {
    crmService.getLeads().then((data) => {
      setLeads(data);
    });
  };

  useEffect(() => {
    loadLeads();
    setLoading(false);
  }, []);

  const cols: Column<Lead>[] = [
    {
      key: "name",
      header: "Name",
      render: (r) => (
        <div>
          <div className="font-medium">{r.name}</div>
          <div className="text-xs text-muted-foreground">{r.company}</div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (r) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="size-3.5" /> <span className="text-foreground">{r.email}</span>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (r) => (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="size-3.5" /> {r.phone}
        </div>
      ),
    },
    { key: "source", header: "Source" },
    { key: "status", header: "Status", render: (r) => <StatusBadge value={r.status} /> },
    {
      key: "value",
      header: "Value",
      accessor: (r) => r.value,
      render: (r) => <span className="font-medium">₹{r.value.toLocaleString()}</span>,
    },
    { key: "owner", header: "Owner", render: (r) => <OwnerCell name={r.owner} /> },
    {
      key: "actions",
      header: "Actions",
      className: "w-[120px]",
      render: (r) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={() => navigate({ to: "/leads/$id", params: { id: r.id } })}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted"
            onClick={() => navigate({ to: "/leads/edit/$id", params: { id: r.id } })}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted text-destructive hover:text-destructive"
            onClick={() => {
              setLeadToDelete(r);
              setShowDeleteModal(true);
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-5 max-w-400">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage and qualify incoming leads.</p>
        </div>
        <Link to="/leads/create">
          <Button className="gap-1.5">
            <Plus className="size-4" /> New Lead
          </Button>
        </Link>
      </div>
      <DataTable data={leads} columns={cols} searchKeys={["name", "company", "email", "owner"]} />

      <DeleteLeadModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setLeadToDelete(null);
        }}
        onConfirm={async () => {
          if (leadToDelete) {
            await crmService.deleteLead(leadToDelete.id);
            loadLeads();
          }
        }}
        leadName={leadToDelete?.name || ""}
      />
    </div>
  );
}
