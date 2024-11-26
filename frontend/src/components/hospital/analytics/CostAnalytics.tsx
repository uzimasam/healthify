import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

interface CostAnalyticsProps {
    period: string;
}

const costTrends = [
    { month: "Jan", planned: 45000, actual: 48000 },
    { month: "Feb", planned: 52000, actual: 50000 },
    { month: "Mar", planned: 49000, actual: 51000 },
    { month: "Apr", planned: 58000, actual: 56000 },
    { month: "May", planned: 51000, actual: 53000 },
    { month: "Jun", planned: 62000, actual: 60000 },
];

const categorySpend = [
    { category: "PPE", spend: 25000 },
    { category: "Surgical Supplies", spend: 18000 },
    { category: "Medications", spend: 15000 },
    { category: "Equipment", spend: 12000 },
    { category: "Other", spend: 8000 },
];

export function CostAnalytics({ period }: CostAnalyticsProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Planned vs Actual Spend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={costTrends}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="planned"
                                    name="Planned Spend"
                                    stroke="#8884d8"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="actual"
                                    name="Actual Spend"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Spend by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categorySpend}>
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="spend" name="Spend ($)" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Cost Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Order Value</div>
                                <div className="text-2xl font-bold">$2,450</div>
                                <div className="text-sm text-green-600">↓ 3.2% from last period</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Cost per Item</div>
                                <div className="text-2xl font-bold">$12.80</div>
                                <div className="text-sm text-red-600">↑ 1.5% from last period</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Budget Utilization</div>
                                <div className="text-2xl font-bold">94.5%</div>
                                <div className="text-sm text-green-600">On track with forecast</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}