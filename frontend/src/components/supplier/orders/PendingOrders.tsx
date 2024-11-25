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

const pendingOrders = [
    {
        id: "ORD-2024-006",
        hospital: "Metropolitan General Hospital",
        items: [
            { name: "Surgical Masks", quantity: 1000, unit: "boxes", inStock: true },
            { name: "Surgical Gloves", quantity: 500, unit: "boxes", inStock: false },
        ],
        priority: "high",
        requestDate: "2024-03-15",
        requiredBy: "2024-03-18",
        status: "pending_approval",
    },
    {
        id: "ORD-2024-007",
        hospital: "St. Mary's Medical Center",
        items: [
            { name: "Syringes", quantity: 2000, unit: "units", inStock: true },
            { name: "Bandages", quantity: 100, unit: "boxes", inStock: true },
        ],
        priority: "normal",
        requestDate: "2024-03-14",
        requiredBy: "2024-03-19",
        status: "pending_confirmation",
    },
];

export function PendingOrders() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Request Date</TableHead>
                            <TableHead>Required By</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pendingOrders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.hospital}</TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                {!item.inStock && (
                                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                                )}
                                                <span className="text-sm">
                                                    {item.quantity} {item.unit} {item.name}
                                                </span>
                                                {!item.inStock && (
                                                    <Badge variant="destructive">Out of Stock</Badge>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={order.priority === "high" ? "destructive" : "secondary"}
                                    >
                                        {order.priority}
                                    </Badge>
                                </TableCell>
                                <TableCell>{order.requestDate}</TableCell>
                                <TableCell>{order.requiredBy}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {order.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm">Review</Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={order.items.some((item) => !item.inStock)}
                                        >
                                            Accept
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}