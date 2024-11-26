import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Clock } from "lucide-react";
import { OrderList } from "@/components/hospital/orders/OrderList";
import { OrderTracking } from "@/components/hospital/orders/OrderTracking";
import { PendingDeliveries } from "@/components/hospital/orders/PendingDeliveries";

export function ActiveOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Active Orders</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Processing</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">5</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">In Transit</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">3</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Arriving Today</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">2</span>
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
                    <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
                    <TabsTrigger value="pending">Pending Deliveries</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <OrderList searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="tracking">
                    <OrderTracking />
                </TabsContent>

                <TabsContent value="pending">
                    <PendingDeliveries />
                </TabsContent>
            </Tabs>
        </div>
    );
}