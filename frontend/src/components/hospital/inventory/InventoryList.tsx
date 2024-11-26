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
import { Eye, Edit2, MoreVertical, AlertCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface InventoryListProps {
    searchQuery: string;
    sortBy: string;
}

const inventory = [
    {
        id: "INV001",
        name: "Surgical Masks",
        category: "PPE",
        supplier: "MedTech Supplies Inc.",
        stock: 5000,
        unit: "pieces",
        minStock: 1000,
        expiryDate: "2025-03-15",
        status: "optimal",
        lastUpdated: "2024-03-15",
    },
    {
        id: "INV002",
        name: "Surgical Gloves",
        category: "PPE",
        supplier: "Global Healthcare Solutions",
        stock: 800,
        unit: "boxes",
        minStock: 1000,
        expiryDate: "2024-12-31",
        status: "low_stock",
        lastUpdated: "2024-03-14",
    },
];

export function InventoryList({ searchQuery, sortBy }: InventoryListProps) {
    const filteredInventory = inventory
        .filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "stock":
                    return b.stock - a.stock;
                case "category":
                    return a.category.localeCompare(b.category);
                case "expiry":
                    return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
                default:
                    return 0;
            }
        });

    return (
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Min. Stock</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredInventory.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.category}</TableCell>
                            <TableCell>{item.supplier}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    {item.stock} {item.unit}
                                    {item.stock < item.minStock && (
                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>{item.minStock}</TableCell>
                            <TableCell>{item.expiryDate}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        item.status === "optimal"
                                            ? "default"
                                            : item.status === "low_stock"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                >
                                    {item.status.replace("_", " ")}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Update Stock</DropdownMenuItem>
                                            <DropdownMenuItem>View History</DropdownMenuItem>
                                            <DropdownMenuItem>Place Order</DropdownMenuItem>
                                            <DropdownMenuItem>Generate Report</DropdownMenuItem>
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