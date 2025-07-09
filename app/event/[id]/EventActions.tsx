"use client";

import { ExternalLink, Share2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";

interface EventActionsProps {
  event: Event;
}

export default function EventActions({ event }: EventActionsProps) {
  const handleAddToCalendar = () => {
    // Reason: Generate calendar URL with event details for cross-platform compatibility
    const startDate =
      new Date(event.startAt).toISOString().replace(/[-:]/g, "").split(".")[0] +
      "Z";
    const endDate = event.endAt
      ? new Date(event.endAt).toISOString().replace(/[-:]/g, "").split(".")[0] +
        "Z"
      : new Date(new Date(event.startAt).getTime() + 2 * 60 * 60 * 1000)
          .toISOString()
          .replace(/[-:]/g, "")
          .split(".")[0] + "Z";

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description || "")}&location=${encodeURIComponent(event.location)}`;

    window.open(calendarUrl, "_blank");
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Check out this tech event: ${event.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Event link copied to clipboard!");
      }
    } else {
      // Fallback for browsers without native share
      await navigator.clipboard.writeText(window.location.href);
      alert("Event link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        asChild
        size="lg"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 hover:scale-105"
      >
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          View Event on Lu.ma
          <ExternalLink className="w-5 h-5" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={handleAddToCalendar}
        className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add to Calendar
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={handleShare}
        className="flex-1 border-gray-300 hover:bg-gray-50 transition-all duration-200"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share Event
      </Button>
    </div>
  );
}
