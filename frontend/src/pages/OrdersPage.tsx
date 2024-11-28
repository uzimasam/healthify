import { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderList } from "@/components/orders/OrderList";
import { OrderAnalytics } from "@/components/orders/OrderAnalytics";
import { PendingOrders } from "@/components/orders/PendingOrders";
import { CreateOrderDialog } from "@/components/orders/CreateOrderDialog";

export function OrdersPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
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
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OrderList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="pending">
          <PendingOrders />
        </TabsContent>

        <TabsContent value="analytics">
          <OrderAnalytics />
        </TabsContent>
      </Tabs>

      <CreateOrderDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
}