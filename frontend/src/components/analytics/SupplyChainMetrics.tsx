import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Box, Clock, TrendingUp } from "lucide-react";

export function SupplyChainMetrics() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Supply Chain Metrics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Average Delivery Time</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">2.4 days</span>
                            <span className="flex items-center text-sm text-green-500">
                                <ArrowDown className="h-4 w-4" />
                                12%
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Box className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Order Fulfillment Rate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">98.5%</span>
                            <span className="flex items-center text-sm text-green-500">
                                <ArrowUp className="h-4 w-4" />
                                3%
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Supply Chain Efficiency</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">94.2%</span>
                            <span className="flex items-center text-sm text-green-500">
                                <ArrowUp className="h-4 w-4" />
                                5%
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}