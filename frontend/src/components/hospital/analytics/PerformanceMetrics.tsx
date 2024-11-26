import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PerformanceMetricsProps {
    period: string;
}

const metrics = [
    {
        name: "Order Fulfillment Rate",
        score: 98.5,
        target: 95,
        trend: "up",
        trendValue: 2.1,
    },
    {
        name: "On-Time Delivery Rate",
        score: 96.2,
        target: 95,
        trend: "up",
        trendValue: 1.5,
    },
    {
        name: "Stock Accuracy",
        score: 99.1,
        target: 98,
        trend: "up",
        trendValue: 0.8,
    },
    {
        name: "Supplier Performance",
        score: 4.8,
        target: 4.5,
        trend: "up",
        trendValue: 0.2,
        type: "rating",
    },
];

const supplierMetrics = [
    {
        supplier: "MedTech Supplies Inc.",
        reliability: 98,
        quality: 99,
        response: 95,
        overall: 97.3,
    },
    {
        supplier: "Global Healthcare Solutions",
        reliability: 96,
        quality: 98,
        response: 97,
        overall: 97.0,
    },
];

export function PerformanceMetrics({ period }: PerformanceMetricsProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {metrics.map((metric) => {
                            const percentage = metric.type === "rating"
                                ? (metric.score / 5) * 100
                                : metric.score;

                            return (
                                <div key={metric.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-medium">{metric.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                Target: {metric.type === "rating" ? metric.target.toFixed(1) : `${metric.target}%`}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant="secondary">
                                                {metric.type === "rating" ? metric.score.toFixed(1) : `${metric.score}%`}
                                            </Badge>
                                            <div className="text-sm text-green-600">
                                                ↑ {metric.trendValue}{metric.type === "rating" ? "" : "%"}
                                            </div>
                                        </div>
                                    </div>
                                    <Progress value={percentage} className="h-2" />
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Supplier Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {supplierMetrics.map((supplier) => (
                            <div key={supplier.supplier} className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{supplier.supplier}</span>
                                    <Badge variant="default">{supplier.overall}%</Badge>
                                </div>
                                <div className="space-y-2">
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <div className="text-gray-500">Reliability</div>
                                            <div className="font-medium">{supplier.reliability}%</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500">Quality</div>
                                            <div className="font-medium">{supplier.quality}%</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-500">Response Time</div>
                                            <div className="font-medium">{supplier.response}%</div>
                                        </div>
                                    </div>
                                    <Progress value={supplier.overall} className="h-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}