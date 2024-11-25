import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

const orderTrends = [
    { month: "Jan", fulfilled: 145, pending: 12 },
    { month: "Feb", fulfilled: 158, pending: 15 },
    { month: "Mar", fulfilled: 162, pending: 18 },
    { month: "Apr", fulfilled: 170, pending: 14 },
    { month: "May", fulfilled: 180, pending: 20 },
    { month: "Jun", fulfilled: 192, pending: 22 },
];

const fulfillmentTime = [
    { day: "Mon", time: 24 },
    { day: "Tue", time: 28 },
    { day: "Wed", time: 22 },
    { day: "Thu", time: 25 },
    { day: "Fri", time: 30 },
];

export function OrderAnalytics() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Volume Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderTrends}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="fulfilled" name="Fulfilled Orders" fill="#22c55e" />
                                <Bar dataKey="pending" name="Pending Orders" fill="#f59e0b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Average Fulfillment Time (Hours)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fulfillmentTime}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="time"
                                    name="Processing Time"
                                    stroke="#8884d8"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}