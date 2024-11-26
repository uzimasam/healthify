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
import { Clock } from "lucide-react";

const deliveries = [
    {
        id: "DEL-2024-001",
        orderId: "ORD-2024-001",
        supplier: "MedTech Supplies Inc.",
        items: [
            { name: "Surgical Masks", quantity: 1000, unit: "boxes" },
            { name: "Surgical Gloves", quantity: 500, unit: "boxes" },
        ],
        status: "out_for_delivery",
        eta: "2 hours",
        deliveryDate: "2024-03-16",
        instructions: "Delivery to main reception",
    },
    {
        id: "DEL-2024-002",
        orderId: "ORD-2024-002",
        supplier: "Global Healthcare Solutions",
        items: [
            { name: "Syringes", quantity: 2000, unit: "units" },
            { name: "Bandages", quantity: 100, unit: "boxes" },
        ],
        status: "arriving_today",
        eta: "30 minutes",
        deliveryDate: "2024-03-16",
        instructions: "Delivery to loading dock B",
    },
];

export function PendingDeliveries() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Expected Deliveries Today</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Delivery ID</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>ETA</TableHead>
                            <TableHead>Instructions</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {deliveries.map((delivery) => (
                            <TableRow key={delivery.id}>
                                <TableCell className="font-medium">{delivery.id}</TableCell>
                                <TableCell>{delivery.orderId}</TableCell>
                                <TableCell>{delivery.supplier}</TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        {delivery.items.map((item, index) => (
                                            <div key={index} className="text-sm">
                                                {item.quantity} {item.unit} {item.name}
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            delivery.status === "arriving_today" ? "default" : "secondary"
                                        }
                                    >
                                        {delivery.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                        {delivery.eta}
                                    </div>
                                </TableCell>
                                <TableCell>{delivery.instructions}</TableCell>
                                <TableCell>
                                    <Button size="sm">Prepare Reception</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}