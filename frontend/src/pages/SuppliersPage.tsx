import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplierList } from "@/components/suppliers/SupplierList";
import { PendingApprovals } from "@/components/suppliers/PendingApprovals";
import { SupplierAnalytics } from "@/components/suppliers/SupplierAnalytics";
import { SupplierPerformance } from "@/components/suppliers/SupplierPerformance";
import { useAgencyDashboardData } from "@/services/agency";

export function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSuppliers, setActiveSuppliers] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);

  useEffect(() => {
    async function fetchSuppliers() {
      const data = await useAgencyDashboardData();
      setActiveSuppliers(data.suppliersActive);
      setPendingApprovals(data.suppliersPending);
    }
    fetchSuppliers();
  }, []);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Suppliers</TabsTrigger>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <SupplierList searchQuery={searchQuery} suppliers={activeSuppliers} />
        </TabsContent>

        <TabsContent value="pending">
          <PendingApprovals pendingSuppliers={pendingApprovals} />
        </TabsContent>

        <TabsContent value="performance">
          <SupplierPerformance />
        </TabsContent>

        <TabsContent value="analytics">
          <SupplierAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}