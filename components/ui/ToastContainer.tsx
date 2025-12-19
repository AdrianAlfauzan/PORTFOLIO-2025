// /components/ui/ToastContainer.tsx
"use client";

import { AnimatePresence } from "framer-motion";
import { Toast } from "@/components/ui/Toast";
import { useToastList, useToastStore } from "@/hooks/useToast";

export function ToastContainer() {
  const toasts = useToastList();
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} title={toast.title} message={toast.message} duration={toast.duration} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
