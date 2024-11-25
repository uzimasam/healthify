import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

interface DeliveryPerformanceProps {
    period: string;
}

const deliveryTrends = [
    { day: "Mon", onTime: 25, delayed: 2, avgTime: 2.3 },
    { day: "Tue", onTime: 28, delayed: 1, avgTime: 2.1 },
    { day: "Wed", onTime: 22, delayed: 3, avgTime: 2.5 },
    { day: "Thu", onTime: 30, delayed: 2, avgTime: 2.2 },
    { day: "Fri", onTime: 27, delayed: 1, avgTime: 2.0 },
];

const deliveryStatus = [
    { name: "On Time", value: 85 },
    { name: "Slight Delay", value: 10 },
    { name: "Late", value: 5 },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

export function DeliveryPerformance({ period }: DeliveryPerformanceProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Delivery Time Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={deliveryTrends}>
                                <XAxis dataKey="day" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="onTime"
                                    name="On-Time Deliveries"
                                    stroke="#22c55e"
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="delayed"
                                    name="Delayed Deliveries"
                                    stroke="#ef4444"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="avgTime"
                                    name="Avg. Delivery Time (hours)"
                                    stroke="#8884d8"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={deliveryStatus}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {deliveryStatus.map((entry, index) => (
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
                        <CardTitle>Delivery Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Delivery Time</div>
                                <div className="text-2xl font-bold">2.3 hours</div>
                                <div className="text-sm text-green-600">↓ 0.2 hours from last month</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">On-Time Delivery Rate</div>
                                <div className="text-2xl font-bold">94.5%</div>
                                <div className="text-sm text-green-600">↑ 2.3% from last month</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">First Attempt Success Rate</div>
                                <div className="text-2xl font-bold">98.2%</div>
                                <div className="text-sm text-green-600">↑ 1.1% from last month</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}