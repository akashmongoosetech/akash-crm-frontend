import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Meeting {
  id: string;
  title: string;
  from: string;
  to: string;
  host: string;
  status: string;
}

const data: Meeting[] = [
  { id: "m1", title: "Q3 Planning", from: "2026-05-20 10:00", to: "2026-05-20 11:00", host: "Alice", status: "Scheduled" },
  { id: "m2", title: "Client Demo", from: "2026-05-21 14:00", to: "2026-05-21 15:30", host: "Bob", status: "Completed" },
];

const columns: Column<Meeting>[] = [
  { key: "title", header: "Title", sortable: true },
  { key: "from", header: "From", sortable: true },
  { key: "to", header: "To", sortable: true },
  { key: "host", header: "Host", sortable: true },
  { key: "status", header: "Status", sortable: true },
];

function MeetingsPage() {
  return <DataTable data={data} columns={columns} title="Meetings" searchKeys={["title", "host"]} />;
}

export const Route = createFileRoute("/_app/meetings/")({
  component: MeetingsPage,
});
