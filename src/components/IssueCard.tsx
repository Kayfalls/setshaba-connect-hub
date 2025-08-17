import React from "react";
import { Issue, categoryIcons, statusColors, urgencyColors } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, MapPin } from "lucide-react";

interface IssueCardProps {
  issue: Issue;
  onClick?: () => void;
  showProgress?: boolean;
}

export const IssueCard: React.FC<IssueCardProps> = ({ 
  issue, 
  onClick,
  showProgress = true 
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Reported": return "status-badge-reported";
      case "In Progress": return "status-badge-progress";
      case "Resolved": return "status-badge-resolved";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyBadgeClass = (urgency: string) => {
    return urgencyColors[urgency as keyof typeof urgencyColors] || "bg-gray-100 text-gray-800 border-gray-200";
  };
  return (
    <Card 
      className="issue-card cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-muted rounded-md">
              <span className="text-xl">{categoryIcons[issue.category]}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-card-foreground">
                {issue.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{issue.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge 
              className={`px-2 py-1 text-xs font-medium border ${getUrgencyBadgeClass(issue.urgency)}`}
            >
              {issue.urgency}
            </Badge>
            <Badge 
              className={`px-2 py-1 text-xs font-medium border ${getStatusBadgeClass(issue.status)}`}
            >
              {issue.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4 leading-relaxed">{issue.description}</p>
        
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-card-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{issue.progress}%</span>
            </div>
            <Progress 
              value={issue.progress}
              className="h-2"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Reported {formatDate(issue.reportedAt)} at {formatTime(issue.reportedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};