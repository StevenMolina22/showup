export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  link: string;
  tags: string[];
  description?: string;
  image?: string;
}

export interface EventCardProps {
  event: Event;
}

export interface EventGridProps {
  events: Event[];
}

export interface TagProps {
  children: React.ReactNode;
  variant?: 'crypto' | 'ai' | 'dev' | 'default';
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

export type EventCategory = 'crypto' | 'ai' | 'dev' | 'remote' | 'hybrid';

export interface EventFilters {
  category?: EventCategory;
  location?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
}
