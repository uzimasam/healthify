import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const stockTrends = [
    { month: "Jan", optimal: 85, warning: 10, critical: 5 },
    { month: "Feb", optimal: 80, warning: 15, critical: 5 },
    { month: "Mar", optimal: 75, warning: 18, critical: 7 },
    { month: "Apr", optimal: 82, warning: 12, critical: 6 },
    { month: "May", optimal: 88, warning: 8, critical: 4 },
    { month: "Jun", optimal: 85, warning: 10, critical: 5 },
];

const categoryDistribution = [
    { name: "PPE", value: 35 },
    { name: "Medical Supplies", value: 25 },
    { name: "Equipment", value: 20 },
    { name: "Pharmaceuticals", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function InventoryAnalytics() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Stock Level Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stockTrends}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="optimal" name="Optimal Stock" fill="#22c55e" />
                                <Bar dataKey="warning" name="Warning Level" fill="#eab308" />
                                <Bar dataKey="critical" name="Critical Level" fill="#ef4444" />
                            </BarChart>
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
                        <CardTitle>Inventory Value Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={[
                                        { month: "Jan", value: 500000 },
                                        { month: "Feb", value: 520000 },
                                        { month: "Mar", value: 540000 },
                                        { month: "Apr", value: 580000 },
                                        { month: "May", value: 600000 },
                                        { month: "Jun", value: 620000 },
                                    ]}
                                >
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        name="Inventory Value ($)"
                                        stroke="#8884d8"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}