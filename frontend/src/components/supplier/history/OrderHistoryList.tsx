import { Card } from "@/components/ui/card";
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
import { Eye, Download, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderHistoryListProps {
    searchQuery: string;
}

const orders = [
    {
        id: "ORD-2024-001",
        hospital: "Metropolitan General Hospital",
        date: "2024-03-15",
        items: 12,
        total: 4500,
        status: "completed",
        paymentStatus: "paid",
        deliveryTime: "2.3 hours",
        rating: 5,
    },
    {
        id: "ORD-2024-002",
        hospital: "St. Mary's Medical Center",
        date: "2024-03-14",
        items: 8,
        total: 2800,
        status: "completed",
        paymentStatus: "pending",
        deliveryTime: "1.8 hours",
        rating: 4,
    },
    {
        id: "ORD-2024-003",
        hospital: "City Children's Hospital",
        date: "2024-03-13",
        items: 15,
        total: 6200,
        status: "cancelled",
        paymentStatus: "refunded",
        deliveryTime: "-",
        rating: null,
    },
];

export function OrderHistoryList({ searchQuery }: OrderHistoryListProps) {
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
                        <TableHead>Date</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Delivery Time</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.hospital}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>${order.total}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        order.status === "completed"
                                            ? "default"
                                            : order.status === "cancelled"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    {order.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        order.paymentStatus === "paid"
                                            ? "default"
                                            : order.paymentStatus === "pending"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {order.paymentStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>{order.deliveryTime}</TableCell>
                            <TableCell>
                                {order.rating ? "⭐".repeat(order.rating) : "-"}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                                            <DropdownMenuItem>View Delivery Report</DropdownMenuItem>
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