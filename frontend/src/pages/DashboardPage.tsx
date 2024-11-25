import { useEffect, useState } from "react";
import { AlertCircle, ArrowUpRight, Box, Building2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AutomationCard } from "@/components/dashboard/AutomationCard";
import { SupplierList } from "@/components/dashboard/SupplierList";
import { HospitalList } from "@/components/dashboard/HospitalList";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useAgencyDashboardData } from "@/services/agency";

export function DashboardPage() {
    const [activeSuppliers, setActiveSuppliers] = useState(0);
    const [activeHospitals, setActiveHospitals] = useState(0);
    const [pendingApprovals, setPendingApprovals] = useState(0);
    const [lowStockAlerts, setLowStockAlerts] = useState(0);
    // list of suppliers
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        async function fetchDashboardData() {
            const data = await useAgencyDashboardData();
            setActiveSuppliers(data.activeSuppliers);
            setActiveHospitals(data.activeHospitals);
            setPendingApprovals(data.pendingApprovals);
            setSuppliers(data.suppliers);
        }
        fetchDashboardData();
    }, []);


    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Agency Dashboard</h2>
                <Button>
                    Generate Report
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Active Suppliers</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{activeSuppliers}</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Active Hospitals</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{activeHospitals}</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Pending Approvals</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{pendingApprovals}</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Box className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Low Stock Alerts</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">{lowStockAlerts}</span>
                    </div>
                </Card>
            </div>

            {pendingApprovals > 0 && (
                <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        You have {pendingApprovals} new registration{pendingApprovals > 1 ? 's' : ''} pending approval
                    </AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                <AutomationCard />
                <RecentActivity />
            </div>

            <Tabs defaultValue="suppliers" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
                    <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
                </TabsList>
                <TabsContent value="suppliers" className="space-y-4">
                    <SupplierList suppliers={suppliers} />
                </TabsContent>
                <TabsContent value="hospitals" className="space-y-4">
                    <HospitalList />
                </TabsContent>
            </Tabs>
        </div>
    );
}