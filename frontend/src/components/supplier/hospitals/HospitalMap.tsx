import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HospitalMap() {
    const regions = [
        {
            name: "Northeast Region",
            hospitals: [
                { name: "Metropolitan General Hospital", status: "active" },
                { name: "City Medical Center", status: "active" },
            ],
            coverage: "95%",
            performance: "Excellent",
        },
        {
            name: "Southwest Region",
            hospitals: [
                { name: "Desert Valley Hospital", status: "active" },
                { name: "Southwest Medical Center", status: "warning" },
            ],
            coverage: "85%",
            performance: "Good",
        },
    ];

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Regional Coverage Map</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center p-8 text-gray-500">
                        Map visualization would be displayed here
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
                {regions.map((region) => (
                    <Card key={region.name}>
                        <CardHeader>
                            <CardTitle>{region.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Connected Hospitals</div>
                                    <div className="space-y-2 mt-2">
                                        {region.hospitals.map((hospital) => (
                                            <div key={hospital.name} className="flex items-center justify-between">
                                                <span>{hospital.name}</span>
                                                <Badge
                                                    variant={hospital.status === "active" ? "default" : "secondary"}
                                                >
                                                    {hospital.status}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Coverage Rate</div>
                                    <div className="text-2xl font-bold">{region.coverage}</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-500">Performance</div>
                                    <div className="text-2xl font-bold">{region.performance}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}