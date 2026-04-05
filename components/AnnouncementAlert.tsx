"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { AlertCircle, ExternalLink, ChevronDown, ChevronUp, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AnnouncementAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Effect untuk responsive - tanpa mounting detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Effect untuk modal timing
  useEffect(() => {
    if (pathname !== "/") return;

    const hasClosedPermanently = localStorage.getItem("announcementClosed");
    const hasSeenInSession = sessionStorage.getItem("announcementSeen");

    const shouldShow = !hasClosedPermanently || !hasSeenInSession;

    if (shouldShow) {
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          setIsOpen(true);
          sessionStorage.setItem("announcementSeen", "true");
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const closeAlert = useCallback(() => {
    requestAnimationFrame(() => {
      setIsOpen(false);
    });
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  // Render guard - hanya cek pathname
  if (pathname !== "/") {
    return null;
  }

  const announcementContent = {
    title: "Year-End Reflection",
    shortText: "As 2025 closes, we reflect on my coding journey and growth.",
    fullText: `2025 has been a transformative year in our coding journey.  

    Some fellow developers are approaching graduation milestones,  
    while others continue navigating their daily tech challenges.  

    Though paths may diverge with busy schedules,  
    the shared experiences and learnings remain valuable.  

    Thank you for being part of this development journey.`,
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={closeAlert} className="fixed inset-0 bg-black/40 z-[99999]" />

          <div className="fixed inset-x-0 z-[100000] pointer-events-none md:flex md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 30 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 30 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-sm md:max-w-xl mx-auto md:mx-0 md:mr-6 mt-20 md:mt-24 pointer-events-auto px-4 md:px-0"
              style={{ willChange: "transform, opacity" }}
            >
              <div className="relative rounded-xl border border-emerald-500/20 bg-gradient-to-br from-gray-900 to-black shadow-2xl overflow-hidden">
                <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />

                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

                <div className="p-4 md:p-5 border-b border-white/10 relative">
                  <motion.button whileTap={{ scale: 0.95 }} onClick={closeAlert} className="absolute top-4 right-4 p-1.5 md:p-2 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 transition-colors z-10">
                    <X size={16} className="text-white" />
                  </motion.button>

                  <div className="flex items-start pr-10">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20">
                        <AlertCircle className="text-emerald-300" size={isMobile ? 18 : 20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base md:text-lg text-white truncate">{announcementContent.title}</h3>
                        <p className="text-xs md:text-sm text-zinc-400 mt-1 line-clamp-2">{announcementContent.shortText}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-5">
                  <div className={`transition-all duration-200 overflow-hidden ${isExpanded ? "max-h-96" : "max-h-24"}`}>
                    <div className="text-zinc-300 whitespace-pre-line text-sm leading-relaxed overflow-y-auto pr-2 max-h-80">{isExpanded ? announcementContent.fullText : announcementContent.fullText.split("\n\n")[0]}</div>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 pt-4 border-t border-white/10 gap-3 md:gap-0">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={toggleExpand}
                      className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors px-4 py-2 rounded-lg hover:bg-emerald-500/10 w-full md:w-auto"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp size={16} />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} />
                          Read More
                        </>
                      )}
                    </motion.button>

                    <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                      <motion.a whileTap={{ scale: 0.97 }} href="#projects" onClick={closeAlert} className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors text-center">
                        View Projects
                      </motion.a>

                      <motion.a
                        whileTap={{ scale: 0.97 }}
                        href="#"
                        onClick={closeAlert}
                        className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={14} />
                        Details
                      </motion.a>

                      <motion.a
                        whileTap={{ scale: 0.97 }}
                        href="https://adrianmusaalfauzan.vercel.app/"
                        onClick={closeAlert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded-lg bg-gray-800/40 border border-gray-700/50 hover:bg-gray-700/40 text-gray-200 font-medium transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={14} />
                        My Last Portfolio
                      </motion.a>
                    </div>
                  </div>
                </div>

                <div className="px-4 md:px-5 py-3 bg-white/5 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Updated:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-emerald-400/70 font-medium">• New</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
