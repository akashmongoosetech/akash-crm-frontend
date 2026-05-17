import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Star,
  Paperclip,
  Reply,
  Forward,
  Trash2,
  Inbox,
  Send,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/mail")({
  head: () => ({ meta: [{ title: "Mail — Pulse CRM" }] }),
  component: MailPage,
});

const folders = [
  { key: "inbox", label: "Inbox", icon: Inbox, count: 12 },
  { key: "sent", label: "Sent", icon: Send },
  { key: "drafts", label: "Drafts", icon: FileText, count: 3 },
  { key: "important", label: "Important", icon: AlertCircle },
  { key: "trash", label: "Trash", icon: Trash2 },
];

const messages = [
  {
    id: 1,
    from: "Olivia Bennett",
    subj: "Re: Pricing for enterprise plan",
    preview: "Thanks for sending the deck — I had a couple of follow-up questions on...",
    time: "10:42",
    unread: true,
    starred: true,
  },
  {
    id: 2,
    from: "Stark Industries",
    subj: "Contract draft v2",
    preview: "Please find attached the revised contract with the changes we discussed...",
    time: "09:15",
    unread: true,
  },
  {
    id: 3,
    from: "Priya Shah",
    subj: "Pipeline review notes",
    preview: "Quick recap from this morning's sync — moving Hooli to negotiation, and...",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    from: "Wayne Enterprises",
    subj: "Demo follow-up",
    preview: "It was great meeting your team. Looking forward to the next steps...",
    time: "Yesterday",
    starred: true,
    unread: false,
  },
  {
    id: 5,
    from: "Hooli Procurement",
    subj: "Vendor onboarding form",
    preview: "Please complete the attached form so we can finalize your onboarding...",
    time: "Mon",
    unread: false,
  },
  {
    id: 6,
    from: "Emma Wilson",
    subj: "Q3 forecast spreadsheet",
    preview: "Sharing the updated forecast — let me know your thoughts before Friday...",
    time: "Mon",
    unread: false,
  },
];

function MailPage() {
  const [active, setActive] = useState(messages[0]);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden flex h-[calc(100vh-7rem)]">
      <div className="w-52 border-r border-border p-3 shrink-0">
        <Button className="w-full mb-3">Compose</Button>
        <ul className="space-y-0.5">
          {folders.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.key}>
                <button
                  className={cn(
                    "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm hover:bg-muted transition-colors",
                    f.key === "inbox" && "bg-muted font-medium",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="flex-1 text-left">{f.label}</span>
                  {f.count && <span className="text-[11px] text-muted-foreground">{f.count}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-96 border-r border-border flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-9 w-full pl-8 pr-3 rounded-md bg-muted/60 outline-none text-sm focus:bg-background border border-transparent focus:border-ring transition-colors"
              placeholder="Search mail..."
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className={cn(
                "w-full text-left px-4 py-3 border-b border-border hover:bg-muted/40 transition-colors",
                active.id === m.id && "bg-muted/60",
              )}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={cn("text-sm truncate", m.unread ? "font-semibold" : "font-medium")}
                >
                  {m.from}
                </span>
                <span className="text-[11px] text-muted-foreground">{m.time}</span>
              </div>
              <div
                className={cn(
                  "text-xs truncate",
                  m.unread ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {m.subj}
              </div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">{m.preview}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="p-5 border-b border-border">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold truncate">{active.subj}</h2>
              <div className="text-sm text-muted-foreground mt-0.5">
                <span className="text-foreground font-medium">{active.from}</span> &lt;
                {active.from.toLowerCase().replace(/\s/g, ".")}@example.com&gt;
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="size-9">
                <Star
                  className={cn(
                    "size-4",
                    active.starred && "fill-[oklch(0.78_0.16_75)] text-[oklch(0.78_0.16_75)]",
                  )}
                />
              </Button>
              <Button variant="ghost" size="icon" className="size-9">
                <Paperclip className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-9">
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6 text-sm leading-7 space-y-4">
          <p>Hi Aarav,</p>
          <p>
            {active.preview} I'd love to set up a 30-minute call this week to align on scope and
            answer any remaining questions from your side.
          </p>
          <p>
            Let me know what works for you. Happy to send a few options across multiple time zones.
          </p>
          <p>
            Best,
            <br />
            {active.from}
          </p>
        </div>
        <div className="p-4 border-t border-border flex gap-2">
          <Button variant="outline" className="gap-1.5">
            <Reply className="size-4" /> Reply
          </Button>
          <Button variant="outline" className="gap-1.5">
            <Forward className="size-4" /> Forward
          </Button>
        </div>
      </div>
    </div>
  );
}
