import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Contact } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { DeleteContactModal } from "@/components/contacts/DeleteContactModal";

export const Route = createFileRoute("/_app/contacts/$id")({
  head: () => ({ meta: [{ title: "Contact Details — Pulse CRM" }] }),
  component: ContactDetailsPage,
});

function ContactDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    crmService.getContactById(id).then((data) => {
      setContact(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!contact) return <div className="p-8">Contact not found</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/contacts" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{contact.name}</h1>
          <p className="text-muted-foreground">
            {contact.title} at {contact.account}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/contacts/edit/$id", params: { id } })}
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
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Email</span>
                <div className="font-medium">{contact.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Mobile</span>
                <div className="font-medium">{contact.mobileNumber}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Phone</span>
                <div className="font-medium">{contact.phone}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Owner</span>
                <div className="font-medium">{contact.owner}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="text-sm">{contact.account}</div>
          </div>
        </div>
      </div>

      <DeleteContactModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await crmService.deleteContact(id);
          navigate({ to: "/contacts" });
        }}
        contactName={contact.name}
      />
    </div>
  );
}
