import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Bell, Clock, AlertCircle, Check } from "lucide-react";

interface NotificationsListProps {
    searchQuery: string;
    filter: "all" | "unread";
}

const notifications = [
    {
        id: 1,
        type: "order",
        title: "New Order Received",
        message: "Order #ORD-2024-001 received from Metropolitan General Hospital",
        time: "5 minutes ago",
        read: false,
        icon: Package,
        priority: "high",
    },
    {
        id: 2,
        type: "inventory",
        title: "Low Stock Alert",
        message: "Surgical Masks stock below minimum threshold",
        time: "1 hour ago",
        read: false,
        icon: AlertCircle,
        priority: "medium",
    },
    {
        id: 3,
        type: "delivery",
        title: "Delivery Completed",
        message: "Order #ORD-2024-002 successfully delivered",
        time: "2 hours ago",
        read: true,
        icon: Clock,
        priority: "low",
    },
];

export function NotificationsList({ searchQuery, filter }: NotificationsListProps) {
    const filteredNotifications = notifications
        .filter((notification) =>
            (filter === "unread" ? !notification.read : true) &&
            notification.message.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="space-y-4">
            {filteredNotifications.map((notification) => (
                <Card key={notification.id} className="p-4">
                    <div className="flex items-start gap-4">
                        <div className={`rounded-full p-2 ${notification.type === "order" ? "bg-blue-100" :
                                notification.type === "inventory" ? "bg-red-100" :
                                    "bg-green-100"
                            }`}>
                            <notification.icon className={`h-4 w-4 ${notification.type === "order" ? "text-blue-500" :
                                    notification.type === "inventory" ? "text-red-500" :
                                        "text-green-500"
                                }`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold">{notification.title}</h4>
                                    {!notification.read && (
                                        <Badge variant="secondary">New</Badge>
                                    )}
                                </div>
                                <Badge
                                    variant={
                                        notification.priority === "high" ? "destructive" :
                                            notification.priority === "medium" ? "secondary" :
                                                "default"
                                    }
                                >
                                    {notification.priority}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500">{notification.time}</span>
                                <Button variant="ghost" size="sm">
                                    <Check className="h-4 w-4 mr-2" />
                                    Mark as Read
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}