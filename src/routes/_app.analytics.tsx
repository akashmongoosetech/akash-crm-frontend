import { createFileRoute } from "@tanstack/react-router";
import { StatCard } from "@/components/crm/StatCard";
import { revenueSeries, sourcesData, pipelineByStage } from "@/lib/crm-data";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { TrendingUp, Target, Users, Clock } from "lucide-react";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Pulse CRM" }] }),
  component: () => {
    const COLORS = [
      "oklch(0.58 0.21 25)",
      "oklch(0.62 0.17 240)",
      "oklch(0.65 0.16 155)",
      "oklch(0.78 0.16 75)",
      "oklch(0.6 0.18 300)",
    ];
    const conv = [{ name: "Win Rate", value: 62, fill: "oklch(0.58 0.21 25)" }];
    return (
      <div className="space-y-6 max-w-[1600px]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Insights across your entire sales funnel.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Avg deal size"
            value="$24.8k"
            delta={8.2}
            trend="up"
            icon={TrendingUp}
            accent="primary"
          />
          <StatCard
            label="Sales cycle"
            value="42d"
            delta={-3.1}
            trend="down"
            icon={Clock}
            accent="info"
          />
          <StatCard
            label="Quota attainment"
            value="87%"
            delta={11.4}
            trend="up"
            icon={Target}
            accent="success"
          />
          <StatCard
            label="Active reps"
            value="24"
            delta={2.0}
            trend="up"
            icon={Users}
            accent="warning"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Revenue trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueSeries} margin={{ left: -10 }}>
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
                    fontSize: 12,
                    border: "1px solid oklch(0.92 0.005 255)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.58 0.21 25)"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="oklch(0.62 0.17 240)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 grid place-items-center">
            <h3 className="text-sm font-semibold self-start">Win rate</h3>
            <ResponsiveContainer width="100%" height={240}>
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={conv}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="-mt-44 text-center">
              <div className="text-3xl font-semibold">62%</div>
              <div className="text-xs text-muted-foreground">+5.8% vs last Q</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Pipeline value by stage</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pipelineByStage} margin={{ left: -10 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.92 0.005 255)"
                  vertical={false}
                />
                <XAxis
                  dataKey="stage"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "oklch(0.52 0.015 255)" }}
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
                    fontSize: 12,
                    border: "1px solid oklch(0.92 0.005 255)",
                  }}
                />
                <Bar dataKey="value" fill="oklch(0.58 0.21 25)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-sm font-semibold mb-4">Sources breakdown</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={sourcesData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={{ fontSize: 11 }}
                >
                  {sourcesData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  },
});
