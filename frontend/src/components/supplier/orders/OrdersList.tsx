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
import { Card } from "@/components/ui/card";
import { Eye, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersListProps {
    searchQuery: string;
}

const orders = [
    {
        id: "ORD-2024-001",
        hospital: "Metropolitan General Hospital",
        items: 12,
        total: 4500,
        status: "pending",
        priority: "high",
        orderDate: "2024-03-15",
        deliveryDate: "2024-03-18",
    },
    {
        id: "ORD-2024-002",
        hospital: "St. Mary's Medical Center",
        items: 8,
        total: 2800,
        status: "processing",
        priority: "normal",
        orderDate: "2024-03-14",
        deliveryDate: "2024-03-17",
    },
    {
        id: "ORD-2024-003",
        hospital: "City Children's Hospital",
        items: 15,
        total: 6200,
        status: "fulfilled",
        priority: "normal",
        orderDate: "2024-03-13",
        deliveryDate: "2024-03-16",
    },
];

export function OrdersList({ searchQuery }: OrdersListProps) {
    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Hospital</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Delivery Date</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.hospital}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>${order.total}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        order.status === "fulfilled"
                                            ? "default"
                                            : order.status === "processing"
                                                ? "secondary"
                                                : "destructive"
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
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.deliveryDate}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Process Order</DropdownMenuItem>
                                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                                            <DropdownMenuItem>Contact Hospital</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}