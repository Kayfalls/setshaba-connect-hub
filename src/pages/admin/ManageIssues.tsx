import React, { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { Category, Status, Urgency, categoryIcons, urgencyColors } from "@/data/mockData";
import { Plus, Edit, Trash2, AlertTriangle } from "lucide-react";

export const ManageIssues: React.FC = () => {
  const { issues, updateIssue, addIssue } = useApp();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [newIssue, setNewIssue] = useState({
    title: "",
    category: "",
    urgency: "",
    location: "",
    description: ""
  });

  const handleAddIssue = () => {
    if (!newIssue.title || !newIssue.category || !newIssue.urgency || !newIssue.location || !newIssue.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const issue = {
      title: newIssue.title,
      category: newIssue.category as Category,
      urgency: newIssue.urgency as Urgency,
      location: newIssue.location,
      description: newIssue.description,
      status: "Reported" as const,
      progress: 0,
      timeline: [{
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        event: "Created by admin"
      }],
      isUrgent: newIssue.urgency === "Emergency" || newIssue.urgency === "High",
      reportedBy: "Admin",
      reportedAt: new Date().toISOString()
    };

    addIssue(issue);
    setNewIssue({ title: "", category: "", urgency: "", location: "", description: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Issue Added",
      description: "New issue has been created successfully.",
    });
  };

  const handleUpdateIssue = () => {
    if (!selectedIssue) return;

    const progressMap = {
      "Reported": 0,
      "In Progress": 50,
      "Resolved": 100
    };

    updateIssue(selectedIssue.id, {
      status: selectedIssue.status,
      progress: progressMap[selectedIssue.status as Status]
    });

    setIsEditDialogOpen(false);
    setSelectedIssue(null);
    
    toast({
      title: "Issue Updated",
      description: "Issue status has been updated successfully.",
    });
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Reported": return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Progress": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Resolved": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getUrgencyColor = (urgency: Urgency) => {
    return urgencyColors[urgency] || "bg-gray-100 text-gray-800 border-gray-200";
  };
  return (
    <AdminLayout>
      <div className="p-6 space-y-6 bg-background min-h-screen">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Issues</h1>
            <p className="text-muted-foreground">View and manage all community issues</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Issue</DialogTitle>
                <DialogDescription>
                  Create a new community issue report
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newIssue.category} onValueChange={(value) => setNewIssue(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Water">💧 Water</SelectItem>
                      <SelectItem value="Electricity">⚡ Electricity</SelectItem>
                      <SelectItem value="Roads">🚧 Roads</SelectItem>
                      <SelectItem value="Waste">🗑️ Waste</SelectItem>
                      <SelectItem value="Other">❓ Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={newIssue.urgency} onValueChange={(value) => setNewIssue(prev => ({ ...prev, urgency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">🟢 Low</SelectItem>
                      <SelectItem value="Medium">🟡 Medium</SelectItem>
                      <SelectItem value="High">🟠 High</SelectItem>
                      <SelectItem value="Emergency">🔴 Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newIssue.location}
                    onChange={(e) => setNewIssue(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Street address or area"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newIssue.description}
                    onChange={(e) => setNewIssue(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the issue"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddIssue}>
                    Add Issue
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">All Issues</CardTitle>
            <CardDescription>
              Manage and track all community issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{issue.title}</div>
                        <div className="text-sm text-muted-foreground">{issue.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{issue.reportedBy}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(issue.reportedAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{categoryIcons[issue.category]}</span>
                        {issue.category}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`border ${getUrgencyColor(issue.urgency)}`}>
                        {issue.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={issue.status} 
                        onValueChange={(value) => {
                          const progressMap = {
                            "Reported": 0,
                            "In Progress": 50,
                            "Resolved": 100
                          };
                          updateIssue(issue.id, {
                            status: value as Status,
                            progress: progressMap[value as Status]
                          });
                          toast({
                            title: "Status Updated",
                            description: `Issue status changed to ${value}`,
                          });
                        }}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Reported">Reported</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedIssue(issue);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Issue Status</DialogTitle>
              <DialogDescription>
                Change the status and progress of this issue
              </DialogDescription>
            </DialogHeader>
            {selectedIssue && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedIssue.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedIssue.location}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={selectedIssue.status} 
                    onValueChange={(value) => setSelectedIssue(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reported">Reported</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateIssue}>
                    Update Issue
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};