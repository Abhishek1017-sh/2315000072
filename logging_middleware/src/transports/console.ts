import type { LogEntry, LogTransport } from "../types.js";

export class ConsoleTransport implements LogTransport {
  write(entry: LogEntry): void {
    const output = JSON.stringify(entry);
    const writer = entry.level === "error" || entry.level === "warn" ? console.error : console.log;
    writer(output);
  }
}
