import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const orderVolume = [
    { month: "Jan", orders: 145, value: 45000 },
    { month: "Feb", orders: 158, value: 52000 },
    { month: "Mar", orders: 162, value: 49000 },
    { month: "Apr", orders: 170, value: 58000 },
    { month: "May", orders: 180, value: 51000 },
    { month: "Jun", orders: 192, value: 62000 },
];

const hospitalDistribution = [
    { type: "General", count: 10 },
    { type: "Specialized", count: 6 },
    { type: "Pediatric", count: 4 },
    { type: "Research", count: 4 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function HospitalAnalytics() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Hospital Order Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={orderVolume}>
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

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Hospital Type Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={hospitalDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="count"
                                    >
                                        {hospitalDistribution.map((entry, index) => (
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
                        <CardTitle>Partnership Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Partnership Duration</div>
                                <div className="text-2xl font-bold">2.5 years</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Partnership Retention Rate</div>
                                <div className="text-2xl font-bold">95%</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Orders per Hospital</div>
                                <div className="text-2xl font-bold">8.2 / month</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Response Time</div>
                                <div className="text-2xl font-bold">2.4 hours</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}