"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Command } from "lucide-react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const navItems = [
  { label: "Home", id: "home" },
  { label: "Top Topics", id: "top-topics" },
  { label: "Obsession", id: "obsession" },
  { label: "Projects", id: "projects" },
  { label: "Monthly", id: "monthly" },
  { label: "Most Unexpected Question", id: "unexpected-question" },
  { label: "Signature", id: "signature-style" },
  { label: "Achievements", id: "achievements" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollToElement } = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollToElement(sectionId);
    setOpen(false);
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-gray-900/70 via-black/50 to-transparent ">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center md:justify-between items-center">
          {/* TITLE CENTER */}
          <motion.div whileHover={{ scale: 1.02 }} className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-white/5">
            <span className="font-bold tracking-wide text-white md:text-lg">Adrian Musa Alfauzan - 2025 </span>
          </motion.div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-2 text-sm">
            {navItems.map((item) => (
              <motion.li key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="text-zinc-300 hover:text-white transition-colors cursor-pointer px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 hover:border hover:border-white/5"
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* ===== HAMBURGER BUTTON MOBILE ===== */}
      <button onClick={() => setOpen(!open)} className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 group">
        <div className="relative">
          {/* Background pill yang separo keluar */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-r-full bg-black/60 backdrop-blur-xl border border-white/10 border-l-0 -translate-x-1/2 group-hover:bg-black/80 transition-all" />

          {/* Icon container */}
          <div className="relative z-10 ml-0 w-10 h-10 rounded-full bg-yellow/40 backdrop-blur-lg border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
            <motion.div
              initial={false}
              animate={{
                rotateX: open ? 90 : 0,
                scale: open ? 0.8 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Command size={20} className="text-white" />
            </motion.div>

            <motion.div
              initial={false}
              animate={{
                rotateX: open ? 0 : -90,
                scale: open ? 1 : 0.8,
              }}
              transition={{ duration: 0.3 }}
              className="absolute"
            >
              <Sparkles size={20} className="text-[#1DB954]" />
            </motion.div>

            {/* Dot indicator */}
            {!open && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#1DB954] rounded-full animate-pulse ring-2 ring-black" />}
          </div>
        </div>
      </button>

      {/* ===== MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black z-40" onClick={() => setOpen(false)} />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed bottom-6 left-4 right-4 z-50 rounded-3xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6"
            >
              <ul className="flex flex-col items-center gap-5 text-lg font-medium">
                {navItems.map((item, i) => (
                  <motion.li key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <button onClick={() => handleNavClick(item.id)} className="text-white hover:text-[#1DB954] transition cursor-pointer">
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
