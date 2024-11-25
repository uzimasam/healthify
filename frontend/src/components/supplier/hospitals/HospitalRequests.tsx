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

const requests = [
    {
        id: "REQ-001",
        hospital: "City Children's Hospital",
        type: "Pediatric",
        location: "Chicago, IL",
        requestDate: "2024-03-15",
        status: "pending_review",
        requirements: ["Medical Supplies", "PPE", "Equipment"],
        expectedVolume: "Medium",
    },
    {
        id: "REQ-002",
        hospital: "Valley General Hospital",
        type: "General",
        location: "Phoenix, AZ",
        requestDate: "2024-03-14",
        status: "under_evaluation",
        requirements: ["Pharmaceuticals", "Medical Supplies"],
        expectedVolume: "High",
    },
];

export function HospitalRequests() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Partnership Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Request ID</TableHead>
                            <TableHead>Hospital</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Requirements</TableHead>
                            <TableHead>Expected Volume</TableHead>
                            <TableHead>Request Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell className="font-medium">{request.id}</TableCell>
                                <TableCell>{request.hospital}</TableCell>
                                <TableCell>{request.type}</TableCell>
                                <TableCell>{request.location}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {request.requirements.map((req) => (
                                            <Badge key={req} variant="secondary">
                                                {req}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>{request.expectedVolume}</TableCell>
                                <TableCell>{request.requestDate}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">
                                        {request.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm">Review</Button>
                                        <Button size="sm" variant="outline">
                                            Details
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}