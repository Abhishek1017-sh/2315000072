export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
}

export interface LoggerOptions {
  level?: LogLevel;
  serviceName?: string;
}

export interface LogTransport {
  write(entry: LogEntry): void;
}
