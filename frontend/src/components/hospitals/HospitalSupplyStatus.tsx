import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const supplies = [
  {
    hospital: "Metropolitan General Hospital",
    supplies: [
      { name: "Surgical Masks", stock: 85, unit: "boxes", threshold: 20 },
      { name: "Surgical Gloves", stock: 32, unit: "boxes", threshold: 30 },
      { name: "Syringes", stock: 75, unit: "units", threshold: 25 },
      { name: "Bandages", stock: 15, unit: "packs", threshold: 20 },
    ],
  },
  {
    hospital: "St. Mary's Medical Center",
    supplies: [
      { name: "Surgical Masks", stock: 25, unit: "boxes", threshold: 20 },
      { name: "Surgical Gloves", stock: 15, unit: "boxes", threshold: 30 },
      { name: "Syringes", stock: 45, unit: "units", threshold: 25 },
      { name: "Bandages", stock: 60, unit: "packs", threshold: 20 },
    ],
  },
];

export function HospitalSupplyStatus() {
  return (
    <div className="grid gap-6">
      {supplies.map((hospital) => (
        <Card key={hospital.hospital}>
          <CardHeader>
            <CardTitle>{hospital.hospital}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {hospital.supplies.map((item) => {
                const percentage = (item.stock / 100) * 100;
                const status = 
                  percentage > 50 ? "optimal" :
                  percentage > 25 ? "warning" : "critical";

                return (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.stock} {item.unit} remaining
                        </div>
                      </div>
                      <Badge
                        variant={
                          status === "optimal"
                            ? "default"
                            : status === "warning"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {status}
                      </Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    {item.stock <= item.threshold && (
                      <p className="text-sm text-red-500">
                        Below recommended threshold of {item.threshold} {item.unit}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}