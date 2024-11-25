import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { InventoryReport } from "@/components/supplier/reports/InventoryReport";
import { SalesReport } from "@/components/supplier/reports/SalesReport";
import { PerformanceReport } from "@/components/supplier/reports/PerformanceReport";
import { ComplianceReport } from "@/components/supplier/reports/ComplianceReport";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SupplierReports() {
    const [period, setPeriod] = useState("30");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <div className="flex items-center gap-4">
                    <Select value={period} onValueChange={setPeriod}>
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
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Total Orders</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">2,345</span>
                        <span className="ml-2 text-sm text-green-600">+12%</span>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Revenue</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">$1.2M</span>
                        <span className="ml-2 text-sm text-green-600">+8%</span>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Active Products</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">156</span>
                        <span className="ml-2 text-sm text-green-600">+5</span>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Hospital Partners</span>
                    </div>
                    <div className="mt-2">
                        <span className="text-2xl font-bold">24</span>
                        <span className="ml-2 text-sm text-green-600">+2</span>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="inventory" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
                    <TabsTrigger value="sales">Sales Report</TabsTrigger>
                    <TabsTrigger value="performance">Performance Report</TabsTrigger>
                    <TabsTrigger value="compliance">Compliance Report</TabsTrigger>
                </TabsList>

                <TabsContent value="inventory">
                    <InventoryReport period={period} />
                </TabsContent>

                <TabsContent value="sales">
                    <SalesReport period={period} />
                </TabsContent>

                <TabsContent value="performance">
                    <PerformanceReport period={period} />
                </TabsContent>

                <TabsContent value="compliance">
                    <ComplianceReport period={period} />
                </TabsContent>
            </Tabs>
        </div>
    );
}