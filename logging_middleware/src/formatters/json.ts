import type { LogEntry } from "../types.js";

export function formatJson(entry: LogEntry): string {
  return JSON.stringify(entry);
}
