import { useEffect, useMemo, useState } from "react";
import type { Project } from "./useProjects";

export function useProjectFilter(projects: Project[]) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [branch, setBranch] = useState<string>("");

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 250);
    return () => clearTimeout(t);
  }, [query]);

  // Derive unique branches from loaded data
  const branches = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      p.branches?.forEach((b) => set.add(b));
    }
    return Array.from(set).sort();
  }, [projects]);

  // Filter projects based on search and branch
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Apply search filter
    if (debouncedQuery.trim()) {
      const lowerQuery = debouncedQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery) ||
          (p.tags &&
            p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)))
      );
    }

    // Apply branch filter
    if (branch) {
      result = result.filter((p) => p.branches?.includes(branch));
    }

    return result;
  }, [projects, debouncedQuery, branch]);

  // Check if any filtering is active
  const isFiltering = Boolean(debouncedQuery.trim() || branch);

  // Reset filters function
  const resetFilters = () => {
    setQuery("");
    setBranch("");
  };

  return {
    query,
    setQuery,
    debouncedQuery,
    branch,
    setBranch,
    branches,
    filteredProjects,
    isFiltering,
    resetFilters,
  };
}
