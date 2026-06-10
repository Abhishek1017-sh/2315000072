import type { LoggingConfig } from "./types.js";

const API_URL_ENV = "LOGGING_API_URL";
const API_TOKEN_ENV = "LOGGING_API_TOKEN";

let configOverride: Partial<LoggingConfig> | null = null;

function readEnv(key: string): string | undefined {
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }

  return undefined;
}

export function configureLogging(config: Partial<LoggingConfig>): void {
  configOverride = config;
}

export function resetLoggingConfig(): void {
  configOverride = null;
}

export function getLoggingConfig(): LoggingConfig | null {
  const apiUrl = configOverride?.apiUrl ?? readEnv(API_URL_ENV);
  const apiToken = configOverride?.apiToken ?? readEnv(API_TOKEN_ENV);

  if (!apiUrl || !apiToken) {
    return null;
  }

  return { apiUrl, apiToken };
}

export { API_TOKEN_ENV, API_URL_ENV };
