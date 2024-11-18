import { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Hospital, Truck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [userType, setUserType] = useState("");

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    const userTypeIcons = {
        hospital: Hospital,
        supplier: Truck,
        agency: Building2,
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex items-center justify-center p-8">
                <div className="mx-auto w-full max-w-sm space-y-6">
                    <div className="space-y-2 text-center">
                        <div className="flex items-center justify-center space-x-2">
                            <Package className="h-6 w-6" />
                            <span className="text-2xl font-bold">Healthify</span>
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-gray-500">
                            Enter your details to get started
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <Select onValueChange={setUserType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select account type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hospital">Hospital</SelectItem>
                                    <SelectItem value="supplier">Supplier</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Organization Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter organization name"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter a password"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Re-enter your password"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <Button
                            className="w-full"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating account..." : "Create account"}
                        </Button>
                    </form>
                    <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="underline hover:text-black transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hidden lg:block bg-gray-50">
                <div className="flex items-center justify-center h-full p-8">
                    <div className="space-y-6 max-w-lg">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Join our network of healthcare providers and suppliers.
                        </h2>
                        <p className="text-gray-500">
                            Connect with trusted partners and streamline your medical supply chain.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}