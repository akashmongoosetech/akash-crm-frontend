import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Case {
  id: string;
  caseNum: string;
  subject: string;
  account: string;
  priority: string;
  status: string;
  owner: string;
}

const data: Case[] = [
  { id: "cs1", caseNum: "CS-5001", subject: "Login Issue", account: "Acme Corp", priority: "High", status: "Open", owner: "Emma" },
  { id: "cs2", caseNum: "CS-5002", subject: "Billing Query", account: "TechStart", priority: "Medium", status: "Closed", owner: "Ryan" },
];

const columns: Column<Case>[] = [
  { key: "caseNum", header: "Case #", sortable: true },
  { key: "subject", header: "Subject", sortable: true },
  { key: "account", header: "Account", sortable: true },
  { key: "priority", header: "Priority", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
];

function CasesPage() {
  return <DataTable data={data} columns={columns} title="Cases" searchKeys={["subject", "account"]} />;
}

export const Route = createFileRoute("/_app/cases/")({
  component: CasesPage,
});
