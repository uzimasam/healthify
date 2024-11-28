import { useEffect, useState } from "react";
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
import { fetchProducts, Product } from "@/lib/api/products";

interface ProductGridProps {
    searchQuery: string;
    sortBy: string;
}

export function ProductGrid({ searchQuery, sortBy }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setIsLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error loading products:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, []);

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
                    return a.category_id - b.category_id;
                default:
                    return 0;
            }
        });

    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                        <div className="relative aspect-square bg-gray-100 animate-pulse" />
                        <div className="p-4 space-y-4">
                            <div className="h-4 bg-gray-100 rounded animate-pulse" />
                            <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-500">
                <p>{error}</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => window.location.reload()}
                >
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
                <Card key={product.ID} className="overflow-hidden">
                    <div className="relative aspect-square">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                        {product.stock <= product.min_stock && (
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
                                <span className="text-gray-500">SKU:</span>
                                <span>{product.sku}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Price:</span>
                                <span>${product.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Stock:</span>
                                <span>{product.stock} {product.unit}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Min Stock:</span>
                                <span>{product.min_stock} {product.unit}</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Button className="w-full">Update Stock</Button>
                        </div>
                    </div>
                </Card>
            ))}
            {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                    {searchQuery
                        ? "No products found matching your search"
                        : "No products available"}
                </div>
            )}
        </div>
    );
}