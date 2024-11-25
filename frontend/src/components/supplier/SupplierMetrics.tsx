import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export function SupplierMetrics() {
    const performanceData = [
        { month: "Jan", orders: 45, revenue: 22500 },
        { month: "Feb", orders: 52, revenue: 26000 },
        { month: "Mar", orders: 48, revenue: 24000 },
        { month: "Apr", orders: 61, revenue: 30500 },
        { month: "May", orders: 55, revenue: 27500 },
        { month: "Jun", orders: 67, revenue: 33500 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Legend />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="orders"
                                stroke="#8884d8"
                                name="Orders"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="revenue"
                                stroke="#82ca9d"
                                name="Revenue ($)"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}