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

interface Supplier {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
  reliabilityScore: number;
  lastDelivery: string;
  complianceStatus: string;
  activeContracts: number;
}
interface SupplierListProps {
  searchQuery: string;
  suppliers: Supplier[];
}

export function SupplierList({ searchQuery, suppliers }: SupplierListProps) {
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Reliability Score</TableHead>
            <TableHead>Compliance</TableHead>
            <TableHead>Active Contracts</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSuppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {supplier.name}
                  {supplier.complianceStatus === "warning" && (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </TableCell>
              <TableCell>{supplier.type}</TableCell>
              <TableCell>{supplier.location}</TableCell>
              <TableCell>
                <Badge variant={supplier.reliabilityScore >= 90 ? "default" : "secondary"}>
                  {supplier.reliabilityScore}%
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    supplier.complianceStatus === "verified"
                      ? "default"
                      : supplier.complianceStatus === "warning"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {supplier.complianceStatus}
                </Badge>
              </TableCell>
              <TableCell>{supplier.activeContracts}</TableCell>
              <TableCell>
                <Badge
                  variant={supplier.status === "active" ? "default" : "destructive"}
                >
                  {supplier.status}
                </Badge>
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
                      <DropdownMenuItem>Edit Supplier</DropdownMenuItem>
                      <DropdownMenuItem>View Contracts</DropdownMenuItem>
                      <DropdownMenuItem>Compliance History</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Suspend Supplier</DropdownMenuItem>
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