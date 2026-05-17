import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  New: "bg-[oklch(0.62_0.17_240)]/12 text-[oklch(0.5_0.17_240)] border-[oklch(0.62_0.17_240)]/25",
  Contacted:
    "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.5_0.16_75)] border-[oklch(0.78_0.16_75)]/30",
  Qualified:
    "bg-[oklch(0.65_0.16_155)]/12 text-[oklch(0.42_0.16_155)] border-[oklch(0.65_0.16_155)]/25",
  Lost: "bg-destructive/10 text-destructive border-destructive/25",
  Open: "bg-muted text-foreground border-border",
  "In Progress":
    "bg-[oklch(0.62_0.17_240)]/12 text-[oklch(0.5_0.17_240)] border-[oklch(0.62_0.17_240)]/25",
  Completed:
    "bg-[oklch(0.65_0.16_155)]/12 text-[oklch(0.42_0.16_155)] border-[oklch(0.65_0.16_155)]/25",
  High: "bg-destructive/10 text-destructive border-destructive/25",
  Normal: "bg-muted text-muted-foreground border-border",
  Low: "bg-muted text-muted-foreground border-border",
  "Closed Won":
    "bg-[oklch(0.65_0.16_155)]/12 text-[oklch(0.42_0.16_155)] border-[oklch(0.65_0.16_155)]/25",
  "Closed Lost": "bg-destructive/10 text-destructive border-destructive/25",
  Qualification: "bg-muted text-foreground border-border",
  "Needs Analysis":
    "bg-[oklch(0.62_0.17_240)]/12 text-[oklch(0.5_0.17_240)] border-[oklch(0.62_0.17_240)]/25",
  Proposal: "bg-[oklch(0.78_0.16_75)]/15 text-[oklch(0.5_0.16_75)] border-[oklch(0.78_0.16_75)]/30",
  Negotiation: "bg-primary/10 text-primary border-primary/25",
};

export function StatusBadge({ value }: { value: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium border", map[value] ?? "bg-muted text-foreground border-border")}
    >
      <span className="size-1.5 rounded-full bg-current mr-1.5 opacity-70" />
      {value}
    </Badge>
  );
}

export function OwnerCell({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex items-center gap-2">
      <span className="size-7 rounded-full bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-[11px] font-semibold grid place-items-center">
        {initials}
      </span>
      <span className="text-sm">{name}</span>
    </div>
  );
}
