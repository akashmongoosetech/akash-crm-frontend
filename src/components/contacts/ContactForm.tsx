import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { crmService, type ContactFormData } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  mobileNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  account: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title is required"),
  department: z.string().optional(),
  leadSource: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  owner: z.string().min(1, "Owner is required"),
  tags: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactFormProps {
  mode: "create" | "edit";
  contactId?: string;
  initialData?: Partial<ContactFormValues>;
}

export function ContactForm({ mode, contactId, initialData }: ContactFormProps) {
  const navigate = useNavigate();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      phoneNumber: "",
      account: "",
      title: "",
      department: "",
      leadSource: "Web",
      website: "",
      address: "",
      city: "",
      state: "",
      country: "United States",
      zipCode: "",
      owner: "",
      tags: "",
      description: "",
      notes: "",
      ...initialData,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      if (mode === "create") {
        await crmService.createContact(values as ContactFormData);
        toast.success("Contact created successfully");
      } else if (contactId) {
        await crmService.updateContact(contactId, values as ContactFormData);
        toast.success("Contact updated successfully");
      }
      navigate({ to: "/contacts" });
    } catch {
      toast.error(mode === "create" ? "Failed to create contact" : "Failed to update contact");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* Personal Information */}
      <div>
        <h3 className="font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>First Name *</Label>
            <Input {...form.register("firstName")} />
          </div>
          <div className="space-y-2">
            <Label>Last Name *</Label>
            <Input {...form.register("lastName")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Email *</Label>
            <Input type="email" {...form.register("email")} />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Mobile Number</Label>
            <PhoneInput
              international
              defaultCountry="US"
              value={form.watch("mobileNumber")}
              onChange={(val) => form.setValue("mobileNumber", val || "")}
            />
          </div>
          <div className="space-y-2">
            <Label>Alternate Phone</Label>
            <PhoneInput
              international
              defaultCountry="US"
              value={form.watch("phoneNumber")}
              onChange={(val) => form.setValue("phoneNumber", val || "")}
            />
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div>
        <h3 className="font-semibold mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Company *</Label>
            <Input {...form.register("account")} />
          </div>
          <div className="space-y-2">
            <Label>Designation *</Label>
            <Input {...form.register("title")} />
          </div>
          <div className="space-y-2">
            <Label>Department</Label>
            <Input {...form.register("department")} />
          </div>
          <div className="space-y-2">
            <Label>Lead Source</Label>
            <Input {...form.register("leadSource")} />
          </div>
          <div className="space-y-2">
            <Label>Website</Label>
            <Input {...form.register("website")} />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Address</Label>
            <Input {...form.register("address")} />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input {...form.register("city")} />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input {...form.register("state")} />
          </div>
          <div className="space-y-2">
            <Label>Country</Label>
            <Input {...form.register("country")} />
          </div>
          <div className="space-y-2">
            <Label>Zip Code</Label>
            <Input {...form.register("zipCode")} />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Assigned User *</Label>
            <Input {...form.register("owner")} />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <Input {...form.register("tags")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea {...form.register("description")} rows={3} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Notes</Label>
            <Textarea {...form.register("notes")} rows={3} />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit">{mode === "create" ? "Create Contact" : "Update Contact"}</Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/contacts" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
