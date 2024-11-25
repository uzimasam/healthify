import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function SupplierInventory() {
    const inventory = [
        {
            id: "PRD001",
            name: "Surgical Masks",
            category: "PPE",
            stock: 5000,
            minStock: 1000,
            price: 0.5,
            status: "In Stock",
        },
        {
            id: "PRD002",
            name: "Surgical Gloves",
            category: "PPE",
            stock: 800,
            minStock: 1000,
            price: 0.75,
            status: "Low Stock",
        },
    ];

    return (
        <Card>
            <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input className="pl-10" placeholder="Search inventory..." />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Min Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>{item.minStock}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>
                                    <Badge variant={item.status === "In Stock" ? "default" : "destructive"}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        Update Stock
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}