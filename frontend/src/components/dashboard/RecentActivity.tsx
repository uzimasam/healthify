import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
    {
        id: 1,
        type: "registration",
        description: "New supplier registration: MedTech Solutions",
        time: "10 minutes ago",
    },
    {
        id: 2,
        type: "alert",
        description: "Low stock alert: Surgical masks at Metropolitan Hospital",
        time: "25 minutes ago",
    },
    {
        id: 3,
        type: "order",
        description: "Large order matched: St. Mary's Medical Center",
        time: "1 hour ago",
    },
    {
        id: 4,
        type: "system",
        description: "Automated supplier rating update completed",
        time: "2 hours ago",
    },
];

export function RecentActivity() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between space-x-4"
                        >
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {activity.description}
                                </p>
                                <p className="text-sm text-muted-foreground">{activity.time}</p>
                            </div>
                            <Badge
                                variant={
                                    activity.type === "alert"
                                        ? "destructive"
                                        : activity.type === "registration"
                                            ? "secondary"
                                            : "default"
                                }
                            >
                                {activity.type}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}