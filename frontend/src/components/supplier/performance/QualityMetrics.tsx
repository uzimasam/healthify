import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface QualityMetricsProps {
    period: string;
}

const qualityData = [
    { month: "Jan", accepted: 98, rejected: 2, complaints: 3 },
    { month: "Feb", accepted: 97, rejected: 3, complaints: 4 },
    { month: "Mar", accepted: 99, rejected: 1, complaints: 2 },
    { month: "Apr", accepted: 96, rejected: 4, complaints: 5 },
    { month: "May", accepted: 98, rejected: 2, complaints: 3 },
    { month: "Jun", accepted: 99, rejected: 1, complaints: 1 },
];

const qualityMetrics = [
    { name: "Product Quality", score: 98, target: 95 },
    { name: "Packaging Standards", score: 96, target: 95 },
    { name: "Documentation Accuracy", score: 99, target: 98 },
    { name: "Storage Compliance", score: 97, target: 95 },
];

export function QualityMetrics({ period }: QualityMetricsProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quality Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={qualityData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="accepted" name="Accepted Deliveries" fill="#22c55e" />
                                <Bar dataKey="rejected" name="Rejected Items" fill="#ef4444" />
                                <Bar dataKey="complaints" name="Quality Complaints" fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Quality Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {qualityMetrics.map((metric) => {
                            const status =
                                metric.score >= metric.target ? "success" :
                                    metric.score >= metric.target - 5 ? "warning" : "error";

                            return (
                                <div key={metric.name} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <div className="text-sm font-medium">{metric.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                Target: {metric.target}%
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
                                            {metric.score}%
                                        </Badge>
                                    </div>
                                    <Progress
                                        value={metric.score}
                                        className="h-2"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}