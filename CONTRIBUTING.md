# Contributing Guide

This document helps new developers understand and contribute to the portfolio project.

## Quick Start

### Setup (5 minutes)

```bash
# Prerequisites: Node.js 20+, npm 10+
npm install
npm run dev
# Visit http://localhost:5173
```

### Project Overview

Modern React portfolio with:

- Project showcase (list + detail pages)
- Smart caching via React Query
- File-based routing with TanStack Router
- Dark theme with responsive design
- Session persistence for smooth UX

## Tech Stack

**Core**: React 19 + TypeScript + Vite 7  
**Routing**: TanStack Router (file-based)  
**Data**: React Query + static JSON  
**UI**: Custom utility classes + Lucide icons

## Architecture

```
Data Flow: JSON files → React Query hooks → Components → UI
Routes: src/routes/*.tsx → File-based routing
State: React Query cache + sessionStorage persistence
```

## Key Files

```
src/
├── routes/                    # File-based routing
│   ├── projects.index.lazy.tsx    # /projects/ (list)
│   └── projects.$projectid.lazy.tsx # /projects/:id (details)
├── pages/
│   ├── Projects.tsx          # Main list with filters
│   └── ProjectDetails.tsx    # Detail page
├── hooks/
│   ├── useProjects.ts        # List data (React Query)
│   ├── useProject.ts         # Detail data + prefetch
│   └── useProjectFilter.ts   # Search/filter logic
└── components/
    ├── ProjectCard.tsx       # Card component
    └── ui/                   # Reusable UI (Loading, Toast, etc.)

public/api/
├── projects-simple.json      # List data
└── project-details.json     # Detail data
```

## Data Sources

### List View (`projects-simple.json`)

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  branches?: string[]; // Categories for filtering
}
```

### Detail View (`project-details.json`)

```typescript
interface ProjectDetail {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  liveDemo?: string;
  sourceCode?: string;
  status: "Completed" | "In Development" | "In Production";
  startDate: string;
  endDate: string;
  client: string;
  branches: string[];
}
```

## Common Tasks

### Adding a New Project

1. **Add to list data**:

   ```bash
   # Edit public/api/projects-simple.json
   {
     "id": 999,
     "title": "New Project",
     "description": "Brief description",
     "image": "/images/new-project.jpg",
     "tags": ["react", "typescript"],
     "branches": ["web"]
   }
   ```

2. **Add to detail data**:

   ```bash
   # Edit public/api/project-details.json
   # Add full project object with same ID
   ```

3. **Add images**:
   ```bash
   # Place in public/images/
   ```

### Adding New UI Components

```typescript
// src/components/NewComponent.tsx
interface Props {
  // Define props with types
}

export default function NewComponent({ prop1 }: Props) {
  // Hooks at top
  // Event handlers
  // Early returns for loading/error states

  return <div>{/* Component JSX */}</div>;
}

// Export from src/components/index.ts
export { default as NewComponent } from "./NewComponent";
```

### Adding New Routes

```typescript
// src/routes/new-page.lazy.tsx
import { createLazyFileRoute } from "@tanstack/react-router";
import NewPage from "../pages/NewPage";

export const Route = createLazyFileRoute("/new-page")({
  component: NewPage,
});
```

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode, explicit types
- **Components**: Function components with hooks
- **Async**: Proper error handling with try/catch
- **State**: React Query for server state, useState for UI state

### Naming Conventions

- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Hooks**: `usePrefix`
- **Props/Variables**: `camelCase`

### Performance Best Practices

- Use React Query for all API calls
- Prefetch on hover (already implemented for project cards)
- Lazy load routes with `createLazyFileRoute`
- Proper cache invalidation

### Error Handling Pattern

```typescript
if (loading) return <Loading label="Loading..." />;
if (error) return (
  <ErrorState
    title="Failed to load"
    message={error}
    actionLabel="Retry"
    onAction={() => refetch()}
  />
);
```

## Features Deep Dive

### Smart Navigation

The app preserves user state when navigating between list and details:

1. **Save state** before leaving list (scroll position, filters, loaded count)
2. **Restore state** when returning (exact position + filters)
3. **Prefetch** details on hover for instant navigation

Key files: `src/pages/Projects.tsx` (persistence logic)

### Search & Filtering

- Text search across title, description, tags
- Category filter via `branches` field
- Debounced input (250ms delay)
- URL state not yet implemented (future enhancement)

Key files: `src/hooks/useProjectFilter.ts`

### Caching Strategy

```typescript
// List data: 5 min stale time
useQuery({
  queryKey: ["projects-simple"],
  staleTime: 1000 * 60 * 5,
});

// Detail data: 10 min stale time + prefetch
useQuery({
  queryKey: ["project-details"],
  staleTime: 1000 * 60 * 10,
});
```

## Build & Deploy

### Build Process

```bash
npm run build     # TypeScript + Vite build
npm run preview   # Test production build
npm run lint      # ESLint check
```

### Deployment Options

**Vercel** (recommended):

```bash
# Auto-deploy from Git or CLI
npm run build
npx vercel deploy --prebuilt --prod
```

**Netlify**:

```bash
# Build: npm run build, Publish: dist
# Add public/_redirects: /*  /index.html  200
```

**GitHub Pages**:

```bash
# Set base in vite.config.ts: base: '/repo-name/'
npm run build
npx gh-pages -d dist
```

## Troubleshooting

### Common Issues

**Route 404s in production**: Configure SPA fallback to `index.html`

**Slow first navigation**: Hover prefetching should help; check React Query cache

**Scroll not restored**: Verify sessionStorage keys and ProjectCard IDs

**Images not loading**: Ensure correct paths in `public/images/`

### Debug Tools

- React Query Devtools (enabled in dev)
- Router Devtools (enabled in dev)
- Browser Network tab for API calls

## Scripts Reference

```bash
npm run dev       # Start dev server (port 5173)
npm run build     # Production build
npm run preview   # Test production build
npm run lint      # Run ESLint
```

## Future Enhancements

**Short term**:

- URL-based filters (search params)
- Infinite scroll (IntersectionObserver)
- Image optimization with blur placeholders

**Medium term**:

- Unit tests for hooks and components
- CMS integration for easier content management
- SEO optimization

## Getting Help

1. Check this guide first
2. Look at existing similar code patterns
3. Check React Query/TanStack Router docs
4. Create GitHub issue with reproduction steps

---

**Happy coding!** 🚀

This project follows modern React patterns and should be straightforward to extend. When in doubt, follow the existing patterns and prioritize TypeScript safety.
