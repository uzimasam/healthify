import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, History, TrendingUp, Package, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrderHistoryList } from "@/components/supplier/history/OrderHistoryList";
import { OrderTrends } from "@/components/supplier/history/OrderTrends";
import { OrderSummary } from "@/components/supplier/history/OrderSummary";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SupplierHistory() {
    const [searchQuery, setSearchQuery] = useState("");
    const [period, setPeriod] = useState("30");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Order History</h2>
                <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export History
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <History className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Total Orders</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">1,234</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Success Rate</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">98.5%</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Total Value</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">$543K</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Issues Rate</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">1.5%</span>
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
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Last 7 days</SelectItem>
                        <SelectItem value="30">Last 30 days</SelectItem>
                        <SelectItem value="90">Last 90 days</SelectItem>
                        <SelectItem value="365">Last year</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </div>

            <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="list">Order List</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>

                <TabsContent value="list">
                    <OrderHistoryList searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="trends">
                    <OrderTrends period={period} />
                </TabsContent>

                <TabsContent value="summary">
                    <OrderSummary period={period} />
                </TabsContent>
            </Tabs>
        </div>
    );
}