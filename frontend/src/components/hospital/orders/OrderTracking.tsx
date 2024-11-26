import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Package, Truck } from "lucide-react";

const trackingSteps = [
    { status: "Order Placed", date: "Mar 15, 2024 09:30 AM", completed: true },
    { status: "Order Confirmed", date: "Mar 15, 2024 10:15 AM", completed: true },
    { status: "Processing", date: "Mar 15, 2024 02:30 PM", completed: true },
    { status: "Out for Delivery", date: "Mar 16, 2024 08:45 AM", completed: false },
    { status: "Delivered", date: "Expected Mar 16, 2024", completed: false },
];

const orders = [
    {
        id: "ORD-2024-001",
        supplier: "MedTech Supplies Inc.",
        currentStatus: "In Transit",
        lastUpdate: "15 minutes ago",
        location: "Local Distribution Center",
        eta: "2 hours",
    },
    {
        id: "ORD-2024-002",
        supplier: "Global Healthcare Solutions",
        currentStatus: "Out for Delivery",
        lastUpdate: "45 minutes ago",
        location: "Delivery Vehicle",
        eta: "30 minutes",
    },
];

export function OrderTracking() {
    return (
        <div className="grid gap-6">
            {orders.map((order) => (
                <Card key={order.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Order {order.id}</CardTitle>
                            <Badge variant="secondary">{order.currentStatus}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Supplier:</span>
                                <span>{order.supplier}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Last Update:</span>
                                <span>{order.lastUpdate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Current Location:</span>
                                <span>{order.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">ETA:</span>
                                <span>{order.eta}</span>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute left-[1.625rem] top-0 h-full w-px bg-gray-200" />
                            <div className="space-y-6">
                                {trackingSteps.map((step, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="relative z-10">
                                            {step.completed ? (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                                </div>
                                            ) : (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                                    <Clock className="h-5 w-5 text-gray-500" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 pt-1">
                                            <div className="font-medium">{step.status}</div>
                                            <div className="text-sm text-gray-500">{step.date}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}