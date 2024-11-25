import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function SupplierOrders() {
    const orders = [
        {
            id: "ORD001",
            hospital: "Metropolitan General Hospital",
            items: 5,
            total: 2500,
            status: "Pending",
            date: "2024-03-15",
        },
        {
            id: "ORD002",
            hospital: "St. Mary's Medical Center",
            items: 3,
            total: 1800,
            status: "Processing",
            date: "2024-03-14",
        },
    ];

    return (
        <Card>
            <div className="p-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.hospital}</TableCell>
                                <TableCell>{order.items}</TableCell>
                                <TableCell>${order.total}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === "Pending" ? "secondary" : "default"}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}