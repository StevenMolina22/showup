# Tech Events Aggregator - Project Planning

## Project Overview
A minimalist, modern tech events aggregator app built with Next.js 15, Tailwind CSS 4, and Shadcn/UI components. The app aggregates crypto and AI events from various sources (starting with Lu.ma) and presents them in a clean, discoverable interface.

## Architecture & Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with custom theme
- **Components**: Shadcn/UI (New York style)
- **Icons**: Lucide React
- **Typography**: Geist Sans & Geist Mono fonts
- **Animation**: tw-animate-css for subtle animations

### Project Structure
```
events-zed/
├── app/                 # Next.js App Router pages
├── components/          # Reusable components
│   ├── ui/             # Shadcn/UI components
│   └── ...             # Custom components
├── lib/                # Utilities and helpers
├── docs/               # Documentation
└── public/             # Static assets
```

## Design System

### Color Scheme
- **Primary**: Blue/Purple accent colors for CTAs and links
- **Background**: Clean white with soft dark mode support
- **Cards**: White/dark cards with subtle shadows
- **Text**: High contrast for readability

### Typography
- **Headers**: Bold, large text for event titles
- **Body**: Clear, readable text for dates and descriptions
- **Accent**: Lighter gray for secondary information

### Layout Patterns
- **Mobile-first**: Responsive grid (1 col mobile, 2-3 cols desktop)
- **Spacing**: Consistent Tailwind spacing scale
- **Cards**: Rounded corners with subtle shadows
- **Animations**: Fade-in on load, hover effects on buttons

## Component Architecture

### Core Components
1. **Header** - App branding and navigation
2. **SearchBar** - Future search functionality (mocked initially)
3. **EventCard** - Individual event display with tags
4. **EventGrid** - Responsive grid layout for events
5. **Footer** - Simple footer with attribution

### Design Patterns
- **Composition**: Components composed of smaller, reusable parts
- **Responsive**: Mobile-first, progressive enhancement
- **Accessible**: Semantic HTML, proper ARIA labels
- **Performant**: Optimized images, efficient rendering

## Data Model

### Event Structure
```typescript
interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  link: string;
  tags: string[];
  description?: string;
  image?: string;
}
```

### Tags System
- **Crypto**: Cryptocurrency, blockchain, DeFi events
- **AI**: Machine learning, LLMs, AI development
- **Dev**: General development, programming
- **Remote**: Online events
- **Hybrid**: Both online and in-person

## File Size Constraints
- **Maximum 500 lines per file**
- **Modular approach**: Split large components into smaller modules
- **Utility functions**: Separate into lib/ directory
- **Type definitions**: Keep in separate .types.ts files

## Naming Conventions
- **Files**: kebab-case for components, camelCase for utilities
- **Components**: PascalCase React components
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **CSS Classes**: Tailwind utility classes, component-specific classes

## Development Workflow
1. Check TASKS.md before starting new features
2. Update README.md when adding dependencies or features
3. Mark completed tasks in TASKS.md
4. Add inline comments for complex logic
5. Test responsive design on multiple screen sizes

## Future Enhancements
- Real-time event fetching from Lu.ma API
- Search and filtering functionality
- Event categories and advanced filtering
- User preferences and saved events
- Calendar integration
- Event notifications