"use client";

import { useCallback, useRef } from "react";

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
  // Fix type: HTMLElement | undefined (bukan null)
  const elementCache = useRef<Map<string, HTMLElement>>(new Map());

  const scrollToElement = useCallback((elementId: string, options: ScrollOptions = {}) => {
    let element = elementCache.current.get(elementId);

    if (!element) {
      const foundElement = document.getElementById(elementId);
      if (foundElement) {
        element = foundElement;
        elementCache.current.set(elementId, element);
      }
    }

    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ ...defaultOptions, ...options });
      });
      return true;
    }
    return false;
  }, []);

  const scrollToTop = useCallback((options: ScrollOptions = {}) => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: options.behavior || "smooth",
      });
    });
  }, []);

  const scrollToPosition = useCallback((position: number, options: ScrollOptions = {}) => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: position,
        behavior: options.behavior || "smooth",
      });
    });
  }, []);

  const clearCache = useCallback(() => {
    elementCache.current.clear();
  }, []);

  return {
    scrollToElement,
    scrollToTop,
    scrollToPosition,
    clearCache,
  };
}
