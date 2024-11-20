import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HospitalList } from "@/components/hospitals/HospitalList";
import { HospitalSupplyStatus } from "@/components/hospitals/HospitalSupplyStatus";
import { HospitalAnalytics } from "@/components/hospitals/HospitalAnalytics";
import { AddHospitalDialog } from "@/components/hospitals/addHospitalDialog";

export function HospitalsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Hospitals</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Hospital
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search hospitals..."
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

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="supply-status">Supply Status</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <HospitalList searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="supply-status">
          <HospitalSupplyStatus />
        </TabsContent>

        <TabsContent value="analytics">
          <HospitalAnalytics />
        </TabsContent>
      </Tabs>

      <AddHospitalDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}