import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { DataTable, type Column } from "@/components/crm/DataTable";
import { OwnerCell } from "@/components/crm/cells";
import { crmService, type Contact } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { DeleteContactModal } from "@/components/contacts/DeleteContactModal";

export const Route = createFileRoute("/_app/contacts/")({
  head: () => ({ meta: [{ title: "Contacts — Pulse CRM" }] }),
  component: ContactsPage,
});

function ContactsPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);

  const loadContacts = () => {
    crmService.getContacts().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadContacts();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const cols: Column<Contact>[] = [
    {
      key: "name",
      header: "Name",
      render: (r) => (
        <div className="flex items-center gap-2.5">
          <span className="size-8 rounded-full bg-linear-to-br from-[oklch(0.62_0.17_240)]/80 to-[oklch(0.62_0.17_240)] text-white text-xs font-semibold grid place-items-center">
            {r.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-muted-foreground">{r.title}</div>
          </div>
        </div>
      ),
    },
    { key: "account", header: "Account" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "owner", header: "Owner", render: (r) => <OwnerCell name={r.owner} /> },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigate({ to: "/contacts/$id", params: { id: r.id } })}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => navigate({ to: "/contacts/edit/$id", params: { id: r.id } })}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-destructive"
            onClick={() => {
              setContactToDelete(r);
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
    <div className="space-y-5 max-w-400">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-0.5">All people you do business with.</p>
        </div>
        <Button className="gap-1.5" onClick={() => navigate({ to: "/contacts/create" })}>
          <Plus className="size-4" /> New Contact
        </Button>
      </div>
      <DataTable data={contacts} columns={cols} searchKeys={["name", "account", "email"]} />

      <DeleteContactModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          if (contactToDelete) {
            await crmService.deleteContact(contactToDelete.id);
            loadContacts();
          }
        }}
        contactName={contactToDelete?.name || ""}
      />
    </div>
  );
}
