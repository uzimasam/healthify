import { useEffect, useState } from "react";
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
import { fetchProducts, Product } from "@/lib/api/products";

interface OrderItem {
    id: string;
    productId: string;
    quantity: number;
    unit: string;
}

export function ProductSelector() {
    const [items, setItems] = useState<OrderItem[]>([
        { id: "1", productId: "", quantity: 0, unit: "" },
    ]);
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

    const addItem = () => {
        setItems([
            ...items,
            { id: Math.random().toString(), productId: "", quantity: 0, unit: "" },
        ]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof OrderItem, value: string | number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                if (field === 'productId' && typeof value === 'string') {
                    const product = products.find(p => p.ID.toString() === value);
                    return {
                        ...item,
                        [field]: value,
                        unit: product?.unit || ''
                    };
                }
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    if (error) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="text-red-500 text-center">
                        {error}
                    </div>
                </CardContent>
            </Card>
        );
    }

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
                            <Select
                                value={item.productId}
                                onValueChange={(value) => updateItem(item.id, 'productId', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {isLoading ? (
                                        <SelectItem value="loading" disabled>
                                            Loading products...
                                        </SelectItem>
                                    ) : products.length === 0 ? (
                                        <SelectItem value="none" disabled>
                                            No products available
                                        </SelectItem>
                                    ) : (
                                        products.map((product) => (
                                            <SelectItem key={product.ID} value={product.ID.toString()}>
                                                {product.name} (${product.price})
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            type="number"
                            placeholder="Qty"
                            className="w-24"
                            min="1"
                            value={item.quantity || ''}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                        />
                        <div className="w-28">
                            <Input
                                value={item.unit}
                                disabled
                                placeholder="Unit"
                            />
                        </div>
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