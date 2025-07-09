import { Event } from "@/lib/types";
import EventCard from "./EventCard";

interface EventGridProps {
  events: Event[];
}

export default function EventGrid({ events }: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">📅</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No events found
        </h3>
        <p className="text-gray-600 max-w-md">
          We couldn&apos;t find any events matching your criteria. Try adjusting
          your search or check back later for new events.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
