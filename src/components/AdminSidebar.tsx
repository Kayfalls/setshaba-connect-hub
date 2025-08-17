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
    { path: "/admin/announcements", icon: Megaphone, label: "Announcements" },
    { path: "/admin/feedback", icon: MessageSquare, label: "Feedback" },
  ];

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">Admin Panel</h2>
            <p className="text-xs text-sidebar-foreground/70">Setshaba Connect</p>
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
              className={`w-full justify-start ${
                isActive(path) 
                  ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
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
      
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button asChild variant="outline" className="w-full justify-start border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
          <Link to="/" className="flex items-center gap-3">
            <Eye className="h-4 w-4" />
            View Citizen Portal
          </Link>
        </Button>
        
        <Button 
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};