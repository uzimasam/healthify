import { useEffect, useState } from "react";
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
import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchOrders } from "@/lib/api/orders";

interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
}

interface Order {
  id: string;
  supplier: string;
  items: OrderItem[];
  total: number;
  status: string;
  priority: string;
  order_date: string;
  expected_delivery: string;
}

interface OrderListProps {
  searchQuery: string;
}

export function OrderList({ searchQuery }: OrderListProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        setIsLoading(true);
        const data = await fetchOrders(searchQuery);
        setOrders(data);
        setError(null);
      } catch (err) {
        setError('Failed to load orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    // Debounce search queries
    const timeoutId = setTimeout(() => {
      loadOrders();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <Card>
        <div className="p-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="p-8 text-center text-red-500">
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Expected Delivery</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.supplier}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="text-sm">
                      {item.quantity} {item.unit} {item.name}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "pending"
                      ? "secondary"
                      : order.status === "in_transit"
                      ? "default"
                      : "destructive"
                  }
                >
                  {order.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={order.priority === "high" ? "destructive" : "secondary"}
                >
                  {order.priority}
                </Badge>
              </TableCell>
              <TableCell title={order.order_date}>
                {order.order_date}
              </TableCell>
              <TableCell title={order.expected_delivery}>
                {order.expected_delivery}
              </TableCell>
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
          {orders.length === 0 && (
            <TableRow>
              <TableCell 
                colSpan={9} 
                className="text-center text-gray-500 py-8"
              >
                {searchQuery 
                  ? "No orders found matching your search"
                  : "No orders found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}