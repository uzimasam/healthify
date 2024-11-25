import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ComplianceScoreProps {
    period: string;
}

const complianceAreas = [
    {
        name: "Documentation Compliance",
        score: 100,
        target: 100,
        status: "verified",
        lastAudit: "2024-03-01",
        nextAudit: "2024-06-01",
    },
    {
        name: "Storage Standards",
        score: 98,
        target: 95,
        status: "verified",
        lastAudit: "2024-02-15",
        nextAudit: "2024-05-15",
    },
    {
        name: "Quality Control Procedures",
        score: 97,
        target: 95,
        status: "verified",
        lastAudit: "2024-03-10",
        nextAudit: "2024-06-10",
    },
    {
        name: "Staff Training",
        score: 95,
        target: 90,
        status: "pending_review",
        lastAudit: "2024-01-20",
        nextAudit: "2024-04-20",
    },
];

const recentAudits = [
    {
        date: "2024-03-01",
        type: "Documentation",
        result: "Passed",
        findings: "No critical findings",
        auditor: "Quality Control Team",
    },
    {
        date: "2024-02-15",
        type: "Storage Facility",
        result: "Passed",
        findings: "Minor improvements suggested",
        auditor: "External Auditor",
    },
];

export function ComplianceScore({ period }: ComplianceScoreProps) {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Areas</CardTitle>
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
                                        variant={area.status === "verified" ? "default" : "secondary"}
                                    >
                                        {area.score}%
                                    </Badge>
                                </div>
                                <Progress
                                    value={area.score}
                                    className={`h-2 ${
                                        area.score >= area.target
                                            ? "bg-green-500"
                                            : "bg-yellow-500"
                                    }`}
                                />
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Target: {area.target}%</span>
                                    <span>Next Audit: {area.nextAudit}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Audits</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentAudits.map((audit, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-4 border-b last:border-0 pb-4"
                            >
                                {audit.result === "Passed" ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                                ) : (
                                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                                )}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{audit.type} Audit</span>
                                        <Badge variant={audit.result === "Passed" ? "default" : "secondary"}>
                                            {audit.result}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{audit.findings}</p>
                                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                                        <span>Date: {audit.date}</span>
                                        <span>Auditor: {audit.auditor}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}