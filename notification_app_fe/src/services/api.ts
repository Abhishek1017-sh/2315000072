import { ApiResponse, ApiError } from "@/types";
import { logError } from "@/utils/logger";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: response.statusText,
      code: `HTTP_${response.status}`,
    }));

    void logError("api", `API Error: ${error.code}`);

    return {
      success: false,
      error: error.message,
    };
  }

  const data = await response.json();
  return {
    success: true,
    data,
  };
}

export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse<T>(response);
  } catch (error) {
    void logError(
      "api",
      `API Request failed: GET ${endpoint} - ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function post<T>(
  endpoint: string,
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return handleResponse<T>(response);
  } catch (error) {
    void logError(
      "api",
      `API Request failed: POST ${endpoint} - ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function put<T>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return handleResponse<T>(response);
  } catch (error) {
    void logError(
      "api",
      `API Request failed: PUT ${endpoint} - ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function del<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return handleResponse<T>(response);
  } catch (error) {
    void logError(
      "api",
      `API Request failed: DELETE ${endpoint} - ${error instanceof Error ? error.message : "Unknown error"}`
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
