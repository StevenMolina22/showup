import { Event } from "./types";
import { fetchEvents } from "./apify";
import { mockEvents } from "./mock-data";

/**
 * Fetches events from Apify API with graceful fallback to mock data
 * This is the single source of truth for event fetching
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
