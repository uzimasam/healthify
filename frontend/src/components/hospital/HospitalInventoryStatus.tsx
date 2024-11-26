import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const inventoryItems = [
    {
        name: "Surgical Masks",
        currentStock: 2500,
        minRequired: 5000,
        unit: "pieces",
        status: "low",
        reorderPoint: 3000,
    },
    {
        name: "Surgical Gloves",
        currentStock: 8000,
        minRequired: 10000,
        unit: "pieces",
        status: "warning",
        reorderPoint: 5000,
    },
    {
        name: "Syringes",
        currentStock: 15000,
        minRequired: 20000,
        unit: "pieces",
        status: "optimal",
        reorderPoint: 8000,
    },
];

export function HospitalInventoryStatus() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Critical Supplies Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {inventoryItems.map((item) => {
                        const percentage = (item.currentStock / item.minRequired) * 100;
                        return (
                            <div key={item.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">{item.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {item.currentStock} / {item.minRequired} {item.unit}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Badge
                                            variant={
                                                item.status === "optimal"
                                                    ? "default"
                                                    : item.status === "warning"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {item.status}
                                        </Badge>
                                        {item.currentStock <= item.reorderPoint && (
                                            <Button size="sm">
                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                Reorder
                                            </Button>
                                        )}
                                    </div>
                                </div>
                                <Progress
                                    value={percentage}
                                    className={
                                        percentage > 70
                                            ? "bg-green-500 h-2"
                                            : percentage > 30
                                                ? "bg-yellow-500 h-2"
                                                : "bg-red-500 h-2"
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}