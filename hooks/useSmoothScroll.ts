"use client";

import { useCallback } from "react";

interface ScrollOptions {
  behavior?: "auto" | "smooth";
  block?: "start" | "center" | "end" | "nearest";
  inline?: "start" | "center" | "end" | "nearest";
}

const defaultOptions: ScrollOptions = {
  behavior: "smooth",
  block: "start",
  inline: "nearest",
};

export function useSmoothScroll() {
  const scrollToElement = useCallback((elementId: string, options: ScrollOptions = {}) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ ...defaultOptions, ...options });
      return true;
    }
    return false;
  }, []);

  const scrollToTop = useCallback((options: ScrollOptions = {}) => {
    window.scrollTo({ top: 0, behavior: options.behavior || "smooth" });
  }, []);

  const scrollToPosition = useCallback((position: number, options: ScrollOptions = {}) => {
    window.scrollTo({ top: position, behavior: options.behavior || "smooth" });
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToPosition,
  };
}
