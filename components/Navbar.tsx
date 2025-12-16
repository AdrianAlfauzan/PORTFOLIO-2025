"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, Command } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Top Topics", href: "#top-topics" },
  { label: "Obsession", href: "#obsession" },
  { label: "Projects", href: "#projects" },
  { label: "Monthly", href: "#monthly" },
  { label: "Most Unexpected Question", href: "#unexpected-question" },
  { label: "Signature", href: "#signature-style" },
  { label: "Achievements", href: "#achievements" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center md:justify-between items-center">
          {/* TITLE CENTER */}
          <span className="font-bold text-lg tracking-wide text-white md:text-xl">🎧 Adrian Wrapped</span>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 text-sm text-zinc-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-[#1DB954] transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* ===== HAMBURGER BUTTON MOBILE (FIXED) ===== */}
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
                  <motion.li key={item.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <a href={item.href} onClick={() => setOpen(false)} className="text-white hover:text-[#1DB954] transition">
                      {item.label}
                    </a>
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
