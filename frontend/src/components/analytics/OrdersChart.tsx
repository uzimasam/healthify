import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', orders: 120, value: 45000 },
    { name: 'Tue', orders: 132, value: 52000 },
    { name: 'Wed', orders: 145, value: 49000 },
    { name: 'Thu', orders: 155, value: 58000 },
    { name: 'Fri', orders: 148, value: 51000 },
    { name: 'Sat', orders: 110, value: 42000 },
    { name: 'Sun', orders: 98, value: 38000 },
];

export function OrdersChart() {
    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="orders" stroke="#8884d8" name="Number of Orders" />
                    <Line yAxisId="right" type="monotone" dataKey="value" stroke="#82ca9d" name="Order Value ($)" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}