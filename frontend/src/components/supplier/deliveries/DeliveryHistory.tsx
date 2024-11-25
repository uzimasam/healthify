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
import { Eye, Download } from "lucide-react";

interface DeliveryHistoryProps {
    searchQuery: string;
}

const deliveryHistory = [
    {
        id: "DEL-2024-001",
        orderId: "ORD-2024-001",
        hospital: "Metropolitan General Hospital",
        completedAt: "2024-03-15 11:30 AM",
        driver: "John Smith",
        status: "completed",
        rating: 5,
        feedback: "Excellent service",
    },
    {
        id: "DEL-2024-002",
        orderId: "ORD-2024-002",
        hospital: "St. Mary's Medical Center",
        completedAt: "2024-03-15 10:45 AM",
        driver: "Mike Johnson",
        status: "completed",
        rating: 4,
        feedback: "Good delivery",
    },
];

export function DeliveryHistory({ searchQuery }: DeliveryHistoryProps) {
    const filteredHistory = deliveryHistory.filter((delivery) =>
        delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.hospital.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Delivery ID</TableHead>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Hospital</TableHead>
                        <TableHead>Completed At</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredHistory.map((delivery) => (
                        <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.orderId}</TableCell>
                            <TableCell>{delivery.hospital}</TableCell>
                            <TableCell>{delivery.completedAt}</TableCell>
                            <TableCell>{delivery.driver}</TableCell>
                            <TableCell>
                                <Badge variant="default">{delivery.status}</Badge>
                            </TableCell>
                            <TableCell>
                                {"⭐".repeat(delivery.rating)}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}