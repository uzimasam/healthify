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

interface HospitalListProps {
  searchQuery: string;
}

const hospitals = [
  {
    id: 1,
    name: "Metropolitan General Hospital",
    type: "General",
    status: "active",
    location: "Nairobi, NBO",
    supplyLevel: "optimal",
    lastOrder: "2024-03-15",
    criticalItems: 0,
  },
  {
    id: 2,
    name: "St. Mary's Medical Center",
    type: "Specialized",
    status: "active",
    location: "Mombas, MSA",
    supplyLevel: "warning",
    lastOrder: "2024-03-14",
    criticalItems: 3,
  },
  {
    id: 3,
    name: "City Children's Hospital",
    type: "Pediatric",
    status: "active",
    location: "Kisumu, KSM",
    supplyLevel: "critical",
    lastOrder: "2024-03-13",
    criticalItems: 5,
  },
];

export function HospitalList({ searchQuery }: HospitalListProps) {
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Supply Level</TableHead>
            <TableHead>Critical Items</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredHospitals.map((hospital) => (
            <TableRow key={hospital.id}>
              <TableCell className="font-medium">{hospital.name}</TableCell>
              <TableCell>{hospital.type}</TableCell>
              <TableCell>{hospital.location}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    hospital.supplyLevel === "optimal"
                      ? "default"
                      : hospital.supplyLevel === "warning"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {hospital.supplyLevel}
                </Badge>
              </TableCell>
              <TableCell>{hospital.criticalItems}</TableCell>
              <TableCell>{hospital.lastOrder}</TableCell>
              <TableCell>
                <Badge variant={hospital.status === "active" ? "default" : "secondary"}>
                  {hospital.status}
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
                      <DropdownMenuItem>Edit Hospital</DropdownMenuItem>
                      <DropdownMenuItem>Manage Supplies</DropdownMenuItem>
                      <DropdownMenuItem>View Orders</DropdownMenuItem>
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