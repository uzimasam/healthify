import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrdersList } from "@/components/supplier/orders/OrdersList";
import { PendingOrders } from "@/components/supplier/orders/PendingOrders";
import { OrderFulfillment } from "@/components/supplier/orders/OrderFulfillment";
import { OrderAnalytics } from "@/components/supplier/orders/OrderAnalytics";
import { fetchOrders } from "@/lib/api/orders";

export function SupplierOrders() {
    const [searchQuery, setSearchQuery] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
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

    // Calculate statistics from orders
    const pendingOrders = orders.filter(order => order.status === "pending").length;
    const processingOrders = orders.filter(order => order.status === "processing").length;
    const fulfilledToday = orders.filter(order => {
        const today = new Date().toISOString().split('T')[0];
        return order.order_date === today && order.status === "completed";
    }).length;
    const totalOrders = orders.length;

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Orders Management</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Pending Orders</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{pendingOrders}</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Processing</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{processingOrders}</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Fulfilled Today</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{fulfilledToday}</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Total Orders</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{totalOrders}</span>
                    </div>
                </Card>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </div>

            {error ? (
                <div className="text-center p-8 text-red-500">
                    {error}
                    <Button
                        variant="outline"
                        className="ml-4"
                        onClick={() => window.location.reload()}
                    >
                        Retry
                    </Button>
                </div>
            ) : (
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">All Orders</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        <OrdersList searchQuery={searchQuery} />
                    </TabsContent>

                    <TabsContent value="pending">
                        <PendingOrders />
                    </TabsContent>

                    <TabsContent value="fulfillment">
                        <OrderFulfillment />
                    </TabsContent>

                    <TabsContent value="analytics">
                        <OrderAnalytics />
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}