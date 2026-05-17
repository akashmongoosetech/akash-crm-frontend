import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Vendor {
  id: string;
  vendor: string;
  category: string;
  email: string;
  phone: string;
  owner: string;
}

const data: Vendor[] = [
  { id: "v1", vendor: "SupplyCo", category: "Hardware", email: "sales@supplyco.com", phone: "+1-555-0101", owner: "Lisa" },
  { id: "v2", vendor: "CloudHost", category: "Services", email: "contact@cloudhost.io", phone: "+1-555-0202", owner: "Tom" },
];

const columns: Column<Vendor>[] = [
  { key: "vendor", header: "Vendor", sortable: true },
  { key: "category", header: "Category", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "phone", header: "Phone", sortable: true },
  { key: "owner", header: "Owner", sortable: true },
];

function VendorsPage() {
  return <DataTable data={data} columns={columns} title="Vendors" searchKeys={["vendor", "category"]} />;
}

export const Route = createFileRoute("/_app/vendors/")({
  component: VendorsPage,
});
