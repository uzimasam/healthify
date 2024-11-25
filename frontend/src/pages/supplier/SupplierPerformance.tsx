import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Star, AlertCircle, Award } from "lucide-react";
import { PerformanceOverview } from "@/components/supplier/performance/PerformanceOverview";
import { QualityMetrics } from "@/components/supplier/performance/QualityMetrics";
import { DeliveryPerformance } from "@/components/supplier/performance/DeliveryPerformance";
import { ComplianceScore } from "@/components/supplier/performance/ComplianceScore";

export function SupplierPerformance() {
    const [period, setPeriod] = useState("30");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Performance Dashboard</h2>
                <Button>
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Download Report
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Overall Rating</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">4.8</span>
                        <span className="text-sm text-gray-500 ml-2">/ 5.0</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Fulfillment Rate</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">98.5%</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Quality Score</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">96.7%</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Compliance Score</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">99.2%</span>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="quality">Quality Metrics</TabsTrigger>
                    <TabsTrigger value="delivery">Delivery Performance</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <PerformanceOverview period={period} />
                </TabsContent>

                <TabsContent value="quality">
                    <QualityMetrics period={period} />
                </TabsContent>

                <TabsContent value="delivery">
                    <DeliveryPerformance period={period} />
                </TabsContent>

                <TabsContent value="compliance">
                    <ComplianceScore period={period} />
                </TabsContent>
            </Tabs>
        </div>
    );
}