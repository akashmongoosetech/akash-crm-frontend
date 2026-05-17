import { useMemo, useState, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
  accessor?: (row: T) => string | number;
};

export function DataTable<T extends { id: string }>({
  data,
  columns,
  searchKeys,
  title,
}: {
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  title?: string;
}) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const pageSize = 8;

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    return data.filter((row) =>
      (searchKeys ?? (Object.keys(row) as (keyof T)[])).some((k) =>
        String(row[k] ?? "")
          .toLowerCase()
          .includes(s),
      ),
    );
  }, [data, q, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    const get =
      col?.accessor ?? ((r: T) => (r as Record<string, unknown>)[sortKey] as string | number);
    return [...filtered].sort((a, b) => {
      const av = get(a),
        bv = get(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);
  const allSelected = pageData.length > 0 && pageData.every((r) => selected.has(r.id));

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border">
        {title && <h2 className="text-sm font-semibold mr-2">{title}</h2>}
        <div className="relative flex-1 min-w-50 max-w-sm">
          <Search className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search..."
            className="h-9 w-full pl-8 pr-3 rounded-md bg-muted/60 border border-transparent focus:border-ring focus:bg-background outline-none text-sm transition-colors"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="size-4" /> Filter
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="size-4" /> Export
        </Button>
        <span className="text-xs text-muted-foreground ml-auto">{sorted.length} records</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(v) => {
                    const next = new Set(selected);
                    pageData.forEach((r) => (v ? next.add(r.id) : next.delete(r.id)));
                    setSelected(next);
                  }}
                />
              </th>
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={cn("px-4 py-3 text-left font-medium", c.className)}
                >
                  {c.sortable !== false ? (
                    <button
                      onClick={() => toggleSort(String(c.key))}
                      className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      {c.header}
                      {sortKey === c.key &&
                        (sortDir === "asc" ? (
                          <ChevronUp className="size-3" />
                        ) : (
                          <ChevronDown className="size-3" />
                        ))}
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr
                key={row.id}
                className="border-t border-border hover:bg-muted/40 transition-colors"
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selected.has(row.id)}
                    onCheckedChange={(v) => {
                      const next = new Set(selected);
                      if (v) next.add(row.id);
                      else next.delete(row.id);
                      setSelected(next);
                    }}
                  />
                </td>
                {columns.map((c) => (
                  <td key={String(c.key)} className={cn("px-4 py-3 align-middle", c.className)}>
                    {c.render
                      ? c.render(row)
                      : String((row as Record<string, unknown>)[String(c.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-16 text-center text-muted-foreground text-sm"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
        <span>{selected.size} selected</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="ghost"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
