"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Command, ArrowLeft, ChevronDown, Home, Star, Target, FolderKanban, Calendar, HelpCircle, PenTool, Trophy, Database, User, MessageSquare, Users, Lock } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// OUR LIBRARIES
import { PAGES, SECTION_IDS } from "@/lib/constants";

// menuCategories
const menuCategories = [
  {
    name: "Core",
    icon: Home,
    items: [
      { label: "Home", id: SECTION_IDS.HERO, icon: Home },
      { label: "Top Topics", id: SECTION_IDS.TOP_TOPICS, icon: Star },
      { label: "Obsession", id: SECTION_IDS.OBSESSION, icon: Target },
    ],
  },
  {
    name: "Work",
    icon: FolderKanban,
    items: [
      { label: "Projects", id: SECTION_IDS.PROJECTS, icon: FolderKanban },
      { label: "CRUD Demo", id: SECTION_IDS.CRUD, icon: Database },
    ],
  },
  {
    name: "Insights",
    icon: PenTool,
    items: [
      { label: "Monthly", id: SECTION_IDS.MONTHLY, icon: Calendar },
      { label: "Most Unexpected", id: SECTION_IDS.UNEXPECTED_QUESTION, icon: HelpCircle },
      { label: "Signature", id: SECTION_IDS.SIGNATURE_STYLE, icon: PenTool },
      { label: "Achievements", id: SECTION_IDS.ACHIEVEMENTS, icon: Trophy },
    ],
  },
  {
    name: "Community",
    icon: Users,
    items: [
      { label: "Guestbook", id: SECTION_IDS.GUESTBOOK, icon: MessageSquare },
      { label: "Admin Panel", id: SECTION_IDS.ADMIN_GUESTBOOK, icon: Lock }, // TAMBAHKAN INI
    ],
  },
];
// Helper function untuk menentukan page type
const getPageType = (pathname: string): "home" | "crud" | "guestbook" | "admin" => {
  if (pathname === PAGES.CRUD) return "crud";
  if (pathname === PAGES.GUESTBOOK) return "guestbook";
  if (pathname === PAGES.ADMIN_GUESTBOOK) return "admin";
  return "home";
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<"home" | "crud" | "guestbook" | "admin">("home");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setCurrentPage(getPageType(pathname));
  }, [pathname]);

  // Smart navigation handler
  const handleNavClick = (sectionId: string) => {
    // Close mobile menu and dropdowns
    setOpen(false);
    setActiveDropdown(null);

    // Handle special pages (CRUD, Guestbook, Admin)
    if (sectionId === SECTION_IDS.CRUD || sectionId === SECTION_IDS.GUESTBOOK || sectionId === SECTION_IDS.ADMIN_GUESTBOOK) {
      const targetPage = sectionId === SECTION_IDS.CRUD ? PAGES.CRUD : sectionId === SECTION_IDS.GUESTBOOK ? PAGES.GUESTBOOK : PAGES.ADMIN_GUESTBOOK; // Untuk admin

      if (pathname === targetPage) {
        // Already on the page, scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Navigate to the page
        router.push(targetPage);
      }
      return;
    }

    // On special pages, clicking home items should go back to home
    if (currentPage !== "home") {
      router.push(`${PAGES.HOME}#${sectionId}`);
      return;
    }

    // On Homepage, handle smooth scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with ID "${sectionId}" not found`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Di handleBackToHome, mungkin perlu handle dari admin:
  const handleBackToHome = () => {
    if (currentPage === "admin") {
      // Dari admin bisa ke guestbook atau home
      router.push(PAGES.GUESTBOOK);
    } else {
      router.push(PAGES.HOME);
    }
  };

  // Get page-specific styling
  const getPageStyle = () => {
    switch (currentPage) {
      case "crud":
        return {
          bgGradient: "from-purple-500/10 to-pink-500/10",
          borderColor: "border-purple-500/20",
          textColor: "text-purple-300",
          ctaGradient: "from-purple-500 to-pink-600",
          ctaHover: "hover:from-purple-600 hover:to-pink-700",
          iconColor: "text-purple-300",
          indicatorColor: "bg-purple-400",
        };
      case "guestbook":
        return {
          bgGradient: "from-blue-500/10 to-cyan-500/10",
          borderColor: "border-blue-500/20",
          textColor: "text-blue-300",
          ctaGradient: "from-blue-500 to-cyan-600",
          ctaHover: "hover:from-blue-600 hover:to-cyan-700",
          iconColor: "text-blue-300",
          indicatorColor: "bg-blue-400",
        };
      case "admin":
        return {
          bgGradient: "from-red-500/10 to-orange-500/10",
          borderColor: "border-red-500/20",
          textColor: "text-red-300",
          ctaGradient: "from-red-500 to-orange-600",
          ctaHover: "hover:from-red-600 hover:to-orange-700",
          iconColor: "text-red-300",
          indicatorColor: "bg-red-400",
        };
      default: // home
        return {
          bgGradient: "from-emerald-500/10 to-blue-500/10",
          borderColor: "border-white/5",
          textColor: "text-white",
          ctaGradient: "from-purple-500 to-pink-600",
          ctaHover: "hover:from-purple-600 hover:to-pink-700",
          iconColor: "text-[#1DB954]",
          indicatorColor: "bg-[#1DB954]",
        };
    }
  };

  const pageStyle = getPageStyle();

  return (
    <>
      {/* ===== MAIN NAVBAR ===== */}
      <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-gradient-to-b from-gray-900/70 via-black/50 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* LEFT: Logo/Title */}
          <div className="flex items-center gap-4">
            {currentPage !== "home" && (
              <motion.button
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToHome}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-white/5 text-emerald-300 hover:text-white hover:border-emerald-400/30 transition-all"
              >
                <ArrowLeft size={18} />
                Back to Home
              </motion.button>
            )}

            <motion.div whileHover={{ scale: 1.02 }} className={`px-5 py-2.5 rounded-xl bg-gradient-to-r border ${pageStyle.bgGradient} ${pageStyle.borderColor}`}>
              <span className="font-bold tracking-wide text-white text-lg">
                {currentPage === "crud" ? (
                  <>
                    <Database size={18} className="inline mr-2 align-middle" />
                    CRUD Dashboard
                  </>
                ) : currentPage === "guestbook" ? (
                  <>
                    <MessageSquare size={18} className="inline mr-2 align-middle" />
                    Guestbook
                  </>
                ) : currentPage === "admin" ? (
                  <>
                    <Lock size={18} className="inline mr-2 align-middle" />
                    Admin Panel
                  </>
                ) : (
                  <>
                    <User size={18} className="inline mr-2 align-middle" />
                    Adrian New Nav
                  </>
                )}
              </span>
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
                    activeDropdown === category.name ||
                    category.items.some(
                      (item) => (item.id === SECTION_IDS.CRUD && currentPage === "crud") || (item.id === SECTION_IDS.GUESTBOOK && currentPage === "guestbook") || (item.id === SECTION_IDS.ADMIN_GUESTBOOK && currentPage === "admin")
                    )
                      ? "bg-white/10 text-white"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
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
                          const isActive =
                            (item.id === SECTION_IDS.CRUD && currentPage === "crud") || (item.id === SECTION_IDS.GUESTBOOK && currentPage === "guestbook") || (item.id === SECTION_IDS.ADMIN_GUESTBOOK && currentPage === "admin");

                          return (
                            <motion.button
                              key={item.id}
                              whileHover={{ x: 5 }}
                              onClick={() => handleNavClick(item.id)}
                              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                isActive ? `bg-gradient-to-r ${pageStyle.bgGradient} ${pageStyle.textColor}` : "text-zinc-300 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              <ItemIcon size={16} />
                              <span className="text-sm">{item.label}</span>
                              {isActive && <span className={`ml-auto w-2 h-2 ${pageStyle.indicatorColor} rounded-full animate-pulse`} />}
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
              onClick={() => {
                if (currentPage === "home") {
                  handleNavClick(SECTION_IDS.CRUD);
                } else if (currentPage === "admin") {
                  handleNavClick(SECTION_IDS.GUESTBOOK);
                } else {
                  handleBackToHome();
                }
              }}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center ${
                currentPage === "home" ? `bg-gradient-to-r ${pageStyle.ctaGradient} ${pageStyle.ctaHover} text-white` : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              }`}
            >
              {currentPage === "home" ? (
                <>
                  <Database size={16} className="mr-2" />
                  CRUD Demo
                </>
              ) : currentPage === "admin" ? (
                <>
                  <MessageSquare size={16} className="mr-2" />
                  View Guestbook
                </>
              ) : (
                <>
                  <Home size={16} className="mr-2" />
                  View Portfolio
                </>
              )}
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
              currentPage !== "home" ? `${pageStyle.bgGradient.split(" ")[0]?.replace("/10", "/40")} ${pageStyle.borderColor}` : "bg-yellow/40 border-white/10"
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
              <Sparkles size={20} className={currentPage !== "home" ? pageStyle.iconColor : "text-[#1DB954]"} />
            </motion.div>

            {/* Dot indicator */}
            {!open && <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse ring-2 ring-black ${pageStyle.indicatorColor}`} />}
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
              {/* Back Button untuk non-home pages */}
              {currentPage !== "home" && (
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
                        const isActive = (item.id === SECTION_IDS.CRUD && currentPage === "crud") || (item.id === SECTION_IDS.GUESTBOOK && currentPage === "guestbook") || (item.id === SECTION_IDS.ADMIN_GUESTBOOK && currentPage === "admin");

                        return (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03 }}
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? `bg-gradient-to-r ${pageStyle.bgGradient} ${pageStyle.textColor}` : "text-white hover:bg-white/10"}`}
                          >
                            <ItemIcon size={18} />
                            <span className="text-base">{item.label}</span>
                            {isActive && <span className={`ml-auto w-2 h-2 ${pageStyle.indicatorColor} rounded-full animate-pulse`} />}
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
                onClick={() => {
                  if (currentPage === "home") {
                    handleNavClick(SECTION_IDS.CRUD);
                  } else if (currentPage === "admin") {
                    handleNavClick(SECTION_IDS.GUESTBOOK); // TAMBAH INI
                  } else {
                    handleBackToHome();
                  }
                }}
                className={`w-full mt-6 px-5 py-3 rounded-xl font-medium transition-all flex items-center justify-center ${
                  currentPage === "home"
                    ? `bg-gradient-to-r ${pageStyle.ctaGradient} text-white`
                    : currentPage === "admin"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white" // TAMBAH STYLE UNTUK ADMIN
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                }`}
              >
                {currentPage === "home" ? (
                  <>
                    <Database size={18} className="mr-2" />
                    Try CRUD Demo
                  </>
                ) : currentPage === "admin" ? (
                  <>
                    <MessageSquare size={18} className="mr-2" />
                    View Guestbook
                  </>
                ) : (
                  <>
                    <Home size={18} className="mr-2" />
                    View Portfolio
                  </>
                )}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
