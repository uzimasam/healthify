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

const activeOrders = [
    {
        id: "ORD-2024-001",
        items: [
            { name: "Surgical Masks", quantity: 5000, unit: "pieces" },
            { name: "Surgical Gloves", quantity: 2000, unit: "pieces" },
        ],
        supplier: "MedTech Supplies Inc.",
        orderDate: "2024-03-15",
        expectedDelivery: "2024-03-18",
        status: "processing",
        priority: "high",
    },
    {
        id: "ORD-2024-002",
        items: [
            { name: "Syringes", quantity: 10000, unit: "pieces" },
            { name: "Bandages", quantity: 5000, unit: "pieces" },
        ],
        supplier: "Global Healthcare Solutions",
        orderDate: "2024-03-14",
        expectedDelivery: "2024-03-17",
        status: "confirmed",
        priority: "normal",
    },
];

export function HospitalActiveOrders() {
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
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}