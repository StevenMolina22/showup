export interface Event {
  id: string;
  title: string;
  startAt: string;
  endAt?: string;
  timezone: string;
  location: string;
  fullAddress?: string;
  city?: string;
  link: string;
  tags: string[];
  description?: string;
  image?: string;
  price?: {
    cents: number | null;
    currency: string | null;
    isFree: boolean;
    maxPrice?: {
      cents: number;
      currency: string;
    };
  };
  hosts?: Array<{
    name: string;
    avatarUrl?: string;
    bio?: string;
  }>;
  guestCount?: number;
  isSoldOut?: boolean;
  spotsRemaining?: number;
}

export interface EventCardProps {
  event: Event;
}

export interface EventGridProps {
  events: Event[];
}

export interface TagProps {
  children: React.ReactNode;
  variant?: "crypto" | "ai" | "dev" | "default";
}

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  disabled?: boolean;
}

export interface HeaderProps {
  title: string;
  subtitle?: string;
}

export interface FooterProps {
  text?: string;
  links?: Array<{
    href: string;
    label: string;
    icon?: React.ReactNode;
  }>;
}

export type EventCategory = "crypto" | "ai" | "dev" | "remote" | "hybrid";

// Lu.ma API response type for reference
export interface LumaEventResponse {
  api_id: string;
  event: {
    name: string;
    start_at: string;
    end_at: string;
    timezone: string;
    cover_url?: string;
    geo_address_info?: {
      full_address?: string;
      city_state?: string;
      city?: string;
    };
    url: string;
  };
  mainImageUrl?: string;
  url: string;
  description_mirror?: {
    content?: Array<{
      type: string;
      content?: Array<{
        text?: string;
        type: string;
      }>;
    }>;
  };
  categories?: string[];
  ticket_info?: {
    price: unknown;
    is_free: boolean;
    max_price?: {
      cents: number;
      currency: string;
    };
    is_sold_out?: boolean;
    spots_remaining?: number;
  };
  hosts?: Array<{
    name: string;
    avatar_url?: string;
    bio_short?: string;
  }>;
  guest_count?: number;
}

export interface EventFilters {
  category?: EventCategory;
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}
