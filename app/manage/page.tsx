"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import {
  getNativeEvents,
  deleteNativeEvent,
  searchNativeEvents,
  type NativeEvent,
} from "@/lib/native-events";
import Header from "@/components/Header";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<NativeEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load events on component mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchNativeEvents(searchQuery);
      setEvents(filtered);
    } else {
      setEvents(getNativeEvents());
    }
  }, [searchQuery]);

  const loadEvents = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setEvents(getNativeEvents());
      setIsLoading(false);
    }, 300);
  };

  const handleDeleteEvent = async (eventId: string, eventTitle: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`,
      )
    ) {
      const success = deleteNativeEvent(eventId);
      if (success) {
        loadEvents(); // Refresh the list
      } else {
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-75"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full animate-pulse delay-150"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title="Event Management"
        subtitle="Create and manage your blockchain RSVP events"
        actionButton={{
          text: "Create Event",
          href: "/manage/events/create",
          icon: <Plus className="w-4 h-4 mr-2" />,
        }}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search events by title, description, location, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 max-w-md"
            />
          </div>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              {searchQuery ? "No events found" : "No events yet"}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchQuery
                ? "Try adjusting your search terms to find events."
                : "Get started by creating your first blockchain RSVP event."}
            </p>
            {!searchQuery && (
              <Link href="/manage/events/create">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Event
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 group">
                        <Link
                          href={`/manage/events/${event.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {event.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Link href={`/manage/events/${event.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/manage/events/${event.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id, event.title)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                      <div>
                        <div>{formatDate(event.startAt)}</div>
                        {event.endAt && (
                          <div className="text-xs text-slate-500">
                            to {formatDate(event.endAt)}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                      <div>
                        <div>{event.location}</div>
                        {event.city && (
                          <div className="text-xs text-slate-500">
                            {event.city}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="w-4 h-4 mr-2 text-slate-400" />
                      <div>
                        {event.maxAttendees
                          ? `Max ${event.maxAttendees} attendees`
                          : "Unlimited"}
                        {event.stakeAmount && (
                          <div className="text-xs text-slate-500">
                            Stake: {event.stakeAmount} ETH
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {event.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {event.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{event.tags.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={event.isActive ? "default" : "secondary"}
                        className={
                          event.isActive ? "bg-green-100 text-green-800" : ""
                        }
                      >
                        {event.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        by {event.organizer.name}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {events.length > 0 && (
          <div className="mt-8 bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-medium text-slate-900 mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {events.length}
                </div>
                <div className="text-sm text-slate-600">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {events.filter((e) => e.isActive).length}
                </div>
                <div className="text-sm text-slate-600">Active Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {
                    events.filter((e) => new Date(e.startAt) > new Date())
                      .length
                  }
                </div>
                <div className="text-sm text-slate-600">Upcoming Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {events.reduce((sum, e) => sum + (e.maxAttendees || 0), 0)}
                </div>
                <div className="text-sm text-slate-600">Total Capacity</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
