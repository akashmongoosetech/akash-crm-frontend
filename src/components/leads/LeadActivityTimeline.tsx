import { useEffect, useState } from "react";
import { Clock, User } from "lucide-react";

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface LeadActivityTimelineProps {
  leadId?: string;
  activities?: Array<{ user: string; action: string; time: string; iconType?: string }>;
}

export function LeadActivityTimeline({ leadId, activities: propActivities }: LeadActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (propActivities && propActivities.length > 0) {
      const mapped = propActivities.map((a, idx) => ({
        id: idx + 1,
        user: a.user,
        action: a.action,
        time: a.time,
        icon: a.iconType === 'User' ? User : Clock,
      }));
      setActivities(mapped);
      return;
    }
    // Fallback if no real activities
    setActivities([]);
  }, [leadId, propActivities]);

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
