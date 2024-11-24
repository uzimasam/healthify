import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginOrganization } from "@/services/organization";
import { useOrganizer } from "@/hooks/use-organizer";
import { Organization } from "@/types/organization";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useOrganizer();

  const nativeLogin = useMutation(
    async (values: { email: string; password: string }) => {
      const result = await loginOrganization(values.email, values.password);
      if (result && 'organization' in result) {
        const organization = result.organization as Organization;
        sessionStorage.setItem("organization", JSON.stringify(organization));
        login(organization);
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }

    },
    {
      onError: (error: Error) => {
        console.error(error);
      },
    }
  );

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const isLoading = nativeLogin.isLoading;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nativeLogin.mutate(values);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="text-2xl font-bold">Healthify</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                disabled={isLoading}
                value={values.password}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
                required
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline hover:text-black transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block bg-gray-50">
        <div className="flex items-center justify-center h-full p-8">
          <div className="space-y-6 max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight">
              "Healthify has transformed how we manage our medical supplies."
            </h2>
            <p className="text-gray-500">
              Dr. Sarah Chen
              <br />
              Chief of Surgery, Agakhan Hospital
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}