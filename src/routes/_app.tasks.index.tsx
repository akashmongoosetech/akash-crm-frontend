import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Task } from "@/lib/crm-service";
import { DataTable, type Column } from "@/components/crm/DataTable";
import { OwnerCell, StatusBadge } from "@/components/crm/cells";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { DeleteTaskModal } from "@/components/tasks/DeleteTaskModal";

export const Route = createFileRoute("/_app/tasks/")({
  head: () => ({ meta: [{ title: "Tasks — Pulse CRM" }] }),
  component: TasksPage,
});

function TasksPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const loadTasks = () => {
    crmService.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const cols: Column<Task>[] = [
    { key: "subject", header: "Subject" },
    { key: "related", header: "Related to" },
    { key: "due", header: "Due date", render: (r) => new Date(r.due).toLocaleDateString() },
    { key: "priority", header: "Priority", render: (r) => <StatusBadge value={r.priority} /> },
    { key: "status", header: "Status", render: (r) => <StatusBadge value={r.status} /> },
    { key: "owner", header: "Owner", render: (r) => <OwnerCell name={r.owner} /> },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate({ to: "/tasks/$id", params: { id: r.id } })}>
            <Eye className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate({ to: "/tasks/edit/$id", params: { id: r.id } })}>
            <Pencil className="size-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive" onClick={() => {
            setTaskToDelete(r);
            setShowDeleteModal(true);
          }}>
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Stay on top of follow-ups and to-dos.</p>
        </div>
        <Button className="gap-1.5" onClick={() => navigate({ to: "/tasks/create" })}>
          <Plus className="size-4" /> New Task
        </Button>
      </div>
      <DataTable data={tasks} columns={cols} searchKeys={["subject", "related", "owner"]} />

      <DeleteTaskModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          if (taskToDelete) {
            await crmService.deleteTask(taskToDelete.id);
            loadTasks();
          }
        }}
        taskName={taskToDelete?.subject || ""}
      />
    </div>
  );
}
