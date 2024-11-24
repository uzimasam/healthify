import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrganizer } from "@/hooks/use-organizer";
import { useMutation } from "react-query";
import { Organization } from "@/types/organization";
import { registerOrganization } from "@/services/organization";

export function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useOrganizer();

    const nativeRegister = useMutation(
        async (values: { name: string; email: string; password: string; confirmPassword: string }) => {
            const result = await registerOrganization(values.name, values.email, values.password, values.confirmPassword);
            if (result && 'organization' in result) {
                const organization = result.organization as Organization;
                sessionStorage.setItem("organization", JSON.stringify(organization));
                login(organization);
                navigate("/dashboard");
            } else {
                throw new Error("Registration failed");
            }
        },
        {
            onError: (error: Error) => {
                console.error(error);
            },
        }
    );

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const isLoading = nativeRegister.isLoading;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        nativeRegister.mutate(values);
    }

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
                            <Label htmlFor="name">Organization Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter organization name"
                                type="text"
                                autoCapitalize="words"
                                autoComplete="organization"
                                autoCorrect="off"
                                disabled={isLoading}
                                value={values.name}
                                onChange={(e) => setValues({ ...values, name: e.target.value })}
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
                                value={values.email}
                                onChange={(e) => setValues({ ...values, email: e.target.value })}
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
                                value={values.password}
                                onChange={(e) => setValues({ ...values, password: e.target.value })}
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
                                value={values.confirmPassword}
                                onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
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