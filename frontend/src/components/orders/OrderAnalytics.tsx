import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const orderTrends = [
  { month: "Jan", total: 145, emergency: 12, routine: 133 },
  { month: "Feb", total: 158, emergency: 15, routine: 143 },
  { month: "Mar", total: 162, emergency: 18, routine: 144 },
  { month: "Apr", total: 170, emergency: 14, routine: 156 },
  { month: "May", total: 180, emergency: 20, routine: 160 },
  { month: "Jun", total: 192, emergency: 22, routine: 170 },
];

const orderValueData = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 49000 },
  { month: "Apr", value: 58000 },
  { month: "May", value: 51000 },
  { month: "Jun", value: 62000 },
];

const orderStatusData = [
  { name: "Processing", value: 30 },
  { name: "Shipped", value: 45 },
  { name: "Delivered", value: 85 },
  { name: "Pending", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function OrderAnalytics() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Volume Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="emergency" name="Emergency Orders" fill="#ef4444" />
                <Bar dataKey="routine" name="Routine Orders" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Value Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderValueData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Order Value ($)"
                    stroke="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}