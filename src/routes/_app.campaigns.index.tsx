import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Campaign {
  id: string;
  campaign: string;
  type: string;
  status: string;
  start: string;
  end: string;
  budget: string;
}

const data: Campaign[] = [
  { id: "c1", campaign: "Summer Sale", type: "Email", status: "Active", start: "2026-06-01", end: "2026-06-30", budget: "$5,000" },
  { id: "c2", campaign: "Product Launch", type: "Social", status: "Planned", start: "2026-07-15", end: "2026-08-15", budget: "$12,000" },
];

const columns: Column<Campaign>[] = [
  { key: "campaign", header: "Campaign", sortable: true },
  { key: "type", header: "Type", sortable: true },
  { key: "status", header: "Status", sortable: true },
  { key: "start", header: "Start", sortable: true },
  { key: "end", header: "End", sortable: true },
  { key: "budget", header: "Budget", sortable: true },
];

function CampaignsPage() {
  return <DataTable data={data} columns={columns} title="Campaigns" searchKeys={["campaign", "type"]} />;
}

export const Route = createFileRoute("/_app/campaigns/")({
  component: CampaignsPage,
});
