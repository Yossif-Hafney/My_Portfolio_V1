# Portfolio Project - README

A modern React portfolio showcasing projects with smart navigation and caching.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## Stack

- React 19 + TypeScript + Vite
- TanStack Router (file-based routes)
- React Query (caching & prefetch)
- Custom utility styles

## Features

- Project grid with search and category filters
- Rich project detail pages with galleries
- Smart session persistence (preserves scroll & filters)
- Hover prefetching for instant navigation
- Mobile-responsive dark theme

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Test production build
npm run lint     # Code linting
```

## Project Structure

```
src/
├── routes/              # File-based routing
├── pages/              # Page components (Projects, ProjectDetails)
├── components/         # Reusable UI components
├── hooks/              # Data fetching with React Query
└── main.tsx           # App entry point

public/api/             # Static JSON data
├── projects-simple.json    # List view data
└── project-details.json   # Detail view data
```

## Data Management

Projects are stored as static JSON files:

- `projects-simple.json` - Lightweight list data
- `project-details.json` - Full project details with galleries

React Query handles caching with 5-10 minute stale times and hover prefetching.

## Navigation Flow

1. **Projects List** (`/projects/`) - Grid with filters and search
2. **Project Details** (`/projects/:id`) - Full detail page
3. **Smart Return** - Preserves scroll position and loaded items

## Development

For detailed development guide, see `CONTRIBUTING.md`.

### Adding New Projects

1. Add entry to `projects-simple.json`
2. Add detailed entry to `project-details.json` (matching ID)
3. Place images in `public/images/`

### Component Guidelines

- Use TypeScript with strict types
- Handle loading/error states consistently
- Follow existing patterns for React Query hooks

## Deployment

**Vercel** (recommended):

```bash
npm run build
npx vercel deploy --prebuilt --prod
```

**Other platforms**: Ensure SPA fallback to `index.html` for client-side routing.

## Performance Features

- Route-based code splitting
- React Query background updates
- Image lazy loading
- Session state persistence
- Hover prefetching

## Architecture

```
JSON APIs → React Query → Custom Hooks → Pages → Components → UI
     ↓
Session Storage (scroll position, filters, loaded count)
```

## Browser Support

Modern browsers supporting ES2020+ and React 19.

---

For detailed documentation, see:

- `CONTRIBUTING.md` - Developer guide
- `DEVELOPER_GUIDE.md` - Comprehensive architecture docs
