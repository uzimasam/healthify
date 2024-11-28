import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchProducts, Product } from "@/lib/api/products";

interface OrderSummaryProps {
    products: Array<{
        product_id: number;
        qty: number;
        unit: string;
    }>;
}

interface SummaryItem {
    name: string;
    quantity: number;
    unit: string;
    price: number;
    total: number;
}

export function OrderSummary({ products }: OrderSummaryProps) {
    const [productData, setProductData] = useState<Product[]>([]);
    const [summaryItems, setSummaryItems] = useState<SummaryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setIsLoading(true);
                const data = await fetchProducts();
                setProductData(data);
                setError(null);
            } catch (err) {
                setError('Failed to load product details');
                console.error('Error loading products:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadProducts();
    }, []);

    useEffect(() => {
        if (productData.length > 0) {
            const items = products
                .map(item => {
                    const product = productData.find(p => p.ID === item.product_id);
                    if (!product) return null;

                    return {
                        name: product.name,
                        quantity: item.qty,
                        unit: item.unit,
                        price: product.price,
                        total: product.price * item.qty
                    };
                })
                .filter((item): item is SummaryItem => item !== null);

            setSummaryItems(items);
        }
    }, [products, productData]);

    const subtotal = summaryItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.16; // 16% VAT
    const total = subtotal + tax;

    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

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
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {summaryItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span>
                                {item.quantity} {item.unit} {item.name}
                            </span>
                            <span>${item.total.toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>VAT (16%)</span>
                        <span>${tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}