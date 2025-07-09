import { Event } from "./types";

/**
 * Debug utility for logging API responses and transformation results
 */
export function debugApifyResponse(
  rawData: Record<string | number, unknown>[],
  transformedEvents: Event[],
  validEvents: Event[]
): void {
  if (process.env.NODE_ENV === "development") {
    console.group("🔍 Apify API Debug Information");

    console.log("📊 Data Summary:");
    console.log(`- Raw items: ${rawData.length}`);
    console.log(`- Transformed events: ${transformedEvents.length}`);
    console.log(`- Valid events: ${validEvents.length}`);

    if (rawData.length > 0) {
      console.log("\n📋 Sample Raw Data Structure:");
      console.log(JSON.stringify(rawData[0], null, 2));
    }

    if (transformedEvents.length > 0) {
      console.log("\n✅ Sample Transformed Event:");
      console.log(JSON.stringify(transformedEvents[0], null, 2));
    }

    // Log any events that failed validation
    const invalidEvents = transformedEvents.filter(event => !isValidEvent(event));
    if (invalidEvents.length > 0) {
      console.log("\n❌ Invalid Events (missing required fields):");
      invalidEvents.forEach((event, index) => {
        console.log(`Event ${index + 1}:`, {
          id: event.id,
          title: event.title,
          startAt: event.startAt,
          location: event.location,
          link: event.link,
          tags: event.tags,
        });
      });
    }

    console.groupEnd();
  }
}

/**
 * Simple validation helper for events
 */
function isValidEvent(event: Event): boolean {
  return Boolean(
    event.id &&
    event.title &&
    event.startAt &&
    event.location &&
    event.link &&
    event.tags.length > 0
  );
}

/**
 * Log event fetching status for monitoring
 */
export function logEventFetchStatus(
  source: "api" | "mock" | "cache",
  count: number,
  error?: Error
): void {
  const timestamp = new Date().toISOString();

  if (error) {
    console.error(`🚨 [${timestamp}] Event fetch failed from ${source}:`, error.message);
  } else {
    console.log(`✅ [${timestamp}] Fetched ${count} events from ${source}`);
  }
}

/**
 * Performance timing utility for API calls
 */
export class PerformanceTimer {
  private startTime: number;
  private label: string;

  constructor(label: string) {
    this.label = label;
    this.startTime = performance.now();
  }

  end(): number {
    const duration = performance.now() - this.startTime;
    console.log(`⏱️ ${this.label}: ${duration.toFixed(2)}ms`);
    return duration;
  }
}

/**
 * Validate environment variables for API integration
 */
export function validateEnvironment(): boolean {
  const requiredEnvVars = ["APIFY_API_KEY"];
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(", ")}`);
    return false;
  }

  return true;
}
