import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { crmService, type LeadFormData } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const leadSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().optional(),
  phoneNumber: z.string().optional(),
  leadSource: z.string().min(1),
  leadStatus: z.string().min(1),
  industry: z.string().optional(),
  website: z.string().optional(),
  annualRevenue: z.string().optional(),
  noOfEmployees: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional(),
  assignedUser: z.string().optional(),
  tags: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormPageProps {
  mode: "create" | "edit";
  leadId?: string | null;
}

export function LeadFormPage({ mode, leadId }: LeadFormPageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      mobileNumber: "",
      phoneNumber: "",
      leadSource: "Web",
      leadStatus: "New",
      industry: "",
      website: "",
      annualRevenue: "",
      noOfEmployees: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      assignedUser: "",
      tags: "",
      description: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && leadId) {
      crmService.getLeadFormData(leadId).then((data) => {
        if (data) {
          form.reset(data);
        }
      });
    }
  }, [mode, leadId, form]);

  const onSubmit = async (values: LeadFormValues) => {
    setIsLoading(true);
    try {
      if (mode === "create") {
        await crmService.createLead(values as LeadFormData);
        toast.success("Lead created successfully");
      } else if (leadId) {
        await crmService.updateLead(leadId, values as LeadFormData);
        toast.success("Lead updated successfully");
      }
      navigate({ to: "/leads" });
    } catch {
      toast.error(mode === "create" ? "Failed to create lead" : "Failed to update lead");
    } finally {
      setIsLoading(false);
    }
  };

  const mobileValue = form.watch("mobileNumber") || "";
  const phoneValue = form.watch("phoneNumber") || "";

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {mode === "create" ? "Create Lead" : "Edit Lead"}
        </h1>
        <p className="text-muted-foreground mt-1">
          {mode === "create" ? "Add a new lead to your pipeline" : `Editing lead #${leadId}`}
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" {...form.register("firstName")} placeholder="John" />
              {form.formState.errors.firstName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" {...form.register("lastName")} placeholder="Doe" />
              {form.formState.errors.lastName && (
                <p className="text-sm text-destructive">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input id="companyName" {...form.register("companyName")} placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" {...form.register("industry")} placeholder="Technology" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...form.register("website")} placeholder="https://example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="annualRevenue">Annual Revenue</Label>
              <Input
                id="annualRevenue"
                {...form.register("annualRevenue")}
                placeholder="₹1,000,000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="noOfEmployees">No. of Employees</Label>
              <Input id="noOfEmployees" {...form.register("noOfEmployees")} placeholder="50" />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                placeholder="john@acme.com"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Mobile Number</Label>
              <PhoneInput
                international
                defaultCountry="US"
                value={mobileValue}
                onChange={(value) => form.setValue("mobileNumber", value || "")}
                className="phone-input"
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <PhoneInput
                international
                defaultCountry="US"
                value={phoneValue}
                onChange={(value) => form.setValue("phoneNumber", value || "")}
                className="phone-input"
              />
            </div>
          </div>
        </div>

        {/* Lead Details */}
        <div>
          <h3 className="text-lg font-medium mb-4">Lead Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Lead Source *</Label>
              <Select
                value={form.watch("leadSource")}
                onValueChange={(value) => form.setValue("leadSource", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web">Web</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Cold Call">Cold Call</SelectItem>
                  <SelectItem value="Campaign">Campaign</SelectItem>
                  <SelectItem value="Partner">Partner</SelectItem>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Trade Show">Trade Show</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Lead Status *</Label>
              <Select
                value={form.watch("leadStatus")}
                onValueChange={(value) => form.setValue("leadStatus", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Unqualified">Unqualified</SelectItem>
                  <SelectItem value="Converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-medium mb-4">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...form.register("address")} placeholder="123 Main St" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...form.register("city")} placeholder="San Francisco" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" {...form.register("state")} placeholder="CA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...form.register("country")} placeholder="United States" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" {...form.register("zipCode")} placeholder="94105" />
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="assignedUser">Assigned User</Label>
              <Input
                id="assignedUser"
                {...form.register("assignedUser")}
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" {...form.register("tags")} placeholder="enterprise, hot-lead" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={3}
                placeholder="Lead details..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                {...form.register("notes")}
                rows={3}
                placeholder="Internal notes..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={isLoading} className="min-w-35">
            {isLoading ? "Saving..." : mode === "create" ? "Create Lead" : "Update Lead"}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate({ to: "/leads" })}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
