// /hooks/useToast.ts
"use client";

import { create } from "zustand";
import { ToastType } from "@/components/ui/Toast";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    const newToast = { ...toast, id };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, toast.duration || 5000);
    }

    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
  clearToasts: () => set({ toasts: [] }),
}));

export function useToast() {
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);
  const clearToasts = useToastStore((state) => state.clearToasts);

  return {
    success: (title: string, message?: string, duration?: number) => addToast({ type: "success", title, message, duration }),
    error: (title: string, message?: string, duration?: number) => addToast({ type: "error", title, message, duration }),
    warning: (title: string, message?: string, duration?: number) => addToast({ type: "warning", title, message, duration }),
    info: (title: string, message?: string, duration?: number) => addToast({ type: "info", title, message, duration }),
    removeToast,
    clearToasts,
  };
}

export const useToastList = () => useToastStore((state) => state.toasts);
