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

const pendingSuppliers = [
  {
    id: 1,
    name: "NextGen Medical Supplies",
    type: "Medical Equipment",
    location: "Eldoret, ELD",
    applicationDate: "2024-03-15",
    documents: ["Business License", "FDA Certification", "Insurance"],
    status: "pending_review",
  },
  {
    id: 2,
    name: "HealthCare Distributors LLC",
    type: "Pharmaceuticals",
    location: "Thika, THK",
    applicationDate: "2024-03-14",
    documents: ["Business License", "DEA License", "Insurance"],
    status: "pending_documents",
  },
  {
    id: 3,
    name: "MedSupply Excellence",
    type: "Medical Supplies",
    location: "Mombasa, MSA",
    applicationDate: "2024-03-13",
    documents: ["Business License", "Quality Certification"],
    status: "pending_verification",
  },
];

export function PendingApprovals() {
  const [selectedSupplier, setSelectedSupplier] = useState<typeof pendingSuppliers[0] | null>(null);
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
                  <TableCell>{supplier.location}</TableCell>
                  <TableCell>{supplier.applicationDate}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {supplier.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {supplier.documents.map((doc) => (
                        <span key={doc} className="text-sm">
                          ✓ {doc}
                        </span>
                      ))}
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
                  <p className="text-sm">{selectedSupplier.location}</p>
                </div>
                <div>
                  <h4 className="font-medium">Document Checklist</h4>
                  {selectedSupplier.documents.map((doc) => (
                    <div key={doc} className="flex items-center gap-2">
                      <Checkbox id={doc} />
                      <label htmlFor={doc} className="text-sm">
                        {doc}
                      </label>
                    </div>
                  ))}
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