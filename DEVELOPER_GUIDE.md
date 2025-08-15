# Portfolio Project Developer Documentation

A comprehensive guide for developers taking over this React portfolio project.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [File Structure](#file-structure)
- [Data Management](#data-management)
- [Routing System](#routing-system)
- [State Management](#state-management)
- [Component Guidelines](#component-guidelines)
- [Development Workflow](#development-workflow)
- [Adding New Features](#adding-new-features)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)
- [Performance Optimization](#performance-optimization)
- [Future Roadmap](#future-roadmap)

## Project Overview

This is a modern React portfolio application featuring:

- Dynamic project showcase with filtering and search
- Detailed project pages with galleries and metadata
- Responsive design with dark theme
- Optimized performance with caching and prefetching
- Session persistence for seamless user experience

### Key Features

- **Project Grid**: Filterable list with search and category filters
- **Project Details**: Rich detail pages with image galleries
- **Smart Navigation**: Preserves scroll position and filters when returning to list
- **Performance**: React Query caching with hover prefetching
- **Responsive**: Mobile-first design with Tailwind-style utilities

## Technology Stack

### Core Framework

- **React 19**: Latest React with modern hooks and concurrent features
- **TypeScript**: Full type safety throughout the application
- **Vite 7**: Fast build tool with HMR and optimized bundling

### Routing & State

- **TanStack Router**: File-based routing with TypeScript support
- **React Query**: Server state management with caching and background updates
- **Session Storage**: Client-side persistence for user experience

### UI & Styling

- **Custom CSS**: Utility-first approach similar to Tailwind
- **Lucide React**: Modern icon library
- **Font Awesome**: Additional icons for social links

### Development Tools

- **ESLint**: Code linting with React and TypeScript rules
- **TypeScript**: Strict type checking
- **Vite Dev Tools**: Hot module replacement and fast refresh

## Getting Started

### Prerequisites

```bash
Node.js >= 20.0.0
npm >= 10.0.0
```

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI Layer      │    │   Data Layer     │    │  Storage Layer  │
│                 │    │                  │    │                 │
│ • Components    │◄──►│ • React Query    │◄──►│ • JSON APIs     │
│ • Pages         │    │ • Custom Hooks   │    │ • Session Store │
│ • Routes        │    │ • Type Definitions│    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Data Flow

1. **Initial Load**: React Query fetches data from static JSON files
2. **User Interaction**: Components trigger state updates via custom hooks
3. **Navigation**: TanStack Router handles route changes
4. **Persistence**: Critical state saved to sessionStorage
5. **Cache**: React Query manages background updates and prefetching

## File Structure

```
src/
├── routes/                    # File-based routing
│   ├── __root.tsx            # App shell (Header/Footer/Outlet)
│   ├── projects.lazy.tsx     # Projects parent route
│   ├── projects.index.lazy.tsx    # Projects list (/projects/)
│   └── projects.$projectid.lazy.tsx # Project details (/projects/:id)
│
├── pages/                     # Page components
│   ├── Projects.tsx          # Main projects list with filters
│   ├── ProjectDetails.tsx    # Individual project detail page
│   ├── Home.tsx              # Landing page
│   ├── About.tsx             # About page
│   └── Contact.tsx           # Contact page
│
├── components/                # Reusable components
│   ├── ui/                   # Base UI components
│   │   ├── Loading.tsx       # Loading spinner
│   │   ├── ErrorState.tsx    # Error display
│   │   ├── Toast.tsx         # Notification toast
│   │   └── SuccessState.tsx  # Success feedback
│   ├── ProjectCard.tsx       # Project card component
│   ├── ProjectSectionHeader.tsx # Search and filters
│   ├── ProjectResultsSummary.tsx # Results count display
│   ├── LoadMoreActions.tsx   # Load more button
│   ├── Header.tsx            # Site header
│   ├── Footer.tsx            # Site footer
│   └── index.ts              # Component exports
│
├── hooks/                     # Custom hooks
│   ├── useProjects.ts        # Projects list data fetching
│   ├── useProject.ts         # Single project data fetching
│   ├── useProjectFilter.ts   # Search and filter logic
│   └── index.ts              # Hook exports
│
├── App.tsx                    # Root app component
├── main.tsx                   # App entry point
└── main.css                   # Global styles

public/
├── api/                       # Static data APIs
│   ├── projects-simple.json  # Lightweight project list
│   ├── project-details.json  # Full project details
│   ├── projects.json         # Legacy (unused)
│   └── social-links.json     # Social media links
└── images/                    # Project images and assets
```

## Data Management

### Data Sources

The application uses static JSON files as a simple CMS:

#### `projects-simple.json` (List View)

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  branches?: string[];
}
```

#### `project-details.json` (Detail View)

```typescript
interface ProjectDetail {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  liveDemo?: string;
  sourceCode?: string;
  status: string;
  startDate: string;
  endDate: string;
  client: string;
  branches: string[];
}
```

### React Query Implementation

#### Data Fetching Hooks

```typescript
// useProjects.ts - List data with caching
export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: ["projects-simple"],
    queryFn: async () => {
      const res = await fetch("/api/projects-simple.json");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// useProject.ts - Detail data with prefetching
export function useProject(projectId: string | number) {
  // Fetches all details and selects by ID
  // Includes prefetch helper for hover optimization
}
```

### Cache Strategy

- **List Data**: 5-minute stale time (frequent updates)
- **Detail Data**: 10-minute stale time (less frequent updates)
- **Prefetching**: Triggered on card hover for instant navigation
- **Background Updates**: Automatic when stale data is detected

## Routing System

### File-Based Routing

TanStack Router uses file structure to define routes:

```
src/routes/
├── __root.tsx                 # Layout wrapper
├── projects.lazy.tsx          # /projects (parent)
├── projects.index.lazy.tsx    # /projects/ (index)
└── projects.$projectid.lazy.tsx # /projects/123 (dynamic)
```

### Route Configuration

```typescript
// __root.tsx - App shell
export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main><Outlet /></main>
      <Footer />
    </div>
  )
});

// projects.lazy.tsx - Parent route
export const Route = createLazyFileRoute("/projects")({
  component: () => <Outlet /> // Renders child routes
});

// projects.$projectid.lazy.tsx - Dynamic route
export const Route = createLazyFileRoute("/projects/$projectid")({
  component: ProjectDetailsPage
});
```

## State Management

### Local State

- **Component State**: `useState` for UI interactions
- **Form State**: Controlled inputs with validation
- **Navigation State**: Managed by TanStack Router

### Session Persistence

Critical for user experience when navigating between list and details:

```typescript
// Persisted in sessionStorage
interface ListState {
  query: string; // Search query
  branch: string; // Selected category
  displayCount: number; // Number of visible items
  scrollY: number; // Scroll position
  lastViewedId?: string; // Last clicked project
}

// Storage keys
const LIST_STATE_KEY = "projects:listState";
const LAST_VIEWED_KEY = "projects:lastViewedId";
```

### State Flow

1. **Save State**: Before navigating to details
2. **Restore State**: On return to list
3. **Scroll Restore**: Precise positioning to last viewed item
4. **Clear Flags**: Prevent interference with load more

## Component Guidelines

### Component Structure

```typescript
// Standard component template
interface ComponentProps {
  // Props with clear types
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Hooks at the top
  // Event handlers
  // Render logic with early returns

  if (loading) return <Loading />;
  if (error) return <ErrorState />;

  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}
```

### Naming Conventions

- **Files**: `kebab-case.tsx`
- **Components**: `PascalCase`
- **Props**: `camelCase`
- **Hooks**: `use` prefix
- **Constants**: `UPPER_SNAKE_CASE`

### UI Component Patterns

```typescript
// Loading states
if (loading) return <Loading label="Loading projects..." />;

// Error states
if (error) return (
  <ErrorState
    title="Failed to load"
    message={error}
    actionLabel="Retry"
    onAction={() => refetch()}
  />
);

// Success feedback
<Toast
  message="Link copied to clipboard"
  show={showToast}
  onClose={() => setShowToast(false)}
/>
```

## Development Workflow

### Code Style

- **TypeScript**: Strict mode enabled
- **React**: Function components with hooks
- **Async**: Proper error handling with try/catch
- **Performance**: Memoization where beneficial

### Git Workflow

1. Create feature branch from main
2. Make focused commits with clear messages
3. Test build and lint before push
4. Create pull request with description
5. Code review and merge

### Testing Checklist

- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)
- [ ] All routes load correctly
- [ ] Search and filters work
- [ ] Navigation preserves state
- [ ] Mobile responsive
- [ ] Images load properly

## Adding New Features

### Adding a New Project

1. Add entry to `public/api/projects-simple.json`
2. Add detailed entry to `public/api/project-details.json`
3. Ensure IDs match between files
4. Add project images to `public/images/`

### Adding New Project Fields

1. Update TypeScript interfaces in hooks
2. Update JSON data structure
3. Update UI components to display new fields
4. Test data fetching and display

### Adding New Routes

1. Create route file in `src/routes/`
2. Follow naming convention for URL structure
3. Add page component in `src/pages/`
4. Update navigation if needed

### Adding New Components

1. Create component in appropriate directory
2. Export from `index.ts` if reusable
3. Follow component guidelines
4. Add to Storybook if available

## Deployment Guide

### Build Process

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Configuration in `vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### Netlify

Create `public/_redirects`:

```
/*    /index.html   200
```

Deploy:

```bash
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages

Update `vite.config.ts` for subpath:

```typescript
export default defineConfig({
  base: "/repository-name/",
  // ... other config
});
```

### Environment Variables

For different environments, create:

- `.env.local` - Local development
- `.env.production` - Production build

## Troubleshooting

### Common Issues

#### Route 404 Errors in Production

**Problem**: Direct URLs like `/projects/123` return 404
**Solution**: Configure SPA fallback to `index.html`

#### Slow Navigation to Project Details

**Problem**: First click to project details is slow
**Solution**: Hover prefetching is implemented; increase `staleTime` in React Query

#### Scroll Position Not Restored

**Problem**: Returning to list doesn't preserve scroll position
**Solution**: Check sessionStorage keys and ensure ProjectCard has proper ID

#### Images Not Loading

**Problem**: Images return 404 in production
**Solution**: Ensure images are in `public/images/` and paths are correct

#### Build Failures

**Problem**: TypeScript or lint errors
**Solution**:

```bash
npm run lint           # Check lint errors
npx tsc --noEmit      # Check TypeScript errors
```

### Debug Tools

- **React Query Devtools**: Enabled in development
- **Router Devtools**: Shows route state and navigation
- **Browser DevTools**: Network tab for API calls
- **Console Logs**: Check for errors and warnings

## Performance Optimization

### Current Optimizations

- **Code Splitting**: Automatic with Vite and lazy routes
- **Image Optimization**: Lazy loading on project cards
- **Caching**: React Query with appropriate stale times
- **Prefetching**: Details data on card hover
- **Session Persistence**: Prevents unnecessary re-fetching

### Performance Monitoring

```typescript
// Check bundle size
npm run build
# Check dist folder size

// Lighthouse audit
# Run in browser DevTools > Lighthouse

// Core Web Vitals
# Monitor LCP, FID, CLS in production
```

### Optimization Opportunities

1. **Image CDN**: Implement responsive images with blur placeholders
2. **Infinite Scroll**: Replace load more with intersection observer
3. **Service Worker**: Cache static assets for offline support
4. **Bundle Analysis**: Use `vite-bundle-analyzer` to identify large chunks

## Future Roadmap

### Short Term (Next Sprint)

- [ ] URL-based filters for shareable links
- [ ] Infinite scroll implementation
- [ ] Image optimization with placeholders
- [ ] Unit tests for critical hooks

### Medium Term (Next Quarter)

- [ ] Content Management System integration
- [ ] Search engine optimization
- [ ] Progressive Web App features
- [ ] Analytics integration

### Long Term (Future Versions)

- [ ] Multi-language support
- [ ] User authentication for admin
- [ ] Real-time content updates
- [ ] Advanced filtering and sorting

### Migration Considerations

- **React Query v5**: Already implemented, stay current with updates
- **TanStack Router**: Monitor for stable v1 release
- **React 19**: Leverage new concurrent features as they stabilize

## Contributing

### Getting Help

1. Check this documentation first
2. Search existing GitHub issues
3. Create detailed issue with reproduction steps
4. Join project discussions for questions

### Pull Request Guidelines

1. Fork repository and create feature branch
2. Follow coding standards and patterns
3. Add tests for new functionality
4. Update documentation as needed
5. Ensure all checks pass before submitting

### Code Review Checklist

- [ ] Follows TypeScript best practices
- [ ] Includes proper error handling
- [ ] Maintains performance standards
- [ ] Updates relevant documentation
- [ ] Passes all automated checks

---

**Last Updated**: August 2025  
**Maintainer**: [Your Name]  
**Contact**: [Your Email]

For questions or clarifications about this documentation, please create an issue in the repository.
