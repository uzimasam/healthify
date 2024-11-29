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
import { Link } from "react-router-dom";

interface Organization {
  ID: number;
  name: string;
  type: string;
  email: string;
  phone: string;
  niche: string;
  code: string;
  city: string;
  status: string;
  created_at: string;
}

interface Supplier {
  id: number;
  org_id: number;
  compliance: boolean;
  business_license: boolean;
  insurance: boolean;
  created_at: string;
  updated_at: string;
  org: Organization;
}

interface SupplierListProps {
  suppliers: Supplier[];
}

export function SupplierList({ suppliers }: SupplierListProps) {
  console.log(suppliers);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-medium">{supplier.org.name}</TableCell>
            <TableCell>{supplier.org.city ? supplier.org.city : 'Nairobi'} - {supplier.org.code ? supplier.org.code : 'NBO'}</TableCell>
            <TableCell>
              <Badge
                variant={supplier.compliance ? "default" : "secondary"}
              >
                {supplier.compliance ? "Compliant" : "Non-compliant"}
              </Badge>
            </TableCell>
            <TableCell>{format(new Date(supplier.created_at), "MMM dd, yyyy")}</TableCell>
            <TableCell>
              <Link to={`/dashboard/supplier/${supplier.id}`}>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}