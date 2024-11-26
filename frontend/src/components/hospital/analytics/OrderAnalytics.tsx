import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

interface OrderAnalyticsProps {
    period: string;
}

const orderTrends = [
    { month: "Jan", regular: 120, emergency: 25, bulk: 35 },
    { month: "Feb", regular: 130, emergency: 28, bulk: 42 },
    { month: "Mar", regular: 125, emergency: 37, bulk: 38 },
    { month: "Apr", regular: 140, emergency: 30, bulk: 45 },
    { month: "May", regular: 150, emergency: 30, bulk: 40 },
    { month: "Jun", regular: 160, emergency: 32, bulk: 48 },
];

const fulfillmentTrends = [
    { month: "Jan", onTime: 95, delayed: 5, total: 120 },
    { month: "Feb", onTime: 92, delayed: 8, total: 145 },
    { month: "Mar", onTime: 97, delayed: 3, total: 155 },
    { month: "Apr", onTime: 94, delayed: 6, total: 130 },
    { month: "May", onTime: 96, delayed: 4, total: 140 },
    { month: "Jun", onTime: 98, delayed: 2, total: 150 },
];

export function OrderAnalytics({ period }: OrderAnalyticsProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Order Distribution by Type</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={orderTrends}>
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

            <Card>
                <CardHeader>
                    <CardTitle>Order Fulfillment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={fulfillmentTrends}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="onTime"
                                    name="On-Time Deliveries"
                                    stroke="#22c55e"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="delayed"
                                    name="Delayed Deliveries"
                                    stroke="#ef4444"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}