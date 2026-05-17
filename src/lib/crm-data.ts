export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: "Web" | "Referral" | "Cold Call" | "Campaign" | "Partner";
  status: "New" | "Contacted" | "Qualified" | "Lost";
  owner: string;
  value: number;
  createdAt: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  account: string;
  title: string;
  owner: string;
  createdAt: string;
};

export type Account = {
  id: string;
  name: string;
  industry: string;
  employees: number;
  revenue: number;
  phone: string;
  website: string;
  owner: string;
};

export type Deal = {
  id: string;
  name: string;
  account: string;
  amount: number;
  stage:
    | "Qualification"
    | "Needs Analysis"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";
  closeDate: string;
  owner: string;
  probability: number;
};

export type Task = {
  id: string;
  subject: string;
  due: string;
  priority: "High" | "Normal" | "Low";
  status: "Open" | "In Progress" | "Completed";
  owner: string;
  related: string;
};

const owners = [
  "Aarav Mehta",
  "Priya Shah",
  "Liam Carter",
  "Noah Kim",
  "Emma Wilson",
  "Sofia Garcia",
  "Yuki Tanaka",
];
const companies = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Hooli",
  "Soylent",
  "Vandelay",
  "Wayne Enterprises",
  "Stark Industries",
  "Wonka Inc",
  "Pied Piper",
  "Massive Dynamic",
];
const industries = [
  "SaaS",
  "Finance",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Education",
  "Logistics",
  "Media",
];

const pick = <T>(a: T[], i: number) => a[i % a.length];
const rnd = (seed: number) => (Math.sin(seed) + 1) / 2;

export const leads: Lead[] = Array.from({ length: 32 }, (_, i) => ({
  id: `LD-${1000 + i}`,
  name: [
    "Olivia Bennett",
    "Ethan Wright",
    "Ava Patel",
    "Mason Cole",
    "Isabella Cruz",
    "Lucas Reed",
    "Mia Chen",
    "Henry Park",
    "Charlotte Diaz",
    "Jack Rivera",
    "Amelia Khan",
    "James Brooks",
  ][i % 12],
  company: pick(companies, i),
  email: `lead${i + 1}@${pick(companies, i).toLowerCase().replace(/\W/g, "")}.com`,
  phone: `+1 415 555 0${100 + i}`,
  source: (["Web", "Referral", "Cold Call", "Campaign", "Partner"] as const)[i % 5],
  status: (["New", "Contacted", "Qualified", "Lost"] as const)[i % 4],
  owner: pick(owners, i),
  value: Math.round(rnd(i + 1) * 80000 + 5000),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export const contacts: Contact[] = Array.from({ length: 24 }, (_, i) => ({
  id: `CT-${2000 + i}`,
  name: [
    "Sarah Johnson",
    "Michael Lee",
    "Emily Davis",
    "David Wilson",
    "Jessica Brown",
    "Daniel Martinez",
    "Laura Anderson",
    "Kevin Thomas",
  ][i % 8],
  email: `contact${i + 1}@${pick(companies, i).toLowerCase().replace(/\W/g, "")}.com`,
  phone: `+1 212 555 0${200 + i}`,
  account: pick(companies, i),
  title: ["VP Sales", "CTO", "Head of Ops", "Director", "Manager", "CEO", "CFO"][i % 7],
  owner: pick(owners, i),
  createdAt: new Date(Date.now() - i * 86400000).toISOString(),
}));

export const accounts: Account[] = companies.map((name, i) => ({
  id: `AC-${3000 + i}`,
  name,
  industry: pick(industries, i),
  employees: Math.round(rnd(i + 10) * 5000 + 50),
  revenue: Math.round(rnd(i + 20) * 50_000_000 + 1_000_000),
  phone: `+1 408 555 0${300 + i}`,
  website: `${name.toLowerCase().replace(/\W/g, "")}.com`,
  owner: pick(owners, i),
}));

const stages = [
  "Qualification",
  "Needs Analysis",
  "Proposal",
  "Negotiation",
  "Closed Won",
  "Closed Lost",
] as const;
export const deals: Deal[] = Array.from({ length: 28 }, (_, i) => ({
  id: `DL-${4000 + i}`,
  name: `${pick(companies, i)} - ${["Annual Plan", "Enterprise", "Renewal", "Expansion", "Pilot", "Onboarding"][i % 6]}`,
  account: pick(companies, i),
  amount: Math.round(rnd(i + 30) * 200000 + 10000),
  stage: stages[i % stages.length],
  closeDate: new Date(Date.now() + (i - 5) * 86400000 * 3).toISOString(),
  owner: pick(owners, i),
  probability: [20, 40, 60, 80, 100, 0][i % 6],
}));

export const tasks: Task[] = Array.from({ length: 18 }, (_, i) => ({
  id: `TK-${5000 + i}`,
  subject: [
    "Follow up call",
    "Send proposal",
    "Demo meeting",
    "Contract review",
    "Discovery call",
    "Quarterly check-in",
    "Send pricing",
    "Schedule onboarding",
  ][i % 8],
  due: new Date(Date.now() + (i - 3) * 86400000).toISOString(),
  priority: (["High", "Normal", "Low"] as const)[i % 3],
  status: (["Open", "In Progress", "Completed"] as const)[i % 3],
  owner: pick(owners, i),
  related: pick(companies, i),
}));

export const kpis = [
  { label: "Revenue this quarter", value: "$1.24M", delta: 12.4, trend: "up" as const },
  { label: "Open deals", value: "184", delta: 4.1, trend: "up" as const },
  { label: "New leads", value: "327", delta: -2.3, trend: "down" as const },
  { label: "Win rate", value: "62%", delta: 5.8, trend: "up" as const },
];

export const revenueSeries = [
  { m: "Jan", revenue: 82000, target: 90000 },
  { m: "Feb", revenue: 95000, target: 95000 },
  { m: "Mar", revenue: 102000, target: 100000 },
  { m: "Apr", revenue: 118000, target: 105000 },
  { m: "May", revenue: 134000, target: 115000 },
  { m: "Jun", revenue: 142000, target: 125000 },
  { m: "Jul", revenue: 158000, target: 140000 },
  { m: "Aug", revenue: 171000, target: 150000 },
  { m: "Sep", revenue: 165000, target: 160000 },
  { m: "Oct", revenue: 188000, target: 170000 },
  { m: "Nov", revenue: 204000, target: 185000 },
  { m: "Dec", revenue: 226000, target: 200000 },
];

export const pipelineByStage = stages.slice(0, 4).map((s, i) => ({
  stage: s,
  value: [420000, 310000, 245000, 180000][i],
}));

export const sourcesData = [
  { name: "Web", value: 38 },
  { name: "Referral", value: 24 },
  { name: "Campaign", value: 18 },
  { name: "Cold Call", value: 12 },
  { name: "Partner", value: 8 },
];

export const activities = [
  {
    who: "Priya Shah",
    action: "closed deal",
    target: "Acme Corp – Enterprise",
    time: "2m ago",
    type: "won" as const,
  },
  {
    who: "Liam Carter",
    action: "added a note on",
    target: "Globex Lead",
    time: "18m ago",
    type: "note" as const,
  },
  {
    who: "Aarav Mehta",
    action: "scheduled a call with",
    target: "Wayne Enterprises",
    time: "1h ago",
    type: "call" as const,
  },
  {
    who: "Emma Wilson",
    action: "sent proposal to",
    target: "Stark Industries",
    time: "3h ago",
    type: "email" as const,
  },
  {
    who: "Yuki Tanaka",
    action: "qualified lead",
    target: "Hooli",
    time: "5h ago",
    type: "lead" as const,
  },
  {
    who: "Sofia Garcia",
    action: "completed task",
    target: "Quarterly check-in",
    time: "Yesterday",
    type: "task" as const,
  },
];
