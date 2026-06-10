import { getLoggingConfig } from "./config.js";
import type { LogFailureResult, LogPayload, LogResult } from "./types.js";

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    return text.length > 0 ? text : null;
  } catch {
    return null;
  }
}

export async function postLog(payload: LogPayload): Promise<LogResult> {
  const config = getLoggingConfig();

  if (!config) {
    return {
      success: false,
      error:
        "Logging is not configured. Set LOGGING_API_URL and LOGGING_API_TOKEN or call configureLogging().",
    };
  }

  try {
    const response = await fetch(config.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await parseResponseBody(response);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        error: `Logging API request failed with status ${response.status}`,
        data,
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown logging error";

    return {
      success: false,
      error: `Failed to reach logging API: ${message}`,
    };
  }
}

export function createValidationFailure(error: string): LogFailureResult {
  return {
    success: false,
    error,
  };
}
