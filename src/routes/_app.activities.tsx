import { createFileRoute } from "@tanstack/react-router";
import { activities } from "@/lib/crm-data";
import { OwnerCell } from "@/components/crm/cells";
import { Phone, Mail, StickyNote, CheckCircle2, UserPlus, FileText } from "lucide-react";

export const Route = createFileRoute("/_app/activities")({
  head: () => ({ meta: [{ title: "Activities — Pulse CRM" }] }),
  component: () => {
    const icons = {
      call: Phone,
      email: Mail,
      note: StickyNote,
      won: CheckCircle2,
      lead: UserPlus,
      task: FileText,
    };
    return (
      <div className="space-y-5 max-w-[1100px]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Activities</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            A timeline of everything happening in your CRM.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <ol className="relative border-l border-border ml-3 space-y-5">
            {[...activities, ...activities].map((a, i) => {
              const Icon = (icons as any)[a.type] ?? FileText;
              return (
                <li key={i} className="ml-6">
                  <span className="absolute -left-3 size-6 rounded-full bg-card border border-border grid place-items-center text-muted-foreground">
                    <Icon className="size-3" />
                  </span>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <OwnerCell name={a.who} />
                      <span className="text-sm text-muted-foreground">{a.action}</span>
                      <span className="text-sm font-medium">{a.target}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  },
});
