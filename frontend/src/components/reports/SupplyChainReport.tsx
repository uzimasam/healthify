import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

interface SupplyChainReportProps {
    period: string;
}

const supplyChainData = [
    { date: "2024-03-01", orders: 85, deliveries: 82, issues: 3 },
    { date: "2024-03-02", orders: 75, deliveries: 73, issues: 2 },
    { date: "2024-03-03", orders: 90, deliveries: 87, issues: 3 },
    { date: "2024-03-04", orders: 95, deliveries: 92, issues: 3 },
    { date: "2024-03-05", orders: 85, deliveries: 83, issues: 2 },
    { date: "2024-03-06", orders: 80, deliveries: 78, issues: 2 },
    { date: "2024-03-07", orders: 88, deliveries: 85, issues: 3 },
];

export function SupplyChainReport({ period }: SupplyChainReportProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Supply Chain Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={supplyChainData}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="orders" name="Orders" stroke="#8884d8" />
                                <Line type="monotone" dataKey="deliveries" name="Deliveries" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="issues" name="Issues" stroke="#ff7300" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Delivery Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={supplyChainData}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="deliveries" name="Successful Deliveries" fill="#82ca9d" />
                                    <Bar dataKey="issues" name="Delivery Issues" fill="#ff7300" />
                                </BarChart>
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
                                <div className="text-sm font-medium text-gray-500">Order Fulfillment Rate</div>
                                <div className="text-2xl font-bold">96.8%</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Average Delivery Time</div>
                                <div className="text-2xl font-bold">1.8 days</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Supply Chain Efficiency</div>
                                <div className="text-2xl font-bold">94.5%</div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Issue Resolution Time</div>
                                <div className="text-2xl font-bold">4.2 hours</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}