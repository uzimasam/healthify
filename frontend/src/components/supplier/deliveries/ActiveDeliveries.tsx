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
import { Eye, MoreVertical, MapPin } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActiveDeliveriesProps {
    searchQuery: string;
}

const deliveries = [
    {
        id: "DEL-2024-001",
        orderId: "ORD-2024-001",
        hospital: "Metropolitan General Hospital",
        status: "in_transit",
        driver: "John Smith",
        vehicle: "Van-001",
        eta: "30 mins",
        startTime: "09:30 AM",
        items: 12,
    },
    {
        id: "DEL-2024-002",
        orderId: "ORD-2024-002",
        hospital: "St. Mary's Medical Center",
        status: "loading",
        driver: "Mike Johnson",
        vehicle: "Van-002",
        eta: "1 hour",
        startTime: "10:00 AM",
        items: 8,
    },
];

export function ActiveDeliveries({ searchQuery }: ActiveDeliveriesProps) {
    const filteredDeliveries = deliveries.filter((delivery) =>
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
                        <TableHead>Status</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>ETA</TableHead>
                        <TableHead>Start Time</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredDeliveries.map((delivery) => (
                        <TableRow key={delivery.id}>
                            <TableCell className="font-medium">{delivery.id}</TableCell>
                            <TableCell>{delivery.orderId}</TableCell>
                            <TableCell>{delivery.hospital}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={delivery.status === "in_transit" ? "default" : "secondary"}
                                >
                                    {delivery.status.replace("_", " ")}
                                </Badge>
                            </TableCell>
                            <TableCell>{delivery.driver}</TableCell>
                            <TableCell>{delivery.vehicle}</TableCell>
                            <TableCell>{delivery.eta}</TableCell>
                            <TableCell>{delivery.startTime}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <MapPin className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem>Track Location</DropdownMenuItem>
                                            <DropdownMenuItem>Contact Driver</DropdownMenuItem>
                                            <DropdownMenuItem>Update Status</DropdownMenuItem>
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