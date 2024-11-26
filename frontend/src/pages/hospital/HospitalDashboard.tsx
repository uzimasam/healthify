import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, AlertCircle, Clock } from "lucide-react";
import { HospitalInventoryStatus } from "@/components/hospital/HospitalInventoryStatus";
import { HospitalActiveOrders } from "@/components/hospital/HospitalActiveOrders";
import { HospitalUsageMetrics } from "@/components/hospital/HospitalUsageMetrics";
import { HospitalAlerts } from "@/components/hospital/HospitalAlerts";

export function HospitalDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Hospital Dashboard</h2>
                <Button>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Place New Order
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Active Orders</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">8</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Low Stock Items</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">12</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Pending Deliveries</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">5</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Total Inventory Items</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">156</span>
                    </div>
                </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory Status</TabsTrigger>
                    <TabsTrigger value="orders">Active Orders</TabsTrigger>
                    <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <HospitalUsageMetrics />
                </TabsContent>

                <TabsContent value="inventory">
                    <HospitalInventoryStatus />
                </TabsContent>

                <TabsContent value="orders">
                    <HospitalActiveOrders />
                </TabsContent>

                <TabsContent value="alerts">
                    <HospitalAlerts />
                </TabsContent>
            </Tabs>
        </div>
    );
}