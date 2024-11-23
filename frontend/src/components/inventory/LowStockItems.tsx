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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const lowStockItems = [
    {
        id: "PRD-002",
        name: "Surgical Gloves",
        hospital: "St. Mary's Medical Center",
        currentStock: 800,
        minStock: 1000,
        supplier: "Global Healthcare Solutions",
        lastOrdered: "2024-03-01",
        status: "critical",
    },
    {
        id: "PRD-005",
        name: "N95 Masks",
        hospital: "Metropolitan General Hospital",
        currentStock: 500,
        minStock: 800,
        supplier: "MedTech Supplies Inc.",
        lastOrdered: "2024-03-10",
        status: "warning",
    },
];

export function LowStockItems() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    Low Stock Items
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Min. Stock</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Last Ordered</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lowStockItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.hospital}</TableCell>
                                <TableCell>{item.currentStock}</TableCell>
                                <TableCell>{item.minStock}</TableCell>
                                <TableCell>{item.supplier}</TableCell>
                                <TableCell>{item.lastOrdered}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={item.status === "critical" ? "destructive" : "secondary"}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button size="sm">Order Now</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}