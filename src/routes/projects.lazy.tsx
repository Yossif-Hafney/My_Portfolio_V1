import { createLazyFileRoute, Outlet } from "@tanstack/react-router";

// Parent route for /projects must render an Outlet so children can display
export const Route = createLazyFileRoute("/projects")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  return <Outlet />;
}
