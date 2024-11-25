import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, TrendingUp, Clock, AlertCircle } from "lucide-react";
import { SupplierInventory } from "@/components/supplier/SupplierInventory";
import { SupplierOrders } from "@/components/supplier/SupplierOrders";
import { SupplierMetrics } from "@/components/supplier/SupplierMetrics";
import { SupplierAlerts } from "@/components/supplier/SupplierAlerts";

export function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Supplier Dashboard</h2>
        <Button>
          <Package className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Active Products</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">124</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Monthly Orders</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">67</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Pending Deliveries</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">12</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Low Stock Items</span>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold">8</span>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <SupplierMetrics />
        </TabsContent>

        <TabsContent value="inventory">
          <SupplierInventory />
        </TabsContent>

        <TabsContent value="orders">
          <SupplierOrders />
        </TabsContent>

        <TabsContent value="alerts">
          <SupplierAlerts />
        </TabsContent>
      </Tabs>
    </div>
  );
}