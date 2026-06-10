export const STACKS = ["frontend", "backend"] as const;

export const LOG_LEVELS = ["debug", "info", "warn", "error", "fatal"] as const;

export const FRONTEND_PACKAGES = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
] as const;

export const BACKEND_PACKAGES = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service",
] as const;

export const SHARED_PACKAGES = ["auth", "config", "middleware", "utils"] as const;

export const STACK_SET = new Set<string>(STACKS);
export const LOG_LEVEL_SET = new Set<string>(LOG_LEVELS);
export const FRONTEND_PACKAGE_SET = new Set<string>([
  ...FRONTEND_PACKAGES,
  ...SHARED_PACKAGES,
]);
export const BACKEND_PACKAGE_SET = new Set<string>([
  ...BACKEND_PACKAGES,
  ...SHARED_PACKAGES,
]);
