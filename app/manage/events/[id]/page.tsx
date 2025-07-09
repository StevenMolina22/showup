"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Globe,
  User,
  Mail,
} from "lucide-react";
import {
  getNativeEventById,
  deleteNativeEvent,
  type NativeEvent,
} from "@/lib/native-events";
import Header from "@/components/Header";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const router = useRouter();
  const [event, setEvent] = useState<NativeEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [eventId, setEventId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setEventId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (eventId) {
      loadEvent();
    }
  }, [eventId]);

  const loadEvent = () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const eventData = getNativeEventById(eventId);
      setEvent(eventData || null);
      setIsLoading(false);
    }, 300);
  };

  const handleDeleteEvent = async () => {
    if (!event) return;

    if (
      window.confirm(
        `Are you sure you want to delete "${event.title}"? This action cannot be undone.`,
      )
    ) {
      setIsDeleting(true);

      try {
        const success = deleteNativeEvent(event.id);
        if (success) {
          router.push("/manage");
        } else {
          alert("Failed to delete event. Please try again.");
        }
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("Failed to delete event. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const formatDuration = (startAt: string, endAt: string) => {
    const start = new Date(startAt);
    const end = new Date(endAt);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (minutes === 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minutes`;
    }
  };

  const getEventStatus = (event: NativeEvent) => {
    const now = new Date();
    const start = new Date(event.startAt);
    const end = new Date(event.endAt);

    if (!event.isActive) {
      return { label: "Inactive", color: "bg-gray-100 text-gray-800" };
    } else if (now < start) {
      return { label: "Upcoming", color: "bg-blue-100 text-blue-800" };
    } else if (now >= start && now <= end) {
      return { label: "In Progress", color: "bg-green-100 text-green-800" };
    } else {
      return { label: "Completed", color: "bg-gray-100 text-gray-800" };
    }
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

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header
          title="Event Not Found"
          subtitle="The event you're looking for doesn't exist or has been deleted"
          showBackButton={true}
          backButtonText="Back to Manage"
          backButtonHref="/manage"
          maxWidth="4xl"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Calendar className="mx-auto w-12 h-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Event not found
            </h3>
            <p className="text-slate-600 mb-6">
              The event you&apos;re looking for doesn&apos;t exist or has been
              deleted.
            </p>
            <Link href="/manage">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const status = getEventStatus(event);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        title={event.title}
        subtitle="Event Details & Management"
        showBackButton={true}
        backButtonText="Back to Manage"
        backButtonHref="/manage"
        actionButton={{
          text: "Edit Event",
          href: `/manage/events/${eventId}/edit`,
          icon: <Edit className="w-4 h-4 mr-1" />,
          variant: "outline",
        }}
        maxWidth="4xl"
      />

      {/* Additional Actions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge className={status.color}>{status.label}</Badge>
            <span className="text-sm text-slate-600">Event Status</span>
          </div>
          <Button
            variant="outline"
            onClick={handleDeleteEvent}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {isDeleting ? "Deleting..." : "Delete Event"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Event Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            {event.image && (
              <Card>
                <CardContent className="p-0">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Event Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags.length === 0 && (
                    <p className="text-slate-500 text-sm">No tags assigned</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Staking Information */}
            {event.stakeAmount && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Staking Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Stake Amount
                        </h4>
                        <p className="text-blue-700">
                          Attendees must stake {event.stakeAmount} ETH to RSVP
                        </p>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {event.stakeAmount} ETH
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Event Details */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Start Time</div>
                    <div className="text-sm text-slate-600">
                      {formatDate(event.startAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium">End Time</div>
                    <div className="text-sm text-slate-600">
                      {formatDate(event.endAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-sm text-slate-600">
                      {formatDuration(event.startAt, event.endAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Timezone</div>
                    <div className="text-sm text-slate-600">
                      {event.timezone.replace("_", " ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="font-medium">{event.location}</div>
                {event.fullAddress && (
                  <div className="text-sm text-slate-600">
                    {event.fullAddress}
                  </div>
                )}
                {event.city && (
                  <div className="text-sm text-slate-600">{event.city}</div>
                )}
              </CardContent>
            </Card>

            {/* Attendance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">
                      Max Attendees
                    </span>
                    <span className="font-medium">
                      {event.maxAttendees || "Unlimited"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600">
                      Current RSVPs
                    </span>
                    <span className="font-medium">0</span>
                  </div>
                  {event.maxAttendees && (
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">
                        Spots Remaining
                      </span>
                      <span className="font-medium text-green-600">
                        {event.maxAttendees}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Organizer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Organizer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  {event.organizer.avatar ? (
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-500" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{event.organizer.name}</div>
                    <div className="text-sm text-slate-600 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {event.organizer.email}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Event ID</span>
                  <span className="font-mono text-xs">{event.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Created</span>
                  <span>{new Date(event.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Updated</span>
                  <span>{new Date(event.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Features Placeholder */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            🚧 Coming Soon
          </h3>
          <p className="text-blue-700 mb-4">
            The following features will be available once the blockchain
            integration is complete:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3">
              <div className="font-medium text-blue-900">RSVP Management</div>
              <div className="text-blue-700">
                View and manage attendee RSVPs with staking
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-medium text-blue-900">
                QR Code Generation
              </div>
              <div className="text-blue-700">
                Generate check-in QR codes for verification
              </div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="font-medium text-blue-900">
                Analytics Dashboard
              </div>
              <div className="text-blue-700">
                Real-time attendance and financial analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
