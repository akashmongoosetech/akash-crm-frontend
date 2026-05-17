import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Invoice {
  id: string;
  invoiceNum: string;
  account: string;
  amount: string;
  dueDate: string;
  status: string;
}

const data: Invoice[] = [
  { id: "i1", invoiceNum: "INV-3001", account: "BetaSoft", amount: "$7,200", dueDate: "2026-05-25", status: "Pending" },
  { id: "i2", invoiceNum: "INV-3002", account: "CloudNine", amount: "$3,450", dueDate: "2026-06-01", status: "Paid" },
];

const columns: Column<Invoice>[] = [
  { key: "invoiceNum", header: "Invoice #", sortable: true },
  { key: "account", header: "Account", sortable: true },
  { key: "amount", header: "Amount", sortable: true },
  { key: "dueDate", header: "Due Date", sortable: true },
  { key: "status", header: "Status", sortable: true },
];

function InvoicesPage() {
  return <DataTable data={data} columns={columns} title="Invoices" searchKeys={["account"]} />;
}

export const Route = createFileRoute("/_app/invoices/")({
  component: InvoicesPage,
});
