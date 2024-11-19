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

const hospitals = [
    {
        id: 1,
        name: "Metropolitan General Hospital",
        type: "General",
        status: "active",
        suppliers: 8,
        lastOrder: "2024-03-15",
    },
    {
        id: 2,
        name: "St. Mary's Medical Center",
        type: "Specialized",
        status: "active",
        suppliers: 6,
        lastOrder: "2024-03-14",
    },
    {
        id: 3,
        name: "City Children's Hospital",
        type: "Pediatric",
        status: "pending",
        suppliers: 0,
        lastOrder: "-",
    },
];

export function HospitalList() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Connected Suppliers</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {hospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                        <TableCell className="font-medium">{hospital.name}</TableCell>
                        <TableCell>{hospital.type}</TableCell>
                        <TableCell>
                            <Badge
                                variant={hospital.status === "active" ? "default" : "secondary"}
                            >
                                {hospital.status}
                            </Badge>
                        </TableCell>
                        <TableCell>{hospital.suppliers}</TableCell>
                        <TableCell>{hospital.lastOrder}</TableCell>
                        <TableCell>
                            <Button variant="ghost" size="sm">
                                View Details
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}