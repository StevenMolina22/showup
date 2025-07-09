import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
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

  return (
    <Card className="group h-full bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 rounded-xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${getTagVariant(tag)}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={`/event/${event.id}`}>
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer">
            {event.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm font-medium">{event.date}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{event.location}</span>
          </div>
        </div>

        {event.description && (
          <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
            {event.description}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            asChild
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
          >
            <Link
              href={`/event/${event.id}`}
              className="flex items-center justify-center gap-2"
            >
              View Details
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-3 border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
