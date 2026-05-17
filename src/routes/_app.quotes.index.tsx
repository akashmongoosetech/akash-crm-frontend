import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Quote {
  id: string;
  quoteNum: string;
  subject: string;
  account: string;
  amount: string;
  stage: string;
}

const data: Quote[] = [
  { id: "q1", quoteNum: "Q-1001", subject: "Enterprise License", account: "Acme Corp", amount: "$45,000", stage: "Sent" },
  { id: "q2", quoteNum: "Q-1002", subject: "Support Renewal", account: "TechStart", amount: "$8,500", stage: "Accepted" },
];

const columns: Column<Quote>[] = [
  { key: "quoteNum", header: "Quote #", sortable: true },
  { key: "subject", header: "Subject", sortable: true },
  { key: "account", header: "Account", sortable: true },
  { key: "amount", header: "Amount", sortable: true },
  { key: "stage", header: "Stage", sortable: true },
];

function QuotesPage() {
  return <DataTable data={data} columns={columns} title="Quotes" searchKeys={["subject", "account"]} />;
}

export const Route = createFileRoute("/_app/quotes/")({
  component: QuotesPage,
});
