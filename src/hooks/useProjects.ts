import { useQuery } from "@tanstack/react-query";
import { staticProjectsApi } from "../services/staticApi";

export type Project = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  branches?: string[];
  github?: string;
  demo?: string;
  technologies?: string[];
  status?: "in-progress" | "completed" | "planning";
  createdAt?: string;
  updatedAt?: string;
};

export interface ProjectsQueryOptions {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  tags?: string[];
}

export function useProjects(options: ProjectsQueryOptions = {}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", options],
    queryFn: async () => {
      const response = await staticProjectsApi.getAllProjects({
        page: options.page || 1,
        limit: options.limit || 50, // Get more projects by default
        search: options.search,
        status: options.status,
        tags: options.tags,
        sortBy: "updatedAt",
        sortOrder: "desc",
      });

      if (response.success && response.data) {
        return response.data.data; // Return just the projects array
      } else {
        throw new Error(response.error || "Failed to fetch projects");
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  return {
    projects: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  };
}

// Hook for getting a single project with detailed API integration
export function useProjectDetails(id: string | number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const numId = typeof id === "string" ? parseInt(id, 10) : id;
      const response = await staticProjectsApi.getProjectById(numId);

      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || `Project with ID ${id} not found`);
      }
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
    enabled: typeof id === "number" ? id > 0 : !!id, // Only run if we have a valid ID
  });

  return {
    project: data,
    loading: isLoading,
    error: error ? error.message : null,
  };
}
