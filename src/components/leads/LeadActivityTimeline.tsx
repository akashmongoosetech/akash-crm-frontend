import { Clock, User } from "lucide-react";

export function LeadActivityTimeline() {
  const activities = [
    { id: 1, user: "Priya Shah", action: "created the lead", time: "2 days ago", icon: User },
    {
      id: 2,
      user: "Aarav Mehta",
      action: "changed status to Contacted",
      time: "Yesterday",
      icon: Clock,
    },
    { id: 3, user: "Liam Carter", action: "added a note", time: "4h ago", icon: Clock },
  ];

  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="font-semibold mb-4">Activity Timeline</h3>
      <div className="space-y-4 text-sm">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className="mt-1">
              <div className="size-8 rounded-full bg-muted flex items-center justify-center">
                <activity.icon className="size-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <div>
                <span className="font-medium">{activity.user}</span> {activity.action}
              </div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
