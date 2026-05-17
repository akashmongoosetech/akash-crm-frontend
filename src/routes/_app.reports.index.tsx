import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Report {
  id: string;
  report: string;
  folder: string;
  type: string;
  lastRun: string;
  owner: string;
}

const data: Report[] = [
  { id: "r1", report: "Revenue Summary", folder: "Finance", type: "PDF", lastRun: "2026-05-16", owner: "Admin" },
  { id: "r2", report: "Lead Conversion", folder: "Sales", type: "Excel", lastRun: "2026-05-15", owner: "Manager" },
];

const columns: Column<Report>[] = [
  { key: "report", header: "Report", sortable: true },
  { key: "folder", header: "Folder", sortable: true },
  { key: "type", header: "Type", sortable: true },
  { key: "lastRun", header: "Last Run", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
];

function ReportsPage() {
  return <DataTable data={data} columns={columns} title="Reports" searchKeys={["report", "folder"]} />;
}

export const Route = createFileRoute("/_app/reports/")({
  component: ReportsPage,
});
