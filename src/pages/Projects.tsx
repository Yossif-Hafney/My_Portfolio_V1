import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import ProjectCard from "../components/ProjectCard";
import ButtonComponent from "../components/Button";
import {
  ProjectSectionHeader,
  ProjectResultsSummary,
  LoadMoreActions,
  Loading,
  ErrorState,
} from "../components";
import { useProjects, useProjectFilter } from "../hooks";
import { usePrefetchProjectDetails } from "../hooks/useProject";

type ProjectsProps = {
  limit?: number;
  showFilters?: boolean;
};

export default function Projects({
  limit,
  showFilters = true,
}: ProjectsProps = {}) {
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(9); // Start with 9 projects

  // Persist/restore state: displayCount, filters, and scroll position
  const LIST_STATE_KEY = "projects:listState";
  const restoredRef = useRef(false);
  const pendingScrollRef = useRef<number | null>(null);
  const skipResetOnceRef = useRef(false);

  // Use custom hooks
  const { projects, loading, error } = useProjects();
  const prefetchDetails = usePrefetchProjectDetails();
  const {
    query,
    setQuery,
    debouncedQuery,
    branch,
    setBranch,
    branches,
    filteredProjects,
    isFiltering,
    resetFilters,
  } = useProjectFilter(projects);

  // Restore state (filters, visible count, scroll) once on mount
  useEffect(() => {
    if (!showFilters) return; // Only persist/restore on full Projects page
    try {
      const raw = sessionStorage.getItem(LIST_STATE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        query?: string;
        branch?: string;
        displayCount?: number;
        scrollY?: number;
        pageH?: number;
      } | null;
      if (!saved) return;

      if (typeof saved.query === "string") setQuery(saved.query);
      if (typeof saved.branch === "string") setBranch(saved.branch);
      if (typeof saved.displayCount === "number" && saved.displayCount > 0) {
        setDisplayCount(saved.displayCount);
      }
      if (typeof saved.scrollY === "number")
        pendingScrollRef.current = saved.scrollY;
      restoredRef.current = true;
      skipResetOnceRef.current = true; // avoid resetting displayCount due to restored filters
    } catch (e) {
      // ignore restore errors in production
      if (import.meta.env.DEV) console.debug("restore list state failed", e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilters]);

  // (moved below displayedProjects)

  // Save state on unmount (or when leaving page)
  useEffect(() => {
    if (!showFilters) return;
    return () => {
      try {
        const state = {
          query,
          branch,
          displayCount,
          scrollY: window.scrollY,
          ts: Date.now(),
        };
        sessionStorage.setItem(LIST_STATE_KEY, JSON.stringify(state));
      } catch (e) {
        if (import.meta.env.DEV) console.debug("persist list state failed", e);
      }
    };
  }, [showFilters, query, branch, displayCount]);

  // Reset displayCount when filters change (only for projects page)
  useEffect(() => {
    if (!showFilters) return;
    // If we are in a restored navigation, don't reset the visible count
    if (restoredRef.current) return;
    if (skipResetOnceRef.current) {
      // skip once after restore, then allow future resets
      skipResetOnceRef.current = false;
      return;
    }
    setDisplayCount(9);
  }, [debouncedQuery, branch, showFilters]);

  // Displayed projects with pagination or limit
  const displayedProjects = useMemo(() => {
    // Apply limit if provided (for home page)
    if (limit && limit > 0) {
      return filteredProjects.slice(0, limit);
    }

    // Apply pagination for projects page
    if (showFilters) {
      return filteredProjects.slice(0, displayCount);
    }

    return filteredProjects;
  }, [filteredProjects, limit, showFilters, displayCount]);

  // After data is loaded and DOM has items, restore scroll position once
  useEffect(() => {
    if (!showFilters) return;
    if (!restoredRef.current) return;
    if (loading) return;
    // If the last viewed card is outside current visible slice, extend displayCount
    try {
      const rawId = sessionStorage.getItem("projects:lastViewedId");
      if (rawId) {
        const idx = filteredProjects.findIndex((p) => String(p.id) === rawId);
        if (idx >= 0 && idx >= displayCount) {
          // Increase to reveal the card (round up to multiples of 6)
          const needed = idx + 1;
          const step = 6;
          const next = Math.ceil(needed / step) * step;
          setDisplayCount((prev) => (next > prev ? next : prev));
        }
      }
    } catch (e) {
      if (import.meta.env.DEV)
        console.debug("extend displayCount for anchor failed", e);
    }
    if (pendingScrollRef.current == null) return;
    // Wait a tick to ensure layout
    const y = pendingScrollRef.current;
    const id = requestAnimationFrame(() => {
      // If we can, scroll to the last viewed card anchor first
      const raw = sessionStorage.getItem("projects:lastViewedId");
      if (raw) {
        const el = document.getElementById(`project-card-${raw}`);
        if (el) el.scrollIntoView({ block: "start", behavior: "auto" });
      }
      // Then ensure we restore the exact Y
      window.scrollTo({ top: y, behavior: "auto" });
      // Clear the last viewed anchor so future actions (e.g., Load More) won't jump
      try {
        sessionStorage.removeItem("projects:lastViewedId");
      } catch (e) {
        if (import.meta.env.DEV) console.debug("clear lastViewedId failed", e);
      }
      // Clear so it won't run again on future renders (e.g., Load More)
      pendingScrollRef.current = null;
      restoredRef.current = false;
    });
    return () => cancelAnimationFrame(id);
  }, [
    loading,
    showFilters,
    displayedProjects.length,
    filteredProjects,
    displayCount,
  ]);

  // Load more function
  const loadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  // Check if there are more projects to load
  const hasMore =
    showFilters && displayedProjects.length < filteredProjects.length;

  return (
    <div className="py-5 sm:py-10 mt-5 sm:mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Project Section Header with Search/Filter */}
        <ProjectSectionHeader
          showFilters={showFilters}
          query={query}
          setQuery={setQuery}
          branch={branch}
          setBranch={setBranch}
          branches={branches}
        />
      </div>

      <div className="bg-[#0d2438] min-h-screen py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <Loading label="Loading projects..." />}
          {error && (
            <ErrorState
              title="Failed to load projects"
              message={error}
              actionLabel="Retry"
              onAction={() => window.location.reload()}
            />
          )}
          {!loading && !error && (
            <>
              {/* Project Results Summary */}
              <ProjectResultsSummary
                showFilters={showFilters}
                isFiltering={isFiltering}
                displayedCount={displayedProjects.length}
                filteredCount={filteredProjects.length}
                totalCount={projects.length}
                resetFilters={resetFilters}
              />

              {/* Projects Grid or No Results */}
              {filteredProjects.length === 0 ? (
                <div className="text-center text-slate-300">
                  {showFilters
                    ? "No projects match your filters."
                    : "No projects available."}
                  {showFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="ml-2 underline decoration-dotted hover:text-white"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                  {displayedProjects.map((p) => (
                    <ProjectCard
                      key={p.id}
                      id={p.id}
                      image={p.image}
                      title={p.title}
                      description={p.description}
                      tags={p.tags}
                      onClick={() => {
                        try {
                          const state = {
                            query,
                            branch,
                            displayCount,
                            scrollY: window.scrollY,
                            pageH: document.documentElement.scrollHeight,
                            ts: Date.now(),
                          };
                          sessionStorage.setItem(
                            "projects:listState",
                            JSON.stringify(state)
                          );
                          sessionStorage.setItem(
                            "projects:lastViewedId",
                            String(p.id)
                          );
                        } catch (e) {
                          if (import.meta.env.DEV)
                            console.debug("persist before nav failed", e);
                        }
                      }}
                      onMouseEnter={prefetchDetails}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {!loading && !error && (
        <>
          {/* For home page: show "View All Projects" if there are more than limit */}
          {!showFilters && projects.length > (limit || 6) && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => navigate({ to: "/projects" })}
                  className="inline-block"
                >
                  <ButtonComponent title="View All Projects" />
                </button>
              </div>
            </div>
          )}

          {/* For projects page: show Load More button */}
          <LoadMoreActions
            showFilters={showFilters}
            canLoadMore={hasMore}
            filteredCount={filteredProjects.length}
            onLoadMore={loadMore}
          />
        </>
      )}

      {/* Reduced spacing for 3 or fewer projects */}
      {!loading &&
        !error &&
        displayedProjects.length <= 3 &&
        displayedProjects.length > 0 && <div className="py-4"></div>}
    </div>
  );
}
