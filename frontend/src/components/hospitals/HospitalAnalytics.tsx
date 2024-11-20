import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from "recharts";

const supplyUsageData = [
  { month: "Jan", masks: 2400, gloves: 4000, syringes: 3000 },
  { month: "Feb", masks: 1398, gloves: 3000, syringes: 2780 },
  { month: "Mar", masks: 9800, gloves: 2780, syringes: 3908 },
  { month: "Apr", masks: 3908, gloves: 2908, syringes: 2800 },
  { month: "May", masks: 4800, gloves: 2800, syringes: 2400 },
  { month: "Jun", masks: 3800, gloves: 2400, syringes: 2400 },
];

const orderTrendsData = [
  { month: "Jan", orders: 65, value: 45000 },
  { month: "Feb", orders: 78, value: 52000 },
  { month: "Mar", orders: 82, value: 49000 },
  { month: "Apr", orders: 70, value: 58000 },
  { month: "May", orders: 85, value: 51000 },
  { month: "Jun", orders: 92, value: 62000 },
];

export function HospitalAnalytics() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Supply Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplyUsageData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="masks" name="Surgical Masks" fill="#8884d8" />
                <Bar dataKey="gloves" name="Surgical Gloves" fill="#82ca9d" />
                <Bar dataKey="syringes" name="Syringes" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={orderTrendsData}>
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
    </div>
  );
}