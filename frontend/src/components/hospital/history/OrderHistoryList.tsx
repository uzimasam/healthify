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
        supplier: "MedTech Supplies Inc.",
        date: "2024-03-15",
        items: [
            { name: "Surgical Masks", quantity: 1000, unit: "boxes" },
            { name: "Surgical Gloves", quantity: 500, unit: "boxes" },
        ],
        total: 4500,
        status: "completed",
        paymentStatus: "paid",
        deliveryTime: "2.3 hours",
        rating: 5,
    },
    {
        id: "ORD-2024-002",
        supplier: "Global Healthcare Solutions",
        date: "2024-03-14",
        items: [
            { name: "Syringes", quantity: 2000, unit: "units" },
            { name: "Bandages", quantity: 100, unit: "boxes" },
        ],
        total: 2800,
        status: "completed",
        paymentStatus: "pending",
        deliveryTime: "1.8 hours",
        rating: 4,
    },
];

export function OrderHistoryList({ searchQuery }: OrderHistoryListProps) {
    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Supplier</TableHead>
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
                            <TableCell>{order.supplier}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                                <div className="space-y-1">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="text-sm">
                                            {item.quantity} {item.unit} {item.name}
                                        </div>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>${order.total}</TableCell>
                            <TableCell>
                                <Badge variant={order.status === "completed" ? "default" : "secondary"}>
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
                            <TableCell>{"⭐".repeat(order.rating)}</TableCell>
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
                                            <DropdownMenuItem>Contact Supplier</DropdownMenuItem>
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