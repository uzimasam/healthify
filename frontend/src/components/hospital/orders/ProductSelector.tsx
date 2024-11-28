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
    product_id: number;
    qty: number;
    unit: string;
}

interface ProductSelectorProps {
    onProductsChange: (products: Array<{ product_id: number; qty: number; unit: string }>) => void;
}

export function ProductSelector({ onProductsChange }: ProductSelectorProps) {
    const [items, setItems] = useState<OrderItem[]>([
        { id: "1", product_id: 0, qty: 0, unit: "" },
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

    useEffect(() => {
        // Filter out incomplete items and format for parent component
        const validItems = items
            .filter(item => item.product_id && item.qty > 0)
            .map(({ product_id, qty, unit }) => ({
                product_id,
                qty,
                unit
            }));

        onProductsChange(validItems);
    }, [items, onProductsChange]);

    const addItem = () => {
        setItems([
            ...items,
            { id: Math.random().toString(), product_id: 0, qty: 0, unit: "" },
        ]);
    };

    const removeItem = (id: string) => {
        if (items.length > 1) {
            setItems(items.filter((item) => item.id !== id));
        }
    };

    const updateItem = (id: string, field: keyof OrderItem, value: number | string) => {
        setItems(items.map(item => {
            if (item.id === id) {
                if (field === 'product_id') {
                    const product = products.find(p => p.ID === Number(value));
                    return {
                        ...item,
                        [field]: Number(value),
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
                                value={item.product_id ? String(item.product_id) : ""}
                                onValueChange={(value) => updateItem(item.id, 'product_id', Number(value))}
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
                                            <SelectItem key={product.ID} value={String(product.ID)}>
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
                            value={item.qty || ''}
                            onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
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