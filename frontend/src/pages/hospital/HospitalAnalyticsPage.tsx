import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, DollarSign, Package, Clock } from "lucide-react";
import { SupplyAnalytics } from "@/components/hospital/analytics/SupplyAnalytics";
import { OrderAnalytics } from "@/components/hospital/analytics/OrderAnalytics";
import { CostAnalytics } from "@/components/hospital/analytics/CostAnalytics";
import { PerformanceMetrics } from "@/components/hospital/analytics/PerformanceMetrics";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function HospitalAnalyticsPage() {
    const [period, setPeriod] = useState("30");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
                <div className="flex items-center gap-4">
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
                    <Button>Download Report</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Order Success Rate</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">98.5%</span>
                        <span className="text-sm text-green-600 ml-2">↑ 2.1%</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Total Spend</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">$543K</span>
                        <span className="text-sm text-red-600 ml-2">↑ 5.2%</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Stock Efficiency</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">94.2%</span>
                        <span className="text-sm text-green-600 ml-2">↑ 1.5%</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Avg. Delivery Time</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">2.3h</span>
                        <span className="text-sm text-green-600 ml-2">↓ 0.2h</span>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="supply" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="supply">Supply Analytics</TabsTrigger>
                    <TabsTrigger value="orders">Order Analytics</TabsTrigger>
                    <TabsTrigger value="cost">Cost Analytics</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="supply">
                    <SupplyAnalytics period={period} />
                </TabsContent>

                <TabsContent value="orders">
                    <OrderAnalytics period={period} />
                </TabsContent>

                <TabsContent value="cost">
                    <CostAnalytics period={period} />
                </TabsContent>

                <TabsContent value="performance">
                    <PerformanceMetrics period={period} />
                </TabsContent>
            </Tabs>
        </div>
    );
}