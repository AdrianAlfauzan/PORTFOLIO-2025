"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { AlertCircle, ExternalLink, ChevronDown, ChevronUp, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AnnouncementAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Cek apakah mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    // Check localStorage untuk first time, sessionStorage untuk refresh
    const hasClosedPermanently = localStorage.getItem("announcementClosed");
    const hasSeenInSession = sessionStorage.getItem("announcementSeen");

    const shouldShow = !hasClosedPermanently || !hasSeenInSession;

    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("announcementSeen", "true");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const closeAlert = () => {
    setIsOpen(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Hanya tampilkan di Home page
  if (pathname !== "/") {
    return null;
  }

  // Content announcement
  const announcementContent = {
    title: "New Update Available!",
    shortText: "Some friends stepped up, I still with the code and the rest of the struggle.",
    fullText: `Di akhir tahun 2025 ini, perjalanan di dunia pemrograman mulai mencapai titik refleksi.  

Beberapa dari devs akan menyentuh masa kelulusan, we seldom meet, cuz idk... maybe overwhelmed sama daily tasks masing-masing sampe nggak sempet commit haha.
Well... see you again, mate.
Thank you for being a part of this journey.`,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop dengan z-index yang SANGAT TINGGI */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={closeAlert} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999]" />

          {/* Alert Container - Desktop: kanan, Mobile: tengah */}
          <div className="fixed inset-x-0 z-[100000] pointer-events-none md:flex md:justify-end">
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 50 : 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.5,
              }}
              className="w-full max-w-sm md:max-w-xl mx-auto md:mx-0 md:mr-6 mt-20 md:mt-24 pointer-events-auto px-4 md:px-0"
            >
              <div className="relative rounded-xl border border-emerald-500/20 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Decorative elements */}
                <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                {/* Header dengan close button di dalamnya */}
                <div className="p-4 md:p-5 border-b border-white/10 relative">
                  {/* Close button - POSISI ABSOLUT DI DALAM HEADER */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeAlert}
                    className="absolute top-4 right-4 p-1.5 md:p-2 rounded-lg bbg-white/5 hover:bg-emerald-500/20  border border-white/10 hover:border-white/30 transition-colors z-10"
                    aria-label="Close announcement"
                  >
                    <X size={16} className="text-white hover:text-white" />
                  </motion.button>

                  <div className="flex items-start pr-10">
                    {" "}
                    {/* Tambah padding kanan untuk memberi ruang close button */}
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

                {/* Content */}
                <div className="p-4 md:p-5">
                  <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-96" : "max-h-24"}`}>
                    <div className="text-zinc-300 whitespace-pre-line text-sm leading-relaxed overflow-y-auto pr-2 max-h-80">{isExpanded ? announcementContent.fullText : announcementContent.fullText.split("\n\n")[0]}</div>
                  </div>

                  {/* Action buttons - Responsif untuk mobile */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-4 pt-4 border-t border-white/10 gap-3 md:gap-0">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
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
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#projects"
                        onClick={closeAlert}
                        className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors text-center"
                      >
                        View Projects
                      </motion.a>

                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        onClick={closeAlert}
                        className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={14} />
                        Details
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://adrianmusaalfauzan.vercel.app/"
                        onClick={closeAlert}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-sm rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:bg-gray-700/40 hover:border-gray-600/50 text-gray-200 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={14} />
                        My Last Portfolio
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Footer with timestamp */}
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
