/**
 * Date formatting utilities for the events app
 * Provides consistent date formatting across the application
 */

export interface DateFormatOptions {
  includeTime?: boolean;
  includeYear?: boolean;
  shortMonth?: boolean;
  timezone?: string;
}

/**
 * Format a date string or Date object for display
 * @param date - Date string or Date object
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatEventDate(
  date: string | Date,
  options: DateFormatOptions = {},
): string {
  const {
    includeTime = true,
    includeYear = true,
    shortMonth = false,
    timezone = "UTC",
  } = options;

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
      month: shortMonth ? "short" : "long",
      day: "numeric",
      timeZone: timezone,
    };

    if (includeYear) {
      formatOptions.year = "numeric";
    }

    if (includeTime) {
      formatOptions.hour = "numeric";
      formatOptions.minute = "2-digit";
      formatOptions.hour12 = true;
    }

    return new Intl.DateTimeFormat("en-US", formatOptions).format(dateObj);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
}

/**
 * Parse a date string in various formats commonly used in event data
 * @param dateString - Date string to parse
 * @returns Date object or null if parsing fails
 */
export function parseEventDate(dateString: string): Date | null {
  try {
    // Handle common formats like "July 15, 2025 - 6:00 PM"
    const cleanDateString = dateString.replace(/\s*-\s*/, " ");
    const date = new Date(cleanDateString);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
}

/**
 * Check if an event date is in the past
 * @param date - Date string or Date object
 * @returns boolean indicating if the date is in the past
 */
export function isEventPast(date: string | Date): boolean {
  try {
    const eventDate = typeof date === "string" ? parseEventDate(date) : date;
    if (!eventDate) return false;

    return eventDate < new Date();
  } catch (error) {
    console.error("Error checking if event is past:", error);
    return false;
  }
}

/**
 * Check if an event is happening today
 * @param date - Date string or Date object
 * @returns boolean indicating if the event is today
 */
export function isEventToday(date: string | Date): boolean {
  try {
    const eventDate = typeof date === "string" ? parseEventDate(date) : date;
    if (!eventDate) return false;

    const today = new Date();
    return (
      eventDate.getDate() === today.getDate() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getFullYear() === today.getFullYear()
    );
  } catch (error) {
    console.error("Error checking if event is today:", error);
    return false;
  }
}

/**
 * Get relative time string (e.g., "in 3 days", "2 hours ago")
 * @param date - Date string or Date object
 * @returns Relative time string
 */
export function getRelativeTime(date: string | Date): string {
  try {
    const eventDate = typeof date === "string" ? parseEventDate(date) : date;
    if (!eventDate) return "Unknown";

    const now = new Date();
    const diffMs = eventDate.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    } else if (diffDays < 0) {
      return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    } else if (diffHours < 0) {
      return `${Math.abs(diffHours)} hour${Math.abs(diffHours) > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `in ${diffMinutes} minute${diffMinutes > 1 ? "s" : ""}`;
    } else if (diffMinutes < 0) {
      return `${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) > 1 ? "s" : ""} ago`;
    } else {
      return "now";
    }
  } catch (error) {
    console.error("Error getting relative time:", error);
    return "Unknown";
  }
}

/**
 * Sort events by date (earliest first)
 * @param events - Array of events with date property
 * @returns Sorted array of events
 */
export function sortEventsByDate<T extends { startAt: string }>(
  events: T[],
): T[] {
  return events.sort((a, b) => {
    const dateA = parseEventDate(a.startAt);
    const dateB = parseEventDate(b.startAt);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA.getTime() - dateB.getTime();
  });
}

/**
 * Filter events by date range
 * @param events - Array of events with date property
 * @param startDate - Start date for filtering
 * @param endDate - End date for filtering
 * @returns Filtered array of events
 */
export function filterEventsByDateRange<T extends { startAt: string }>(
  events: T[],
  startDate: Date,
  endDate: Date,
): T[] {
  return events.filter((event) => {
    const eventDate = parseEventDate(event.startAt);
    if (!eventDate) return false;

    return eventDate >= startDate && eventDate <= endDate;
  });
}

/**
 * Get events happening in the next N days
 * @param events - Array of events with date property
 * @param days - Number of days to look ahead
 * @returns Filtered array of upcoming events
 */
export function getUpcomingEvents<T extends { startAt: string }>(
  events: T[],
  days: number = 7,
): T[] {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + days);

  return filterEventsByDateRange(events, now, futureDate);
}
