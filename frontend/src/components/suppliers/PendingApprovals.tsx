import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

interface Supplier {
  id: number;
  name: string;
  type: string;
  city: string;
  code: string;
  created_at: string;
  status: string;
}

interface PendingApprovalsProps {
  pendingSuppliers: Supplier[];
}

export function PendingApprovals({ pendingSuppliers }: PendingApprovalsProps) {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleApprove = (supplier: typeof pendingSuppliers[0]) => {
    setSelectedSupplier(supplier);
    setShowDialog(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pending Supplier Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Application Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Documents</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.type}</TableCell>
                  <TableCell>{supplier.city} {supplier.code}</TableCell>
                  <TableCell>
                    {format(new Date(supplier.created_at), "do MMM yyyy h:mm a")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {supplier.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span key="insurance" className="text-sm">
                        ✓ Insurance
                      </span>
                      <span key="license" className="text-sm">
                        ✓ Business License
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(supplier)}
                      >
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Supplier Application</DialogTitle>
            <DialogDescription>
              Review the supplier's information and documentation before approval.
            </DialogDescription>
          </DialogHeader>

          {selectedSupplier && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Company Details</h4>
                  <p className="text-sm">{selectedSupplier.name}</p>
                  <p className="text-sm">{selectedSupplier.type}</p>
                  <p className="text-sm">{selectedSupplier.city} {selectedSupplier.code}</p>
                </div>
                <div>
                  <h4 className="font-medium">Document Checklist</h4>
                  <div key="insurance" className="flex items-center gap-2">
                    <Checkbox id="insurance" />
                    <label htmlFor="insurance" className="text-sm">
                      Insurance
                    </label>
                  </div>
                  <div key="license" className="flex items-center gap-2">
                    <Checkbox id="license" />
                    <label htmlFor="license" className="text-sm">
                      Business License
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Request More Info
            </Button>
            <Button variant="destructive" onClick={() => setShowDialog(false)}>
              Reject
            </Button>
            <Button onClick={() => setShowDialog(false)}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}