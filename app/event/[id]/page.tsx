import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockEvents } from "@/lib/mock-data";
import { Event } from "@/lib/types";
import { Metadata } from "next";
import EventActions from "./EventActions";

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return {
      title: "Event Not Found | Unified Tech Events",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: `${event.title} | Unified Tech Events`,
    description:
      event.description ||
      `Join us for ${event.title} on ${event.date} in ${event.location}. ${event.tags.join(", ")} event.`,
    openGraph: {
      title: event.title,
      description:
        event.description ||
        `Join us for ${event.title} on ${event.date} in ${event.location}`,
      type: "article",
      locale: "en_US",
      siteName: "Unified Tech Events",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description:
        event.description ||
        `Join us for ${event.title} on ${event.date} in ${event.location}`,
    },
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id } = await params;
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const getTagVariant = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "crypto":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "ai":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "dev":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const getRelatedEvents = (currentEvent: Event) => {
    return mockEvents
      .filter((e) => e.id !== currentEvent.id)
      .filter((e) => e.tags.some((tag) => currentEvent.tags.includes(tag)))
      .slice(0, 3);
  };

  const relatedEvents = getRelatedEvents(event);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Events</span>
            </Link>
            <div className="flex items-center gap-2 ml-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                Tech Events
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {event.title}
          </h1>
        </div>

        {/* Event metadata card */}
        <Card className="mb-8 animate-fade-in delay-100">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date & Time */}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Date & Time
                  </h3>
                  <p className="text-gray-600">{event.date}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-600 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${getTagVariant(tag)}`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description section */}
        {event.description && (
          <Card className="mb-8 animate-fade-in delay-200">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">
                About This Event
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">
                {event.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Action buttons */}
        <Card className="mb-8 animate-fade-in delay-300">
          <CardContent className="p-6">
            <EventActions event={event} />
          </CardContent>
        </Card>

        {/* Related events section */}
        {relatedEvents.length > 0 && (
          <Card className="animate-fade-in delay-400">
            <CardHeader>
              <h2 className="text-2xl font-bold text-gray-900">
                Related Events
              </h2>
              <p className="text-gray-600">
                Other events you might be interested in
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <Link
                    key={relatedEvent.id}
                    href={`/event/${relatedEvent.id}`}
                    className="group block"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {relatedEvent.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`text-xs font-medium px-2 py-1 rounded-full ${getTagVariant(tag)}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {relatedEvent.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{relatedEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{relatedEvent.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold">Unified Tech Events</span> –
              simplifying crypto and AI event discovery.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
