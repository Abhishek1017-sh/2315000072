"use client";

import { useEffect } from "react";
import { initializeLogger } from "@/utils/logger";

export function useLogger() {
  useEffect(() => {
    initializeLogger();
  }, []);
}
