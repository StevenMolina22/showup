import { Event } from "./types";
import { fetchEvents } from "./apify";
import { mockEvents } from "./mock-data";

/**
 * Fetches events from Apify API with graceful fallback to mock data
 * Provides consistent error handling and logging across the application
 */
export async function getEvents(): Promise<Event[]> {
  try {
    console.log("🔄 Fetching events from Apify API...");
    const events = await fetchEvents();

    // If API returns empty array, use mock data as fallback
    if (events.length === 0) {
      console.log("📦 No events from API, using mock data as fallback");
      return mockEvents;
    }

    console.log(`✅ Successfully fetched ${events.length} events from API`);
    return events;
  } catch (error) {
    console.error("❌ Failed to fetch events from API, using mock data:", error);
    return mockEvents;
  }
}

/**
 * Finds a specific event by ID from the available events
 * Uses the same fetching strategy as getEvents()
 */
export async function getEventById(id: string): Promise<Event | null> {
  const events = await getEvents();
  return events.find((event) => event.id === id) || null;
}

/**
 * Gets related events for a given event based on shared tags
 * Excludes the current event and limits results to specified count
 */
export function getRelatedEvents(
  currentEvent: Event,
  allEvents: Event[],
  limit: number = 3
): Event[] {
  return allEvents
    .filter((event) => event.id !== currentEvent.id)
    .filter((event) =>
      event.tags.some((tag) => currentEvent.tags.includes(tag))
    )
    .slice(0, limit);
}

/**
 * Cache for events to avoid repeated API calls within a reasonable timeframe
 * Useful for server-side rendering where multiple components might need events
 */
let eventsCache: { data: Event[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Cached version of getEvents() to improve performance
 * Returns cached data if available and not expired
 */
export async function getCachedEvents(): Promise<Event[]> {
  const now = Date.now();

  // Return cached data if available and not expired
  if (eventsCache && now - eventsCache.timestamp < CACHE_DURATION) {
    console.log("📋 Using cached events data");
    return eventsCache.data;
  }

  // Fetch fresh data
  const events = await getEvents();

  // Update cache
  eventsCache = {
    data: events,
    timestamp: now,
  };

  return events;
}

/**
 * Clears the events cache
 * Useful for testing or when you need to force fresh data
 */
export function clearEventsCache(): void {
  eventsCache = null;
  console.log("🗑️ Events cache cleared");
}
