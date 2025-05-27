import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const SettingsMenu: React.FC = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Settings</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
      <Link to="/profile-settings" className="w-full">
        <DropdownMenuItem>Profile Settings</DropdownMenuItem>
      </Link>
      <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default SettingsMenu;
