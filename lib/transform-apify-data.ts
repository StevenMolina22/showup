import { Event } from "./types";

interface ApifyEventData {
  id?: string;
  api_id?: string;
  name?: string;
  title?: string;
  description?: string;
  start_at?: string;
  startAt?: string;
  end_at?: string;
  endAt?: string;
  timezone?: string;
  location?: string;
  venue?: string;
  address?: string;
  city?: string;
  url?: string;
  link?: string;
  image?: string;
  cover_url?: string;
  mainImageUrl?: string;
  tags?: string[];
  categories?: string[];
  price?: {
    cents?: number;
    currency?: string;
    is_free?: boolean;
    isFree?: boolean;
  };
  ticket_info?: {
    price?: number;
    is_free?: boolean;
    spots_remaining?: number;
    is_sold_out?: boolean;
  };
  hosts?: Array<{
    name?: string;
    avatar_url?: string;
    avatarUrl?: string;
    bio?: string;
    bio_short?: string;
  }>;
  guest_count?: number;
  guestCount?: number;
  spots_remaining?: number;
  is_sold_out?: boolean;
  isSoldOut?: boolean;
}

/**
 * Transforms raw Apify event data to our standardized Event interface
 * Handles various field name variations and provides sensible defaults
 */
export function transformApifyEvent(rawEvent: Record<string | number, unknown>): Event {
  const event = rawEvent as ApifyEventData;

  // Generate ID if not present
  const id = event.id || event.api_id || `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Extract title/name
  const title = event.title || event.name || "Untitled Event";

  // Handle date/time fields
  const startAt = event.start_at || event.startAt || new Date().toISOString();
  const endAt = event.end_at || event.endAt;
  const timezone = event.timezone || "UTC";

  // Extract location information
  const location = event.location || event.venue || "TBD";
  const fullAddress = event.address;
  const city = event.city;

  // Extract URL/link
  const link = event.url || event.link || "#";

  // Process tags/categories
  const rawTags = event.tags || event.categories || [];
  const tags = normalizeEventTags(rawTags);

  // Extract description
  const description = event.description;

  // Extract image
  const image = event.image || event.cover_url || event.mainImageUrl;

  // Process pricing information
  const price = processEventPrice(event);

  // Process host information
  const hosts = processEventHosts(event.hosts);

  // Extract guest and availability info
  const guestCount = event.guest_count || event.guestCount;
  const spotsRemaining = event.spots_remaining || event.ticket_info?.spots_remaining;
  const isSoldOut = event.is_sold_out || event.isSoldOut || event.ticket_info?.is_sold_out || false;

  return {
    id: String(id),
    title: String(title),
    startAt: String(startAt),
    endAt: endAt ? String(endAt) : undefined,
    timezone: String(timezone),
    location: String(location),
    fullAddress: fullAddress ? String(fullAddress) : undefined,
    city: city ? String(city) : undefined,
    link: String(link),
    tags,
    description: description ? String(description) : undefined,
    image: image ? String(image) : undefined,
    price,
    hosts,
    guestCount: guestCount ? Number(guestCount) : undefined,
    isSoldOut: Boolean(isSoldOut),
    spotsRemaining: spotsRemaining ? Number(spotsRemaining) : undefined,
  };
}

/**
 * Normalizes event tags to our standard format
 */
function normalizeEventTags(rawTags: unknown): string[] {
  if (!Array.isArray(rawTags)) return ["dev"];

  return rawTags
    .map(tag => {
      if (typeof tag !== "string") return null;

      const normalizedTag = tag.toLowerCase().trim();

      // Map common variations to our standard tags
      if (normalizedTag.includes("crypto") || normalizedTag.includes("blockchain") || normalizedTag.includes("defi") || normalizedTag.includes("web3")) {
        return "crypto";
      }
      if (normalizedTag.includes("ai") || normalizedTag.includes("ml") || normalizedTag.includes("machine learning") || normalizedTag.includes("artificial intelligence")) {
        return "ai";
      }
      if (normalizedTag.includes("dev") || normalizedTag.includes("programming") || normalizedTag.includes("coding") || normalizedTag.includes("software")) {
        return "dev";
      }
      if (normalizedTag.includes("remote") || normalizedTag.includes("online") || normalizedTag.includes("virtual")) {
        return "remote";
      }
      if (normalizedTag.includes("hybrid")) {
        return "hybrid";
      }

      // Return the original tag if it doesn't match our categories
      return normalizedTag;
    })
    .filter((tag): tag is string => tag !== null)
    .slice(0, 3); // Limit to 3 tags max
}

/**
 * Processes pricing information from various possible formats
 */
function processEventPrice(event: ApifyEventData): Event["price"] {
  // Check ticket_info first
  if (event.ticket_info) {
    const ticketInfo = event.ticket_info;

    if (ticketInfo.is_free) {
      return {
        cents: null,
        currency: null,
        isFree: true,
      };
    }

    if (ticketInfo.price) {
      return {
        cents: Math.round(Number(ticketInfo.price) * 100), // Convert to cents
        currency: "usd", // Default currency
        isFree: false,
      };
    }
  }

  // Check direct price field
  if (event.price) {
    const price = event.price;

    if (price.is_free || price.isFree) {
      return {
        cents: null,
        currency: null,
        isFree: true,
      };
    }

    if (price.cents) {
      return {
        cents: Number(price.cents),
        currency: price.currency || "usd",
        isFree: false,
      };
    }
  }

  // Default to free if no pricing info found
  return {
    cents: null,
    currency: null,
    isFree: true,
  };
}

/**
 * Processes host information from various possible formats
 */
function processEventHosts(rawHosts: unknown): Event["hosts"] {
  if (!Array.isArray(rawHosts)) return undefined;

  return rawHosts
    .map(host => {
      if (typeof host !== "object" || host === null) return null;

      const hostObj = host as Record<string, unknown>;

      return {
        name: String(hostObj.name || "Unknown Host"),
        avatarUrl: hostObj.avatar_url ? String(hostObj.avatar_url) :
                   hostObj.avatarUrl ? String(hostObj.avatarUrl) : undefined,
        bio: hostObj.bio ? String(hostObj.bio) :
             hostObj.bio_short ? String(hostObj.bio_short) : undefined,
      };
    })
    .filter((host): host is NonNullable<typeof host> => host !== null)
    .slice(0, 3); // Limit to 3 hosts max
}

/**
 * Transforms an array of raw Apify events to our Event format
 */
export function transformApifyEvents(rawEvents: Record<string | number, unknown>[]): Event[] {
  return rawEvents
    .map(rawEvent => {
      try {
        return transformApifyEvent(rawEvent);
      } catch (error) {
        console.warn("Failed to transform event:", error, rawEvent);
        return null;
      }
    })
    .filter((event): event is Event => event !== null);
}

/**
 * Validates that an event has minimum required data
 */
export function isValidEvent(event: Event): boolean {
  return Boolean(
    event.id &&
    event.title &&
    event.startAt &&
    event.location &&
    event.link &&
    event.tags.length > 0
  );
}
