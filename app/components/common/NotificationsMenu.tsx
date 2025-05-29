import React from "react";
import { Bell, Award, BarChart2, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: "achievement" | "reminder" | "system";
}

interface NotificationsMenuProps {
  notifications: Notification[];
}

const NotificationsMenu: React.FC<NotificationsMenuProps> = ({
  notifications,
}) => {
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-indigo-900 border-none">
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotifications}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 bg-indigo-900 border-none">
        <div className="p-2 font-medium border-b">Notifications</div>
        <div className="max-h-80 overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="p-3 cursor-pointer hover:bg-slate-50"
            >
              <div className="flex gap-3 items-start">
                <div className="mt-1">
                  {notification.type === "achievement" && (
                    <Award className="h-5 w-5 text-yellow-500" />
                  )}
                  {notification.type === "reminder" && (
                    <Calendar className="h-5 w-5 text-blue-500" />
                  )}
                  {notification.type === "system" && (
                    <BarChart2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    {notification.title}
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <div className="p-2 border-t">
          <Button variant="ghost" size="sm" className="w-full">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
