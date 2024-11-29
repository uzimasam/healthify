import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, Calendar } from "lucide-react";
import type { Supplier } from "@/lib/api/supplier";

interface SupplierOverviewProps {
    supplier: Supplier;
}

export function SupplierOverview({ supplier }: SupplierOverviewProps) {
    const { organization } = supplier;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Organization Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <div>
                            <div className="font-medium">{organization.name}</div>
                            <div className="text-sm text-gray-500">{organization.niche}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <div>
                            <div className="font-medium">{organization.email}</div>
                            <div className="text-sm text-gray-500">Primary Contact</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <div>
                            <div className="font-medium">{organization.phone}</div>
                            <div className="text-sm text-gray-500">Phone</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                            <div className="font-medium">
                                {new Date(organization.created_at).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">Member Since</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Account Status</span>
                        <Badge variant={organization.status === 'active' ? 'default' : 'secondary'}>
                            {organization.status}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Compliance Verification</span>
                        <Badge variant={supplier.compliance ? 'default' : 'destructive'}>
                            {supplier.compliance ? 'Verified' : 'Pending'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Business License</span>
                        <Badge variant={supplier.business_license ? 'default' : 'destructive'}>
                            {supplier.business_license ? 'Verified' : 'Pending'}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Insurance Status</span>
                        <Badge variant={supplier.insurance ? 'default' : 'destructive'}>
                            {supplier.insurance ? 'Verified' : 'Pending'}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}