"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Sparkles, Rocket, Coffee, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    if (pathname !== "/") return;
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const closeModal = () => setIsOpen(false);
  const handleExploreProjects = () => {
    scrollToElement("projects");
    closeModal();
  };

  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop dengan gradien */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={closeModal}
            className="fixed inset-0 bg-gradient-to-br from-emerald-900/20 via-black/80 to-blue-900/30 backdrop-blur-xl z-[100] flex items-center justify-center p-4 cursor-pointer"
          >
            {/* Modal Content */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                rotate: -5,
                y: 50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  duration: 0.7,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                rotate: 5,
                y: 50,
                transition: { duration: 0.3 },
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl overflow-hidden cursor-default"
            >
              {/* Background gradien */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/10 via-blue-900/10 to-transparent" />

              {/* Glow effects */}
              <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-emerald-400/5 rounded-full blur-3xl" />

              {/* Main card */}
              <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-slate-900/90 backdrop-blur-2xl overflow-hidden">
                {/* Top decorative elements */}
                <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-white" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <Sparkles className="text-emerald-300 animate-pulse" size={24} />
                </div>

                {/* Content */}
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
                        <Rocket className="text-emerald-300" size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 via-blue-300 to-white bg-clip-text text-transparent flex items-center gap-3">
                          Welcome Aboard!
                          <span className="inline-flex items-center">
                            <Rocket className="text-emerald-300" size={28} />
                          </span>
                        </h2>
                        <p className="text-zinc-300 text-sm mt-1">Glad to have you here!</p>
                      </div>
                    </div>

                    <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={closeModal} className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 transition-colors border border-white/10">
                      <X size={20} className="text-white" />
                    </motion.button>
                  </div>

                  {/* Body content */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                    <p className="text-lg text-zinc-200 leading-relaxed">Hello guyss! Welcome to my new portfolio. I&apos;m excited to share my journey, projects, and experiences in web development with you.</p>

                    {/* Features grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="p-4 rounded-xl bg-white/5 border border-emerald-500/10 hover:border-emerald-400/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                            <Star className="text-emerald-300" size={18} />
                          </div>
                          <button onClick={handleExploreProjects} className="text-sm font-medium text-white hover:text-emerald-300 transition-colors">
                            Explore Projects
                          </button>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="p-4 rounded-xl bg-white/5 border border-blue-500/10 hover:border-blue-400/40 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <Coffee className="text-blue-300" size={18} />
                          </div>
                          <span className="text-sm font-medium text-white">Read Stories</span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors group md:col-span-1 col-span-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                            <Sparkles className="text-white" size={18} />
                          </div>
                          <span className="text-sm font-medium text-white">Connect</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Tips */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
                      <p className="text-sm text-zinc-300 text-center">
                        <span className="font-semibold text-emerald-300">Tip:</span> Keep trying and trying, because no one will ever know the results and they certainly won&apos;t betray you!
                      </p>
                    </motion.div>

                    {/* Action buttons */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
                      >
                        <span className="text-base">Let&apos;s Explore!</span>
                        <Sparkles size={18} />
                      </motion.button>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#top-topics"
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold transition-all text-center"
                      >
                        Explore Topics
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom decorative */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-blue-400 to-emerald-400" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
