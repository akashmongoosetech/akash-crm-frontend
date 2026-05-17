import { createFileRoute } from "@tanstack/react-router";
import { TaskForm } from "@/components/tasks/TaskForm";

export const Route = createFileRoute("/_app/tasks/create")({
  head: () => ({ meta: [{ title: "Create Task — Pulse CRM" }] }),
  component: CreateTaskPage,
});

function CreateTaskPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create New Task</h1>
      </div>
      <TaskForm mode="create" />
    </div>
  );
}
