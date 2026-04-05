"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { X, Sparkles, Rocket, Coffee, Star, Github, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    if (pathname !== "/") return;

    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  const closeModal = useCallback(() => {
    requestAnimationFrame(() => {
      setIsOpen(false);
    });
  }, []);

  const handleExploreProjects = useCallback(() => {
    scrollToElement("projects");
    closeModal();
  }, [scrollToElement, closeModal]);

  const githubUrl = "https://github.com/AdrianAlfauzan";

  if (pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeModal}
            className="fixed inset-0 bg-gradient-to-br from-emerald-900/30 via-black/80 to-blue-900/30 z-[100] flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30,
                transition: { duration: 0.25, ease: "easeIn" },
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden cursor-default"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" />

              <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl" />

              <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/95 to-slate-900/95 overflow-hidden">
                <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-white" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />

                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <Sparkles className="text-emerald-300" size={24} />
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
                        <Rocket className="text-emerald-300" size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-300 via-blue-300 to-white bg-clip-text text-transparent">Welcome Aboard!</h2>
                        <p className="text-zinc-300 text-sm mt-1">Glad to have you here!</p>
                      </div>
                    </div>

                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={closeModal} className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 transition-colors border border-white/10">
                      <X size={20} className="text-white" />
                    </motion.button>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }} className="space-y-6">
                    <p className="text-lg text-zinc-200 leading-relaxed">Hello guyss! Welcome to my new portfolio. I&apos;m excited to share my journey, projects, and experiences in web development with you.</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="p-4 rounded-xl bg-white/5 border border-emerald-500/10 hover:border-emerald-400/40 transition-all duration-200 group cursor-pointer"
                        onClick={handleExploreProjects}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                            <Star className="text-emerald-300" size={18} />
                          </div>
                          <span className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">Explore Projects</span>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.3 }}
                        className="p-4 rounded-xl bg-white/5 border border-blue-500/10 hover:border-blue-400/40 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <Coffee className="text-blue-300" size={18} />
                          </div>
                          <span className="text-sm font-medium text-white">Read Stories</span>
                        </div>
                      </motion.div>

                      <motion.a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                        className="p-4 rounded-xl bg-white/5 border border-purple-500/10 hover:border-purple-400/40 transition-all duration-200 group md:col-span-1 col-span-2 cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                              <Github className="text-purple-300" size={18} />
                            </div>
                            <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">Connect</span>
                          </div>
                          <ExternalLink size={16} className="text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </motion.a>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
                      <p className="text-sm text-zinc-300 text-center">
                        <span className="font-semibold text-emerald-300">Tips:</span> Keep trying and trying, because no one will ever know the results and they certainly won&apos;t betray you!
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-3"
                      >
                        <span className="text-base">Let&apos;s Explore!</span>
                        <Sparkles size={18} />
                      </motion.button>

                      <motion.a
                        whileTap={{ scale: 0.97 }}
                        href="#top-topics"
                        onClick={closeModal}
                        className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold transition-all duration-200 text-center"
                      >
                        Explore Topics
                      </motion.a>
                    </div>
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white via-blue-400 to-emerald-400" />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
