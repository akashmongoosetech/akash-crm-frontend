import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/calendar")({
  head: () => ({ meta: [{ title: "Calendar — Pulse CRM" }] }),
  component: CalendarPage,
});

function CalendarPage() {
  const [month, setMonth] = useState(new Date(2026, 4, 1));
  const start = new Date(month.getFullYear(), month.getMonth(), 1);
  const startDay = start.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const today = new Date();

  const events: Record<number, { title: string; type: "call" | "meeting" | "demo" }[]> = {
    3: [{ title: "Demo: Acme", type: "demo" }],
    7: [
      { title: "Call with Stark", type: "call" },
      { title: "Pipeline review", type: "meeting" },
    ],
    12: [{ title: "Onboarding Hooli", type: "meeting" }],
    15: [{ title: "Quarterly review", type: "meeting" }],
    18: [{ title: "Demo: Globex", type: "demo" }],
    22: [{ title: "Negotiation – Wayne", type: "call" }],
    27: [{ title: "Team sync", type: "meeting" }],
  };

  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDay + 1;
    return day >= 1 && day <= daysInMonth ? day : null;
  });

  const typeColor = {
    call: "bg-[oklch(0.62_0.17_240)]/15 text-[oklch(0.5_0.17_240)]",
    meeting: "bg-primary/15 text-primary",
    demo: "bg-[oklch(0.65_0.16_155)]/15 text-[oklch(0.42_0.16_155)]",
  };

  return (
    <div className="space-y-5 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendar</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Schedule and view upcoming activities.
          </p>
        </div>
        <Button className="gap-1.5">
          <Plus className="size-4" /> New Event
        </Button>
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <h2 className="text-sm font-semibold w-36 text-center">
              {month.toLocaleString("en", { month: "long", year: "numeric" })}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMonth(new Date(today.getFullYear(), today.getMonth(), 1))}
          >
            Today
          </Button>
        </div>
        <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground border-b border-border bg-muted/30">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="px-3 py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => {
            const isToday =
              d === today.getDate() &&
              month.getMonth() === today.getMonth() &&
              month.getFullYear() === today.getFullYear();
            return (
              <div
                key={i}
                className={cn(
                  "min-h-[110px] border-b border-r border-border p-2 text-xs",
                  (i + 1) % 7 === 0 && "border-r-0",
                  !d && "bg-muted/20",
                )}
              >
                {d && (
                  <>
                    <div
                      className={cn(
                        "size-6 grid place-items-center rounded-full text-[11px] font-medium mb-1",
                        isToday ? "bg-primary text-primary-foreground" : "text-foreground",
                      )}
                    >
                      {d}
                    </div>
                    <div className="space-y-1">
                      {events[d]?.map((e, j) => (
                        <div
                          key={j}
                          className={cn(
                            "px-1.5 py-0.5 rounded text-[10.5px] truncate",
                            typeColor[e.type],
                          )}
                        >
                          {e.title}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
