import { Card } from "@/components/ui/card";

const regions = [
    { name: "North Region", hospitals: 45, suppliers: 12, activeOrders: 89 },
    { name: "South Region", hospitals: 38, suppliers: 8, activeOrders: 65 },
    { name: "East Region", hospitals: 42, suppliers: 10, activeOrders: 78 },
    { name: "West Region", hospitals: 31, suppliers: 6, activeOrders: 52 },
];

export function RegionalDistribution() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {regions.map((region) => (
                <Card key={region.name} className="p-4">
                    <h3 className="font-semibold mb-2">{region.name}</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Hospitals:</span>
                            <span>{region.hospitals}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Suppliers:</span>
                            <span>{region.suppliers}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Active Orders:</span>
                            <span>{region.activeOrders}</span>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}