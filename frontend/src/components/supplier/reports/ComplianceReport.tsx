import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ComplianceReportProps {
    period: string;
}

const complianceAreas = [
    {
        name: "Quality Management System",
        score: 100,
        status: "compliant",
        lastAudit: "2024-03-01",
        nextAudit: "2024-06-01",
        findings: "No critical findings",
    },
    {
        name: "Storage & Handling",
        score: 98,
        status: "compliant",
        lastAudit: "2024-02-15",
        nextAudit: "2024-05-15",
        findings: "Minor improvements suggested",
    },
    {
        name: "Documentation",
        score: 100,
        status: "compliant",
        lastAudit: "2024-03-10",
        nextAudit: "2024-06-10",
        findings: "All documentation up to date",
    },
    {
        name: "Staff Training",
        score: 95,
        status: "review_required",
        lastAudit: "2024-01-20",
        nextAudit: "2024-04-20",
        findings: "Training records need updating",
    },
];

export function ComplianceReport({ period }: ComplianceReportProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {complianceAreas.map((area) => (
                            <div key={area.name} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm font-medium">{area.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                            Last Audit: {area.lastAudit}
                                        </div>
                                    </div>
                                    <Badge
                                        variant={area.status === "compliant" ? "default" : "secondary"}
                                    >
                                        {area.score}%
                                    </Badge>
                                </div>
                                <Progress
                                    value={area.score}
                                    className={`h-2 ${
                                        area.score === 100
                                            ? "bg-green-500"
                                            : area.score >= 95
                                                ? "bg-blue-500"
                                                : "bg-yellow-500"
                                    }`}
                                />
                                <div className="flex items-start gap-2 mt-2">
                                    {area.score === 100 ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                                    )}
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600">{area.findings}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Next audit scheduled: {area.nextAudit}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Compliance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <div className="text-sm font-medium text-gray-500">Overall Compliance Score</div>
                            <div className="text-2xl font-bold">98.2%</div>
                            <div className="text-sm text-green-600">↑ 2.1% from last audit</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Areas Requiring Attention</div>
                            <div className="text-2xl font-bold">1</div>
                            <div className="text-sm text-gray-500">Out of 4 areas</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Last Full Audit</div>
                            <div className="text-2xl font-bold">March 1, 2024</div>
                            <div className="text-sm text-gray-500">Passed with no critical findings</div>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-500">Certification Status</div>
                            <div className="text-2xl font-bold">Valid</div>
                            <div className="text-sm text-gray-500">Until December 31, 2024</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}