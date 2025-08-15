import { createLazyFileRoute } from "@tanstack/react-router";

import ProjectDetails from "../pages/ProjectDetails";

export const Route = createLazyFileRoute("/projects/$projectid")({
  component: ProjectDetailsPage,
});

function ProjectDetailsPage() {
  return (
    <>
      <ProjectDetails />
    </>
  );
}
