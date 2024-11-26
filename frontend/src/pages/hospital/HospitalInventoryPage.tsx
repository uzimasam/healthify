import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Package, AlertCircle, ArrowUpDown } from "lucide-react";
import { InventoryList } from "@/components/hospital/inventory/InventoryList";
import { LowStockItems } from "@/components/hospital/inventory/LowStockItems";
import { InventoryAnalytics } from "@/components/hospital/inventory/InventoryAnalytics";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function HospitalInventoryPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Total Items</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">1,234</span>
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
                        <Package className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Optimal Stock</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">985</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Expiring Soon</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">23</span>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search inventory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="stock">Stock Level</SelectItem>
                            <SelectItem value="category">Category</SelectItem>
                            <SelectItem value="expiry">Expiry Date</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Items</TabsTrigger>
                    <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <InventoryList searchQuery={searchQuery} sortBy={sortBy} />
                </TabsContent>

                <TabsContent value="low-stock">
                    <LowStockItems />
                </TabsContent>

                <TabsContent value="analytics">
                    <InventoryAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    );
}