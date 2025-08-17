import React from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/contexts/AppContext";
import { AlertTriangle, CheckCircle, Clock, MessageSquare, TrendingUp, Users } from "lucide-react";

export const Dashboard: React.FC = () => {
  const { issues, feedback, events } = useApp();

  const stats = {
    totalIssues: issues.length,
    activeIssues: issues.filter(issue => issue.status !== "Resolved").length,
    resolvedIssues: issues.filter(issue => issue.status === "Resolved").length,
    emergencyIssues: issues.filter(issue => issue.urgency === "Emergency").length,
    pendingFeedback: feedback.filter(f => f.status === "In Review").length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length
  };

  const emergencyIssues = issues.filter(issue => 
    issue.status !== "Resolved" && issue.urgency === "Emergency"
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-background min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of community issues and feedback</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Issues</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stats.totalIssues}</div>
              <p className="text-xs text-muted-foreground">All reported issues</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Emergency Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.emergencyIssues}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Active Issues</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.activeIssues}</div>
              <p className="text-xs text-muted-foreground">Pending resolution</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolvedIssues}</div>
              <p className="text-xs text-muted-foreground">Successfully resolved</p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Issues */}
        {emergencyIssues.length > 0 && (
          <Card className="bg-card border border-red-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 font-bold">
                <AlertTriangle className="h-5 w-5" />
                Emergency Issues Requiring Immediate Attention
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Critical issues that need immediate response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-200">
                  <div>
                    <h4 className="font-medium text-card-foreground">{issue.title}</h4>
                    <p className="text-sm text-muted-foreground">{issue.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className="urgency-badge-emergency">{issue.urgency}</Badge>
                    <Badge className="status-badge-reported">{issue.status}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card border border-border shadow-md">
            <CardHeader>
              <CardTitle className="font-bold text-card-foreground">Recent Issues</CardTitle>
              <CardDescription className="text-muted-foreground">Latest reported community issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {issues.slice(0, 5).map((issue) => (
                <div key={issue.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-card-foreground">{issue.title}</p>
                    <p className="text-xs text-muted-foreground">{issue.location}</p>
                  </div>
                  <div className="flex gap-1">
                    <Badge className={`urgency-badge-${issue.urgency.toLowerCase()}`} variant="outline">
                      {issue.urgency}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border border-border shadow-md">
            <CardHeader>
              <CardTitle className="font-bold text-card-foreground">Recent Feedback</CardTitle>
              <CardDescription className="text-muted-foreground">Latest citizen feedback and reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedback.slice(0, 5).map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-card-foreground">{item.name}</p>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{item.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};