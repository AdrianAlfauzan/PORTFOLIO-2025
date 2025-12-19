"use client";

import { Check, X, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  onClose: () => void;
}

export function Toast({ type, title, message, duration = 5000, onClose }: ToastProps) {
  const config = {
    success: {
      icon: Check,
      gradient: "from-emerald-600 to-green-600",
      border: "border-emerald-500/30",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-300",
    },
    error: {
      icon: X,
      gradient: "from-red-600 to-rose-600",
      border: "border-red-500/30",
      iconBg: "bg-red-500/20",
      iconColor: "text-red-300",
    },
    warning: {
      icon: AlertCircle,
      gradient: "from-amber-600 to-orange-600",
      border: "border-amber-500/30",
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-300",
    },
    info: {
      icon: Info,
      gradient: "from-blue-600 to-cyan-600",
      border: "border-blue-500/30",
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-300",
    },
  };

  const { icon: Icon, gradient, border, iconBg, iconColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`bg-gradient-to-r ${gradient} ${border} backdrop-blur-xl rounded-xl p-4 shadow-2xl shadow-black/30 border min-w-[320px] max-w-md`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${iconBg} flex-shrink-0`}>
          <Icon size={20} className={iconColor} />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-white text-sm">{title}</h4>
          {message && <p className="text-white/90 text-xs mt-1">{message}</p>}
        </div>

        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0">
          <X size={16} className="text-white/70" />
        </motion.button>
      </div>

      {/* Progress bar */}
      <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: duration / 1000, ease: "linear" }} className="h-0.5 bg-white/30 rounded-full mt-3 origin-left" />
    </motion.div>
  );
}
