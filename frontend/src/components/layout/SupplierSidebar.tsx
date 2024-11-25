import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ClipboardList,
    TrendingUp,
    Bell,
    Settings,
    Truck,
    FileText,
    Users,
    History,
} from "lucide-react";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/supplier/dashboard",
    },
    {
        label: "Products",
        icon: Package,
        href: "/supplier/products",
    },
    {
        label: "Orders",
        icon: ClipboardList,
        href: "/supplier/orders",
    },
    {
        label: "Deliveries",
        icon: Truck,
        href: "/supplier/deliveries",
    },
    {
        label: "Performance",
        icon: TrendingUp,
        href: "/supplier/performance",
    },
    {
        label: "Connected Hospitals",
        icon: Users,
        href: "/supplier/hospitals",
    },
    {
        label: "Order History",
        icon: History,
        href: "/supplier/history",
    },
    {
        label: "Reports",
        icon: FileText,
        href: "/supplier/reports",
    },
    {
        label: "Notifications",
        icon: Bell,
        href: "/supplier/notifications",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/supplier/settings",
    },
];

export function SupplierSidebar() {
    const location = useLocation();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800">
            <div className="px-3 py-2">
                <div className="flex items-center pl-3 mb-8">
                    <Package className="h-8 w-8 text-primary" />
                    <span className="ml-2 text-xl font-bold">Supplier Portal</span>
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