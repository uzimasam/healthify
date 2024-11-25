import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

interface InventoryReportProps {
    period: string;
}

const stockStatus = [
    { name: "Optimal", value: 65 },
    { name: "Warning", value: 25 },
    { name: "Critical", value: 10 },
];

const categoryValue = [
    { category: "PPE", value: 250000 },
    { category: "Medical Supplies", value: 180000 },
    { category: "Equipment", value: 320000 },
    { category: "Pharmaceuticals", value: 280000 },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

export function InventoryReport({ period }: InventoryReportProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stockStatus}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {stockStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={categoryValue}>
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" name="Inventory Value ($)" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Key Inventory Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total SKUs</div>
                            <div className="text-2xl font-bold">1,234</div>
                            <div className="text-sm text-gray-500">Active Products</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Total Value</div>
                            <div className="text-2xl font-bold">$1.03M</div>
                            <div className="text-sm text-gray-500">Current Inventory</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Stock Turnover</div>
                            <div className="text-2xl font-bold">4.2x</div>
                            <div className="text-sm text-gray-500">Monthly Average</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}