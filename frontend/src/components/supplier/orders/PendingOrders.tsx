import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import { fetchOrders } from "@/lib/api/orders";

interface OrderItem {
    name: string;
    quantity: number;
    unit: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    supplier: string;
    hospital: string;
    order_date: string;
    expected_delivery: string;
    status: string;
    priority: string;
    total: number;
}

export function PendingOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadOrders() {
            try {
                setIsLoading(true);
                const data = await fetchOrders();
                // Filter only pending orders
                const pendingOrders: Order[] = data.filter((order: Order) => order.status === "pending");
                setOrders(pendingOrders);
                setError(null);
            } catch (err) {
                setError('Failed to load pending orders. Please try again later.');
                console.error('Error loading orders:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadOrders();
    }, []);

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'destructive';
            case 'normal':
                return 'secondary';
            case 'low':
                return 'default';
            default:
                return 'secondary';
        }
    };

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-center text-red-500">
                        <p>{error}</p>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <CardTitle>Pending Orders</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Required By</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center text-gray-500 py-8"
                                >
                                    No pending orders found
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.hospital}</TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="text-sm">
                                                    {item.quantity} {item.unit} {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getPriorityBadgeVariant(order.priority)}>
                                            {order.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.order_date}</TableCell>
                                    <TableCell>{order.expected_delivery}</TableCell>
                                    <TableCell>${order.total.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button size="sm">Review</Button>
                                            <Button size="sm" variant="outline">Accept</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}