import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

const usageData = [
    { month: "Jan", consumption: 12500, orders: 15 },
    { month: "Feb", consumption: 13200, orders: 18 },
    { month: "Mar", consumption: 14800, orders: 20 },
    { month: "Apr", consumption: 13900, orders: 17 },
    { month: "May", consumption: 15200, orders: 22 },
    { month: "Jun", consumption: 16100, orders: 25 },
];

const categoryUsage = [
    { category: "PPE", usage: 45000 },
    { category: "Surgical Supplies", usage: 32000 },
    { category: "Medications", usage: 28000 },
    { category: "Equipment", usage: 15000 },
];

export function HospitalUsageMetrics() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Supply Usage Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={usageData}>
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="consumption"
                                    name="Consumption"
                                    stroke="#8884d8"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="orders"
                                    name="Orders"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Category-wise Usage</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryUsage}>
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="usage" name="Usage" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}