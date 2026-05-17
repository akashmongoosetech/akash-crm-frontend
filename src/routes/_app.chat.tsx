import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Search, Smile, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/chat")({
  head: () => ({ meta: [{ title: "Chat — Pulse CRM" }] }),
  component: ChatPage,
});

const channels = [
  {
    id: 1,
    name: "Priya Shah",
    last: "Sounds good — let's ship it.",
    time: "2m",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Sales Team",
    last: "Liam: closed the Wayne deal!",
    time: "12m",
    unread: 5,
    online: true,
  },
  { id: 3, name: "Liam Carter", last: "Did you see the proposal?", time: "1h", online: true },
  { id: 4, name: "Customer Success", last: "Onboarding for Hooli starts Mon.", time: "3h" },
  { id: 5, name: "Emma Wilson", last: "Sharing the deck now.", time: "Yesterday" },
  { id: 6, name: "Marketing", last: "Campaign brief is ready for review.", time: "Tue" },
];

function ChatPage() {
  const [active, setActive] = useState(channels[0]);
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden flex h-[calc(100vh-7rem)]">
      <div className="w-72 border-r border-border flex flex-col shrink-0">
        <div className="p-3 border-b border-border">
          <div className="relative">
            <Search className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              className="h-9 w-full pl-8 pr-3 rounded-md bg-muted/60 outline-none text-sm focus:bg-background border border-transparent focus:border-ring transition-colors"
              placeholder="Search conversations..."
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {channels.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={cn(
                "w-full text-left px-3 py-3 flex items-center gap-3 border-b border-border hover:bg-muted/40 transition-colors",
                active.id === c.id && "bg-muted/60",
              )}
            >
              <div className="relative">
                <span className="size-9 rounded-full bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-xs font-semibold grid place-items-center">
                  {c.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                {c.online && (
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-[oklch(0.65_0.16_155)] ring-2 ring-card" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium truncate">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">{c.time}</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">{c.last}</div>
              </div>
              {c.unread && (
                <span className="size-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <span className="size-9 rounded-full bg-gradient-to-br from-primary/80 to-primary text-primary-foreground text-xs font-semibold grid place-items-center">
            {active.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <div className="font-medium text-sm">{active.name}</div>
            <div className="text-xs text-muted-foreground">
              {active.online ? "Active now" : "Offline"}
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-6 space-y-3">
          {[
            { me: false, t: "Hey, how's the Wayne deal going?", time: "10:32" },
            { me: true, t: "Just heard back — they want to move to negotiation 🎉", time: "10:33" },
            { me: false, t: "Amazing! What's the proposed timeline?", time: "10:33" },
            { me: true, t: "Close by end of next week if all goes well.", time: "10:35" },
            { me: false, t: "Sounds good — let's ship it.", time: "10:36" },
          ].map((m, i) => (
            <div key={i} className={cn("flex", m.me && "justify-end")}>
              <div
                className={cn(
                  "max-w-md rounded-2xl px-3.5 py-2 text-sm",
                  m.me
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted rounded-bl-sm",
                )}
              >
                {m.t}
                <div
                  className={cn(
                    "text-[10px] mt-1",
                    m.me ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border flex items-center gap-2">
          <button className="size-9 grid place-items-center rounded-md hover:bg-muted text-muted-foreground">
            <Paperclip className="size-4" />
          </button>
          <button className="size-9 grid place-items-center rounded-md hover:bg-muted text-muted-foreground">
            <Smile className="size-4" />
          </button>
          <input
            placeholder="Type a message..."
            className="flex-1 h-10 px-3 rounded-md bg-muted/60 border border-transparent focus:bg-background focus:border-ring outline-none text-sm transition-colors"
          />
          <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center gap-1.5 text-sm font-medium">
            <Send className="size-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
