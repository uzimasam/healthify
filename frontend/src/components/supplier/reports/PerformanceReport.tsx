import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface PerformanceReportProps {
    period: string;
}

const performanceMetrics = [
    { name: "Order Fulfillment", score: 98, target: 95 },
    { name: "On-Time Delivery", score: 96, target: 95 },
    { name: "Quality Control", score: 99, target: 98 },
    { name: "Customer Satisfaction", score: 4.8, target: 4.5, type: "rating" },
];

const trends = [
    { month: "Jan", fulfillment: 97, delivery: 95, quality: 98 },
    { month: "Feb", fulfillment: 98, delivery: 96, quality: 99 },
    { month: "Mar", fulfillment: 96, delivery: 94, quality: 97 },
    { month: "Apr", fulfillment: 98, delivery: 97, quality: 98 },
    { month: "May", fulfillment: 99, delivery: 98, quality: 99 },
    { month: "Jun", fulfillment: 98, delivery: 96, quality: 99 },
];

export function PerformanceReport({ period }: PerformanceReportProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {performanceMetrics.map((metric) => {
                            const status =
                                metric.type === "rating"
                                    ? metric.score >= metric.target ? "success" : "warning"
                                    : metric.score >= metric.target ? "success" :
                                        metric.score >= metric.target - 5 ? "warning" : "error";

                            return (
                                <div key={metric.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-medium">{metric.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                Target: {metric.type === "rating" ? metric.target.toFixed(1) : `${metric.target}%`}
                                            </div>
                                        </div>
                                        <Badge
                                            variant={
                                                status === "success"
                                                    ? "default"
                                                    : status === "warning"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {metric.type === "rating" ? metric.score.toFixed(1) : `${metric.score}%`}
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={metric.type === "rating" ? (metric.score / 5) * 100 : metric.score}
                                        className="h-2"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trends}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="fulfillment"
                                    name="Order Fulfillment"
                                    stroke="#8884d8"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="delivery"
                                    name="On-Time Delivery"
                                    stroke="#82ca9d"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="quality"
                                    name="Quality Score"
                                    stroke="#ffc658"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}