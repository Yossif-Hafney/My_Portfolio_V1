import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type ProjectDetail = {
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
};

export function useProject(projectId: string | number) {
  const id = projectId;
  const { data, isLoading, error } = useQuery<ProjectDetail[], Error>({
    queryKey: ["project-details"],
    queryFn: async () => {
      const res = await fetch("/api/project-details.json", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as ProjectDetail[];
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    enabled: !!id,
  });

  const project = useMemo(() => {
    if (!data) return null;
    return (
      data.find((p) => String(p.id) === String(id)) ?? null
    );
  }, [data, id]);

  return {
    project,
    loading: isLoading,
    error: error ? error.message : projectId ? null : "No project ID provided",
  };
}

// Optional helper for prefetching all details, e.g., on hover
export function usePrefetchProjectDetails() {
  const qc = useQueryClient();
  return () =>
    qc.prefetchQuery({
      queryKey: ["project-details"],
      queryFn: async () => {
        const res = await fetch("/api/project-details.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as ProjectDetail[];
      },
      staleTime: 1000 * 60 * 10,
    });
}
