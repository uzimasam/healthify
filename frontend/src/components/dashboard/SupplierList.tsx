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

const suppliers = [
  {
    id: 1,
    name: "MedTech Supplies",
    status: "active",
    reliability: 98,
    hospitals: 45,
    lastDelivery: "2024-03-15",
  },
  {
    id: 2,
    name: "Global Healthcare",
    status: "active",
    reliability: 95,
    hospitals: 32,
    lastDelivery: "2024-03-14",
  },
  {
    id: 3,
    name: "Prime Medical",
    status: "pending",
    reliability: 0,
    hospitals: 0,
    lastDelivery: "-",
  },
];

export function SupplierList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Reliability Score</TableHead>
          <TableHead>Connected Hospitals</TableHead>
          <TableHead>Last Delivery</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-medium">{supplier.name}</TableCell>
            <TableCell>
              <Badge
                variant={supplier.status === "active" ? "default" : "secondary"}
              >
                {supplier.status}
              </Badge>
            </TableCell>
            <TableCell>{supplier.reliability}%</TableCell>
            <TableCell>{supplier.hospitals}</TableCell>
            <TableCell>{supplier.lastDelivery}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}