import {
  BACKEND_PACKAGE_SET,
  FRONTEND_PACKAGE_SET,
  LOG_LEVEL_SET,
  STACK_SET,
} from "./constants.js";
import type {
  BackendPackageName,
  FrontendPackageName,
  LogLevel,
  Stack,
} from "./types.js";

export interface ValidationError {
  field: "stack" | "level" | "packageName" | "message" | "config";
  message: string;
}

export function validateStack(stack: unknown): stack is Stack {
  return typeof stack === "string" && STACK_SET.has(stack);
}

export function validateLevel(level: unknown): level is LogLevel {
  return typeof level === "string" && LOG_LEVEL_SET.has(level);
}

export function validatePackageName(
  stack: Stack,
  packageName: unknown,
): packageName is FrontendPackageName | BackendPackageName {
  if (typeof packageName !== "string") {
    return false;
  }

  if (stack === "frontend") {
    return FRONTEND_PACKAGE_SET.has(packageName);
  }

  return BACKEND_PACKAGE_SET.has(packageName);
}

export function validateMessage(message: unknown): message is string {
  return typeof message === "string" && message.trim().length > 0;
}

export function collectValidationErrors(
  stack: unknown,
  level: unknown,
  packageName: unknown,
  message: unknown,
): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!validateStack(stack)) {
    errors.push({
      field: "stack",
      message: `stack must be one of: ${[...STACK_SET].join(", ")}`,
    });
  }

  if (!validateLevel(level)) {
    errors.push({
      field: "level",
      message: `level must be one of: ${[...LOG_LEVEL_SET].join(", ")}`,
    });
  }

  if (validateStack(stack) && !validatePackageName(stack, packageName)) {
    const allowed =
      stack === "frontend"
        ? [...FRONTEND_PACKAGE_SET].join(", ")
        : [...BACKEND_PACKAGE_SET].join(", ");

    errors.push({
      field: "packageName",
      message: `packageName is not allowed for stack "${stack}". Allowed values: ${allowed}`,
    });
  } else if (!validateStack(stack) && typeof packageName === "string") {
    errors.push({
      field: "packageName",
      message: "packageName cannot be validated until stack is valid",
    });
  }

  if (!validateMessage(message)) {
    errors.push({
      field: "message",
      message: "message must be a non-empty string",
    });
  }

  return errors;
}
