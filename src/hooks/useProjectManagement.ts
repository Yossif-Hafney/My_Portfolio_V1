// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useToast } from "./useToast";
// import { projectsApi } from "../services/projectsApi";
// import type { NewProject } from "../components/dashboard/AddProjectModal";

// // Define a Project type for local usage (should match your backend model)
// type Project = {
//   id: string | number;
//   title: string;
//   description: string;
//   technologies: string[];
//   createdAt: string;
//   updatedAt: string;
//   // Add other fields as needed
// };

// export function useProjectManagement() {
//   const queryClient = useQueryClient();
//   const { showSuccess, showError } = useToast();
//   const [isLoading, setIsLoading] = useState(false);

//   // Optimistic create
//   const createMutation = useMutation({
//     mutationFn: async (projectData: NewProject) => {
//       const payload = projectsApi.convertFromNewProject(projectData);
//       return projectsApi.createProject(payload);
//     },
//     onMutate: async (projectData) => {
//       setIsLoading(true);
//       await queryClient.cancelQueries({ queryKey: ["projects"] });
//       const previous = queryClient.getQueryData<unknown[]>(["projects", {}]);
//       // Optimistically add to list cache if present
//       if (previous && Array.isArray(previous)) {
//         const optimistic: Project = {
//           id: `temp-${Date.now()}`,
//           ...projectData,
//           technologies: projectData.technologies,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//         };
//         queryClient.setQueryData(["projects", {}], [optimistic, ...previous]);
//       }
//       return { previous };
//     },
//     onError: (err, _vars, context) => {
//       if (context?.previous)
//         queryClient.setQueryData(["projects", {}], context.previous);
//       showError(
//         err instanceof Error ? err.message : "Failed to create project"
//       );
//       setIsLoading(false);
//     },
//     onSuccess: () => {
//       showSuccess("Project created successfully!");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["projects"] });
//       setIsLoading(false);
//     },
//   });

//   // Update existing project using API
//   // Optimistic update
//   const updateMutation = useMutation({
//     mutationFn: async (vars: {
//       id: string | number;
//       updates: Partial<NewProject>;
//     }) => {
//       return projectsApi.updateProject(vars.id, vars.updates);
//     },
//     onMutate: async ({ id, updates }) => {
//       setIsLoading(true);
//       await queryClient.cancelQueries({ queryKey: ["projects"] });
//       const previous = queryClient.getQueryData<Project[]>(["projects", {}]);
//       if (previous && Array.isArray(previous)) {
//         const next = previous.map((p: Project) =>
//           String(p.id) === String(id)
//             ? { ...p, ...updates, updatedAt: new Date().toISOString() }
//             : p
//         );
//         queryClient.setQueryData(["projects", {}], next);
//       }
//       return { previous };
//     },
//     onError: (err, _vars, context) => {
//       if (context?.previous)
//         queryClient.setQueryData(["projects", {}], context.previous);
//       showError(
//         err instanceof Error ? err.message : "Failed to update project"
//       );
//       setIsLoading(false);
//     },
//     onSuccess: () => {
//       showSuccess("Project updated successfully!");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["projects"] });
//       setIsLoading(false);
//     },
//   });

//   // Delete project using API
//   // Optimistic delete
//   const deleteMutation = useMutation({
//     mutationFn: async (id: string | number) => projectsApi.deleteProject(id),
//     onMutate: async (id) => {
//       setIsLoading(true);
//       await queryClient.cancelQueries({ queryKey: ["projects"] });
//       const previous = queryClient.getQueryData<Project[]>(["projects", {}]);
//       if (previous && Array.isArray(previous)) {
//         const next = previous.filter(
//           (p: Project) => String(p.id) !== String(id)
//         );
//         queryClient.setQueryData(["projects", {}], next);
//       }
//       return { previous };
//     },
//     onError: (err, _id, context) => {
//       if (context?.previous)
//         queryClient.setQueryData(["projects", {}], context.previous);
//       showError(
//         err instanceof Error ? err.message : "Failed to delete project"
//       );
//       setIsLoading(false);
//     },
//     onSuccess: () => {
//       showSuccess("Project deleted successfully!");
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["projects"] });
//       setIsLoading(false);
//     },
//   });

//   // Get project by ID
//   const getProject = async (id: string | number) => {
//     try {
//       const response = await projectsApi.getProjectById(id);
//       return response.success ? response.data : undefined;
//     } catch (error) {
//       console.error("Error fetching project:", error);
//       return undefined;
//     }
//   };

//   // Export projects (for backup)
//   const exportProjects = async () => {
//     try {
//       const response = await projectsApi.getAllProjects({ limit: 1000 });

//       if (response.success && response.data) {
//         const projects = response.data.data;
//         const dataStr = JSON.stringify(projects, null, 2);
//         const dataBlob = new Blob([dataStr], { type: "application/json" });

//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(dataBlob);
//         link.download = `portfolio-projects-${new Date().toISOString().split("T")[0]}.json`;
//         link.click();

//         showSuccess("Projects exported successfully!");
//       } else {
//         throw new Error("Failed to fetch projects for export");
//       }
//     } catch (error) {
//       console.error("Error exporting projects:", error);
//       showError("Failed to export projects");
//     }
//   };

//   // Import projects (from backup)
//   const importProjects = async (file: File): Promise<boolean> => {
//     try {
//       const text = await file.text();
//       const importedProjects = JSON.parse(text);

//       if (!Array.isArray(importedProjects)) {
//         throw new Error("Invalid file format");
//       }

//       // Validate and import projects one by one
//       let successCount = 0;
//       let errorCount = 0;

//       for (const project of importedProjects) {
//         if (project.title && project.description) {
//           try {
//             const payload = projectsApi.convertFromNewProject(project);
//             const response = await projectsApi.createProject(payload);
//             if (response.success) {
//               successCount++;
//             } else {
//               errorCount++;
//             }
//           } catch {
//             errorCount++;
//           }
//         } else {
//           errorCount++;
//         }
//       }

//       if (successCount > 0) {
//         queryClient.invalidateQueries({ queryKey: ["projects"] });
//         showSuccess(
//           `Imported ${successCount} projects successfully!${errorCount > 0 ? ` (${errorCount} failed)` : ""}`
//         );
//         return true;
//       } else {
//         showError("No valid projects found in file");
//         return false;
//       }
//     } catch (error) {
//       console.error("Error importing projects:", error);
//       showError("Failed to import projects");
//       return false;
//     }
//   };

//   return {
//     // State
//     isLoading,

//     // Actions
//     addProject: (p: NewProject) =>
//       createMutation
//         .mutateAsync(p)
//         .then(() => true)
//         .catch(() => false),
//     updateProject: (id: string | number, updates: Partial<NewProject>) =>
//       updateMutation
//         .mutateAsync({ id, updates })
//         .then(() => true)
//         .catch(() => false),
//     deleteProject: (id: string | number) =>
//       deleteMutation
//         .mutateAsync(id)
//         .then(() => true)
//         .catch(() => false),
//     getProject,
//     exportProjects,
//     importProjects,
//   };
// }
