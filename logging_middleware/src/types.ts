import {
  BACKEND_PACKAGES,
  FRONTEND_PACKAGES,
  LOG_LEVELS,
  SHARED_PACKAGES,
  STACKS,
} from "./constants.js";

export type Stack = (typeof STACKS)[number];
export type LogLevel = (typeof LOG_LEVELS)[number];

export type FrontendPackage = (typeof FRONTEND_PACKAGES)[number];
export type BackendPackage = (typeof BACKEND_PACKAGES)[number];
export type SharedPackage = (typeof SHARED_PACKAGES)[number];

export type FrontendPackageName = FrontendPackage | SharedPackage;
export type BackendPackageName = BackendPackage | SharedPackage;

export type PackageNameForStack<S extends Stack> = S extends "frontend"
  ? FrontendPackageName
  : BackendPackageName;

export interface LogPayload {
  stack: Stack;
  level: LogLevel;
  packageName: FrontendPackageName | BackendPackageName;
  message: string;
}

export interface LoggingConfig {
  apiUrl: string;
  apiToken: string;
}

export interface LogSuccessResult {
  success: true;
  status: number;
  data: unknown;
}

export interface LogFailureResult {
  success: false;
  status?: number;
  error: string;
  data?: unknown;
}

export type LogResult = LogSuccessResult | LogFailureResult;
