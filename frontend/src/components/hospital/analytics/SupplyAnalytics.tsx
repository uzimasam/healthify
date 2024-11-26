import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

interface SupplyAnalyticsProps {
    period: string;
}

const supplyTrends = [
    { month: "Jan", consumption: 12500, reorder: 15000 },
    { month: "Feb", consumption: 13200, reorder: 14000 },
    { month: "Mar", consumption: 14800, reorder: 16000 },
    { month: "Apr", consumption: 13900, reorder: 15000 },
    { month: "May", consumption: 15200, reorder: 16500 },
    { month: "Jun", consumption: 16100, reorder: 17000 },
];

const categoryDistribution = [
    { name: "PPE", value: 35 },
    { name: "Surgical Supplies", value: 25 },
    { name: "Medications", value: 20 },
    { name: "Equipment", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function SupplyAnalytics({ period }: SupplyAnalyticsProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Supply Consumption vs. Reorder Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={supplyTrends}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="consumption"
                                    name="Consumption"
                                    stroke="#8884d8"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="reorder"
                                    name="Reorder Points"
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
                        <CardTitle>Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Supply Chain Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Stock Turnover Rate</div>
                                <div className="text-2xl font-bold">4.2x</div>
                                <div className="text-sm text-green-600">↑ 0.3x from last period</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Stock Accuracy</div>
                                <div className="text-2xl font-bold">98.5%</div>
                                <div className="text-sm text-green-600">↑ 1.2% from last period</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Stockout Rate</div>
                                <div className="text-2xl font-bold">1.2%</div>
                                <div className="text-sm text-green-600">↓ 0.3% from last period</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}