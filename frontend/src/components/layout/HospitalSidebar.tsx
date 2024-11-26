import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    ShoppingCart,
    ClipboardList,
    Package,
    History,
    TrendingUp,
    Settings,
    Bell,
} from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/hospital/dashboard",
    },
    {
        label: "Place Order",
        icon: ShoppingCart,
        href: "/hospital/place-order",
    },
    {
        label: "Active Orders",
        icon: ClipboardList,
        href: "/hospital/active-orders",
    },
    {
        label: "Inventory",
        icon: Package,
        href: "/hospital/inventory",
    },
    {
        label: "Order History",
        icon: History,
        href: "/hospital/order-history",
    },
    {
        label: "Analytics",
        icon: TrendingUp,
        href: "/hospital/analytics",
    },
    {
        label: "Notifications",
        icon: Bell,
        href: "/hospital/notifications",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/hospital/settings",
    },
];

export function HospitalSidebar() {
    const location = useLocation();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800">
            <div className="px-3 py-2">
                <div className="flex items-center pl-3 mb-8">
                    <Package className="h-8 w-8 text-primary" />
                    <span className="ml-2 text-xl font-bold">Hospital Portal</span>
                </div>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            to={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                                location.pathname === route.href
                                    ? "text-primary bg-primary/10"
                                    : "text-zinc-600"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3")} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}