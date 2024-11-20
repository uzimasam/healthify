import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const performanceMetrics = [
  {
    supplier: "MedTech Supplies Inc.",
    metrics: [
      { name: "Delivery Time", score: 98, target: 95 },
      { name: "Order Accuracy", score: 99, target: 98 },
      { name: "Quality Control", score: 97, target: 95 },
      { name: "Response Time", score: 95, target: 90 },
    ],
  },
  {
    supplier: "Global Healthcare Solutions",
    metrics: [
      { name: "Delivery Time", score: 92, target: 95 },
      { name: "Order Accuracy", score: 97, target: 98 },
      { name: "Quality Control", score: 95, target: 95 },
      { name: "Response Time", score: 88, target: 90 },
    ],
  },
];

export function SupplierPerformance() {
  return (
    <div className="grid gap-6">
      {performanceMetrics.map((supplier) => (
        <Card key={supplier.supplier}>
          <CardHeader>
            <CardTitle>{supplier.supplier}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {supplier.metrics.map((metric) => {
                const status = 
                  metric.score >= metric.target ? "success" :
                  metric.score >= metric.target - 5 ? "warning" : "error";

                return (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-sm font-medium">{metric.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Target: {metric.target}%
                        </div>
                      </div>
                      <Badge
                        variant={
                          status === "success"
                            ? "default"
                            : status === "warning"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {metric.score}%
                      </Badge>
                    </div>
                    <Progress
                      value={metric.score}
                      className={`h-2 ${
                        status === "success"
                          ? "bg-green-500"
                          : status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    />
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