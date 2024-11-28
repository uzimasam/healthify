import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { fetchOrders } from "@/lib/api/orders";

interface Order {
    id: string;
    items: Array<{
        name: string;
        quantity: number;
        unit: string;
    }>;
    supplier: string;
    hospital: string;
    order_date: string;
    expected_delivery: string;
    status: string;
    priority: string;
    total: number;
}

export function OrderAnalytics() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadOrders() {
            try {
                setIsLoading(true);
                const data = await fetchOrders();
                setOrders(data);
                setError(null);
            } catch (err) {
                setError('Failed to load orders. Please try again later.');
                console.error('Error loading orders:', err);
            } finally {
                setIsLoading(false);
            }
        }

        loadOrders();
    }, []);

    // Process orders data for charts
    const orderTrends = orders.reduce((acc: any[], order) => {
        const date = order.order_date.split('T')[0];
        const existingDate = acc.find(item => item.date === date);

        if (existingDate) {
            existingDate.total++;
            existingDate[order.priority]++;
        } else {
            acc.push({
                date,
                total: 1,
                high: order.priority === 'high' ? 1 : 0,
                normal: order.priority === 'normal' ? 1 : 0,
                low: order.priority === 'low' ? 1 : 0
            });
        }
        return acc;
    }, []).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Volume Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    // Calculate summary statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const totalValue = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = totalValue / totalOrders || 0;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="text-sm font-medium text-gray-500">Total Orders</div>
                    <div className="text-2xl font-bold">{totalOrders}</div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-gray-500">Pending Orders</div>
                    <div className="text-2xl font-bold">{pendingOrders}</div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-gray-500">Total Value</div>
                    <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-gray-500">Avg Order Value</div>
                    <div className="text-2xl font-bold">${avgOrderValue.toLocaleString()}</div>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Order Volume by Priority</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderTrends}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="high" name="High Priority" fill="#ef4444" />
                                <Bar dataKey="normal" name="Normal Priority" fill="#3b82f6" />
                                <Bar dataKey="low" name="Low Priority" fill="#22c55e" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}