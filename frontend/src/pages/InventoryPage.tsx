import { useState } from "react";
import { Search, Filter, Plus, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryList } from "@/components/inventory/InventoryList";
import { InventoryAnalytics } from "@/components/inventory/InventoryAnalytics";
import { LowStockItems } from "@/components/inventory/LowStockItems";
import { AddInventoryDialog } from "@/components/inventory/AddInventoryDialog";
import { Card } from "@/components/ui/card";

export function InventoryPage() {
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
                <Button onClick={() => setShowAddDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search inventory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
                <Button variant="outline">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="p-4">
                    <div className="text-sm font-medium text-gray-500">Total Products</div>
                    <div className="text-2xl font-bold">1,234</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm font-medium text-gray-500">Low Stock Items</div>
                    <div className="text-2xl font-bold text-red-600">23</div>
                </Card>
                <Card className="p-4">
                    <div className="text-sm font-medium text-gray-500">Total Value</div>
                    <div className="text-2xl font-bold">$543,210</div>
                </Card>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <InventoryList searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="low-stock">
                    <LowStockItems />
                </TabsContent>

                <TabsContent value="analytics">
                    <InventoryAnalytics />
                </TabsContent>
            </Tabs>

            <AddInventoryDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
        </div>
    );
}