import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";

interface OrderItem {
    id: string;
    product: string;
    quantity: number;
    unit: string;
}

export function ProductSelector() {
    const [items, setItems] = useState<OrderItem[]>([
        { id: "1", product: "", quantity: 0, unit: "" },
    ]);

    const addItem = () => {
        setItems([
            ...items,
            { id: Math.random().toString(), product: "", quantity: 0, unit: "" },
        ]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Select Products</CardTitle>
                <Button onClick={addItem} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                        <div className="flex-1">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="masks">Surgical Masks</SelectItem>
                                    <SelectItem value="gloves">Surgical Gloves</SelectItem>
                                    <SelectItem value="syringes">Syringes</SelectItem>
                                    <SelectItem value="bandages">Bandages</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            type="number"
                            placeholder="Qty"
                            className="w-24"
                            min="1"
                        />
                        <Select>
                            <SelectTrigger className="w-28">
                                <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pieces">Pieces</SelectItem>
                                <SelectItem value="boxes">Boxes</SelectItem>
                                <SelectItem value="packs">Packs</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}