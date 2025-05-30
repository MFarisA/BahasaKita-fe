import React from "react";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Settings } from "lucide-react";

const SettingsMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" className="bg-indigo-900 border-none hover:bg-indigo-700">
        <Settings className="h-5 w-5 text-white" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48 bg-indigo-900 border-none">
      <Link href="/profile-settings" className="w-full">
        <DropdownMenuItem>Profile Settings</DropdownMenuItem>
      </Link>
      <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default SettingsMenu;
