### Portfolio Project Analytics

#### Overview
- Modern React 19 + TypeScript + Vite app with TanStack Router and React Query.
- Dual data strategy: static JSON (read-only) and optional Express API (CRUD) under `api-server/`.

#### Architecture
- Routing: File-based via TanStack Router (`src/routes/*`), code-splitting enabled.
- Data layer: React Query hooks wrap `projectsApi` service which auto-selects real vs mock API.
- Services:
  - `src/services/projectsApi.ts`: facade over Real (Express) and Mock (local + static) APIs.
  - `src/services/apiClient.ts`: fetch wrapper with timeout, retries helper, typed responses.
  - `src/services/staticApi.ts`: transforms `/public/api/*.json` into API-shaped objects.
- State: Query caching (5–10 min), simple localStorage persistence for custom projects (ids >= 1000).
- UI: Tailwind, Material Tailwind, Lucide, FontAwesome, modular components with loading/error states.

#### Data Sources
- Static: `public/api/projects.json`, `projects-simple.json`, `project-details.json`, `social-links.json`.
- Real API: `api-server/server.js` (Express) with filtering, sorting, pagination, CRUD.
- Env flags: `VITE_API_URL`, `VITE_USE_REAL_API` toggle Real vs Mock; default mock/static.

#### Key Flows
- List projects: `useProjects` → `projectsApi.getAllProjects` → mock or real service → paginated data.
- Project details: `useProjectDetails(id)` for API-backed details; `useProject(id)` for static `project-details.json`.
- Dashboard CRUD: components in `components/dashboard/*` use `projectsApi` to create/update/delete when real API is available; falls back to mock (localStorage) when not.

#### Routing Map
- `/` home, `/about`, `/contact` lazy routes.
- `/projects` index and list (`projects.index.lazy.tsx`, `projects.lazy.tsx`).
- `/projects/:projectid` details (`projects.$projectid.lazy.tsx`).
- `/dashboard` admin-style page (`dashboard.lazy.tsx`).

#### Dependencies (main)
- React 19, TypeScript ~5.8, Vite 7, Tailwind 4, TanStack Router 1.131, React Query 5.85, Material Tailwind, PrimeReact, Lucide, FontAwesome.

#### Quality Notes
- Strong separation of concerns between services, hooks, and UI.
- Good error handling and timeouts in `apiClient`. Consistent React Query options.
- Mock API simulates latency and persists custom items; static transformer normalizes shapes.
- CORS configured in Express for local dev ports; includes health endpoint.

#### Gaps / Risks
- Mixed details sources: `useProjectDetails` (API) vs `useProject` (static JSON). Consider unifying to one source via `projectsApi` for consistency.
- No global error boundary or suspense fallback documented; ensure top-level error/loading UX.
- Security: Express server uses in-memory store; fine for dev, not for prod. No auth on CRUD endpoints.
- Accessibility: Not fully audited; ensure semantic roles/labels across components.
- Performance: Image optimization/lazy strategies mentioned; verify actual usage on large galleries.

#### Metrics (static analysis)
- Routes: 8 route files; code-splitting enabled.
- Components: ~18 UI components (+ dashboard set).
- Hooks: 8 custom hooks; primary data hooks: `useProjects`, `useProjectDetails`, `useProject`.
- Public API JSON files: 4.

#### Configuration
- `vite.config.ts`: React SWC, Tailwind, TanStack Router plugin with autoCodeSplitting.
- Scripts: `dev`, `build` (tsc -b + vite), `preview`, `lint`, `type-check`.
- API server: `api-server/server.js` with `/api/projects` CRUD and `/api/health`.

#### Recommendations
1) Unify project detail fetching through `projectsApi` to eliminate dual sources and divergence.
2) Add `VITE_USE_REAL_API` to `.env.example` and document local Express startup for CRUD dashboard.
3) Implement optimistic updates in dashboard mutations with React Query for snappier UX.
4) Add global error boundary and route-level suspense fallbacks; surface React Query Devtools in dev.
5) Validate forms in `AddProjectModal` and edits; reuse server-side validation schema client-side.
6) Add E2E smoke (Playwright) for routes and basic flows; add unit tests for services.
7) Harden Express: rate limit, validation, and swap to persistent storage if deploying.
8) Add image optimization pipeline (responsive sources) and verify lazy loading on grids/galleries.
9) Improve accessibility: keyboard focus states, ARIA where needed, contrast checks.
10) Analytics/telemetry (optional): simple pageview + event logging behind an opt-in flag.

#### Getting Real API Working
- Start server: from `api-server/`, `npm install && npm run dev`.
- Frontend env: set `VITE_USE_REAL_API=true` and `VITE_API_URL=http://localhost:3001/api`.
- CORS already allows localhost dev ports.

#### Maintenance
- Keep types centralized in services and reuse across hooks/components.
- Ensure JSON schema stability; add minimal schemas or zod parsing when reading static data.


