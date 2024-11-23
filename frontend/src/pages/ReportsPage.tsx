import { useState } from "react";
import { Download, FileText, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SupplyChainReport } from "@/components/reports/SupplyChainReport";
import { HospitalPerformance } from "@/components/reports/HospitalPerformance";
import { SupplierPerformance } from "@/components/reports/SupplierPerformance";
import { InventoryReport } from "@/components/reports/InventoryReport";

export function ReportsPage() {
    const [dateRange, setDateRange] = useState("30");
    const [reportType, setReportType] = useState("all");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">System Reports</h2>
                <div className="flex items-center gap-4">
                    <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="w-[180px]">
                            <Calendar className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                            <SelectItem value="365">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Total Orders</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">2,345</span>
                        <span className="ml-2 text-sm text-green-600">+12%</span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Order Value</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">$1.2M</span>
                        <span className="ml-2 text-sm text-green-600">+8%</span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Active Hospitals</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">156</span>
                        <span className="ml-2 text-sm text-green-600">+5</span>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Active Suppliers</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">24</span>
                        <span className="ml-2 text-sm text-green-600">+2</span>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Supply Chain Overview</TabsTrigger>
                    <TabsTrigger value="hospitals">Hospital Performance</TabsTrigger>
                    <TabsTrigger value="suppliers">Supplier Performance</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                    <SupplyChainReport period={dateRange} />
                </TabsContent>

                <TabsContent value="hospitals">
                    <HospitalPerformance period={dateRange} />
                </TabsContent>

                <TabsContent value="suppliers">
                    <SupplierPerformance period={dateRange} />
                </TabsContent>

                <TabsContent value="inventory">
                    <InventoryReport period={dateRange} />
                </TabsContent>
            </Tabs>
        </div>
    );
}