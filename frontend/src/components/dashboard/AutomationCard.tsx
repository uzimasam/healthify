import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AutomationCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Automated Actions</CardTitle>
                <CardDescription>Configure system automation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="auto-match" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Auto-match suppliers to hospitals
                    </label>
                    <Switch id="auto-match" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="low-stock" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Low stock notifications
                    </label>
                    <Switch id="low-stock" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="auto-approve" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Auto-approve regular orders
                    </label>
                    <Switch id="auto-approve" defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                    <label htmlFor="emergency-alerts" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Emergency supply alerts
                    </label>
                    <Switch id="emergency-alerts" defaultChecked />
                </div>
            </CardContent>
        </Card>
    );
}