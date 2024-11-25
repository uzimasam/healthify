import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrdersList } from "@/components/supplier/orders/OrdersList";
import { PendingOrders } from "@/components/supplier/orders/PendingOrders";
import { OrderFulfillment } from "@/components/supplier/orders/OrderFulfillment";
import { OrderAnalytics } from "@/components/supplier/orders/OrderAnalytics";

export function SupplierOrders() {
    const [searchQuery, setSearchQuery] = useState("");

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
                        <span className="text-3xl font-bold">12</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Processing</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">8</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Fulfilled Today</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">15</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Total Orders</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">156</span>
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
        </div>
    );
}