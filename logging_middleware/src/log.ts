import { createValidationFailure, postLog } from "./client.js";
import { collectValidationErrors } from "./validation.js";
import type {
  BackendPackageName,
  FrontendPackageName,
  LogLevel,
  LogResult,
  PackageNameForStack,
  Stack,
} from "./types.js";

export async function Log(
  stack: "frontend",
  level: LogLevel,
  packageName: FrontendPackageName,
  message: string,
): Promise<LogResult>;

export async function Log(
  stack: "backend",
  level: LogLevel,
  packageName: BackendPackageName,
  message: string,
): Promise<LogResult>;

export async function Log<S extends Stack>(
  stack: S,
  level: LogLevel,
  packageName: PackageNameForStack<S>,
  message: string,
): Promise<LogResult> {
  const validationErrors = collectValidationErrors(stack, level, packageName, message);

  if (validationErrors.length > 0) {
    return createValidationFailure(
      validationErrors.map((entry) => `${entry.field}: ${entry.message}`).join("; "),
    );
  }

  return postLog({
    stack,
    level,
    packageName,
    message,
  });
}
