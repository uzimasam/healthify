import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function HospitalSettingsPage() {
    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <Button>Save Changes</Button>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="ordering">Ordering</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hospital Information</CardTitle>
                            <CardDescription>Manage your hospital details and preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="hospital-name">Hospital Name</Label>
                                <Input id="hospital-name" defaultValue="Metropolitan General Hospital" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="contact-email">Primary Contact Email</Label>
                                <Input id="contact-email" type="email" defaultValue="admin@metropolitan.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <Select defaultValue="est">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ordering">
                    <Card>
                        <CardHeader>
                            <CardTitle>Ordering Preferences</CardTitle>
                            <CardDescription>Configure automatic ordering and stock management</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Low Stock Alert Threshold</Label>
                                    <div className="flex items-center space-x-4">
                                        <Slider defaultValue={[20]} max={100} step={1} className="flex-1" />
                                        <span className="w-12 text-sm">20%</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Auto-reorder Threshold</Label>
                                    <div className="flex items-center space-x-4">
                                        <Slider defaultValue={[15]} max={100} step={1} className="flex-1" />
                                        <span className="w-12 text-sm">15%</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Auto-reorder Enabled</Label>
                                        <p className="text-sm text-muted-foreground">Automatically place orders for low stock items</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label>Default Supplier</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select default supplier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="medtech">MedTech Supplies Inc.</SelectItem>
                                            <SelectItem value="global">Global Healthcare Solutions</SelectItem>
                                            <SelectItem value="premier">Premier Medical Supplies</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="space-y-2">
                                    <Label>Session Timeout</Label>
                                    <Select defaultValue="30">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="15">15 minutes</SelectItem>
                                            <SelectItem value="30">30 minutes</SelectItem>
                                            <SelectItem value="60">1 hour</SelectItem>
                                            <SelectItem value="120">2 hours</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button variant="outline" className="w-full">Change Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integrations">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Integrations</CardTitle>
                            <CardDescription>Manage connections with other hospital systems</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>EMR Integration</Label>
                                        <p className="text-sm text-muted-foreground">Connect with Electronic Medical Records</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Inventory Management System</Label>
                                        <p className="text-sm text-muted-foreground">Sync with hospital inventory system</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Financial System</Label>
                                        <p className="text-sm text-muted-foreground">Connect with accounting software</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label>API Access</Label>
                                    <Input defaultValue="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" readOnly />
                                    <Button variant="outline" className="mt-2">Regenerate API Key</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}