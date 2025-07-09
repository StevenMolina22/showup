import { ApifyClient } from "apify-client";
import { Event } from "./types";
import { transformApifyEvents } from "./transform-apify-data";
import { logEventFetchStatus, validateEnvironment } from "./debug-utils";

// Initialize the ApifyClient with API token
const client = new ApifyClient({
  token: process.env.APIFY_API_KEY,
});

// Prepare Actor input for tech events
const input = {
  query:
    "crypto OR blockchain OR AI OR machine learning OR developer meetup OR tech conference",
  maxItems: 10,
};

export async function fetchEvents(): Promise<Event[]> {
  // Validate environment first
  if (!validateEnvironment()) {
    console.warn("⚠️ Environment validation failed, API may not work properly");
  }

  try {
    // Run the Actor and wait for it to finish
    const run = await client.actor("r5gMxLV2rOF3J1fxu").call(input);

    // Fetch Actor results from the run's dataset
    console.log("📥 Fetching results from Apify dataset...");
    const { items } = await client.dataset(run.defaultDatasetId).listItems();

    const transformedEvents = transformApifyEvents(items);

    // const validEvents = transformedEvents.filter(isValidEvent);

    // debugApifyResponse(items, transformedEvents, validEvents);

    // logEventFetchStatus("api", validEvents.length);

    return transformedEvents;
  } catch (error) {
    logEventFetchStatus("api", 0, error as Error);

    // Return empty array on error to prevent app crashes
    return [];
  }
}
