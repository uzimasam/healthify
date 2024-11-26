import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

interface OrderTrendsProps {
    period: string;
}

const orderTrends = [
    { month: "Jan", orders: 145, value: 45000, avgTime: 2.3 },
    { month: "Feb", orders: 158, value: 52000, avgTime: 2.1 },
    { month: "Mar", orders: 162, value: 49000, avgTime: 2.4 },
    { month: "Apr", orders: 170, value: 58000, avgTime: 2.2 },
    { month: "May", orders: 180, value: 51000, avgTime: 2.0 },
    { month: "Jun", orders: 192, value: 62000, avgTime: 1.9 },
];

const orderTypes = [
    { month: "Jan", regular: 120, emergency: 25, bulk: 35 },
    { month: "Feb", regular: 130, emergency: 28, bulk: 42 },
    { month: "Mar", regular: 125, emergency: 37, bulk: 38 },
    { month: "Apr", regular: 140, emergency: 30, bulk: 45 },
    { month: "May", regular: 150, emergency: 30, bulk: 40 },
    { month: "Jun", regular: 160, emergency: 32, bulk: 48 },
];

export function OrderTrends({ period }: OrderTrendsProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Volume and Value Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={orderTrends}>
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="orders"
                                    name="Number of Orders"
                                    stroke="#8884d8"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="value"
                                    name="Order Value ($)"
                                    stroke="#82ca9d"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Types Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderTypes}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="regular" name="Regular Orders" fill="#8884d8" />
                                <Bar dataKey="emergency" name="Emergency Orders" fill="#82ca9d" />
                                <Bar dataKey="bulk" name="Bulk Orders" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}