import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService } from "@/lib/crm-service";
import { TaskForm } from "@/components/tasks/TaskForm";

export const Route = createFileRoute("/_app/tasks/edit/$id")({
  head: () => ({ meta: [{ title: "Edit Task — Pulse CRM" }] }),
  component: EditTaskPage,
});

function EditTaskPage() {
  const { id } = Route.useParams();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    crmService.getTaskById(id).then((task) => {
      if (task) {
        setInitialData({
          subject: task.subject,
          description: task.description,
          priority: task.priority,
          status: task.status,
          assignedTo: task.assignedTo,
          due: task.due.split("T")[0],
          progress: task.progress,
        });
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Edit Task</h1>
      </div>
      <TaskForm mode="edit" taskId={id} initialData={initialData} />
    </div>
  );
}
