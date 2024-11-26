import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Bell, AlertCircle, Package, Clock } from "lucide-react";
import { NotificationsList } from "@/components/hospital/notifications/NotificationsList";
import { NotificationSettings } from "@/components/hospital/notifications/NotificationSettings";

export function NotificationsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
                <Button variant="outline">
                    <Bell className="mr-2 h-4 w-4" />
                    Mark All as Read
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium">Unread</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">12</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Order Alerts</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">8</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Delivery Updates</span>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-bold">5</span>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">System Updates</span>
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
                        placeholder="Search notifications..."
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
                    <TabsTrigger value="all">All Notifications</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="all">
                    <NotificationsList searchQuery={searchQuery} filter="all" />
                </TabsContent>

                <TabsContent value="unread">
                    <NotificationsList searchQuery={searchQuery} filter="unread" />
                </TabsContent>

                <TabsContent value="settings">
                    <NotificationSettings />
                </TabsContent>
            </Tabs>
        </div>
    );
}