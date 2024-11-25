import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

interface SalesReportProps {
    period: string;
}

const salesTrends = [
    { month: "Jan", revenue: 145000, orders: 450 },
    { month: "Feb", revenue: 158000, orders: 480 },
    { month: "Mar", revenue: 162000, orders: 510 },
    { month: "Apr", revenue: 170000, orders: 520 },
    { month: "May", revenue: 180000, orders: 550 },
    { month: "Jun", revenue: 192000, orders: 580 },
];

const productPerformance = [
    { product: "Surgical Masks", sales: 25000 },
    { product: "Surgical Gloves", sales: 18000 },
    { product: "Syringes", sales: 15000 },
    { product: "Bandages", sales: 12000 },
    { product: "PPE Kits", sales: 22000 },
];

export function SalesReport({ period }: SalesReportProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Sales Trends</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={salesTrends}>
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <Tooltip />
                                <Legend />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue ($)"
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

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={productPerformance}>
                                    <XAxis dataKey="product" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" name="Sales ($)" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sales Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Total Revenue</div>
                                <div className="text-2xl font-bold">$1.2M</div>
                                <div className="text-sm text-green-600">↑ 12% from last period</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Order Value</div>
                                <div className="text-2xl font-bold">$2,450</div>
                                <div className="text-sm text-green-600">↑ 5% from last period</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Total Orders</div>
                                <div className="text-2xl font-bold">580</div>
                                <div className="text-sm text-green-600">↑ 8% from last period</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}