import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function OrderSummary() {
    const summary = {
        items: [
            { name: "Surgical Masks", quantity: 1000, unit: "pieces", price: 500 },
            { name: "Surgical Gloves", quantity: 500, unit: "boxes", price: 750 },
        ],
        subtotal: 1250,
        tax: 100,
        total: 1350,
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {summary.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span>
                                {item.quantity} {item.unit} {item.name}
                            </span>
                            <span>${item.price}</span>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${summary.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span>Tax</span>
                        <span>${summary.tax}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${summary.total}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}