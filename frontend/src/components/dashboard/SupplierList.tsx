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


interface Supplier {
  id: string;
  name: string;
  status: string;
  reliability: number;
  hospitals: number;
  lastDelivery: string;
}

interface SupplierListProps {
  suppliers: Supplier[];
}

export function SupplierList({ suppliers }: SupplierListProps) {
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