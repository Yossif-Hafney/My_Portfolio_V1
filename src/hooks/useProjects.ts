import { useQuery } from "@tanstack/react-query";

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags?: string[];
  branches?: string[];
};

export function useProjects() {
  const { data, isLoading, error } = useQuery<Project[], Error>({
    queryKey: ["projects-simple"],
    queryFn: async () => {
      const res = await fetch("/api/projects-simple.json", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Project[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    projects: data ?? [],
    loading: isLoading,
    error: error ? error.message : null,
  };
}
