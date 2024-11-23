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

interface SupplierPerformanceProps {
    period: string;
}

const supplierData = [
    {
        name: "MedTech Supplies Inc.",
        deliveries: 245,
        onTime: 98.5,
        quality: 99.2,
        value: 180000,
        status: "excellent",
    },
    {
        name: "Global Healthcare Solutions",
        deliveries: 188,
        onTime: 95.8,
        quality: 98.5,
        value: 145000,
        status: "good",
    },
    {
        name: "Premier Medical Supplies",
        deliveries: 156,
        onTime: 92.4,
        quality: 97.8,
        value: 120000,
        status: "warning",
    },
];

export function SupplierPerformance({ period }: SupplierPerformanceProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Supplier Performance Report</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Total Deliveries</TableHead>
                            <TableHead>On-Time %</TableHead>
                            <TableHead>Quality %</TableHead>
                            <TableHead>Total Value</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {supplierData.map((supplier) => (
                            <TableRow key={supplier.name}>
                                <TableCell className="font-medium">{supplier.name}</TableCell>
                                <TableCell>{supplier.deliveries}</TableCell>
                                <TableCell>{supplier.onTime}%</TableCell>
                                <TableCell>{supplier.quality}%</TableCell>
                                <TableCell>${supplier.value.toLocaleString()}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            supplier.status === "excellent"
                                                ? "default"
                                                : supplier.status === "good"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                    >
                                        {supplier.status}
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