import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  ClipboardList,
  Home,
  Settings,
  Building2,
  Truck,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Inventory",
    icon: Box,
    href: "/dashboard/inventory",
  },
  {
    label: "Orders",
    icon: ClipboardList,
    href: "/dashboard/orders",
  },
  {
    label: "Suppliers",
    icon: Truck,
    href: "/dashboard/suppliers",
  },
  {
    label: "Hospitals",
    icon: Building2,
    href: "/dashboard/hospitals",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-100 text-gray-800">
      <div className="px-3 py-2 flex-1">
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