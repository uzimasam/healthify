import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { Order } from "@/lib/api/supplier";

interface SupplierOrdersProps {
    orders: Order[];
}

export function SupplierOrders({ orders }: SupplierOrdersProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Required By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders === null ? (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div className="flex justify-center items-center h-40">
                                        <span className="text-gray-500">No orders available</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.order_code}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.order_status === 'completed' ? 'default' : 'secondary'}>
                                            {order.order_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.order_date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.order_required_by).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            )))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}