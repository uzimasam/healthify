import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ProductSelector } from "@/components/hospital/orders/ProductSelector";
import { OrderSummary } from "@/components/hospital/orders/OrderSummary";
import { ShoppingCart, Plus } from "lucide-react";
import { fetchSuppliers } from "@/lib/api/suppliers";
import { createOrder } from "@/lib/api/orders";
import { useToast } from "@/hooks/use-toast";

interface Supplier {
    id: number;
    name: string;
    type: string;
    email: string;
    phone: string;
    niche: string;
    status: string;
}

interface FormData {
    supplier_id: string;
    priority: string;
    required_by: string;
    notes: string;
    products: Array<{
        product_id: number;
        qty: number;
        unit: string;
    }>;
}

export function PlaceOrderPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        supplier_id: "",
        priority: "",
        required_by: "",
        notes: "",
        products: []
    });

    useEffect(() => {
        async function loadSuppliers() {
            try {
                const data = await fetchSuppliers();
                setSuppliers(data);
                setError(null);
            } catch (err) {
                setError('Failed to load suppliers. Please try again later.');
                console.error('Error loading suppliers:', err);
            }
        }

        loadSuppliers();
    }, []);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProductsChange = (products: Array<{ product_id: number; qty: number; unit: string }>) => {
        setFormData(prev => ({
            ...prev,
            products
        }));
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            // Hardcoding hospital_id as 1 for now - in real app would come from auth context
            const payload = {
                ...formData,
                hospital_id: "1"
            };

            await createOrder(payload);

            toast({
                title: "Order placed successfully",
                description: "Your order has been submitted and is being processed.",
            });

            // Reset form
            setFormData({
                supplier_id: "",
                priority: "",
                required_by: "",
                notes: "",
                products: []
            });
        } catch (err) {
            console.error('Error submitting order:', err);
            toast({
                title: "Error placing order",
                description: "There was a problem submitting your order. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Place New Order</h2>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="p-6">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Supplier</Label>
                                <Select
                                    value={formData.supplier_id}
                                    onValueChange={(value) => handleInputChange('supplier_id', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {error ? (
                                            <SelectItem value="error" disabled>
                                                Error loading suppliers
                                            </SelectItem>
                                        ) : suppliers.length === 0 ? (
                                            <SelectItem value="none" disabled>
                                                No suppliers available
                                            </SelectItem>
                                        ) : (
                                            suppliers.map((supplier) => (
                                                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                                    {supplier.name} ({supplier.niche})
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(value) => handleInputChange('priority', value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Normal</SelectItem>
                                        <SelectItem value="2">Urgent</SelectItem>
                                        <SelectItem value="3">Emergency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Required By</Label>
                                <Input
                                    type="date"
                                    value={formData.required_by}
                                    onChange={(e) => handleInputChange('required_by', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Additional Notes</Label>
                                <Input
                                    placeholder="Any special instructions or requirements"
                                    value={formData.notes}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-6">
                        <ProductSelector onProductsChange={handleProductsChange} />
                        <OrderSummary products={formData.products} />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button">
                        Save as Draft
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {isLoading ? "Placing Order..." : "Place Order"}
                    </Button>
                </div>
            </form>
        </div>
    );
}