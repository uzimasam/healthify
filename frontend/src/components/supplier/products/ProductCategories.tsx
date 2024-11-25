import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCategories() {
    const categories = [
        { name: "PPE", count: 45, trend: "up" },
        { name: "Medical Supplies", count: 32, trend: "stable" },
        { name: "Equipment", count: 28, trend: "down" },
        { name: "Pharmaceuticals", count: 56, trend: "up" },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-4">
            {categories.map((category) => (
                <Card key={category.name} className="p-4 cursor-pointer hover:bg-gray-50 transition">
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