import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchProducts, Product } from "@/lib/api/products";

interface CategoryCount {
    name: string;
    count: number;
    trend: "up" | "stable" | "down";
    categoryId: number;
}

export function ProductCategories() {
    const [categories, setCategories] = useState<CategoryCount[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setIsLoading(true);
                const products = await fetchProducts();

                // Define category mappings
                const categoryMappings = {
                    1: "PPE",
                    2: "Medical Supplies",
                    3: "Equipment",
                    4: "Pharmaceuticals"
                };

                // Count products by category
                const categoryCounts = products.reduce((acc, product) => {
                    const categoryId = product.category_id;
                    acc[categoryId] = (acc[categoryId] || 0) + 1;
                    return acc;
                }, {} as Record<number, number>);

                // Transform into required format
                const formattedCategories = Object.entries(categoryMappings).map(([id, name]) => ({
                    name,
                    count: categoryCounts[Number(id)] || 0,
                    trend: "stable" as const, // You could implement trend logic based on historical data
                    categoryId: Number(id)
                }));

                setCategories(formattedCategories);
                setError(null);
            } catch (err) {
                setError('Failed to load categories');
                console.error('Error loading categories:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                    <Card key={index} className="p-4 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    </Card>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-4">
            {categories.map((category) => (
                <Card key={category.categoryId} className="p-4 cursor-pointer hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">{category.name}</h3>
                        <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                        {category.trend === "up" && "↑ Trending up"}
                        {category.trend === "down" && "↓ Trending down"}
                        {category.trend === "stable" && "→ Stable"}
                    </div>
                </Card>
            ))}
        </div>
    );
}