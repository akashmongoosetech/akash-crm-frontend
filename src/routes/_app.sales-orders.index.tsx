import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface SalesOrder {
  id: string;
  soNum: string;
  subject: string;
  account: string;
  amount: string;
  status: string;
}

const data: SalesOrder[] = [
  { id: "so1", soNum: "SO-2001", subject: "Hardware Bundle", account: "GlobalTech", amount: "$22,500", status: "Confirmed" },
  { id: "so2", soNum: "SO-2002", subject: "Consulting", account: "NexGen", amount: "$15,000", status: "In Progress" },
];

const columns: Column<SalesOrder>[] = [
  { key: "soNum", header: "SO #", sortable: true },
  { key: "subject", header: "Subject", sortable: true },
  { key: "account", header: "Account", sortable: true },
  { key: "amount", header: "Amount", sortable: true },
  { key: "status", header: "Status", sortable: true },
];

function SalesOrdersPage() {
  return <DataTable data={data} columns={columns} title="Sales Orders" searchKeys={["subject", "account"]} />;
}

export const Route = createFileRoute("/_app/sales-orders/")({
  component: SalesOrdersPage,
});
