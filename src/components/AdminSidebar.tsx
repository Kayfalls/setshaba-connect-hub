import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Megaphone, 
  Calendar, 
  MessageSquare, 
  LogOut,
  Eye,
  Shield
} from "lucide-react";

export const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { setIsAdmin } = useApp();
  
  const isActive = (path: string) => location.pathname === path;
  
  const adminLinks = [
    { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/issues", icon: AlertTriangle, label: "Manage Issues" },
    { path: "/admin/announcements", icon: Megaphone, label: "Post Updates" },
    { path: "/admin/events", icon: Calendar, label: "Events" },
    { path: "/admin/feedback", icon: MessageSquare, label: "Feedback" },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-gray-400">Setshaba Connect</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {adminLinks.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              asChild
              variant="ghost"
              className="w-full justify-start"
              className={`w-full justify-start ${
                isActive(path) 
                  ? "bg-primary text-white hover:bg-primary-hover" 
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Link to={path} className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-800 space-y-2">
        <Button asChild variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800">
          <Link to="/" className="flex items-center gap-3">
            <Eye className="h-4 w-4" />
            View Citizen Portal
          </Link>
        </Button>
        
        <Button 
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};