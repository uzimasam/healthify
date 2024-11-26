import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface OrderSummaryProps {
    period: string;
}

export function OrderSummary({ period }: OrderSummaryProps) {
    const summaryData = {
        totalOrders: 1234,
        totalValue: 543210,
        averageOrderValue: 440,
        topSuppliers: [
            {
                name: "MedTech Supplies Inc.",
                orders: 245,
                value: 98000,
                rating: 4.8,
            },
            {
                name: "Global Healthcare Solutions",
                orders: 188,
                value: 75000,
                rating: 4.5,
            },
        ],
        orderTypes: [
            { type: "Regular", count: 980, percentage: 79 },
            { type: "Emergency", count: 180, percentage: 15 },
            { type: "Bulk", count: 74, percentage: 6 },
        ],
        performance: {
            onTimeDelivery: 98.5,
            qualityScore: 96.7,
            supplierSatisfaction: 4.8,
            issueRate: 1.5,
        },
    };

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Order Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total Orders</div>
                            <div className="text-2xl font-bold">{summaryData.totalOrders}</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total Value</div>
                            <div className="text-2xl font-bold">
                                ${summaryData.totalValue.toLocaleString()}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Average Order Value</div>
                            <div className="text-2xl font-bold">
                                ${summaryData.averageOrderValue}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Top Suppliers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {summaryData.topSuppliers.map((supplier, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{supplier.name}</span>
                                    <span>{"⭐".repeat(Math.round(supplier.rating))}</span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    {supplier.orders} orders · ${supplier.value.toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Types</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {summaryData.orderTypes.map((type, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{type.type} Orders</span>
                                    <Badge variant="secondary">{type.percentage}%</Badge>
                                </div>
                                <div className="text-sm text-gray-500">{type.count} orders</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="text-sm font-medium text-gray-500">On-Time Delivery</div>
                            <div className="text-2xl font-bold">{summaryData.performance.onTimeDelivery}%</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Quality Score</div>
                            <div className="text-2xl font-bold">{summaryData.performance.qualityScore}%</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Supplier Satisfaction</div>
                            <div className="text-2xl font-bold">{summaryData.performance.supplierSatisfaction}/5.0</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Issue Rate</div>
                            <div className="text-2xl font-bold">{summaryData.performance.issueRate}%</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}