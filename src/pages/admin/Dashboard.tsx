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
    pendingFeedback: feedback.filter(f => f.status === "In Review").length,
    upcomingEvents: events.filter(e => new Date(e.date) > new Date()).length
  };

  const urgentIssues = issues.filter(issue => 
    issue.status !== "Resolved" && 
    (issue.category === "Water" || issue.title.toLowerCase().includes("burst"))
  );

  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-gray-700">Overview of community issues and feedback</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Total Issues</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalIssues}</div>
              <p className="text-xs text-gray-500">All reported issues</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Active Issues</CardTitle>
              <Clock className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.activeIssues}</div>
              <p className="text-xs text-gray-500">Pending resolution</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolvedIssues}</div>
              <p className="text-xs text-gray-500">Successfully resolved</p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-border shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.pendingFeedback}</div>
              <p className="text-xs text-gray-500">Pending review</p>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Issues */}
        {urgentIssues.length > 0 && (
          <Card className="bg-white border border-red-200 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 font-bold">
                <AlertTriangle className="h-5 w-5" />
                Urgent Issues Requiring Attention
              </CardTitle>
              <CardDescription className="text-gray-700">
                Critical issues that need immediate response
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentIssues.map((issue) => (
                <div key={issue.id} className="flex items-center justify-between p-3 bg-red-50 rounded-md border border-red-200">
                  <div>
                    <h4 className="font-medium text-foreground">{issue.title}</h4>
                    <p className="text-sm text-gray-500">{issue.location}</p>
                  </div>
                  <Badge className="status-badge-pending">{issue.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white border border-border shadow-md">
            <CardHeader>
              <CardTitle className="font-bold">Recent Issues</CardTitle>
              <CardDescription className="text-gray-700">Latest reported community issues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {issues.slice(0, 5).map((issue) => (
                <div key={issue.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{issue.title}</p>
                    <p className="text-xs text-gray-500">{issue.location}</p>
                  </div>
                  <Badge className={
                    issue.status === "Resolved" ? "status-badge-resolved" :
                    issue.status === "In Progress" ? "status-badge-progress" :
                    "status-badge-pending"
                  }>
                    {issue.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white border border-border shadow-md">
            <CardHeader>
              <CardTitle className="font-bold">Recent Feedback</CardTitle>
              <CardDescription className="text-gray-700">Latest citizen feedback and reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedback.slice(0, 5).map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};