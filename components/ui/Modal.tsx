"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[90vw] max-h-[90vh]",
};

export default function Modal({ isOpen, onClose, title, subtitle, children, size = "lg", showCloseButton = true, className = "" }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] flex items-center justify-center p-4 cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 50,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.5,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 50,
              transition: { duration: 0.2 },
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className={`relative w-full ${sizeClasses[size]} rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-900 to-black backdrop-blur-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top gradient bar */}
              <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1DB954] to-emerald-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />

              {/* Header */}
              {(title || showCloseButton) && (
                <div className="flex-shrink-0 p-6 md:p-8 pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {title && (
                        <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-2xl md:text-3xl font-bold text-white">
                          {title}
                        </motion.h2>
                      )}
                      {subtitle && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-emerald-400 text-lg mt-1">
                          {subtitle}
                        </motion.p>
                      )}
                    </div>

                    {showCloseButton && (
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative z-10 ml-4"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <X size={20} className="text-zinc-400" />
                      </motion.button>
                    )}
                  </div>
                </div>
              )}

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 md:py-8">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="h-full pr-3">
                  {children}
                </motion.div>
              </div>

              {/* Floating particles */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
