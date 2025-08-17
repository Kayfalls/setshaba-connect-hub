import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

export const Events: React.FC = () => {
  const { events } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <main className="max-w-content mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Community Events</h1>
          <p className="text-gray-700">Stay informed about upcoming community meetings and events</p>
        </div>

        <div className="space-y-4">
          {events.length === 0 ? (
            <Card className="bg-white border border-border shadow-md">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">No Events Scheduled</h3>
                <p className="text-gray-700 text-center">
                  Check back soon for upcoming community events and meetings.
                </p>
              </CardContent>
            </Card>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="bg-white border border-border shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold mb-2">{event.title}</CardTitle>
                      <CardDescription className="text-gray-700">
                        {event.description}
                      </CardDescription>
                    </div>
                    <Badge className={isUpcoming(event.date) ? "bg-primary text-white" : "bg-gray-100 text-gray-800"}>
                      {isUpcoming(event.date) ? "Upcoming" : "Past"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>10:00 AM - 12:00 PM</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>Open to all residents</span>
                    </div>
                  </div>
                  
                  {isUpcoming(event.date) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button variant="outline" className="w-full">
                        Add to Calendar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
};