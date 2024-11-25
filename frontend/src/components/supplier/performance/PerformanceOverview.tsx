import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface PerformanceOverviewProps {
    period: string;
}

const performanceData = [
    { month: "Jan", rating: 4.7, orders: 145, quality: 96 },
    { month: "Feb", rating: 4.8, orders: 158, quality: 97 },
    { month: "Mar", rating: 4.8, orders: 162, quality: 98 },
    { month: "Apr", rating: 4.9, orders: 170, quality: 97 },
    { month: "May", rating: 4.8, orders: 180, quality: 96 },
    { month: "Jun", rating: 4.8, orders: 192, quality: 98 },
];

export function PerformanceOverview({ period }: PerformanceOverviewProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Performance Trends</CardTitle>
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
                                    dataKey="rating"
                                    name="Rating"
                                    stroke="#8884d8"
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="quality"
                                    name="Quality Score"
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
                        <CardTitle>Recent Feedback</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    hospital: "Metropolitan General Hospital",
                                    rating: 5,
                                    comment: "Excellent service and quality products",
                                    date: "2024-03-15",
                                },
                                {
                                    hospital: "St. Mary's Medical Center",
                                    rating: 4,
                                    comment: "Good delivery times, reliable supplier",
                                    date: "2024-03-14",
                                },
                            ].map((feedback, index) => (
                                <div key={index} className="border-b pb-4 last:border-0">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{feedback.hospital}</span>
                                        <span>{"⭐".repeat(feedback.rating)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{feedback.comment}</p>
                                    <p className="text-sm text-gray-500 mt-1">{feedback.date}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Performance Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm font-medium text-gray-500">Top Performing Area</div>
                                <div className="text-lg font-semibold">Order Fulfillment Rate</div>
                                <div className="text-sm text-gray-600">
                                    Consistently maintaining above 98% fulfillment rate
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Area for Improvement</div>
                                <div className="text-lg font-semibold">Delivery Time</div>
                                <div className="text-sm text-gray-600">
                                    Current average: 2.5 hours. Target: 2 hours
                                </div>
                            </div>
                            <div>
                                <div className="text-sm font-medium text-gray-500">Recent Achievement</div>
                                <div className="text-lg font-semibold">Quality Excellence Award</div>
                                <div className="text-sm text-gray-600">
                                    Achieved for maintaining 96%+ quality score
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}