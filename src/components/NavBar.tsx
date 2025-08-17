import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle, Plus, Calendar, MessageSquare, Shield, Menu } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export const NavBar: React.FC = () => {
  const location = useLocation();
  const { isAdmin, setIsAdmin } = useApp();
  
  const isActive = (path: string) => location.pathname === path;
  
  const citizenLinks = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/issues", icon: AlertTriangle, label: "Issues" },
    { path: "/report", icon: Plus, label: "Report" },
    { path: "/events", icon: Calendar, label: "Events" },
    { path: "/feedback", icon: MessageSquare, label: "Feedback" },
  ];

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  };

  if (isAdmin) {
    return null; // Admin uses sidebar navigation
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-content mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-lg text-foreground">Setshaba Connect</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {citizenLinks.map(({ path, icon: Icon, label }) => (
              <Button
                key={path}
                asChild
                variant={isActive(path) ? "default" : "ghost"}
                size="sm"
                className={isActive(path) ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground hover:bg-muted"}
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="border-border hover:bg-muted flex items-center gap-2"
              onClick={handleAdminToggle}
            >
              <Shield className="h-4 w-4" />
              Admin
            </Button>
          </div>
          
          {/* Mobile navigation */}
          <div className="md:hidden">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleAdminToggle}
            >
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 shadow-md">
        <div className="flex items-center justify-around px-4 py-2">
          {citizenLinks.map(({ path, icon: Icon, label }) => (
            <Button
              key={path}
              asChild
              variant={isActive(path) ? "default" : "ghost"}
              size="sm"
              className={`flex flex-col gap-1 h-auto py-3 ${
                isActive(path) 
                  ? "bg-primary text-white" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Link to={path}>
                <Icon className="h-4 w-4" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};