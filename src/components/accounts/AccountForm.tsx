import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { crmService, type AccountFormData } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const accountSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  industry: z.string().min(1, "Industry is required"),
  employees: z.coerce.number().min(1),
  revenue: z.coerce.number().min(0),
  phone: z.string().optional(),
  alternatePhone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().min(1, "Website is required"),
  accountType: z.string().optional(),
  parentAccount: z.string().optional(),
  billingAddress: z.string().optional(),
  shippingAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  taxNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  owner: z.string().min(1, "Owner is required"),
  tags: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountSchema>;

interface AccountFormProps {
  mode: "create" | "edit";
  accountId?: string;
  initialData?: Partial<AccountFormValues>;
}

export function AccountForm({ mode, accountId, initialData }: AccountFormProps) {
  const navigate = useNavigate();
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      industry: "SaaS",
      employees: 100,
      revenue: 1000000,
      phone: "",
      alternatePhone: "",
      email: "",
      website: "",
      accountType: "Customer",
      parentAccount: "",
      billingAddress: "",
      shippingAddress: "",
      city: "",
      state: "",
      country: "United States",
      zipCode: "",
      taxNumber: "",
      gstNumber: "",
      owner: "",
      tags: "",
      description: "",
      notes: "",
      ...initialData,
    },
  });

  const onSubmit = async (values: AccountFormValues) => {
    try {
      if (mode === "create") {
        await crmService.createAccount(values as AccountFormData);
        toast.success("Account created successfully");
      } else if (accountId) {
        await crmService.updateAccount(accountId, values as AccountFormData);
        toast.success("Account updated successfully");
      }
      navigate({ to: "/accounts" });
    } catch {
      toast.error(mode === "create" ? "Failed to create account" : "Failed to update account");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* Company Information */}
      <div>
        <h3 className="font-semibold mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Account Name *</Label>
            <Input {...form.register("name")} />
          </div>
          <div className="space-y-2">
            <Label>Industry *</Label>
            <Input {...form.register("industry")} />
          </div>
          <div className="space-y-2">
            <Label>Account Type</Label>
            <Input {...form.register("accountType")} />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <PhoneInput international defaultCountry="US" value={form.watch("phone")} onChange={(v) => form.setValue("phone", v || "")} />
          </div>
          <div className="space-y-2">
            <Label>Alternate Phone</Label>
            <PhoneInput international defaultCountry="US" value={form.watch("alternatePhone")} onChange={(v) => form.setValue("alternatePhone", v || "")} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label>Website *</Label>
            <Input {...form.register("website")} />
          </div>
        </div>
      </div>

      {/* Financial Information */}
      <div>
        <h3 className="font-semibold mb-4">Financial Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Annual Revenue</Label>
            <Input type="number" {...form.register("revenue")} />
          </div>
          <div className="space-y-2">
            <Label>Number of Employees</Label>
            <Input type="number" {...form.register("employees")} />
          </div>
        </div>
      </div>

      {/* Address */}
      <div>
        <h3 className="font-semibold mb-4">Address Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Billing Address</Label>
            <Input {...form.register("billingAddress")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Shipping Address</Label>
            <Input {...form.register("shippingAddress")} />
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
            <Label>Assigned Owner *</Label>
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
        <Button type="submit">{mode === "create" ? "Create Account" : "Update Account"}</Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/accounts" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
