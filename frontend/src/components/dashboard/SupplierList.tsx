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
import { format } from "date-fns";


interface Supplier {
  id: string;
  name: string;
  city: string;
  code: string;
  status: string;
  reliability: number;
  hospitals: number;
  created_at: string;
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
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Connected Hospitals</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-medium">{supplier.name}</TableCell>
            <TableCell>{supplier.city ? supplier.city : 'Nairobi'} - {supplier.code ? supplier.code : 'NBO'}</TableCell>
            <TableCell>
              <Badge
                variant={supplier.status === "active" ? "default" : "secondary"}
              >
                {supplier.status}
              </Badge>
            </TableCell>
            <TableCell>{supplier.hospitals}</TableCell>
            <TableCell>{format(new Date(supplier.created_at), "MMM dd, yyyy")}</TableCell>
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