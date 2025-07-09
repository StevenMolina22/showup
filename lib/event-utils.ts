import { Event } from "./types";

/**
 * Finds a specific event by ID from a list of events
 */
export function getEventById(id: string, events: Event[]): Event | null {
  return events.find((event) => event.id === id) || null;
}

/**
 * Gets related events for a given event based on shared tags
 * Excludes the current event and limits results to specified count
 */
export function getRelatedEvents(
  currentEvent: Event,
  allEvents: Event[],
  limit: number = 3,
): Event[] {
  return allEvents
    .filter((event) => event.id !== currentEvent.id)
    .filter((event) =>
      event.tags.some((tag) => currentEvent.tags.includes(tag)),
    )
    .slice(0, limit);
}

/**
 * Filters events by category/tag
 */
export function filterEventsByTag(events: Event[], tag: string): Event[] {
  return events.filter((event) =>
    event.tags.some((eventTag) => eventTag.toLowerCase() === tag.toLowerCase()),
  );
}

/**
 * Sorts events by start date (ascending)
 */
export function sortEventsByDate(events: Event[]): Event[] {
  return [...events].sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
  );
}
