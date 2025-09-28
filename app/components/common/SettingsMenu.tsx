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
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

const SettingsMenu: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to landing page after logout
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-indigo-900 border-none hover:bg-indigo-700">
          <Settings className="h-5 w-5 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
        <Link href="/?route=profile-settings" className="w-full">
          <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer">
            <span className="text-gray-700">Profile Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem 
          onClick={handleLogout}
          className="hover:bg-red-50 cursor-pointer text-red-600 hover:text-red-700"
        >
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
