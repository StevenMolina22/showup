# Unified Tech Events

A minimalist, modern tech events aggregator app built with Next.js 15, Tailwind CSS 4, and Shadcn/UI components. Discover and attend crypto and AI events from various sources, all in one place.

## 🚀 Features

- **Clean, Modern UI**: Minimalist design with subtle animations and hover effects
- **Responsive Design**: Mobile-first approach with responsive grid layout
- **Event Cards**: Beautiful cards displaying event details, dates, locations, and tags
- **Category Tags**: Color-coded tags for Crypto, AI, and Dev events
- **Search Bar**: Ready for future search functionality (currently mocked)
- **Accessibility**: Built with semantic HTML and proper ARIA labels
- **TypeScript**: Full type safety throughout the application
- **Dark Mode Ready**: CSS variables configured for easy dark mode implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4 with custom theme
- **Components**: Shadcn/UI (New York style)
- **Icons**: Lucide React
- **Typography**: Geist Sans & Geist Mono fonts
- **Animation**: Custom CSS animations with tw-animate-css
- **Language**: TypeScript

## 📱 Screenshots

The app features:
- A clean header with app branding and calendar icon
- A centered search bar (mocked for demo)
- Responsive grid of event cards (1 col on mobile, 2-3 cols on desktop)
- Color-coded tags for different event categories
- External links to actual event pages
- Simple footer with attribution

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd events-zed
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
events-zed/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and animations
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   ├── EventCard.tsx     # Individual event card
│   ├── EventGrid.tsx     # Responsive grid layout
│   ├── Footer.tsx        # Footer component
│   ├── Header.tsx        # Header with branding
│   └── SearchBar.tsx     # Search bar (mocked)
├── lib/                  # Utilities and types
│   ├── mock-data.ts      # Sample event data
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
├── docs/                 # Documentation
│   ├── PLANNING.md       # Project architecture
│   ├── RULES.md          # Development rules
│   └── TASKS.md          # Task tracking
└── public/               # Static assets
```

## 🎨 Design System

### Color Scheme
- **Primary**: Blue (#2563eb) for CTAs and links
- **Tags**: 
  - Crypto: Orange (#f97316)
  - AI: Purple (#7c3aed)
  - Dev: Blue (#2563eb)
- **Background**: Clean white with subtle gradient
- **Cards**: White with subtle shadows and hover effects

### Typography
- **Headers**: Bold, large text for event titles
- **Body**: Clear, readable text for dates and descriptions
- **Accent**: Lighter gray for secondary information

### Animations
- **Fade-in**: Staggered animation for event cards
- **Hover Effects**: Subtle scale and color transitions
- **Button Interactions**: Smooth hover states

## 🔧 Development

### Adding New Components

1. Create component in `components/` directory
2. Add TypeScript interface in `lib/types.ts`
3. Follow the established patterns from existing components
4. Ensure mobile-first responsive design

### Adding New Event Data

Events follow this structure:
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

### Custom Styling

- Use Tailwind utility classes
- Custom animations in `app/globals.css`
- Follow the established color scheme
- Maintain consistency with existing components

## 🚧 Future Enhancements

- [ ] Real-time event fetching from Lu.ma API
- [ ] Search and filtering functionality
- [ ] Event categories and advanced filtering
- [ ] User preferences and saved events
- [ ] Calendar integration
- [ ] Event notifications
- [ ] Dark mode toggle
- [ ] Event detail pages

## 📄 License

This project is built for demonstration purposes. Feel free to use and modify as needed.

## 🤝 Contributing

1. Check `docs/TASKS.md` for current tasks
2. Follow the patterns in `docs/PLANNING.md`
3. Adhere to the rules in `docs/RULES.md`
4. Test responsive design on multiple screen sizes
5. Update documentation as needed

## 📞 Support

For questions or issues, please check the documentation in the `docs/` folder or create an issue in the repository.

---

**Built with ❤️ using Next.js, Tailwind CSS, and Shadcn/UI**