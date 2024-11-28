import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fetchActiveOrders } from "@/lib/api/orders";
import { AlertCircle } from "lucide-react";

interface OrderItem {
    name: string;
    quantity: number;
    unit: string;
}

interface ActiveOrder {
    id: string;
    items: OrderItem[];
    supplier: string;
    orderDate: string;
    expectedDelivery: string;
    status: string;
    priority: string;
}

export function HospitalActiveOrders() {
    const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadActiveOrders() {
            try {
                setIsLoading(true);
                const data = await fetchActiveOrders();
                setActiveOrders(data);
                setError(null);
            } catch (err) {
                setError('Failed to load active orders. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        }

        loadActiveOrders();
    }, []);

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center">
                        <span className="text-gray-500">Loading active orders...</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-red-500">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Expected Delivery</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="text-sm">
                                                {item.quantity} {item.unit} {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{order.supplier}</TableCell>
                                <TableCell>{order.orderDate}</TableCell>
                                <TableCell>{order.expectedDelivery}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            order.status === "processing"
                                                ? "secondary"
                                                : "default"
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={order.priority === "high" ? "destructive" : "secondary"}
                                    >
                                        {order.priority}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                        {activeOrders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-gray-500">
                                    No active orders found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}