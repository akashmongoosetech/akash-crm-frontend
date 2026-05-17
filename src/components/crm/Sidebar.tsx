import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Building2,
  Briefcase,
  CheckSquare,
  Calendar,
  Activity,
  BarChart3,
  Mail,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Phone,
  Package,
  FileText,
  ShoppingCart,
  Receipt,
  Truck,
  AlertTriangle,
  PieChart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/contacts", label: "Contacts", icon: UserSquare2 },
  { to: "/accounts", label: "Accounts", icon: Building2 },
  { to: "/deals", label: "Deals", icon: Briefcase },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/activities", label: "Activities", icon: Activity },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/mail", label: "Mail", icon: Mail },
  { to: "/chat", label: "Chat", icon: MessageSquare },
  { to: "/campaigns", label: "Campaigns", icon: Target },
  { to: "/meetings", label: "Meetings", icon: Calendar },
  { to: "/calls", label: "Calls", icon: Phone },
  { to: "/products", label: "Products", icon: Package },
  { to: "/quotes", label: "Quotes", icon: FileText },
  { to: "/sales-orders", label: "Sales Orders", icon: ShoppingCart },
  { to: "/invoices", label: "Invoices", icon: Receipt },
  { to: "/vendors", label: "Vendors", icon: Truck },
  { to: "/purchase-orders", label: "Purchase Orders", icon: FileText },
  { to: "/cases", label: "Cases", icon: AlertTriangle },
  { to: "/reports", label: "Reports", icon: PieChart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[232px]",
      )}
    >
      <div className="h-14 flex items-center gap-2 px-4 border-b border-sidebar-border">
        <div className="size-8 rounded-md bg-primary grid place-items-center text-primary-foreground shrink-0">
          <Zap className="size-4" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm text-white">Pulse CRM</span>
            <span className="text-[10px] text-sidebar-foreground/60">Enterprise</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-3 overflow-y-auto scrollbar-thin">
        {nav.map((item) => {
          const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 mx-2 my-0.5 px-3 py-2 rounded-md text-[13px] transition-colors",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-white",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r bg-primary" />
              )}
              <Icon className="size-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed((c) => !c)}
        className="m-2 h-8 rounded-md flex items-center justify-center gap-2 text-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="size-4" />
        ) : (
          <>
            <ChevronLeft className="size-4" /> Collapse
          </>
        )}
      </button>
    </aside>
  );
}
