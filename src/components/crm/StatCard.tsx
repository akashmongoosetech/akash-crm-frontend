import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string;
  delta?: number;
  trend?: "up" | "down";
  icon?: LucideIcon;
  accent?: "primary" | "info" | "success" | "warning";
}) {
  const accents: Record<string, string> = {
    primary: "bg-primary/10 text-primary",
    info: "bg-[oklch(0.62_0.17_240)]/10 text-[oklch(0.62_0.17_240)]",
    success: "bg-[oklch(0.65_0.16_155)]/10 text-[oklch(0.5_0.16_155)]",
    warning: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.55_0.16_75)]",
  };
  return (
    <div className="rounded-lg border border-border bg-card p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </div>
          <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
        </div>
        {Icon && (
          <div className={cn("size-10 rounded-md grid place-items-center", accents[accent])}>
            <Icon className="size-5" />
          </div>
        )}
      </div>
      {typeof delta === "number" && (
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-medium",
              trend === "up"
                ? "text-[oklch(0.5_0.16_155)] bg-[oklch(0.65_0.16_155)]/10"
                : "text-destructive bg-destructive/10",
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {Math.abs(delta)}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
}
