import { createFileRoute } from "@tanstack/react-router";
import { AccountForm } from "@/components/accounts/AccountForm";

export const Route = createFileRoute("/_app/accounts/create")({
  head: () => ({ meta: [{ title: "Create Account — Pulse CRM" }] }),
  component: CreateAccountPage,
});

function CreateAccountPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Create New Account</h1>
        <p className="text-muted-foreground mt-1">Add a new company to your CRM</p>
      </div>
      <AccountForm mode="create" />
    </div>
  );
}
