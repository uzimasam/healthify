import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const deliveryTrends = [
    { day: "Mon", onTime: 25, delayed: 2 },
    { day: "Tue", onTime: 28, delayed: 1 },
    { day: "Wed", onTime: 22, delayed: 3 },
    { day: "Thu", onTime: 30, delayed: 2 },
    { day: "Fri", onTime: 27, delayed: 1 },
];

const deliveryTimes = [
    { time: "Morning", deliveries: 15 },
    { time: "Afternoon", deliveries: 20 },
    { time: "Evening", deliveries: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export function DeliveryAnalytics() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Delivery Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={deliveryTrends}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="onTime" name="On-Time Deliveries" fill="#22c55e" />
                                <Bar dataKey="delayed" name="Delayed Deliveries" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Time Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={deliveryTimes}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="deliveries"
                                    >
                                        {deliveryTimes.map((entry, index) => (
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
                        <CardTitle>Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Delivery Time</div>
                                <div className="text-2xl font-bold">2.5 hours</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">On-Time Delivery Rate</div>
                                <div className="text-2xl font-bold">94.5%</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Customer Satisfaction</div>
                                <div className="text-2xl font-bold">4.8/5.0</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Total Deliveries (This Month)</div>
                                <div className="text-2xl font-bold">342</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}