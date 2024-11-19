import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ShieldCheck, UserCheck } from "lucide-react";

export function PerformanceMetrics() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Supplier Reliability</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">96.8%</span>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "96.8%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Hospital Satisfaction</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">94.5%</span>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "94.5%" }} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">Quality Compliance</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">99.9%</span>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "99.9%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}