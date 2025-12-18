"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Command, ArrowLeft, ChevronDown, Home, Star, Target, FolderKanban, Calendar, HelpCircle, PenTool, Trophy, Database } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Menu dengan 3 kategori
const menuCategories = [
  {
    name: "Core",
    icon: Home,
    items: [
      { label: "Home", id: "hero", icon: Home },
      { label: "Top Topics", id: "top-topics", icon: Star },
      { label: "Obsession", id: "obsession", icon: Target },
    ],
  },
  {
    name: "Work",
    icon: FolderKanban,
    items: [
      { label: "Projects", id: "projects", icon: FolderKanban },
      { label: "CRUD Demo", id: "crud", icon: Database },
    ],
  },
  {
    name: "Insights",
    icon: PenTool,
    items: [
      { label: "Monthly", id: "monthly", icon: Calendar },
      { label: "Most Unexpected", id: "unexpected-question", icon: HelpCircle },
      { label: "Signature", id: "signature-style", icon: PenTool },
      { label: "Achievements", id: "achievements", icon: Trophy },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isCrudPage, setIsCrudPage] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsCrudPage(pathname === "/crud");
  }, [pathname]);

  // Smart navigation handler
  const handleNavClick = (sectionId: string) => {
    // Close mobile menu and dropdowns
    setOpen(false);
    setActiveDropdown(null);

    // 1. CRUD Demo navigation
    if (sectionId === "crud") {
      if (isCrudPage) {
        // Already on CRUD page, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navigate to CRUD page
        router.push("/crud");
      }
      return;
    }

    // 2. On CRUD page, clicking other items
    if (isCrudPage) {
      // Navigate back to home with hash
      router.push(`/#${sectionId}`);
      return;
    }

    // 3. On Homepage, handle smooth scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      if (pathname !== "/") {
        router.push(`/#${sectionId}`);
      } else {
        console.warn(`Element with ID "${sectionId}" not found`);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <>
      {/* ===== MAIN NAVBAR ===== */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-gray-900/70 via-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LEFT: Logo/Title */}
          <div className="flex items-center gap-4">
            {isCrudPage && (
              <motion.button
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToHome}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-white/5 text-emerald-300 hover:text-white hover:border-emerald-400/30 transition-all"
              >
                <ArrowLeft size={18} />
                Back
              </motion.button>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`px-5 py-2.5 rounded-xl bg-gradient-to-r border ${isCrudPage ? "from-purple-500/10 to-pink-500/10 border-purple-500/20" : "from-emerald-500/10 to-blue-500/10 border-white/5"}`}
            >
              <span className="font-bold tracking-wide text-white text-lg">{isCrudPage ? "🚀 CRUD" : "Adrian M. A."}</span>
            </motion.div>
          </div>

          {/* CENTER: Desktop Menu dengan 3 Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {menuCategories.map((category) => (
              <div key={category.name} className="relative" onMouseEnter={() => setActiveDropdown(category.name)} onMouseLeave={() => setActiveDropdown(null)}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
                    activeDropdown === category.name || category.items.some((item) => item.id === "crud" && isCrudPage) ? "bg-white/10 text-white" : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <category.icon size={18} />
                  <span className="text-sm font-medium">{category.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === category.name ? "rotate-180" : ""}`} />
                </motion.button>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {activeDropdown === category.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {category.items.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <motion.button
                              key={item.id}
                              whileHover={{ x: 5 }}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${item.id === "crud" && isCrudPage ? "bg-purple-500/20 text-purple-300" : "text-zinc-300 hover:bg-white/10 hover:text-white"}`}
                            >
                              <ItemIcon size={16} />
                              <span className="text-sm">{item.label}</span>
                              {item.id === "crud" && isCrudPage && <span className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* RIGHT: CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick(isCrudPage ? "hero" : "crud")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                isCrudPage ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white" : "bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
              }`}
            >
              {isCrudPage ? "🏠 View Portfolio" : "🚀 CRUD Demo"}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ===== HAMBURGER BUTTON MOBILE ===== */}
      <button onClick={() => setOpen(!open)} className="md:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50 group">
        <div className="relative">
          {/* Background pill */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-r-full bg-black/60 backdrop-blur-xl border border-white/10 border-l-0 -translate-x-1/2 group-hover:bg-black/80 transition-all" />

          {/* Icon container */}
          <div
            className={`relative z-10 ml-0 w-10 h-10 rounded-full backdrop-blur-lg border flex items-center justify-center group-hover:border-white/20 transition-all ${
              isCrudPage ? "bg-purple-500/40 border-purple-500/30" : "bg-yellow/40 border-white/10"
            }`}
          >
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
              <Sparkles size={20} className={isCrudPage ? "text-purple-300" : "text-[#1DB954]"} />
            </motion.div>

            {/* Dot indicator */}
            {!open && <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse ring-2 ring-black ${isCrudPage ? "bg-purple-400" : "bg-[#1DB954]"}`} />}
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
              className="fixed bottom-6 left-4 right-4 z-50 rounded-3xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 p-6 max-h-[70vh] overflow-y-auto"
            >
              {/* Back Button untuk CRUD page */}
              {isCrudPage && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleBackToHome}
                  className="w-full mb-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </motion.button>
              )}

              {/* Mobile Menu Items dengan Kategori */}
              <div className="space-y-1">
                {menuCategories.map((category) => (
                  <div key={category.name} className="mb-4">
                    <div className="flex items-center gap-2 text-xs uppercase text-zinc-500 font-semibold tracking-wider mb-2 px-2">
                      <category.icon size={14} />
                      {category.name}
                    </div>
                    <div className="space-y-1">
                      {category.items.map((item, i) => {
                        const ItemIcon = item.icon;
                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.id === "crud" && isCrudPage ? "bg-purple-500/20 text-purple-300" : "text-white hover:bg-white/10"}`}
                          >
                            <ItemIcon size={18} />
                            <span className="text-base">{item.label}</span>
                            {item.id === "crud" && isCrudPage && <span className="ml-auto w-2 h-2 bg-purple-400 rounded-full animate-pulse" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => handleNavClick(isCrudPage ? "hero" : "crud")}
                className={`w-full mt-6 px-5 py-3 rounded-xl font-medium transition-all ${isCrudPage ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white" : "bg-gradient-to-r from-purple-500 to-pink-600 text-white"}`}
              >
                {isCrudPage ? "🏠 View Portfolio" : "🚀 Try CRUD Demo"}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
