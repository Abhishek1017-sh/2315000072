import {
  Log,
  configureLogging,
  type LogLevel,
  type FrontendPackageName,
  type LogResult,
} from "@afford/logging-middleware";

let isConfigured = false;

export function initializeLogger() {
  if (isConfigured) return;

  configureLogging({
    apiUrl: process.env.NEXT_PUBLIC_LOG_API_URL || "http://localhost:3001",
    apiToken: process.env.NEXT_PUBLIC_LOG_API_TOKEN || "",
  });

  isConfigured = true;
}

export async function logInfo(
  packageName: FrontendPackageName,
  message: string
): Promise<LogResult> {
  initializeLogger();
  return Log("frontend", "info" as LogLevel, packageName, message);
}

export async function logError(
  packageName: FrontendPackageName,
  message: string
): Promise<LogResult> {
  initializeLogger();
  return Log("frontend", "error" as LogLevel, packageName, message);
}

export async function logWarn(
  packageName: FrontendPackageName,
  message: string
): Promise<LogResult> {
  initializeLogger();
  return Log("frontend", "warn" as LogLevel, packageName, message);
}

export async function logDebug(
  packageName: FrontendPackageName,
  message: string
): Promise<LogResult> {
  initializeLogger();
  return Log("frontend", "debug" as LogLevel, packageName, message);
}
