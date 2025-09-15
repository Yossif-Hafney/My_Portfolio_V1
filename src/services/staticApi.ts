// Static JSON API Service
// This service reads from the static JSON files in /public/api/

import type { ApiResponse, PaginatedResponse } from "./apiClient";

export interface StaticProject {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoUrl?: string;
  sourceUrl?: string;
  category?: string;
}

export interface StaticApiProject {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  status: "planning" | "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface StaticProjectsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  tags?: string[];
  sortBy?: "title" | "createdAt" | "updatedAt" | "status";
  sortOrder?: "asc" | "desc";
}

class StaticProjectsApi {
  private projects: StaticApiProject[] = [];
  private isLoaded = false;

  private async loadStaticData(): Promise<void> {
    if (this.isLoaded) return;

    try {
      // Load from static JSON files
      const [projectsResponse, simpleResponse] = await Promise.all([
        fetch("/api/projects.json"),
        fetch("/api/projects-simple.json"),
      ]);

      let staticProjects: StaticProject[] = [];

      if (projectsResponse.ok) {
        staticProjects = await projectsResponse.json();
      } else if (simpleResponse.ok) {
        staticProjects = await simpleResponse.json();
      }

      // Convert to API format
      this.projects = staticProjects.map((project, index) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        image: project.image || "",
        tags: project.technologies?.slice(0, 3) || [],
        technologies: project.technologies || [],
        github: project.sourceUrl || "",
        demo: project.demoUrl || "",
        status: "completed" as const,
        createdAt: new Date(
          Date.now() - index * 24 * 60 * 60 * 1000
        ).toISOString(),
        updatedAt: new Date(
          Date.now() - index * 12 * 60 * 60 * 1000
        ).toISOString(),
      }));

      this.isLoaded = true;
      console.log(
        `Loaded ${this.projects.length} projects from static JSON files`
      );
    } catch (error) {
      console.error("Failed to load static projects:", error);
      this.projects = [];
    }
  }

  private filterProjects(
    projects: StaticApiProject[],
    query: StaticProjectsQuery = {}
  ): StaticApiProject[] {
    let filtered = [...projects];

    // Search filter
    if (query.search) {
      const searchLower = query.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          p.technologies.some((tech) =>
            tech.toLowerCase().includes(searchLower)
          )
      );
    }

    // Status filter
    if (query.status) {
      filtered = filtered.filter((p) => p.status === query.status);
    }

    // Tags filter
    if (query.tags) {
      const tagsArray = Array.isArray(query.tags) ? query.tags : [query.tags];
      filtered = filtered.filter((p) =>
        tagsArray.some(
          (tag: string) => p.tags.includes(tag) || p.technologies.includes(tag)
        )
      );
    }

    return filtered;
  }

  private sortProjects(
    projects: StaticApiProject[],
    sortBy = "updatedAt",
    sortOrder = "desc"
  ): StaticApiProject[] {
    return projects.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "createdAt":
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case "updatedAt":
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }

  private paginateResults(
    data: StaticApiProject[],
    page = 1,
    limit = 10
  ): PaginatedResponse<StaticApiProject> {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: data.length,
      page: parseInt(page.toString()),
      limit: parseInt(limit.toString()),
      hasNext: endIndex < data.length,
      hasPrev: page > 1,
    };
  }

  async getAllProjects(
    query: StaticProjectsQuery = {}
  ): Promise<ApiResponse<PaginatedResponse<StaticApiProject>>> {
    await this.loadStaticData();

    try {
      const {
        page = 1,
        limit = 10,
        search,
        status,
        tags,
        sortBy = "updatedAt",
        sortOrder = "desc",
      } = query;

      // Filter projects
      let filtered = this.filterProjects(this.projects, {
        search,
        status,
        tags,
      });

      // Sort projects
      filtered = this.sortProjects(filtered, sortBy, sortOrder);

      // Paginate results
      const result = this.paginateResults(filtered, page, limit);

      return {
        success: true,
        data: result,
      };
    } catch {
      return {
        success: false,
        error: "Failed to fetch projects from static files",
      };
    }
  }

  async getProjectById(id: number): Promise<ApiResponse<StaticApiProject>> {
    await this.loadStaticData();

    const project = this.projects.find((p) => p.id === id);
    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    return {
      success: true,
      data: project,
    };
  }

  // Static API is read-only - these methods return errors
  async createProject(): Promise<ApiResponse<StaticApiProject>> {
    return {
      success: false,
      error:
        "Cannot create projects with static API. Switch to Express API for full CRUD operations.",
    };
  }

  async updateProject(): Promise<ApiResponse<StaticApiProject>> {
    return {
      success: false,
      error:
        "Cannot update projects with static API. Switch to Express API for full CRUD operations.",
    };
  }

  async deleteProject(): Promise<ApiResponse<{ id: number }>> {
    return {
      success: false,
      error:
        "Cannot delete projects with static API. Switch to Express API for full CRUD operations.",
    };
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch("/api/projects.json");
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const staticProjectsApi = new StaticProjectsApi();
export default staticProjectsApi;
