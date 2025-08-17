import React from "react";
import { useApp } from "@/contexts/AppContext";
import { IssueCard } from "@/components/IssueCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const { issues, announcements } = useApp();
  
  const urgentIssues = issues.filter(issue => issue.isUrgent);
  const recentIssues = issues.slice(0, 2);
  const recentAnnouncements = announcements.slice(0, 1);
  
  const stats = {
    total: issues.length,
    urgent: urgentIssues.length,
    inProgress: issues.filter(i => i.status === "In Progress").length,
    resolved: issues.filter(i => i.status === "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="max-w-content mx-auto px-4 py-4 md:py-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md border border-border mb-6">
          <div className="px-6 py-8 text-center">
            <div className="mx-auto max-w-xl">
              <h1 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                Welcome to Setshaba Connect
              </h1>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Report community issues and track their resolution progress.
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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border border-border shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-md mr-3">
                  <AlertTriangle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Issues</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-border shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-md mr-3">
                  <Clock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
                  <p className="text-sm text-gray-500">Urgent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-border shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-md mr-3">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
                  <p className="text-sm text-gray-500">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-border shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                  <p className="text-sm text-gray-500">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Issues Alert */}
        {urgentIssues.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Urgent Issues
              </h2>
              <Badge className="status-badge-pending">
                {urgentIssues.length} Active
              </Badge>
            </div>
            <div className="mt-4 space-y-3">
              {urgentIssues.slice(0, 1).map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
              {urgentIssues.length > 1 && (
                <Button asChild variant="outline" className="w-full mt-3">
                  <Link to="/issues">View All {urgentIssues.length} Urgent Issues</Link>
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Recent Announcements */}
        {recentAnnouncements.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Latest Updates</h2>
              <Button asChild variant="outline">
                <Link to="/announcements">View All</Link>
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {recentAnnouncements.map(announcement => (
                <Card key={announcement.id} className="bg-white border border-border shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-bold">{announcement.title}</CardTitle>
                      {announcement.isUrgent && (
                        <Badge className="status-badge-pending">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 line-clamp-2">{announcement.description}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {new Date(announcement.publishedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Issues */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Recent Issues</h2>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white">
              <Link to="/issues">View All Issues</Link>
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {recentIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white border border-border shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 bg-primary hover:bg-primary-hover text-white">
              <Link to="/report" className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Report an Issue</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/events" className="flex flex-col items-center gap-2">
                <Clock className="h-6 w-6" />
                <span>View Events</span>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/feedback" className="flex flex-col items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                <span>Give Feedback</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};