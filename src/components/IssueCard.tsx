import React from "react";
import { Issue, categoryIcons, statusColors } from "@/data/mockData";
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
      case "Reported": return "status-badge-pending";
      case "In Progress": return "status-badge-progress";
      case "Resolved": return "status-badge-resolved";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card 
      className="bg-white border border-border shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-md">
              <span className="text-xl">{categoryIcons[issue.category]}</span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-foreground">
                {issue.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">{issue.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge 
              className={`px-2 py-1 text-xs font-medium border ${getStatusBadgeClass(issue.status)}`}
            >
              {issue.status}
            </Badge>
            {issue.isUrgent && (
              <Badge className="status-badge-pending">
                Urgent
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-gray-700 mb-4 leading-relaxed">{issue.description}</p>
        
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-gray-500">{issue.progress}%</span>
            </div>
            <Progress 
              value={issue.progress}
              className="h-2"
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          <span>Reported {formatDate(issue.reportedAt)} at {formatTime(issue.reportedAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
};