import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { crmService, type DealFormData } from "@/lib/crm-service";
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

const dealSchema = z.object({
  name: z.string().min(1, "Deal name is required"),
  account: z.string().min(1, "Account is required"),
  contactPerson: z.string().optional(),
  leadSource: z.string().optional(),
  stage: z.enum([
    "Qualification",
    "Needs Analysis",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ]),
  amount: z.coerce.number().min(1, "Amount is required"),
  probability: z.coerce.number().min(0).max(100),
  closeDate: z.string().min(1, "Close date is required"),
  owner: z.string().min(1, "Owner is required"),
  priority: z.string().optional(),
  dealType: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  tags: z.string().optional(),
});

type DealFormValues = z.infer<typeof dealSchema>;

interface DealFormProps {
  mode: "create" | "edit";
  dealId?: string;
  initialData?: Partial<DealFormValues>;
}

export function DealForm({ mode, dealId, initialData }: DealFormProps) {
  const navigate = useNavigate();
  const form = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: "",
      account: "",
      contactPerson: "",
      leadSource: "Web",
      stage: "Qualification",
      amount: 0,
      probability: 50,
      closeDate: new Date().toISOString().split("T")[0],
      owner: "",
      priority: "Medium",
      dealType: "New Business",
      description: "",
      notes: "",
      tags: "",
      ...initialData,
    },
  });

  const onSubmit = async (values: DealFormValues) => {
    try {
      if (mode === "create") {
        await crmService.createDeal(values as DealFormData);
        toast.success("Deal created successfully");
      } else if (dealId) {
        await crmService.updateDeal(dealId, values as DealFormData);
        toast.success("Deal updated successfully");
      }
      navigate({ to: "/deals" });
    } catch {
      toast.error(mode === "create" ? "Failed to create deal" : "Failed to update deal");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* Deal Information */}
      <div>
        <h3 className="font-semibold mb-4">Deal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Deal Name *</Label>
            <Input {...form.register("name")} placeholder="Enterprise License Renewal" />
          </div>
          <div className="space-y-2">
            <Label>Account *</Label>
            <Input {...form.register("account")} placeholder="Acme Corp" />
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div>
        <h3 className="font-semibold mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Contact Person</Label>
            <Input {...form.register("contactPerson")} placeholder="John Smith" />
          </div>
          <div className="space-y-2">
            <Label>Lead Source</Label>
            <Input {...form.register("leadSource")} placeholder="Referral" />
          </div>
        </div>
      </div>

      {/* Pipeline & Sales */}
      <div>
        <h3 className="font-semibold mb-4">Pipeline & Sales Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Stage *</Label>
            <Select
              value={form.watch("stage")}
              onValueChange={(v) => form.setValue("stage", v as DealFormValues["stage"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Qualification">Qualification</SelectItem>
                <SelectItem value="Needs Analysis">Needs Analysis</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Probability (%)</Label>
            <Input type="number" {...form.register("probability")} />
          </div>
          <div className="space-y-2">
            <Label>Expected Close Date *</Label>
            <Input type="date" {...form.register("closeDate")} />
          </div>
        </div>
      </div>

      {/* Financial Details */}
      <div>
        <h3 className="font-semibold mb-4">Financial Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Deal Value *</Label>
            <Input type="number" {...form.register("amount")} placeholder="50000" />
          </div>
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select
              value={form.watch("priority")}
              onValueChange={(v) => form.setValue("priority", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Deal Type</Label>
            <Input {...form.register("dealType")} placeholder="New Business" />
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div>
        <h3 className="font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Assigned User *</Label>
            <Input {...form.register("owner")} placeholder="Priya Shah" />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <Input {...form.register("tags")} placeholder="enterprise, renewal" />
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
        <Button type="submit">{mode === "create" ? "Create Deal" : "Update Deal"}</Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/deals" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
