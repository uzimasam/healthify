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
import { AlertCircle, ShoppingCart } from "lucide-react";

const lowStockItems = [
    {
        id: "INV002",
        name: "Surgical Gloves",
        category: "PPE",
        supplier: "Global Healthcare Solutions",
        currentStock: 800,
        minStock: 1000,
        unit: "boxes",
        lastOrdered: "2024-03-01",
        status: "critical",
    },
    {
        id: "INV005",
        name: "N95 Masks",
        category: "PPE",
        supplier: "MedTech Supplies Inc.",
        currentStock: 500,
        minStock: 800,
        unit: "pieces",
        lastOrdered: "2024-03-10",
        status: "warning",
    },
];

export function LowStockItems() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <CardTitle>Low Stock Items</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Current Stock</TableHead>
                            <TableHead>Min. Stock</TableHead>
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
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.supplier}</TableCell>
                                <TableCell>
                                    {item.currentStock} {item.unit}
                                </TableCell>
                                <TableCell>{item.minStock}</TableCell>
                                <TableCell>{item.lastOrdered}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={item.status === "critical" ? "destructive" : "secondary"}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button size="sm">
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Order Now
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}