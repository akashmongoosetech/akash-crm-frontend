import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService } from "@/lib/crm-service";
import { AccountForm } from "@/components/accounts/AccountForm";

export const Route = createFileRoute("/_app/accounts/edit/$id")({
  head: () => ({ meta: [{ title: "Edit Account — Pulse CRM" }] }),
  component: EditAccountPage,
});

function EditAccountPage() {
  const { id } = Route.useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crmService.getAccountById(id).then((account) => {
      if (account) {
        setInitialData({
          name: account.name,
          industry: account.industry,
          employees: account.employees,
          revenue: account.revenue,
          phone: account.phone,
          website: account.website,
          owner: account.owner,
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Edit Account</h1>
      </div>
      <AccountForm mode="edit" accountId={id} initialData={initialData} />
    </div>
  );
}
