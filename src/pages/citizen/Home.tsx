import React from "react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="mobile-app-container pb-20 md:pb-0">
      <div className="max-w-content mx-auto px-4 py-4 md:py-6">
        {/* Hero Section */}
        <div className="hero-card mb-8">
          <div className="mx-auto max-w-xl">
            <h1 className="text-2xl font-bold mb-3 text-card-foreground">
              Welcome to Setshaba Connect
            </h1>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Professional community management platform for reporting and tracking municipal issues.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary-hover text-white px-8">
                <Link to="/report" className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Report an Issue
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="content-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-card-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 bg-primary hover:bg-primary-hover text-white">
              <Link to="/report" className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Report an Issue</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/issues" className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Track Issues</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/feedback" className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Give Feedback</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};