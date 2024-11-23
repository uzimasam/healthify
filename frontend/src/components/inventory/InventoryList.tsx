import { useState } from "react";
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
import { Card } from "@/components/ui/card";
import { Eye, MoreVertical, AlertCircle, Edit2 } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditInventoryDialog } from "./EditInventoryDialog";

interface InventoryListProps {
    searchQuery: string;
}

const inventory = [
    {
        id: "PRD-001",
        name: "Surgical Masks",
        category: "PPE",
        supplier: "MedTech Supplies Inc.",
        hospital: "Metropolitan General Hospital",
        stock: 5000,
        unit: "pieces",
        minStock: 1000,
        price: 0.5,
        expiryDate: "2025-03-15",
        status: "in_stock",
    },
    {
        id: "PRD-002",
        name: "Surgical Gloves",
        category: "PPE",
        supplier: "Global Healthcare Solutions",
        hospital: "St. Mary's Medical Center",
        stock: 800,
        unit: "boxes",
        minStock: 1000,
        price: 15.0,
        expiryDate: "2024-12-31",
        status: "low_stock",
    },
    {
        id: "PRD-003",
        name: "Syringes",
        category: "Medical Supplies",
        supplier: "Premier Medical Supplies",
        hospital: "City Children's Hospital",
        stock: 10000,
        unit: "pieces",
        minStock: 2000,
        price: 0.25,
        expiryDate: "2025-06-30",
        status: "in_stock",
    },
];

export function InventoryList({ searchQuery }: InventoryListProps) {
    const [selectedItem, setSelectedItem] = useState<typeof inventory[0] | null>(null);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const filteredInventory = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (item: typeof inventory[0]) => {
        setSelectedItem(item);
        setShowEditDialog(true);
    };

    return (
        <>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Expiry Date</TableHead>
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
                                <TableCell>{item.hospital}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {item.stock} {item.unit}
                                        {item.stock < item.minStock && (
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={item.status === "in_stock" ? "default" : "destructive"}
                                    >
                                        {item.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell>{item.expiryDate}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(item)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View History</DropdownMenuItem>
                                                <DropdownMenuItem>Transfer Stock</DropdownMenuItem>
                                                <DropdownMenuItem>Generate Report</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">
                                                    Mark as Discontinued
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {selectedItem && (
                <EditInventoryDialog
                    open={showEditDialog}
                    onOpenChange={setShowEditDialog}
                    item={selectedItem}
                />
            )}
        </>
    );
}