import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const scheduledDeliveries = [
  {
    id: "DEL-2024-003",
    orderId: "ORD-2024-003",
    hospital: "City Children's Hospital",
    scheduledTime: "2:30 PM",
    driver: "Sarah Wilson",
    vehicle: "Van-003",
    items: 15,
    status: "scheduled",
  },
  {
    id: "DEL-2024-004",
    orderId: "ORD-2024-004",
    hospital: "Metropolitan General Hospital",
    scheduledTime: "3:45 PM",
    driver: "David Brown",
    vehicle: "Van-004",
    items: 10,
    status: "pending_assignment",
  },
];

export function DeliverySchedule() {
  return (
    <div className="grid ">
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Delivery ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Hospital</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>{delivery.hospital}</TableCell>
                  <TableCell>{delivery.scheduledTime}</TableCell>
                  <TableCell>{delivery.driver}</TableCell>
                  <TableCell>{delivery.vehicle}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        delivery.status === "scheduled" ? "default" : "secondary"
                      }
                    >
                      {delivery.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      {delivery.status === "pending_assignment"
                        ? "Assign Driver"
                        : "View Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}