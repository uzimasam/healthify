import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Truck, Calendar, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ActiveDeliveries } from "@/components/supplier/deliveries/ActiveDeliveries";
import { DeliverySchedule } from "@/components/supplier/deliveries/DeliverySchedule";
import { DeliveryHistory } from "@/components/supplier/deliveries/DeliveryHistory";
import { DeliveryAnalytics } from "@/components/supplier/deliveries/DeliveryAnalytics";

export function SupplierDeliveries() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Delivery Management</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Active Deliveries</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">8</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Scheduled Today</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">12</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Delivery Routes</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">5</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Avg. Delivery Time</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">2.5h</span>
                    </div>
                </Card>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <Input
                        placeholder="Search deliveries..."
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
                    <TabsTrigger value="active">Active Deliveries</TabsTrigger>
                    <TabsTrigger value="schedule">Delivery Schedule</TabsTrigger>
                    <TabsTrigger value="history">Delivery History</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                    <ActiveDeliveries searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="schedule">
                    <DeliverySchedule />
                </TabsContent>

                <TabsContent value="history">
                    <DeliveryHistory searchQuery={searchQuery} />
                </TabsContent>

                <TabsContent value="analytics">
                    <DeliveryAnalytics />
                </TabsContent>
            </Tabs>
        </div>
    );
}