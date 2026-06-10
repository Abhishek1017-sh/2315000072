import type { LogContext, LogEntry, LoggerOptions, LogLevel, LogTransport } from "./types.js";
import { ConsoleTransport } from "./transports/console.js";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class Logger {
  private readonly level: LogLevel;
  private readonly serviceName: string;
  private readonly transports: LogTransport[];

  constructor(options: LoggerOptions = {}, transports: LogTransport[] = [new ConsoleTransport()]) {
    this.level = options.level ?? "info";
    this.serviceName = options.serviceName ?? "app";
    this.transports = transports;
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context);
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log("error", message, context);
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (LEVEL_PRIORITY[level] < LEVEL_PRIORITY[this.level]) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: {
        service: this.serviceName,
        ...context,
      },
    };

    for (const transport of this.transports) {
      transport.write(entry);
    }
  }
}
