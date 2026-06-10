/**
 * Usage examples for @afford/logging-middleware
 *
 * Configure credentials via environment variables:
 *   LOGGING_API_URL=https://evaluation-logging-api.example.com/logs
 *   LOGGING_API_TOKEN=your-assessment-token
 *
 * Or call configureLogging() before invoking Log().
 */

import {
  Log,
  configureLogging,
  type LogResult,
} from "../src/index.js";

// Example 1: Frontend component log
async function logFromComponent(): Promise<LogResult> {
  return Log("frontend", "info", "component", "Notification list rendered");
}

// Example 2: Frontend API layer log
async function logFromApiClient(): Promise<LogResult> {
  return Log("frontend", "error", "api", "GET /notifications failed with status 500");
}

// Example 3: Shared package log from frontend stack
async function logFromFrontendAuth(): Promise<LogResult> {
  return Log("frontend", "warn", "auth", "Session token expires in 5 minutes");
}

// Example 4: Backend service log
async function logFromService(): Promise<LogResult> {
  return Log("backend", "info", "service", "Notification queued for delivery");
}

// Example 5: Backend cron job log
async function logFromCronJob(): Promise<LogResult> {
  return Log("backend", "debug", "cron_job", "Expired notifications cleanup started");
}

// Example 6: Programmatic configuration (useful in Next.js client code)
async function logWithRuntimeConfig(): Promise<LogResult> {
  configureLogging({
    apiUrl: process.env.LOGGING_API_URL ?? "",
    apiToken: process.env.LOGGING_API_TOKEN ?? "",
  });

  return Log("frontend", "info", "page", "Notifications page mounted");
}

// Example 7: Handling the API response without throwing
async function logWithGracefulHandling(): Promise<void> {
  const result = await Log("frontend", "fatal", "state", "Notification store failed to hydrate");

  if (!result.success) {
    // Application continues; logging failure does not crash the UI
    return;
  }

  // result.data contains the evaluation API response body
  void result.data;
}

export {
  logFromApiClient,
  logFromComponent,
  logFromCronJob,
  logFromFrontendAuth,
  logFromService,
  logWithGracefulHandling,
  logWithRuntimeConfig,
};
