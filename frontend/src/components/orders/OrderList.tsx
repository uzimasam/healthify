import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Eye, MoreVertical, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderListProps {
  searchQuery: string;
}

const orders = [
  {
    id: "ORD-2024-001",
    hospital: "Metropolitan General Hospital",
    supplier: "MedTech Supplies Inc.",
    status: "processing",
    priority: "high",
    items: 12,
    total: 4500,
    orderDate: "2024-03-15",
    deliveryDate: "2024-03-18",
  },
  {
    id: "ORD-2024-002",
    hospital: "St. Mary's Medical Center",
    supplier: "Global Healthcare Solutions",
    status: "shipped",
    priority: "normal",
    items: 8,
    total: 2800,
    orderDate: "2024-03-14",
    deliveryDate: "2024-03-17",
  },
  {
    id: "ORD-2024-003",
    hospital: "City Children's Hospital",
    supplier: "Premier Medical Supplies",
    status: "delivered",
    priority: "normal",
    items: 15,
    total: 6200,
    orderDate: "2024-03-13",
    deliveryDate: "2024-03-16",
  },
];

export function OrderList({ searchQuery }: OrderListProps) {
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.supplier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "secondary";
      case "shipped": return "default";
      case "delivered": return "default";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "normal": return "secondary";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Hospital</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Delivery Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.hospital}</TableCell>
              <TableCell>{order.supplier}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getPriorityColor(order.priority)}>
                  {order.priority}
                </Badge>
              </TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{order.orderDate}</TableCell>
              <TableCell>{order.deliveryDate}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Track Order</DropdownMenuItem>
                      <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Contact Supplier</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}