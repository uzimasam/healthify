import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, Package, TrendingUp } from "lucide-react";

const alerts = [
    {
        id: 1,
        type: "stock",
        message: "Surgical Masks stock below minimum threshold",
        severity: "high",
        timestamp: "2024-03-15 09:30",
        icon: Package,
        action: "Place Order",
    },
    {
        id: 2,
        type: "usage",
        message: "Unusual increase in Surgical Gloves consumption",
        severity: "medium",
        timestamp: "2024-03-15 08:45",
        icon: TrendingUp,
        action: "View Analysis",
    },
];

export function HospitalAlerts() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {alerts.map((alert) => (
                        <div
                            key={alert.id}
                            className="flex items-center justify-between p-4 border rounded-lg"
                        >
                            <div className="flex items-center gap-4">
                                <alert.icon className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">{alert.message}</p>
                                    <p className="text-sm text-gray-500">{alert.timestamp}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge
                                    variant={
                                        alert.severity === "high"
                                            ? "destructive"
                                            : alert.severity === "medium"
                                                ? "secondary"
                                                : "default"
                                    }
                                >
                                    {alert.severity}
                                </Badge>
                                <Button variant="outline" size="sm">
                                    {alert.action}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}