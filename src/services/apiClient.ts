// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";
const API_TIMEOUT = 10000; // 10 seconds

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Project Types for API
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

export interface CreateProjectRequest {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  status: "planning" | "in-progress" | "completed";
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  id: number;
}

// HTTP Client Class
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const url = `${this.baseURL}${endpoint}`;
      const config: RequestInit = {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      };

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        success: true,
        data,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return {
            success: false,
            error: "Request timeout",
          };
        }
        return {
          success: false,
          error: error.message,
        };
      }

      return {
        success: false,
        error: "Unknown error occurred",
      };
    }
  }

  // Generic CRUD methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  async patch<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// API Helper Functions
export const apiHelpers = {
  // Check if API is available
  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get("/health");
      return response.success;
    } catch {
      return false;
    }
  },

  // Handle API errors consistently
  handleApiError(error: unknown): string {
    if (typeof error === "string") return error;
    if (typeof error === "object" && error !== null) {
      interface ErrorWithMessage {
        message: string;
      }
      interface ErrorWithError {
        error: string;
      }
      if (
        "message" in error &&
        typeof (error as ErrorWithMessage).message === "string"
      ) {
        return (error as ErrorWithMessage).message;
      }
      if (
        "error" in error &&
        typeof (error as ErrorWithError).error === "string"
      ) {
        return (error as ErrorWithError).error;
      }
    }
    return "An unexpected error occurred";
  },

  // Retry mechanism for failed requests
  async retry<T>(
    operation: () => Promise<ApiResponse<T>>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<ApiResponse<T>> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const result = await operation();

      if (result.success || attempt === maxRetries) {
        return result;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }

    return {
      success: false,
      error: "Max retries exceeded",
    };
  },
};

export default apiClient;
