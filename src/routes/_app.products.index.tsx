import { createFileRoute } from "@tanstack/react-router";
import { DataTable, type Column } from "@/components/crm/DataTable";

interface Product {
  id: string;
  product: string;
  code: string;
  category: string;
  unitPrice: string;
  inStock: number;
}

const data: Product[] = [
  { id: "p1", product: "Laptop Pro", code: "LP-001", category: "Electronics", unitPrice: "$1,299", inStock: 45 },
  { id: "p2", product: "Wireless Mouse", code: "WM-042", category: "Accessories", unitPrice: "$29", inStock: 120 },
];

const columns: Column<Product>[] = [
  { key: "product", header: "Product", sortable: true },
  { key: "code", header: "Code", sortable: true },
  { key: "category", header: "Category", sortable: true },
  { key: "unitPrice", header: "Unit Price", sortable: true },
  { key: "inStock", header: "In Stock", sortable: true },
];

function ProductsPage() {
  return <DataTable data={data} columns={columns} title="Products" searchKeys={["product", "category"]} />;
}

export const Route = createFileRoute("/_app/products/")({
  component: ProductsPage,
});
