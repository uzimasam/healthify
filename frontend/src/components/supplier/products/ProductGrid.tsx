import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductGridProps {
    searchQuery: string;
    sortBy: string;
}

const products = [
    {
        id: "P001",
        name: "Surgical Masks",
        image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5",
        category: "PPE",
        price: 0.5,
        stock: 5000,
        minStock: 1000,
        status: "active",
    },
    {
        id: "P002",
        name: "Surgical Gloves",
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
        category: "PPE",
        price: 0.75,
        stock: 800,
        minStock: 1000,
        status: "low_stock",
    },
];

export function ProductGrid({ searchQuery, sortBy }: ProductGridProps) {
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                    <div className="relative aspect-square">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                        {product.status === "low_stock" && (
                            <Badge
                                variant="destructive"
                                className="absolute top-2 right-2"
                            >
                                Low Stock
                            </Badge>
                        )}
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Product
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Product
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Category:</span>
                                <span>{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Price:</span>
                                <span>${product.price}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Stock:</span>
                                <span>{product.stock}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full">Update Stock</Button>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}