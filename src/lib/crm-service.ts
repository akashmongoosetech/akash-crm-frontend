import { api } from "@/lib/api";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  owner: string;
  value: number;
  createdAt: string;
}

export type LeadSource =
  | "Web"
  | "Referral"
  | "Cold Call"
  | "Campaign"
  | "Partner"
  | "Website"
  | "Trade Show"
  | "Other";
export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost" | "Converted" | "Unqualified";

export interface LeadFormData {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  leadSource: LeadSource;
  leadStatus: LeadStatus;
  industry: string;
  website: string;
  annualRevenue: string;
  noOfEmployees: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  assignedUser: string;
  tags: string;
  description: string;
  notes: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  mobileNumber: string;
  phone: string;
  account: string;
  title: string;
  department: string;
  leadSource: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  owner: string;
  tags: string;
  description: string;
  notes: string;
  createdAt: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  phoneNumber: string;
  account: string;
  title: string;
  department: string;
  leadSource: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  owner: string;
  tags: string;
  description: string;
  notes: string;
}

export interface Account {
  id: string;
  name: string;
  industry: string;
  employees: number;
  revenue: number;
  phone: string;
  alternatePhone: string;
  email: string;
  website: string;
  accountType: string;
  parentAccount: string;
  billingAddress: string;
  shippingAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  taxNumber: string;
  gstNumber: string;
  owner: string;
  tags: string;
  description: string;
  notes: string;
  createdAt: string;
}

export interface AccountFormData {
  name: string;
  industry: string;
  employees: number;
  revenue: number;
  phone: string;
  alternatePhone: string;
  email: string;
  website: string;
  accountType: string;
  parentAccount: string;
  billingAddress: string;
  shippingAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  taxNumber: string;
  gstNumber: string;
  owner: string;
  tags: string;
  description: string;
  notes: string;
}

export interface Deal {
  id: string;
  name: string;
  account: string;
  contactPerson: string;
  leadSource: string;
  pipeline: string;
  stage: "Qualification" | "Needs Analysis" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
  amount: number;
  currency: string;
  probability: number;
  closeDate: string;
  owner: string;
  priority: string;
  dealType: string;
  description: string;
  notes: string;
  tags: string;
}

export interface DealFormData {
  name: string;
  account: string;
  contactPerson: string;
  leadSource: string;
  stage: Deal["stage"];
  amount: number;
  probability: number;
  closeDate: string;
  owner: string;
  priority: string;
  dealType: string;
  description: string;
  notes: string;
  tags: string;
}

export interface Task {
  id: string;
  subject: string;
  description: string;
  type: string;
  priority: "High" | "Medium" | "Low" | "Urgent";
  status: "Pending" | "In Progress" | "Review" | "Completed" | "Cancelled";
  assignedTo: string;
  assignedBy: string;
  relatedLead: string;
  relatedContact: string;
  relatedDeal: string;
  relatedAccount: string;
  startDate: string;
  due: string;
  dueTime: string;
  reminder: string;
  estimatedHours: number;
  progress: number;
  tags: string;
  owner: string;
  related: string;
  createdAt: string;
}

export interface TaskFormData {
  subject: string;
  description: string;
  type: string;
  priority: Task["priority"];
  status: Task["status"];
  assignedTo: string;
  relatedLead: string;
  relatedContact: string;
  relatedDeal: string;
  relatedAccount: string;
  startDate: string;
  due: string;
  dueTime: string;
  reminder: string;
  estimatedHours: number;
  progress: number;
  tags: string;
}

export interface DashboardData {
  kpis: Array<{ label: string; value: string; delta: number; trend: "up" | "down" }>;
  revenueSeries: Array<{ m: string; revenue: number; target: number }>;
  pipelineByStage: Array<{ stage: string; value: number }>;
  sourcesData: Array<{ name: string; value: number }>;
  activities: Array<{
    who: string;
    action: string;
    target: string;
    time: string;
    type: "won" | "note" | "call" | "email" | "lead" | "task";
  }>;
  topDeals: Deal[];
}

const generateMockData = () => {
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

  const leads: Lead[] = Array.from({ length: 32 }, (_, i) => ({
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

  const contacts: Contact[] = Array.from({ length: 24 }, (_, i) => {
    const firstName = ["Sarah", "Michael", "Emily", "David", "Jessica", "Daniel", "Laura", "Kevin"][i % 8];
    const lastName = ["Johnson", "Lee", "Davis", "Wilson", "Brown", "Martinez", "Anderson", "Thomas"][i % 8];
    return {
      id: `CT-${2000 + i}`,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${pick(companies, i).toLowerCase().replace(/\W/g, "")}.com`,
      mobileNumber: `+1 415 555 0${300 + i}`,
      phone: `+1 212 555 0${200 + i}`,
      account: pick(companies, i),
      title: ["VP Sales", "CTO", "Head of Ops", "Director", "Manager", "CEO", "CFO"][i % 7],
      department: ["Sales", "Engineering", "Marketing", "Operations"][i % 4],
      leadSource: ["Web", "Referral", "Event", "LinkedIn"][i % 4],
      website: `https://${pick(companies, i).toLowerCase().replace(/\W/g, "")}.com`,
      address: `${100 + i} Business Park`,
      city: ["San Francisco", "New York", "Austin", "Seattle"][i % 4],
      state: ["CA", "NY", "TX", "WA"][i % 4],
      country: "United States",
      zipCode: `${94000 + i}`,
      owner: pick(owners, i),
      tags: ["key-contact", "decision-maker"][i % 2],
      description: "Key decision maker for enterprise deals.",
      notes: "Prefers email communication.",
      createdAt: new Date(Date.now() - i * 86400000).toISOString(),
    };
  });

  const accounts: Account[] = companies.map((name, i) => ({
    id: `AC-${3000 + i}`,
    name,
    industry: pick(industries, i),
    employees: Math.round(rnd(i + 10) * 5000 + 50),
    revenue: Math.round(rnd(i + 20) * 50_000_000 + 1_000_000),
    phone: `+1 408 555 0${300 + i}`,
    alternatePhone: `+1 650 555 0${400 + i}`,
    email: `info@${name.toLowerCase().replace(/\W/g, "")}.com`,
    website: `https://${name.toLowerCase().replace(/\W/g, "")}.com`,
    accountType: ["Customer", "Prospect", "Partner"][i % 3],
    parentAccount: i % 4 === 0 ? pick(companies, i + 1) : "",
    billingAddress: `${100 + i} Corporate Blvd`,
    shippingAddress: `${100 + i} Corporate Blvd`,
    city: ["San Francisco", "New York", "Austin", "Seattle"][i % 4],
    state: ["CA", "NY", "TX", "WA"][i % 4],
    country: "United States",
    zipCode: `${94000 + i}`,
    taxNumber: `TXN-${100000 + i}`,
    gstNumber: `GST-${200000 + i}`,
    owner: pick(owners, i),
    tags: ["strategic", "key-account"][i % 2],
    description: "Major enterprise account with strong growth potential.",
    notes: "Quarterly business review scheduled.",
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));

  const stages = [
    "Qualification",
    "Needs Analysis",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ] as const;
  const deals: Deal[] = Array.from({ length: 28 }, (_, i) => ({
    id: `DL-${4000 + i}`,
    name: `${pick(companies, i)} - ${["Annual Plan", "Enterprise", "Renewal", "Expansion", "Pilot", "Onboarding"][i % 6]}`,
    account: pick(companies, i),
    contactPerson: ["John Smith", "Sarah Johnson", "Michael Chen", "Emily Davis", "Robert Kim"][i % 5],
    leadSource: ["Web", "Referral", "Cold Call", "Campaign", "Partner"][i % 5],
    pipeline: "Sales Pipeline",
    stage: stages[i % stages.length],
    amount: Math.round(rnd(i + 30) * 200000 + 10000),
    currency: "USD",
    probability: [20, 40, 60, 80, 100, 0][i % 6],
    closeDate: new Date(Date.now() + (i - 5) * 86400000 * 3).toISOString(),
    owner: pick(owners, i),
    priority: ["High", "Medium", "Low"][i % 3],
    dealType: ["New Business", "Renewal", "Upsell"][i % 3],
    description: "Enterprise deal with strong potential for long-term partnership.",
    notes: "Follow up scheduled for next week.",
    tags: ["enterprise", "high-value", "priority"][i % 3],
  }));

  const tasks: Task[] = Array.from({ length: 18 }, (_, i) => ({
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
    description: "Complete this task as per the project timeline.",
    type: ["Call", "Meeting", "Email", "Task"][i % 4],
    priority: (["High", "Medium", "Low", "Urgent"] as const)[i % 4],
    status: (["Pending", "In Progress", "Review", "Completed"] as const)[i % 4],
    assignedTo: pick(owners, i),
    assignedBy: pick(owners, (i + 2) % owners.length),
    relatedLead: `LD-${1000 + (i % 12)}`,
    relatedContact: `CT-${2000 + (i % 8)}`,
    relatedDeal: `DL-${4000 + (i % 10)}`,
    relatedAccount: pick(companies, i),
    startDate: new Date(Date.now() - (i % 5) * 86400000).toISOString(),
    due: new Date(Date.now() + (i - 3) * 86400000).toISOString(),
    dueTime: "10:00",
    reminder: "1 day before",
    estimatedHours: 2 + (i % 4),
    progress: [0, 25, 50, 75, 100][i % 5],
    tags: ["urgent", "client-facing"][i % 2],
    owner: pick(owners, i),
    related: pick(companies, i),
    createdAt: new Date(Date.now() - i * 86400000).toISOString(),
  }));

  const kpis = [
    { label: "Revenue this quarter", value: "$1.24M", delta: 12.4, trend: "up" as const },
    { label: "Open deals", value: "184", delta: 4.1, trend: "up" as const },
    { label: "New leads", value: "327", delta: -2.3, trend: "down" as const },
    { label: "Win rate", value: "62%", delta: 5.8, trend: "up" as const },
  ];

  const revenueSeries = [
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

  const pipelineByStage = stages.slice(0, 4).map((s, i) => ({
    stage: s,
    value: [420000, 310000, 245000, 180000][i],
  }));

  const sourcesData = [
    { name: "Web", value: 38 },
    { name: "Referral", value: 24 },
    { name: "Campaign", value: 18 },
    { name: "Cold Call", value: 12 },
    { name: "Partner", value: 8 },
  ];

  const activities = [
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

  return {
    leads,
    contacts,
    accounts,
    deals,
    tasks,
    kpis,
    revenueSeries,
    pipelineByStage,
    sourcesData,
    activities,
  };
};

let mockData: ReturnType<typeof generateMockData> | null = null;

const getMockData = () => {
  if (!mockData) {
    mockData = generateMockData();
  }
  return mockData;
};

export const crmService = {
  async getDashboardData(): Promise<DashboardData> {
    const data = getMockData();
    return {
      kpis: data.kpis,
      revenueSeries: data.revenueSeries,
      pipelineByStage: data.pipelineByStage,
      sourcesData: data.sourcesData,
      activities: data.activities,
      topDeals: data.deals.slice(0, 5),
    };
  },

  async getLeads(): Promise<Lead[]> {
    const response = await api.get<{ leads: any[]; pagination: any }>("/leads");
    return response.data?.leads.map((lead: any) => ({
      id: lead._id,
      name: `${lead.firstName} ${lead.lastName}`,
      company: lead.companyName,
      email: lead.email,
      phone: lead.mobileNumber || lead.phoneNumber || "",
      source: lead.leadSource,
      status: lead.leadStatus,
      owner: lead.assignedUser || lead.createdBy?.firstName + " " + lead.createdBy?.lastName || "",
      value: parseInt(lead.annualRevenue?.replace(/[^0-9]/g, "") || "0") || 0,
      createdAt: lead.createdAt,
    })) || [];
  },

  async getContacts(): Promise<Contact[]> {
    const data = getMockData();
    return data.contacts;
  },

  async getContactById(id: string): Promise<Contact | null> {
    const data = getMockData();
    return data.contacts.find((c) => c.id === id) ?? null;
  },

  async createContact(formData: ContactFormData): Promise<Contact> {
    const data = getMockData();
    const newId = `CT-${2000 + data.contacts.length}`;
    const newContact: Contact = {
      id: newId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      phone: formData.phoneNumber,
      account: formData.account,
      title: formData.title,
      department: formData.department || "",
      leadSource: formData.leadSource || "",
      website: formData.website || "",
      address: formData.address || "",
      city: formData.city || "",
      state: formData.state || "",
      country: formData.country || "",
      zipCode: formData.zipCode || "",
      owner: formData.owner,
      tags: formData.tags || "",
      description: formData.description || "",
      notes: formData.notes || "",
      createdAt: new Date().toISOString(),
    };
    data.contacts.unshift(newContact);
    return newContact;
  },

  async updateContact(id: string, formData: ContactFormData): Promise<Contact> {
    const data = getMockData();
    const index = data.contacts.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Contact not found");

    const updated: Contact = {
      ...data.contacts[index],
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      phone: formData.phoneNumber,
      account: formData.account,
      title: formData.title,
      owner: formData.owner,
    };
    data.contacts[index] = updated;
    return updated;
  },

  async deleteContact(id: string): Promise<void> {
    const data = getMockData();
    const index = data.contacts.findIndex((c) => c.id === id);
    if (index !== -1) data.contacts.splice(index, 1);
  },

  async getAccounts(): Promise<Account[]> {
    const data = getMockData();
    return data.accounts;
  },

  async getAccountById(id: string): Promise<Account | null> {
    const data = getMockData();
    return data.accounts.find((a) => a.id === id) ?? null;
  },

  async createAccount(formData: AccountFormData): Promise<Account> {
    const data = getMockData();
    const newId = `AC-${3000 + data.accounts.length}`;
    const newAccount: Account = {
      id: newId,
      name: formData.name,
      industry: formData.industry,
      employees: formData.employees,
      revenue: formData.revenue,
      phone: formData.phone,
      alternatePhone: formData.alternatePhone || "",
      email: formData.email || "",
      website: formData.website,
      accountType: formData.accountType || "Customer",
      parentAccount: formData.parentAccount || "",
      billingAddress: formData.billingAddress || "",
      shippingAddress: formData.shippingAddress || "",
      city: formData.city || "",
      state: formData.state || "",
      country: formData.country || "",
      zipCode: formData.zipCode || "",
      taxNumber: formData.taxNumber || "",
      gstNumber: formData.gstNumber || "",
      owner: formData.owner,
      tags: formData.tags || "",
      description: formData.description || "",
      notes: formData.notes || "",
      createdAt: new Date().toISOString(),
    };
    data.accounts.unshift(newAccount);
    return newAccount;
  },

  async updateAccount(id: string, formData: AccountFormData): Promise<Account> {
    const data = getMockData();
    const index = data.accounts.findIndex((a) => a.id === id);
    if (index === -1) throw new Error("Account not found");

    const updated: Account = {
      ...data.accounts[index],
      name: formData.name,
      industry: formData.industry,
      employees: formData.employees,
      revenue: formData.revenue,
      phone: formData.phone,
      owner: formData.owner,
    };
    data.accounts[index] = updated;
    return updated;
  },

  async deleteAccount(id: string): Promise<void> {
    const data = getMockData();
    const index = data.accounts.findIndex((a) => a.id === id);
    if (index !== -1) data.accounts.splice(index, 1);
  },

  async getDeals(): Promise<Deal[]> {
    const data = getMockData();
    return data.deals;
  },

  async getTasks(): Promise<Task[]> {
    const data = getMockData();
    return data.tasks;
  },

  async getTaskById(id: string): Promise<Task | null> {
    const data = getMockData();
    return data.tasks.find((t) => t.id === id) ?? null;
  },

  async createTask(formData: TaskFormData): Promise<Task> {
    const data = getMockData();
    const newId = `TK-${5000 + data.tasks.length}`;
    const newTask: Task = {
      id: newId,
      subject: formData.subject,
      description: formData.description || "",
      type: formData.type || "Task",
      priority: formData.priority,
      status: formData.status,
      assignedTo: formData.assignedTo,
      assignedBy: formData.assignedTo,
      relatedLead: formData.relatedLead || "",
      relatedContact: formData.relatedContact || "",
      relatedDeal: formData.relatedDeal || "",
      relatedAccount: formData.relatedAccount || "",
      startDate: formData.startDate,
      due: formData.due,
      dueTime: formData.dueTime || "",
      reminder: formData.reminder || "",
      estimatedHours: formData.estimatedHours || 1,
      progress: formData.progress || 0,
      tags: formData.tags || "",
      owner: formData.assignedTo,
      related: formData.relatedAccount || "",
      createdAt: new Date().toISOString(),
    };
    data.tasks.unshift(newTask);
    return newTask;
  },

  async updateTask(id: string, formData: TaskFormData): Promise<Task> {
    const data = getMockData();
    const index = data.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error("Task not found");

    const updated: Task = {
      ...data.tasks[index],
      subject: formData.subject,
      priority: formData.priority,
      status: formData.status,
      due: formData.due,
      progress: formData.progress,
      owner: formData.assignedTo,
    };
    data.tasks[index] = updated;
    return updated;
  },

  async deleteTask(id: string): Promise<void> {
    const data = getMockData();
    const index = data.tasks.findIndex((t) => t.id === id);
    if (index !== -1) data.tasks.splice(index, 1);
  },

  async getDealById(id: string): Promise<Deal | null> {
    const data = getMockData();
    return data.deals.find((d) => d.id === id) ?? null;
  },

  async createDeal(formData: DealFormData): Promise<Deal> {
    const data = getMockData();
    const newId = `DL-${4000 + data.deals.length}`;
    const newDeal: Deal = {
      id: newId,
      name: formData.name,
      account: formData.account,
      contactPerson: formData.contactPerson || "",
      leadSource: formData.leadSource || "Web",
      pipeline: "Sales Pipeline",
      stage: formData.stage,
      amount: formData.amount,
      currency: "USD",
      probability: formData.probability,
      closeDate: formData.closeDate,
      owner: formData.owner,
      priority: formData.priority || "Medium",
      dealType: formData.dealType || "New Business",
      description: formData.description || "",
      notes: formData.notes || "",
      tags: formData.tags || "",
    };
    data.deals.unshift(newDeal);
    return newDeal;
  },

  async updateDeal(id: string, formData: DealFormData): Promise<Deal> {
    const data = getMockData();
    const index = data.deals.findIndex((d) => d.id === id);
    if (index === -1) throw new Error("Deal not found");

    const updated: Deal = {
      ...data.deals[index],
      name: formData.name,
      account: formData.account,
      contactPerson: formData.contactPerson || "",
      leadSource: formData.leadSource || data.deals[index].leadSource,
      stage: formData.stage,
      amount: formData.amount,
      probability: formData.probability,
      closeDate: formData.closeDate,
      owner: formData.owner,
      priority: formData.priority || data.deals[index].priority,
      dealType: formData.dealType || data.deals[index].dealType,
      description: formData.description || data.deals[index].description,
      notes: formData.notes || data.deals[index].notes,
      tags: formData.tags || data.deals[index].tags,
    };
    data.deals[index] = updated;
    return updated;
  },

  async deleteDeal(id: string): Promise<void> {
    const data = getMockData();
    const index = data.deals.findIndex((d) => d.id === id);
    if (index !== -1) data.deals.splice(index, 1);
  },

  async getLeadById(id: string): Promise<Lead | null> {
    const response = await api.get<any>(`/leads/${id}`);
    const lead = response.data;
    if (!lead) return null;
    return {
      id: lead._id,
      name: `${lead.firstName} ${lead.lastName}`,
      company: lead.companyName,
      email: lead.email,
      phone: lead.mobileNumber || lead.phoneNumber || "",
      source: lead.leadSource,
      status: lead.leadStatus,
      owner: lead.assignedUser || "",
      value: parseInt(lead.annualRevenue?.replace(/[^0-9]/g, "") || "0") || 0,
      createdAt: lead.createdAt,
    };
  },

  async getLeadFormData(id: string): Promise<LeadFormData | null> {
    const response = await api.get<any>(`/leads/${id}`);
    const lead = response.data;
    if (!lead) return null;
    return {
      firstName: lead.firstName || "",
      lastName: lead.lastName || "",
      companyName: lead.companyName || "",
      email: lead.email || "",
      mobileNumber: lead.mobileNumber || "",
      phoneNumber: lead.phoneNumber || "",
      leadSource: lead.leadSource || "Web",
      leadStatus: lead.leadStatus || "New",
      industry: lead.industry || "",
      website: lead.website || "",
      annualRevenue: lead.annualRevenue || "",
      noOfEmployees: lead.noOfEmployees || "",
      address: lead.address || "",
      city: lead.city || "",
      state: lead.state || "",
      country: lead.country || "",
      zipCode: lead.zipCode || "",
      assignedUser: lead.assignedUser || "",
      tags: lead.tags || "",
      description: lead.description || "",
      notes: lead.notes || "",
    };
  },

  async createLead(formData: LeadFormData): Promise<Lead> {
    const response = await api.post<any>("/leads", formData);
    const lead = response.data;
    return {
      id: lead._id,
      name: `${lead.firstName} ${lead.lastName}`,
      company: lead.companyName,
      email: lead.email,
      phone: lead.mobileNumber || lead.phoneNumber || "",
      source: lead.leadSource,
      status: lead.leadStatus,
      owner: lead.assignedUser || "",
      value: parseInt(lead.annualRevenue?.replace(/[^0-9]/g, "") || "0") || 0,
      createdAt: lead.createdAt,
    };
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },

  async updateLead(id: string, formData: LeadFormData): Promise<Lead> {
    const response = await api.put<any>(`/leads/${id}`, formData);
    const lead = response.data;
    return {
      id: lead._id,
      name: `${lead.firstName} ${lead.lastName}`,
      company: lead.companyName,
      email: lead.email,
      phone: lead.mobileNumber || lead.phoneNumber || "",
      source: lead.leadSource,
      status: lead.leadStatus,
      owner: lead.assignedUser || "",
      value: parseInt(lead.annualRevenue?.replace(/[^0-9]/g, "") || "0") || 0,
      createdAt: lead.createdAt,
    };
  },
};

export default crmService;
