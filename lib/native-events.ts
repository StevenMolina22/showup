// Native events storage - Simple array-based storage for platform-native events
// This will be replaced with a database in production

export interface NativeEvent {
  id: string;
  title: string;
  description: string;
  startAt: string; // ISO 8601 date string
  endAt: string; // ISO 8601 date string
  timezone: string;
  location: string;
  fullAddress?: string;
  city?: string;
  image?: string;
  tags: string[];
  maxAttendees?: number;
  stakeAmount?: number; // In ETH/tokens - for future blockchain integration
  organizer: {
    name: string;
    email: string;
    avatar?: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Initial mock data for native events
const nativeEvents: NativeEvent[] = [
  {
    id: "native-1",
    title: "Crypto Startup Pitch Night",
    description:
      "Join us for an evening of innovative crypto startup pitches. Network with founders, investors, and crypto enthusiasts while discovering the next big thing in Web3.",
    startAt: "2024-01-15T19:00:00.000Z",
    endAt: "2024-01-15T22:00:00.000Z",
    timezone: "America/New_York",
    location: "Innovation Hub NYC",
    fullAddress: "123 Tech Street, New York, NY 10001",
    city: "New York",
    image: "/images/pitch-night.jpg",
    tags: ["crypto", "startup", "networking", "investment"],
    maxAttendees: 150,
    stakeAmount: 0.01, // 0.01 ETH
    organizer: {
      name: "Sarah Chen",
      email: "sarah@cryptostartups.nyc",
      avatar: "/avatars/sarah.jpg",
    },
    isActive: true,
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2024-01-01T10:00:00.000Z",
  },
  {
    id: "native-2",
    title: "DeFi Security Workshop",
    description:
      "Learn about smart contract security, common vulnerabilities, and best practices for building secure DeFi protocols. Hands-on workshop with real-world examples.",
    startAt: "2024-01-20T14:00:00.000Z",
    endAt: "2024-01-20T18:00:00.000Z",
    timezone: "America/Los_Angeles",
    location: "Silicon Valley Crypto Center",
    fullAddress: "456 Blockchain Ave, Palo Alto, CA 94301",
    city: "Palo Alto",
    image: "/images/defi-security.jpg",
    tags: ["defi", "security", "workshop", "education"],
    maxAttendees: 50,
    stakeAmount: 0.02, // 0.02 ETH
    organizer: {
      name: "Alex Rodriguez",
      email: "alex@defisec.io",
      avatar: "/avatars/alex.jpg",
    },
    isActive: true,
    createdAt: "2024-01-02T15:30:00.000Z",
    updatedAt: "2024-01-02T15:30:00.000Z",
  },
  {
    id: "native-3",
    title: "NFT Art Gallery Opening",
    description:
      "Exclusive opening night for our curated NFT art exhibition featuring emerging digital artists. Meet the artists, learn about their creative process, and discover unique digital art pieces.",
    startAt: "2024-01-25T18:30:00.000Z",
    endAt: "2024-01-25T21:30:00.000Z",
    timezone: "Europe/London",
    location: "Digital Art Space London",
    fullAddress: "789 Creative Quarter, London, UK E1 6AN",
    city: "London",
    image: "/images/nft-gallery.jpg",
    tags: ["nft", "art", "gallery", "culture"],
    maxAttendees: 100,
    stakeAmount: 0.005, // 0.005 ETH
    organizer: {
      name: "Emma Thompson",
      email: "emma@digitalartspace.co.uk",
      avatar: "/avatars/emma.jpg",
    },
    isActive: true,
    createdAt: "2024-01-03T09:15:00.000Z",
    updatedAt: "2024-01-03T09:15:00.000Z",
  },
];

// CRUD Operations for Native Events

export const getNativeEvents = (): NativeEvent[] => {
  return [...nativeEvents];
};

export const getNativeEventById = (id: string): NativeEvent | undefined => {
  return nativeEvents.find((event) => event.id === id);
};

export const createNativeEvent = (
  eventData: Omit<NativeEvent, "id" | "createdAt" | "updatedAt">,
): NativeEvent => {
  const now = new Date().toISOString();
  const newEvent: NativeEvent = {
    ...eventData,
    id: `native-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };

  nativeEvents.push(newEvent);
  return newEvent;
};

export const updateNativeEvent = (
  id: string,
  updates: Partial<Omit<NativeEvent, "id" | "createdAt">>,
): NativeEvent | null => {
  const eventIndex = nativeEvents.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return null;
  }

  const updatedEvent: NativeEvent = {
    ...nativeEvents[eventIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  nativeEvents[eventIndex] = updatedEvent;
  return updatedEvent;
};

export const deleteNativeEvent = (id: string): boolean => {
  const eventIndex = nativeEvents.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    return false;
  }

  nativeEvents.splice(eventIndex, 1);
  return true;
};

export const getActiveNativeEvents = (): NativeEvent[] => {
  return nativeEvents.filter((event) => event.isActive);
};

export const searchNativeEvents = (query: string): NativeEvent[] => {
  const lowercaseQuery = query.toLowerCase();
  return nativeEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description.toLowerCase().includes(lowercaseQuery) ||
      event.location.toLowerCase().includes(lowercaseQuery) ||
      event.city?.toLowerCase().includes(lowercaseQuery) ||
      event.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      event.organizer.name.toLowerCase().includes(lowercaseQuery),
  );
};

export const filterNativeEventsByTag = (tag: string): NativeEvent[] => {
  return nativeEvents.filter((event) =>
    event.tags.some((eventTag) => eventTag.toLowerCase() === tag.toLowerCase()),
  );
};

export const filterNativeEventsByDateRange = (
  startDate: string,
  endDate: string,
): NativeEvent[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return nativeEvents.filter((event) => {
    const eventStart = new Date(event.startAt);
    return eventStart >= start && eventStart <= end;
  });
};

// Helper function to convert NativeEvent to the standard Event interface for compatibility
export const convertNativeEventToEvent = (
  nativeEvent: NativeEvent,
): import("./types").Event => {
  return {
    id: nativeEvent.id,
    title: nativeEvent.title,
    startAt: nativeEvent.startAt,
    endAt: nativeEvent.endAt,
    timezone: nativeEvent.timezone,
    location: nativeEvent.location,
    fullAddress: nativeEvent.fullAddress,
    city: nativeEvent.city,
    link: `/manage/events/${nativeEvent.id}`, // Link to management page
    tags: nativeEvent.tags,
    description: nativeEvent.description,
    image: nativeEvent.image,
    price: {
      cents: nativeEvent.stakeAmount
        ? Math.round(nativeEvent.stakeAmount * 100000)
        : null, // Convert ETH to "cents" equivalent
      currency: "ETH",
      isFree: !nativeEvent.stakeAmount || nativeEvent.stakeAmount === 0,
    },
    hosts: [
      {
        name: nativeEvent.organizer.name,
        avatarUrl: nativeEvent.organizer.avatar,
        bio: `Event Organizer - ${nativeEvent.organizer.email}`,
      },
    ],
    guestCount: 0, // Will be tracked when RSVP system is implemented
    isSoldOut: false,
    spotsRemaining: nativeEvent.maxAttendees,
  };
};
