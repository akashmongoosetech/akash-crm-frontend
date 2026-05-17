import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { crmService, type TaskFormData } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const taskSchema = z.object({
  subject: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  type: z.string().optional(),
  priority: z.enum(["High", "Medium", "Low", "Urgent"]),
  status: z.enum(["Pending", "In Progress", "Review", "Completed", "Cancelled"]),
  assignedTo: z.string().min(1, "Assigned user is required"),
  relatedLead: z.string().optional(),
  relatedContact: z.string().optional(),
  relatedDeal: z.string().optional(),
  relatedAccount: z.string().optional(),
  startDate: z.string().min(1),
  due: z.string().min(1),
  dueTime: z.string().optional(),
  reminder: z.string().optional(),
  estimatedHours: z.coerce.number().min(0),
  progress: z.coerce.number().min(0).max(100),
  tags: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  mode: "create" | "edit";
  taskId?: string;
  initialData?: Partial<TaskFormValues>;
}

export function TaskForm({ mode, taskId, initialData }: TaskFormProps) {
  const navigate = useNavigate();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      subject: "",
      description: "",
      type: "Task",
      priority: "Medium",
      status: "Pending",
      assignedTo: "",
      relatedLead: "",
      relatedContact: "",
      relatedDeal: "",
      relatedAccount: "",
      startDate: new Date().toISOString().split("T")[0],
      due: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      dueTime: "10:00",
      reminder: "1 day before",
      estimatedHours: 2,
      progress: 0,
      tags: "",
      ...initialData,
    },
  });

  const onSubmit = async (values: TaskFormValues) => {
    try {
      if (mode === "create") {
        await crmService.createTask(values as TaskFormData);
        toast.success("Task created successfully");
      } else if (taskId) {
        await crmService.updateTask(taskId, values as TaskFormData);
        toast.success("Task updated successfully");
      }
      navigate({ to: "/tasks" });
    } catch {
      toast.error(mode === "create" ? "Failed to create task" : "Failed to update task");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* Basic Information */}
      <div>
        <h3 className="font-semibold mb-4">Basic Task Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <Label>Task Title *</Label>
            <Input {...form.register("subject")} />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Input {...form.register("type")} />
          </div>
          <div className="space-y-2">
            <Label>Priority *</Label>
            <select {...form.register("priority")} className="w-full border rounded p-2">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea {...form.register("description")} rows={3} />
          </div>
        </div>
      </div>

      {/* Assignment */}
      <div>
        <h3 className="font-semibold mb-4">Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Assigned To *</Label>
            <Input {...form.register("assignedTo")} />
          </div>
          <div className="space-y-2">
            <Label>Status *</Label>
            <select {...form.register("status")} className="w-full border rounded p-2">
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div>
        <h3 className="font-semibold mb-4">Schedule & Timeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input type="date" {...form.register("startDate")} />
          </div>
          <div className="space-y-2">
            <Label>Due Date *</Label>
            <Input type="date" {...form.register("due")} />
          </div>
          <div className="space-y-2">
            <Label>Due Time</Label>
            <Input type="time" {...form.register("dueTime")} />
          </div>
          <div className="space-y-2">
            <Label>Estimated Hours</Label>
            <Input type="number" {...form.register("estimatedHours")} />
          </div>
          <div className="space-y-2">
            <Label>Progress (%)</Label>
            <Input type="number" {...form.register("progress")} />
          </div>
        </div>
      </div>

      {/* Related Records */}
      <div>
        <h3 className="font-semibold mb-4">Related CRM Records</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Related Lead</Label>
            <Input {...form.register("relatedLead")} />
          </div>
          <div className="space-y-2">
            <Label>Related Contact</Label>
            <Input {...form.register("relatedContact")} />
          </div>
          <div className="space-y-2">
            <Label>Related Deal</Label>
            <Input {...form.register("relatedDeal")} />
          </div>
          <div className="space-y-2">
            <Label>Related Account</Label>
            <Input {...form.register("relatedAccount")} />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit">{mode === "create" ? "Create Task" : "Update Task"}</Button>
        <Button type="button" variant="outline" onClick={() => navigate({ to: "/tasks" })}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
