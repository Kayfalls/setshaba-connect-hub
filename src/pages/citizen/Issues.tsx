import React, { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { IssueCard } from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { categoryIcons, Category, Status } from "@/data/mockData";
import { Search, Filter } from "lucide-react";

export const Issues: React.FC = () => {
  const { issues } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<Status | "all">("all");

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories: Category[] = ["Water", "Electricity", "Roads", "Waste", "Other"];
  const statuses: Status[] = ["Reported", "In Progress", "Resolved"];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="max-w-content mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Community Issues</h1>
          <p className="text-gray-700">
            Track the progress of reported issues in your community
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white border border-border shadow-md">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search issues by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-foreground">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <div className="space-y-2">
                <span className="text-sm text-gray-500">Category:</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className={selectedCategory === "all" ? "bg-primary hover:bg-primary-hover text-white" : ""}
                  >
                    All Categories
                  </Button>
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center gap-1 ${selectedCategory === category ? "bg-primary hover:bg-primary-hover text-white" : ""}`}
                    >
                      <span>{categoryIcons[category]}</span>
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Status Filter */}
              <div className="space-y-2">
                <span className="text-sm text-gray-500">Status:</span>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus("all")}
                    className={selectedStatus === "all" ? "bg-primary hover:bg-primary-hover text-white" : ""}
                  >
                    All Status
                  </Button>
                  {statuses.map(status => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className={selectedStatus === status ? "bg-primary hover:bg-primary-hover text-white" : ""}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              Showing {filteredIssues.length} of {issues.length} issues
            </span>
            {(selectedCategory !== "all" || selectedStatus !== "all" || searchTerm) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {filteredIssues.filter(i => i.status === "Reported").length} Reported
            </Badge>
            <Badge variant="outline">
              {filteredIssues.filter(i => i.status === "In Progress").length} In Progress
            </Badge>
            <Badge variant="outline">
              {filteredIssues.filter(i => i.status === "Resolved").length} Resolved
            </Badge>
          </div>
        </div>

        {/* Issues Grid */}
        {filteredIssues.length > 0 ? (
          <div className="grid gap-4">
            {filteredIssues.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <Card className="bg-white border border-border shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-8 text-center">
              <Search className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">No issues found</h3>
              <p className="text-gray-700 mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button
                className="bg-primary hover:bg-primary-hover text-white"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};