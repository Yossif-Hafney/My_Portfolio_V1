import {
  apiClient,
  apiHelpers,
  type ApiResponse,
  type PaginatedResponse,
} from "./apiClient";
import type { NewProject } from "../components/dashboard/AddProjectModal";

// API Project Types
export interface ApiProject {
  id: string | number;
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
  userId?: string;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  status: "planning" | "in-progress" | "completed";
}

export interface ProjectsQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  tags?: string[];
  sortBy?: "title" | "createdAt" | "updatedAt" | "status";
  sortOrder?: "asc" | "desc";
}

// Mock API Service (simulates real API calls)
class MockProjectsApi {
  private projects: ApiProject[] = [];
  private nextId = 1000; // Start with high ID to avoid conflicts

  constructor() {
    this.loadMockData();
  }

  private async loadMockData() {
    // Load existing static projects and convert them
    try {
      const response = await fetch("/api/projects-simple.json");
      if (response.ok) {
        const staticProjects = await response.json();
        this.projects = staticProjects.map(
          (project: ApiProject, index: number) => ({
            ...project,
            technologies: project.tags || [],
            status: "completed" as const,
            createdAt: new Date(
              Date.now() - index * 24 * 60 * 60 * 1000
            ).toISOString(),
            updatedAt: new Date(
              Date.now() - index * 24 * 60 * 60 * 1000
            ).toISOString(),
          })
        );
        // Ensure numeric comparison for nextId when ids are numbers
        const numericIds = this.projects
          .map((p: ApiProject) => (typeof p.id === "number" ? p.id : NaN))
          .filter((n) => !Number.isNaN(n));
        this.nextId =
          numericIds.length > 0 ? Math.max(...numericIds) + 1 : this.nextId;
      }
    } catch (error) {
      console.warn("Could not load static projects:", error);
    }

    // Load custom projects from localStorage
    try {
      const stored = localStorage.getItem("portfolio_custom_projects");
      if (stored) {
        const customProjects = JSON.parse(stored);
        this.projects.push(...customProjects);
        const customNumeric = customProjects
          .map((p: ApiProject) => (typeof p.id === "number" ? p.id : NaN))
          .filter((n: number) => !Number.isNaN(n));
        this.nextId = Math.max(
          this.nextId,
          ...customNumeric.map((n: number) => n + 1)
        );
      }
    } catch (error) {
      console.warn("Could not load custom projects:", error);
    }
  }

  private saveToLocalStorage() {
    try {
      // Only save custom projects (those with numeric id >= 1000)
      const customProjects = this.projects.filter(
        (p) => typeof p.id === "number" && p.id >= 1000
      );
      localStorage.setItem(
        "portfolio_custom_projects",
        JSON.stringify(customProjects)
      );
    } catch (error) {
      console.error("Could not save to localStorage:", error);
    }
  }

  private simulateNetworkDelay(min = 300, max = 800): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  async getAllProjects(
    query: ProjectsQuery = {}
  ): Promise<ApiResponse<PaginatedResponse<ApiProject>>> {
    await this.simulateNetworkDelay();

    try {
      let filteredProjects = [...this.projects];

      // Apply search filter
      if (query.search) {
        const searchLower = query.search.toLowerCase();
        filteredProjects = filteredProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.description.toLowerCase().includes(searchLower) ||
            p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      }

      // Apply status filter
      if (query.status) {
        filteredProjects = filteredProjects.filter(
          (p) => p.status === query.status
        );
      }

      // Apply tags filter
      if (query.tags && query.tags.length > 0) {
        filteredProjects = filteredProjects.filter((p) =>
          query.tags!.some((tag) => p.tags.includes(tag))
        );
      }

      // Apply sorting
      const sortBy = query.sortBy || "updatedAt";
      const sortOrder = query.sortOrder || "desc";

      filteredProjects.sort((a, b) => {
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
        }

        return sortOrder === "asc" ? comparison : -comparison;
      });

      // Apply pagination
      const page = query.page || 1;
      const limit = query.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          data: paginatedProjects,
          total: filteredProjects.length,
          page,
          limit,
          hasNext: endIndex < filteredProjects.length,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: apiHelpers.handleApiError(error),
      };
    }
  }

  async getProjectById(id: string | number): Promise<ApiResponse<ApiProject>> {
    await this.simulateNetworkDelay();

    try {
      const project = this.projects.find((p) => String(p.id) === String(id));

      if (!project) {
        return {
          success: false,
          error: `Project with ID ${id} not found`,
        };
      }

      return {
        success: true,
        data: project,
      };
    } catch (error) {
      return {
        success: false,
        error: apiHelpers.handleApiError(error),
      };
    }
  }

  async createProject(
    payload: CreateProjectPayload
  ): Promise<ApiResponse<ApiProject>> {
    await this.simulateNetworkDelay();

    try {
      const now = new Date().toISOString();
      const newProject: ApiProject = {
        id: this.nextId++,
        ...payload,
        createdAt: now,
        updatedAt: now,
      };

      this.projects.push(newProject);
      this.saveToLocalStorage();

      return {
        success: true,
        data: newProject,
      };
    } catch (error) {
      return {
        success: false,
        error: apiHelpers.handleApiError(error),
      };
    }
  }

  async updateProject(
    id: string | number,
    payload: Partial<CreateProjectPayload>
  ): Promise<ApiResponse<ApiProject>> {
    await this.simulateNetworkDelay();

    try {
      const projectIndex = this.projects.findIndex(
        (p) => String(p.id) === String(id)
      );

      if (projectIndex === -1) {
        return {
          success: false,
          error: `Project with ID ${id} not found`,
        };
      }

      const updatedProject = {
        ...this.projects[projectIndex],
        ...payload,
        updatedAt: new Date().toISOString(),
      };

      this.projects[projectIndex] = updatedProject;
      this.saveToLocalStorage();

      return {
        success: true,
        data: updatedProject,
      };
    } catch (error) {
      return {
        success: false,
        error: apiHelpers.handleApiError(error),
      };
    }
  }

  async deleteProject(
    id: string | number
  ): Promise<ApiResponse<{ id: string | number }>> {
    await this.simulateNetworkDelay();

    try {
      const projectIndex = this.projects.findIndex(
        (p) => String(p.id) === String(id)
      );

      if (projectIndex === -1) {
        return {
          success: false,
          error: `Project with ID ${id} not found`,
        };
      }

      // Only allow deletion of custom projects (numeric id >= 1000)
      if (
        typeof this.projects[projectIndex].id !== "number" ||
        this.projects[projectIndex].id < 1000
      ) {
        return {
          success: false,
          error: "Cannot delete static projects",
        };
      }

      this.projects.splice(projectIndex, 1);
      this.saveToLocalStorage();

      return {
        success: true,
        data: { id },
      };
    } catch (error) {
      return {
        success: false,
        error: apiHelpers.handleApiError(error),
      };
    }
  }

  async checkHealth(): Promise<boolean> {
    await this.simulateNetworkDelay(100, 300);
    return true; // Mock API is always "healthy"
  }
}

// Create singleton instance
const mockProjectsApi = new MockProjectsApi();

// Real API Service (for when you have a real backend)
class RealProjectsApi {
  async getAllProjects(
    query: ProjectsQuery = {}
  ): Promise<ApiResponse<PaginatedResponse<ApiProject>>> {
    const queryString = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v) => queryString.append(key, v.toString()));
        } else {
          queryString.append(key, value.toString());
        }
      }
    });

    return apiClient.get(`/projects?${queryString.toString()}`);
  }

  async getProjectById(id: string | number): Promise<ApiResponse<ApiProject>> {
    return apiClient.get(`/projects/${id}`);
  }

  async createProject(
    payload: CreateProjectPayload
  ): Promise<ApiResponse<ApiProject>> {
    return apiClient.post("/projects", payload);
  }

  async updateProject(
    id: string | number,
    payload: Partial<CreateProjectPayload>
  ): Promise<ApiResponse<ApiProject>> {
    return apiClient.patch(`/projects/${id}`, payload);
  }

  async deleteProject(
    id: string | number
  ): Promise<ApiResponse<{ id: string | number }>> {
    return apiClient.delete(`/projects/${id}`);
  }

  async checkHealth(): Promise<boolean> {
    return apiHelpers.healthCheck();
  }
}

// Export the appropriate API based on environment or availability
class ProjectsApiService {
  private mockApi = mockProjectsApi;
  private realApi = new RealProjectsApi();
  private useRealApi = false;

  async init(): Promise<void> {
    // Check environment variable first
    const forceRealApi = import.meta.env.VITE_USE_REAL_API === "true";

    if (forceRealApi) {
      // Force use real API if environment variable is set
      this.useRealApi = await this.realApi.checkHealth();
      console.log(
        `Forced to use real API: ${this.useRealApi ? "connected" : "failed to connect"}`
      );
    } else {
      // Auto-detect if real API is available
      this.useRealApi = await this.realApi.checkHealth();
      console.log(
        `Auto-detected ${this.useRealApi ? "real" : "mock"} API for projects`
      );
    }
  }

  private get api() {
    return this.useRealApi ? this.realApi : this.mockApi;
  }

  async getAllProjects(query?: ProjectsQuery) {
    return this.api.getAllProjects(query);
  }

  async getProjectById(id: string | number) {
    return this.api.getProjectById(id);
  }

  async createProject(payload: CreateProjectPayload) {
    return this.api.createProject(payload);
  }

  async updateProject(
    id: string | number,
    payload: Partial<CreateProjectPayload>
  ) {
    return this.api.updateProject(id, payload);
  }

  async deleteProject(id: string | number) {
    return this.api.deleteProject(id);
  }

  // Helper method to convert NewProject to CreateProjectPayload
  convertFromNewProject(newProject: NewProject): CreateProjectPayload {
    return {
      title: newProject.title,
      description: newProject.description,
      image: newProject.image,
      tags: newProject.tags,
      technologies: newProject.technologies,
      github: newProject.github,
      demo: newProject.demo,
      status: newProject.status,
    };
  }
}

// Create and export singleton
export const projectsApi = new ProjectsApiService();

// Initialize on module load
projectsApi.init();

export default projectsApi;
