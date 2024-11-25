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
import { Eye, MoreVertical, AlertCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HospitalsListProps {
    searchQuery: string;
}

const hospitals = [
    {
        id: 1,
        name: "Metropolitan General Hospital",
        type: "General",
        location: "New York, NY",
        partnershipStatus: "active",
        lastOrder: "2024-03-15",
        orderVolume: "High",
        rating: 4.8,
        supplyStatus: "optimal",
    },
    {
        id: 2,
        name: "St. Mary's Medical Center",
        type: "Specialized",
        location: "Los Angeles, CA",
        partnershipStatus: "active",
        lastOrder: "2024-03-14",
        orderVolume: "Medium",
        rating: 4.5,
        supplyStatus: "warning",
    },
];

export function HospitalsList({ searchQuery }: HospitalsListProps) {
    const filteredHospitals = hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Hospital Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Partnership Status</TableHead>
                        <TableHead>Last Order</TableHead>
                        <TableHead>Order Volume</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Supply Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredHospitals.map((hospital) => (
                        <TableRow key={hospital.id}>
                            <TableCell className="font-medium">{hospital.name}</TableCell>
                            <TableCell>{hospital.type}</TableCell>
                            <TableCell>{hospital.location}</TableCell>
                            <TableCell>
                                <Badge variant={hospital.partnershipStatus === "active" ? "default" : "secondary"}>
                                    {hospital.partnershipStatus}
                                </Badge>
                            </TableCell>
                            <TableCell>{hospital.lastOrder}</TableCell>
                            <TableCell>{hospital.orderVolume}</TableCell>
                            <TableCell>
                                <div className="flex items-center">
                                    <span className="mr-2">{hospital.rating}</span>
                                    {"⭐".repeat(Math.round(hospital.rating))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        hospital.supplyStatus === "optimal"
                                            ? "default"
                                            : hospital.supplyStatus === "warning"
                                                ? "secondary"
                                                : "destructive"
                                    }
                                >
                                    {hospital.supplyStatus}
                                </Badge>
                            </TableCell>
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
                                            <DropdownMenuItem>Order History</DropdownMenuItem>
                                            <DropdownMenuItem>Supply Status</DropdownMenuItem>
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