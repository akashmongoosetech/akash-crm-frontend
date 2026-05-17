import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Call {
  id: string;
  subject: string;
  contact: string;
  type: string;
  duration: string;
  owner: string;
}

const data: Call[] = [
  { id: "ca1", subject: "Follow-up", contact: "John Doe", type: "Outbound", duration: "15m", owner: "Sarah" },
  { id: "ca2", subject: "Demo", contact: "Jane Smith", type: "Inbound", duration: "45m", owner: "Mike" },
];

const columns: Column<Call>[] = [
  { key: "subject", header: "Subject", sortable: true },
  { key: "contact", header: "Contact", sortable: true },
  { key: "type", header: "Type", sortable: true },
  { key: "duration", header: "Duration", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
];

function CallsPage() {
  return <DataTable data={data} columns={columns} title="Calls" searchKeys={["subject", "contact"]} />;
}

export const Route = createFileRoute("/_app/calls/")({
  component: CallsPage,
});
