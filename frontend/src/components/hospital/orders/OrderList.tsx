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
import { Eye, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderListProps {
    searchQuery: string;
}

const orders = [
    {
        id: "ORD-2024-001",
        supplier: "MedTech Supplies Inc.",
        items: [
            { name: "Surgical Masks", quantity: 1000, unit: "boxes" },
            { name: "Surgical Gloves", quantity: 500, unit: "boxes" },
        ],
        total: 4500,
        status: "processing",
        priority: "high",
        orderDate: "2024-03-15",
        expectedDelivery: "2024-03-18",
    },
    {
        id: "ORD-2024-002",
        supplier: "Global Healthcare Solutions",
        items: [
            { name: "Syringes", quantity: 2000, unit: "units" },
            { name: "Bandages", quantity: 100, unit: "boxes" },
        ],
        total: 2800,
        status: "in_transit",
        priority: "normal",
        orderDate: "2024-03-14",
        expectedDelivery: "2024-03-17",
    },
];

export function OrderList({ searchQuery }: OrderListProps) {
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
                        <TableHead>Items</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>Expected Delivery</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.supplier}</TableCell>
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
                                <Badge
                                    variant={
                                        order.status === "processing"
                                            ? "secondary"
                                            : order.status === "in_transit"
                                                ? "default"
                                                : "destructive"
                                    }
                                >
                                    {order.status.replace("_", " ")}
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
                            <TableCell>{order.expectedDelivery}</TableCell>
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
                                            <DropdownMenuItem>Track Order</DropdownMenuItem>
                                            <DropdownMenuItem>Contact Supplier</DropdownMenuItem>
                                            <DropdownMenuItem>Download Invoice</DropdownMenuItem>
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