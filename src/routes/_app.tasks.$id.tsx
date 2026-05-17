import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Task } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { DeleteTaskModal } from "@/components/tasks/DeleteTaskModal";

export const Route = createFileRoute("/_app/tasks/$id")({
  head: () => ({ meta: [{ title: "Task Details — Pulse CRM" }] }),
  component: TaskDetailsPage,
});

function TaskDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    crmService.getTaskById(id).then((data) => {
      setTask(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!task) return <div className="p-8">Task not found</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/tasks" className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{task.subject}</h1>
          <p className="text-muted-foreground">Due: {new Date(task.due).toLocaleDateString()}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate({ to: "/tasks/edit/$id", params: { id } })}>
            <Edit className="size-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setShowDeleteModal(true)}>
            <Trash2 className="size-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <h3 className="font-semibold mb-4">Task Details</h3>
        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div><span className="text-muted-foreground">Status</span><div className="font-medium">{task.status}</div></div>
          <div><span className="text-muted-foreground">Priority</span><div className="font-medium">{task.priority}</div></div>
          <div><span className="text-muted-foreground">Assigned To</span><div className="font-medium">{task.assignedTo}</div></div>
          <div><span className="text-muted-foreground">Progress</span><div className="font-medium">{task.progress}%</div></div>
        </div>
      </div>

      <DeleteTaskModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await crmService.deleteTask(id);
          navigate({ to: "/tasks" });
        }}
        taskName={task.subject}
      />
    </div>
  );
}
