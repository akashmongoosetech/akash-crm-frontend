import { useRouterState, Link, useNavigate } from "@tanstack/react-router";
import { Search, Bell, Plus, Sun, Moon, HelpCircle, Settings, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/modules/auth/store";
import { ROLE_LABELS } from "@/modules/auth/types";

const labels: Record<string, string> = {
  "": "Home",
  leads: "Leads",
  contacts: "Contacts",
  accounts: "Accounts",
  deals: "Deals",
  tasks: "Tasks",
  calendar: "Calendar",
  activities: "Activities",
  analytics: "Analytics",
  mail: "Mail",
  chat: "Chat",
  settings: "Settings",
  profile: "Profile",
  notifications: "Notifications",
};

export function Topbar() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const segs = path.split("/").filter(Boolean);
  const [dark, setDark] = useState(false);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/auth/login", replace: true });
  };

  const userInitials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "U";
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userEmail = user?.email || "";
  const userRole = user ? ROLE_LABELS[user.role] : "";
  const defaultAvatar =
    "https://img.magnific.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740&q=80";

  return (
    <header className="sticky top-0 z-30 h-14 bg-card/95 backdrop-blur border-b border-border flex items-center px-4 gap-3">
      <nav className="flex items-center gap-1.5 text-sm min-w-0">
        <Link to="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        {segs.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            <span className="text-muted-foreground/50">/</span>
            <span className="font-medium text-foreground truncate capitalize">
              {labels[s] ?? s}
            </span>
          </span>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="relative hidden md:block w-72">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search leads, contacts, deals..."
          className="h-9 w-full pl-9 pr-3 rounded-md bg-muted/60 border border-transparent focus:border-ring focus:bg-background outline-none text-sm transition-colors"
        />
      </div>

      <Button size="sm" className="gap-1.5 h-9">
        <Plus className="size-4" /> Create
      </Button>

      <button
        onClick={() => setDark((d) => !d)}
        className="size-9 grid place-items-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
      </button>

      <button className="size-9 grid place-items-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
        <HelpCircle className="size-[18px]" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="relative size-9 grid place-items-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="size-[18px]" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex items-center justify-between">
            Notifications{" "}
            <Badge variant="secondary" className="text-[10px]">
              3 new
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {[
            { t: "New lead assigned", d: "Olivia Bennett — Acme Corp", time: "2m" },
            { t: "Deal moved to Negotiation", d: "Stark Industries — $84k", time: "1h" },
            { t: "Task due today", d: "Send proposal to Globex", time: "3h" },
          ].map((n, i) => (
            <DropdownMenuItem key={i} className="flex flex-col items-start gap-0.5 py-2.5">
              <div className="flex w-full justify-between">
                <span className="font-medium text-sm">{n.t}</span>
                <span className="text-[11px] text-muted-foreground">{n.time}</span>
              </div>
              <span className="text-xs text-muted-foreground">{n.d}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-md hover:bg-muted transition-colors">
            <Avatar className="size-7">
              <AvatarImage src={user?.avatar || defaultAvatar} alt={userName} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:block text-sm font-medium">{user?.firstName || "User"}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{userName}</span>
              <span className="text-xs font-normal text-muted-foreground">{userEmail}</span>
              {userRole && <span className="text-xs font-normal text-primary">{userRole}</span>}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="size-4 mr-2" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="size-4 mr-2" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="size-4 mr-2" /> Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
