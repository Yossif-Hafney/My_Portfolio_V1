import { createLazyFileRoute } from "@tanstack/react-router";
import Projects from "../pages/Projects";

// Index route under /projects - renders the projects grid
export const Route = createLazyFileRoute("/projects/")({
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
  return <Projects />;
}
