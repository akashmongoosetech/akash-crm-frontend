import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface PurchaseOrder {
  id: string;
  poNum: string;
  vendor: string;
  amount: string;
  dueDate: string;
  status: string;
}

const data: PurchaseOrder[] = [
  { id: "po1", poNum: "PO-4001", vendor: "SupplyCo", amount: "$4,800", dueDate: "2026-05-28", status: "Approved" },
  { id: "po2", poNum: "PO-4002", vendor: "CloudHost", amount: "$1,200", dueDate: "2026-06-05", status: "Pending" },
];

const columns: Column<PurchaseOrder>[] = [
  { key: "poNum", header: "PO #", sortable: true },
  { key: "vendor", header: "Vendor", sortable: true },
  { key: "amount", header: "Amount", sortable: true },
  { key: "dueDate", header: "Due Date", sortable: true },
  { key: "status", header: "Status", sortable: true },
];

function PurchaseOrdersPage() {
  return <DataTable data={data} columns={columns} title="Purchase Orders" searchKeys={["vendor"]} />;
}

export const Route = createFileRoute("/_app/purchase-orders/")({
  component: PurchaseOrdersPage,
});
