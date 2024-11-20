import { Bell, Menu, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useContext } from "react";
import { OrganizationContext } from "@/context";
import { useAuth } from "@/hooks/use-auth";

const Header: React.FC = () => {
  const { organization } = useContext(OrganizationContext);
  const { logout } = useAuth();
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <Package className="h-6 w-6" />
        <h2 className="text-lg font-semibold">Healthify</h2>

        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New order received</DropdownMenuItem>
              <DropdownMenuItem>Low stock alert: Surgical Masks</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                {organization? `Welcome, ${organization.name}` : "Welcome"}
              </DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;