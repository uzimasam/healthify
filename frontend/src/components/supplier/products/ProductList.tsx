import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductListProps {
    searchQuery: string;
    sortBy: string;
}

const products = [
    {
        id: "P001",
        name: "Surgical Masks",
        category: "PPE",
        price: 0.5,
        stock: 5000,
        minStock: 1000,
        status: "active",
        lastUpdated: "2024-03-15",
    },
    {
        id: "P002",
        name: "Surgical Gloves",
        category: "PPE",
        price: 0.75,
        stock: 800,
        minStock: 1000,
        status: "low_stock",
        lastUpdated: "2024-03-14",
    },
];

export function ProductList({ searchQuery, sortBy }: ProductListProps) {
    const filteredProducts = products
        .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "name":
                    return a.name.localeCompare(b.name);
                case "stock":
                    return b.stock - a.stock;
                case "price":
                    return b.price - a.price;
                case "category":
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {product.stock}
                                {product.stock < product.minStock && (
                                    <Badge variant="destructive">Low</Badge>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge
                                variant={product.status === "active" ? "default" : "destructive"}
                            >
                                {product.status.replace("_", " ")}
                            </Badge>
                        </TableCell>
                        <TableCell>{product.lastUpdated}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
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
                                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-600">
                                            Delete Product
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}