import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { crmService, type Lead } from "@/lib/crm-service";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/crm/cells";
import { ArrowLeft, Edit, Trash2, UserPlus, MessageSquare, Calendar, Clock } from "lucide-react";
import { DeleteLeadModal } from "@/components/leads/DeleteLeadModal";
import { LeadActivityTimeline } from "@/components/leads/LeadActivityTimeline";
import { LeadNotesSection } from "@/components/leads/LeadNotesSection";

export const Route = createFileRoute("/_app/leads/$id")({
  head: () => ({ meta: [{ title: "Lead Details — Pulse CRM" }] }),
  component: LeadDetailsPage,
});

function LeadDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    crmService.getLeadById(id).then((data) => {
      setLead(data);
      setLoading(false);
    });
  }, [id]);

  const handleDelete = async () => {
    await crmService.deleteLead(id);
    navigate({ to: "/leads" });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6 max-w-5xl">
          <div className="h-8 bg-muted rounded w-1/3" />
          <div className="h-64 bg-muted rounded" />
          <div className="h-48 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Lead not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate({ to: "/leads" })}>
          Back to Leads
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-300 mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/leads" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
                {lead.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">{lead.name}</h1>
                <p className="text-muted-foreground">{lead.company}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <StatusBadge value={lead.status} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate({ to: "/leads/edit/$id", params: { id } })}
          >
            <Edit className="size-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setShowDeleteModal(true)}>
            <Trash2 className="size-4 mr-2" /> Delete
          </Button>
          <Button variant="outline" size="sm">
            <UserPlus className="size-4 mr-2" /> Convert
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const el = document.getElementById("notes-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <MessageSquare className="size-4 mr-2" /> Add Note
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="size-4 mr-2" /> Add Task
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const el = document.getElementById("timeline-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            <Clock className="size-4 mr-2" /> Timeline
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-y-4 text-sm">
              <div>
                <span className="text-muted-foreground">Email</span>
                <div className="font-medium">{lead.email}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Phone</span>
                <div className="font-medium">{lead.phone}</div>
              </div>
               <div>
                 <span className="text-muted-foreground">Mobile</span>
                 <div className="font-medium">{lead.phone}</div>
               </div>
               <div>
                 <span className="text-muted-foreground">Owner</span>
                 <div className="font-medium">{lead.owner}</div>
               </div>
             </div>
           </div>
 
           {/* Company Information */}
           <div className="rounded-xl border bg-card p-6">
             <h3 className="font-semibold mb-4">Company Information</h3>
             <div className="grid grid-cols-2 gap-y-4 text-sm">
               <div>
                 <span className="text-muted-foreground">Company</span>
                 <div className="font-medium">{lead.company}</div>
               </div>
               <div>
                 <span className="text-muted-foreground">Industry</span>
                 <div className="font-medium">{lead.industry || 'N/A'}</div>
               </div>
               <div>
                 <span className="text-muted-foreground">Website</span>
                 <div className="font-medium text-blue-600">
                   {lead.website ? (
                     <a href={lead.website} target="_blank" rel="noreferrer" className="hover:underline">
                       {lead.website}
                     </a>
                   ) : (
                     'N/A'
                   )}
                 </div>
               </div>
               <div>
                 <span className="text-muted-foreground">Revenue</span>
                 <div className="font-medium">₹{lead.value.toLocaleString()}</div>
               </div>
             </div>
           </div>
 
           {/* Address */}
           <div className="rounded-xl border bg-card p-6">
             <h3 className="font-semibold mb-4">Address</h3>
             <div className="text-sm space-y-1">
               <div>{lead.address || 'N/A'}</div>
               <div>{lead.city ? `${lead.city}, ${lead.state || ''} ${lead.zipCode || ''}` : 'N/A'}</div>
               <div>{lead.country || ''}</div>
             </div>
           </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6">
            <h3 className="font-semibold mb-4">Lead Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="font-medium">{lead.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <StatusBadge value={lead.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Value</span>
                <span className="font-medium">₹{lead.value.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div id="timeline-section">
            <LeadActivityTimeline leadId={id} activities={lead?.activities} />
          </div>
          <LeadNotesSection />
        </div>
      </div>

      <DeleteLeadModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        leadName={lead.name}
      />
    </div>
  );
}
