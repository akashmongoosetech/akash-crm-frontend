import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Account } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { DeleteAccountModal } from "@/components/accounts/DeleteAccountModal";

export const Route = createFileRoute("/_app/accounts/$id")({
  head: () => ({ meta: [{ title: "Account Details — Pulse CRM" }] }),
  component: AccountDetailsPage,
});

function AccountDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    crmService.getAccountById(id).then((data) => {
      setAccount(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!account) return <div className="p-8">Account not found</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/accounts" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{account.name}</h1>
          <p className="text-muted-foreground">{account.industry}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate({ to: "/accounts/edit/$id", params: { id } })}>
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
            <h3 className="font-semibold mb-4">Account Overview</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div><span className="text-muted-foreground">Industry</span><div className="font-medium">{account.industry}</div></div>
              <div><span className="text-muted-foreground">Owner</span><div className="font-medium">{account.owner}</div></div>
              <div><span className="text-muted-foreground">Employees</span><div className="font-medium">{account.employees.toLocaleString()}</div></div>
              <div><span className="text-muted-foreground">Revenue</span><div className="font-medium">${(account.revenue / 1_000_000).toFixed(1)}M</div></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="text-sm space-y-1">
              <div>{account.phone}</div>
              <div>{account.website}</div>
            </div>
          </div>
        </div>
      </div>

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await crmService.deleteAccount(id);
          navigate({ to: "/accounts" });
        }}
        accountName={account.name}
      />
    </div>
  );
}
