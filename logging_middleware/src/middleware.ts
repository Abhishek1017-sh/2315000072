import type { Logger } from "./logger.js";

export interface RequestContext {
  method: string;
  path: string;
  requestId?: string;
}

export interface LoggingMiddlewareOptions {
  logger: Logger;
  skipPaths?: string[];
}

export function createLoggingMiddleware(options: LoggingMiddlewareOptions) {
  const { logger, skipPaths = [] } = options;

  return async function loggingMiddleware(
    context: RequestContext,
    next: () => Promise<void>,
  ): Promise<void> {
    if (skipPaths.includes(context.path)) {
      await next();
      return;
    }

    const start = Date.now();

    logger.info("request.start", {
      method: context.method,
      path: context.path,
      requestId: context.requestId,
    });

    try {
      await next();
      logger.info("request.complete", {
        method: context.method,
        path: context.path,
        requestId: context.requestId,
        durationMs: Date.now() - start,
      });
    } catch (error) {
      logger.error("request.error", {
        method: context.method,
        path: context.path,
        requestId: context.requestId,
        durationMs: Date.now() - start,
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  };
}
