import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { StatCard } from "@/components/crm/StatCard";
import { OwnerCell } from "@/components/crm/cells";
import { crmService, type DashboardData } from "@/lib/crm-service";
import { useAuthStore } from "@/modules/auth/store";
import {
  Briefcase,
  DollarSign,
  Target,
  Users,
  MoreHorizontal,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  UserPlus,
  StickyNote,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/")({
  head: () => ({ meta: [{ title: "Home — Pulse CRM" }] }),
  component: Home,
});

const icons = [DollarSign, Briefcase, Users, Target];
const accents = ["primary", "info", "warning", "success"] as const;

const activityIcon = {
  won: CheckCircle2,
  note: StickyNote,
  call: Phone,
  email: Mail,
  lead: UserPlus,
  task: CheckCircle2,
};

function Home() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    crmService.getDashboardData().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return <div className="p-6">Loading...</div>;
  }

  const { kpis, revenueSeries, pipelineByStage, sourcesData, activities, topDeals } = data;
  const COLORS = [
    "oklch(0.58 0.21 25)",
    "oklch(0.62 0.17 240)",
    "oklch(0.65 0.16 155)",
    "oklch(0.78 0.16 75)",
    "oklch(0.6 0.18 300)",
  ];
  const greeting = user?.firstName ? `Good morning, ${user.firstName}` : "Good morning";

  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{greeting}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here's what's happening with your pipeline today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Last 30 days
          </Button>
          <Button size="sm">Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <StatCard key={k.label} {...k} icon={icons[i]} accent={accents[i]} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold">Revenue vs Target</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly performance</p>
            </div>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueSeries} margin={{ top: 5, right: 8, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.21 25)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.58 0.21 25)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tgt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.62 0.17 240)" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="oklch(0.62 0.17 240)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.92 0.005 255)"
                vertical={false}
              />
              <XAxis
                dataKey="m"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "oklch(0.52 0.015 255)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "oklch(0.52 0.015 255)" }}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid oklch(0.92 0.005 255)",
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="oklch(0.62 0.17 240)"
                strokeWidth={2}
                fill="url(#tgt)"
                strokeDasharray="4 4"
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="oklch(0.58 0.21 25)"
                strokeWidth={2.5}
                fill="url(#rev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold">Lead sources</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Where deals come from</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={sourcesData}
                dataKey="value"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
              >
                {sourcesData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  fontSize: 12,
                  border: "1px solid oklch(0.92 0.005 255)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="space-y-2 mt-2">
            {sourcesData.map((s, i) => (
              <li key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full" style={{ background: COLORS[i] }} />
                  {s.name}
                </span>
                <span className="font-medium">{s.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold mb-4">Pipeline by stage</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={pipelineByStage} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.92 0.005 255)"
                horizontal={false}
              />
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "oklch(0.52 0.015 255)" }}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <YAxis
                dataKey="stage"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "oklch(0.52 0.015 255)" }}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  fontSize: 12,
                  border: "1px solid oklch(0.92 0.005 255)",
                }}
              />
              <Bar dataKey="value" fill="oklch(0.58 0.21 25)" radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Top open deals</h3>
            <Button variant="ghost" size="sm" className="text-xs">
              View all
            </Button>
          </div>
          <ul className="divide-y divide-border">
            {topDeals.map((d) => (
              <li key={d.id} className="flex items-center gap-3 py-3">
                <div className="size-9 rounded-md bg-primary/10 text-primary grid place-items-center">
                  <Briefcase className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{d.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {d.account} · {d.stage}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">${d.amount.toLocaleString()}</div>
                  <div className="text-[11px] text-muted-foreground">{d.probability}% likely</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Recent activity</h3>
          <Button variant="ghost" size="sm" className="text-xs">
            See timeline
          </Button>
        </div>
        <ul className="space-y-1">
          {activities.map((a, i) => {
            const Icon = (activityIcon as any)[a.type] ?? FileText;
            return (
              <li
                key={i}
                className="flex items-center gap-3 px-2 py-2.5 rounded-md hover:bg-muted/40 transition-colors"
              >
                <div className="size-8 rounded-md bg-muted grid place-items-center text-muted-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="flex-1 text-sm">
                  <OwnerCell name={a.who} />
                </div>
                <div className="text-sm text-muted-foreground hidden sm:block">
                  {a.action} <span className="text-foreground font-medium">{a.target}</span>
                </div>
                <div className="text-xs text-muted-foreground">{a.time}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
