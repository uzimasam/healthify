import { useState } from "react";
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

export function PlaceOrderPage() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
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
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="medtech">MedTech Supplies Inc.</SelectItem>
                                        <SelectItem value="global">Global Healthcare Solutions</SelectItem>
                                        <SelectItem value="premier">Premier Medical Supplies</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="urgent">Urgent</SelectItem>
                                        <SelectItem value="emergency">Emergency</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Required By</Label>
                                <Input type="date" required />
                            </div>

                            <div className="space-y-2">
                                <Label>Additional Notes</Label>
                                <Input
                                    placeholder="Any special instructions or requirements"
                                />
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-6">
                        <ProductSelector />
                        <OrderSummary />
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