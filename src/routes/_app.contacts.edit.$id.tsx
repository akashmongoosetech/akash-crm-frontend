import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type ContactFormData } from "@/lib/crm-service";
import { ContactForm } from "@/components/contacts/ContactForm";

export const Route = createFileRoute("/_app/contacts/edit/$id")({
  head: () => ({ meta: [{ title: "Edit Contact — Pulse CRM" }] }),
  component: EditContactPage,
});

function EditContactPage() {
  const { id } = Route.useParams();
  const [initialData, setInitialData] = useState<Partial<ContactFormData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crmService.getContactById(id).then((contact) => {
      if (contact) {
        setInitialData({
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          mobileNumber: contact.mobileNumber,
          phoneNumber: contact.phone,
          account: contact.account,
          title: contact.title,
          owner: contact.owner,
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Edit Contact</h1>
      </div>
      <ContactForm mode="edit" contactId={id} initialData={initialData} />
    </div>
  );
}
