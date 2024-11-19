import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyChainMetrics } from "@/components/analytics/SupplyChainMetrics";
import { OrdersChart } from "@/components/analytics/OrdersChart";
import { PerformanceMetrics } from "@/components/analytics/PerformanceMetrics";
import { RegionalDistribution } from "@/components/analytics/RegionalDistribution";

export function AnalyticsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
                <select className="border rounded-md p-2">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last year</option>
                </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <SupplyChainMetrics />
                <PerformanceMetrics />
            </div>

            <Tabs defaultValue="orders" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="orders">Orders Analysis</TabsTrigger>
                    <TabsTrigger value="distribution">Distribution Map</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Trends</CardTitle>
                            <CardDescription>Analysis of order patterns and volumes</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <OrdersChart />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="distribution">
                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Distribution</CardTitle>
                            <CardDescription>Geographic distribution of supplies and demands</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RegionalDistribution />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}