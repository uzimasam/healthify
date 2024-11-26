import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Building2, MapPin, Activity, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { HospitalsList } from "@/components/supplier/hospitals/HospitalsList";
import { HospitalRequests } from "@/components/supplier/hospitals/HospitalRequests";
import { HospitalAnalytics } from "@/components/supplier/hospitals/HospitalAnalytics";

export function SupplierHospitals() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Connected Hospitals</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Connected Hospitals</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">24</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Active Partnerships</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">18</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Service Regions</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">5</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Partnership Requests</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">3</span>
                    </div>
                </Card>
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

            <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="all">All Hospitals</TabsTrigger>
                    <TabsTrigger value="requests">Partnership Requests</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <HospitalsList searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="requests">
                    <HospitalRequests />
                </TabsContent>

                <TabsContent value="analytics">
                    <HospitalAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    );
}