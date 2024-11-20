import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

const deliveryData = [
  { month: "Jan", onTime: 95, delayed: 5, total: 120 },
  { month: "Feb", onTime: 92, delayed: 8, total: 145 },
  { month: "Mar", onTime: 97, delayed: 3, total: 155 },
  { month: "Apr", onTime: 94, delayed: 6, total: 130 },
  { month: "May", onTime: 96, delayed: 4, total: 140 },
  { month: "Jun", onTime: 98, delayed: 2, total: 150 },
];

const qualityData = [
  { month: "Jan", accepted: 98, rejected: 2, complaints: 3 },
  { month: "Feb", accepted: 97, rejected: 3, complaints: 4 },
  { month: "Mar", accepted: 99, rejected: 1, complaints: 2 },
  { month: "Apr", accepted: 96, rejected: 4, complaints: 5 },
  { month: "May", accepted: 98, rejected: 2, complaints: 3 },
  { month: "Jun", accepted: 99, rejected: 1, complaints: 1 },
];

export function SupplierAnalytics() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryData}>
                <XAxis dataKey="month" />
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

      <Card>
        <CardHeader>
          <CardTitle>Quality Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="accepted"
                  name="Accepted Deliveries (%)"
                  stroke="#22c55e"
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  name="Rejected Deliveries (%)"
                  stroke="#ef4444"
                />
                <Line
                  type="monotone"
                  dataKey="complaints"
                  name="Quality Complaints"
                  stroke="#eab308"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}