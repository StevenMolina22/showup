import { Event, LumaEventResponse } from "./types";

/**
 * Transform Lu.ma API response to our Event type
 * Reason: Lu.ma API has nested structure that needs to be flattened for our UI components
 */
export function transformLumaEvent(lumaEvent: LumaEventResponse): Event {
  // Extract location information with fallbacks
  const geoInfo = lumaEvent.event.geo_address_info;
  const location = geoInfo?.city_state || geoInfo?.city || "Location TBD";
  const fullAddress = geoInfo?.full_address;

  // Extract pricing information
  const ticketInfo = lumaEvent.ticket_info;
  const price = ticketInfo
    ? {
        cents: ticketInfo.max_price?.cents || null,
        currency: ticketInfo.max_price?.currency || null,
        isFree: ticketInfo.is_free,
        maxPrice: ticketInfo.max_price
          ? {
              cents: ticketInfo.max_price.cents,
              currency: ticketInfo.max_price.currency,
            }
          : undefined,
      }
    : undefined;

  // Transform hosts information
  const hosts = lumaEvent.hosts?.map((host) => ({
    name: host.name,
    avatarUrl: host.avatar_url,
    bio: host.bio_short,
  }));

  // Extract description from complex nested structure
  // Reason: Lu.ma uses a complex document structure for descriptions
  const description = extractDescriptionText(lumaEvent.description_mirror);

  // Generate tags from categories or use default categorization
  const tags = generateEventTags(lumaEvent);

  return {
    id: lumaEvent.api_id,
    title: lumaEvent.event.name,
    startAt: lumaEvent.event.start_at,
    endAt: lumaEvent.event.end_at,
    timezone: lumaEvent.event.timezone,
    location,
    fullAddress,
    city: geoInfo?.city,
    link: lumaEvent.url,
    tags,
    description,
    image: lumaEvent.mainImageUrl || lumaEvent.event.cover_url,
    price,
    hosts,
    guestCount: lumaEvent.guest_count,
    isSoldOut: ticketInfo?.is_sold_out,
    spotsRemaining: ticketInfo?.spots_remaining,
  };
}

/**
 * Extract plain text from Lu.ma's complex description structure
 * Reason: Lu.ma uses a nested document format that needs to be flattened for display
 */
function extractDescriptionText(
  descriptionMirror: unknown,
): string | undefined {
  if (
    !descriptionMirror ||
    typeof descriptionMirror !== "object" ||
    !("content" in descriptionMirror)
  ) {
    return undefined;
  }

  const mirror = descriptionMirror as { content?: unknown[] };
  if (!mirror.content || !Array.isArray(mirror.content)) return undefined;

  const extractText = (content: unknown[]): string => {
    return content
      .map((node: unknown) => {
        if (
          typeof node === "object" &&
          node &&
          "type" in node &&
          "content" in node
        ) {
          const typedNode = node as { type: string; content?: unknown[] };
          if (
            typedNode.type === "paragraph" &&
            Array.isArray(typedNode.content)
          ) {
            return typedNode.content
              .map((textNode: unknown) => {
                if (
                  typeof textNode === "object" &&
                  textNode &&
                  "text" in textNode
                ) {
                  return (textNode as { text?: string }).text || "";
                }
                return "";
              })
              .join("")
              .trim();
          }
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  };

  const text = extractText(mirror.content);
  return text.length > 0 ? text : undefined;
}

/**
 * Generate tags based on event content and categories
 * Reason: Need to categorize events for filtering and visual organization
 */
function generateEventTags(lumaEvent: LumaEventResponse): string[] {
  const tags: string[] = [];

  // Add explicit categories if available
  if (lumaEvent.categories && lumaEvent.categories.length > 0) {
    tags.push(...lumaEvent.categories);
  }

  // Analyze event title and description for keywords
  const title = lumaEvent.event.name.toLowerCase();
  const description =
    extractDescriptionText(lumaEvent.description_mirror)?.toLowerCase() || "";
  const combinedText = `${title} ${description}`;

  // AI/ML related keywords
  if (
    combinedText.includes("ai") ||
    combinedText.includes("artificial intelligence") ||
    combinedText.includes("machine learning") ||
    combinedText.includes("ml") ||
    combinedText.includes("llm") ||
    combinedText.includes("neural") ||
    combinedText.includes("gpt")
  ) {
    tags.push("ai");
  }

  // Crypto/Blockchain keywords
  if (
    combinedText.includes("crypto") ||
    combinedText.includes("blockchain") ||
    combinedText.includes("bitcoin") ||
    combinedText.includes("ethereum") ||
    combinedText.includes("defi") ||
    combinedText.includes("nft") ||
    combinedText.includes("web3")
  ) {
    tags.push("crypto");
  }

  // Development keywords
  if (
    combinedText.includes("developer") ||
    combinedText.includes("development") ||
    combinedText.includes("coding") ||
    combinedText.includes("programming") ||
    combinedText.includes("software") ||
    combinedText.includes("tech") ||
    combinedText.includes("startup")
  ) {
    tags.push("dev");
  }

  // Location-based tags
  const geoInfo = lumaEvent.event.geo_address_info;
  if (!geoInfo || !geoInfo.full_address) {
    tags.push("remote");
  } else {
    tags.push("hybrid");
  }

  // Remove duplicates and return
  return [...new Set(tags)];
}

/**
 * Format price for display
 * Reason: Need consistent price formatting across the application
 */
export function formatEventPrice(price?: Event["price"]): string {
  if (!price || price.isFree) {
    return "Free";
  }

  if (!price.cents || !price.currency) {
    return "Price TBD";
  }

  const amount = price.cents / 100;
  const currency = price.currency.toUpperCase();

  return `${currency} ${amount.toFixed(2)}`;
}

/**
 * Check if event is happening soon (within next 7 days)
 * Reason: Highlight upcoming events for better user experience
 */
export function isEventSoon(startAt: string): boolean {
  const eventDate = new Date(startAt);
  const now = new Date();
  const diffInDays =
    (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  return diffInDays <= 7 && diffInDays >= 0;
}

/**
 * Get event status based on dates and ticket info
 * Reason: Show relevant status indicators to users
 */
export function getEventStatus(
  event: Event,
): "upcoming" | "live" | "ended" | "sold-out" {
  const now = new Date();
  const startDate = new Date(event.startAt);
  const endDate = event.endAt ? new Date(event.endAt) : null;

  if (event.isSoldOut) {
    return "sold-out";
  }

  if (endDate && now > endDate) {
    return "ended";
  }

  if (now >= startDate && (!endDate || now <= endDate)) {
    return "live";
  }

  return "upcoming";
}
