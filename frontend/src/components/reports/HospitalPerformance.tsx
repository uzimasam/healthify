import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface HospitalPerformanceProps {
    period: string;
}

const hospitalData = [
    {
        name: "Metropolitan General Hospital",
        orderVolume: 450,
        orderValue: 125000,
        stockouts: 2,
        compliance: 98.5,
        status: "optimal",
    },
    {
        name: "St. Mary's Medical Center",
        orderVolume: 380,
        orderValue: 98000,
        stockouts: 4,
        compliance: 96.2,
        status: "warning",
    },
    {
        name: "City Children's Hospital",
        orderVolume: 290,
        orderValue: 76000,
        stockouts: 1,
        compliance: 99.1,
        status: "optimal",
    },
];

export function HospitalPerformance({ period }: HospitalPerformanceProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hospital Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Hospital Name</TableHead>
                            <TableHead>Order Volume</TableHead>
                            <TableHead>Order Value</TableHead>
                            <TableHead>Stockouts</TableHead>
                            <TableHead>Compliance %</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hospitalData.map((hospital) => (
                            <TableRow key={hospital.name}>
                                <TableCell className="font-medium">{hospital.name}</TableCell>
                                <TableCell>{hospital.orderVolume}</TableCell>
                                <TableCell>${hospital.orderValue.toLocaleString()}</TableCell>
                                <TableCell>{hospital.stockouts}</TableCell>
                                <TableCell>{hospital.compliance}%</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={hospital.status === "optimal" ? "default" : "secondary"}
                                    >
                                        {hospital.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}