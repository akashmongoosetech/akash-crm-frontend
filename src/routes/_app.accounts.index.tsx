import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/crm/DataTable";
import { OwnerCell } from "@/components/crm/cells";
import { crmService, type Account } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Globe, Eye, Pencil, Trash2 } from "lucide-react";
import { DeleteAccountModal } from "@/components/accounts/DeleteAccountModal";

export const Route = createFileRoute("/_app/accounts/")({
  head: () => ({ meta: [{ title: "Accounts — Pulse CRM" }] }),
  component: AccountsPage,
});

function AccountsPage() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);

  const loadAccounts = () => {
    crmService.getAccounts().then((data) => {
      setAccounts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const cols: Column<Account>[] = [
    {
      key: "name",
      header: "Account",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <span className="size-9 rounded-md bg-muted text-muted-foreground grid place-items-center">
            <Building2 className="size-4" />
          </span>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Globe className="size-3" /> {r.website}
            </div>
          </div>
        </div>
      ),
    },
    { key: "industry", header: "Industry" },
    {
      key: "employees",
      header: "Employees",
      accessor: (r) => r.employees,
      render: (r) => r.employees.toLocaleString(),
    },
    {
      key: "revenue",
      header: "Revenue",
      accessor: (r) => r.revenue,
      render: (r) => `$${(r.revenue / 1_000_000).toFixed(1)}M`,
    },
    { key: "phone", header: "Phone" },
    { key: "owner", header: "Owner", render: (r) => <OwnerCell name={r.owner} /> },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate({ to: "/accounts/$id", params: { id: r.id } })}>
            <Eye className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate({ to: "/accounts/edit/$id", params: { id: r.id } })}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => {
            setAccountToDelete(r);
            setShowDeleteModal(true);
          }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Companies in your CRM.</p>
        </div>
        <Button className="gap-1.5" onClick={() => navigate({ to: "/accounts/create" })}>
          <Plus className="size-4" /> New Account
        </Button>
      </div>
      <DataTable data={accounts} columns={cols} searchKeys={["name", "industry", "website"]} />

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          if (accountToDelete) {
            await crmService.deleteAccount(accountToDelete.id);
            loadAccounts();
          }
        }}
        accountName={accountToDelete?.name || ""}
      />
    </div>
  );
}
