# Tech Events Aggregator - Project Rules

## 🔄 Project Awareness & Context
- **Always read `docs/PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `docs/TASKS.md`** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- **Check `docs/RULES.md`** for any rules the project has.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `docs/PLANNING.md`.

## 🧱 Code Structure & Modularity
- **Never create a file longer than 500 lines of code.** If a file this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
- **Use clear, consistent imports** (prefer relative imports within packages).

## ✅ Task Completion
- **Mark completed tasks in `docs/TASKS.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `docs/TASKS.md` under a "Discovered During Work" section.

## 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- When writing complex logic, **add an inline `# Reason:` comment** explaining the why, not just the what.

## 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Always confirm file paths and module names** exist before referencing them in code.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `docs/TASKS.md`.

## 🎨 Design & UI Specific Rules
- **Follow mobile-first responsive design** - always start with mobile layout and enhance for larger screens.
- **Use Tailwind utility classes** - avoid custom CSS unless absolutely necessary.
- **Implement Shadcn/UI components** - use the established component library for consistency.
- **Maintain accessibility standards** - use semantic HTML, proper ARIA labels, and keyboard navigation.
- **Keep animations subtle** - fade-ins, hover effects, and smooth transitions only.

## 📦 Component Rules
- **Single responsibility** - each component should have one clear purpose.
- **Props interface** - always define TypeScript interfaces for component props.
- **Reusable components** - create components that can be used across different parts of the app.
- **Composition over inheritance** - prefer composing components from smaller parts.

## 🔧 Technical Standards
- **TypeScript strict mode** - use proper types, avoid `any` type.
- **Error boundaries** - implement proper error handling for components.
- **Performance** - optimize images, lazy load when appropriate, minimize bundle size.
- **SEO friendly** - use proper meta tags, semantic HTML, and Next.js best practices.

## 🧪 Testing & Quality
- **Test responsive design** on multiple screen sizes before marking tasks complete.
- **Validate accessibility** - ensure components work with keyboard navigation and screen readers.
- **Cross-browser compatibility** - test on modern browsers.
- **Performance audit** - check for unnecessary re-renders and optimize when needed.

## 🚀 Development Workflow
1. Read existing documentation before starting
2. Update TASKS.md with new tasks
3. Follow the established architecture patterns
4. Write clean, documented code
5. Test thoroughly across devices
6. Update documentation as needed
7. Mark tasks complete in TASKS.md
