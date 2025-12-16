"use client";
import { motion } from "framer-motion";
import { Sparkles, Code, Coffee, Cpu, FolderKanban, Layers, Bug, CupSoda } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function HeroSection() {
  // State untuk counter dengan variasi
  const [projects, setProjects] = useState(50);
  const [techStack, setTechStack] = useState(21);
  const [bugsFixed, setBugsFixed] = useState(1000);
  const [coffeeCount, setCoffeeCount] = useState(500);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Deklarasi function lebih awal dengan useCallback
  const startContinuousCounting = useCallback(() => {
    if (!isVisible) return;

    // Interval untuk Projects (bergerak antara 48-52)
    const projectsInterval = setInterval(() => {
      setProjects((prev) => {
        // Tambah atau kurangi secara random
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        // Batasi antara 48-52
        return Math.max(48, Math.min(52, newValue));
      });
    }, 2000); // Ubah setiap 2 detik

    // Interval untuk Tech Stack (bergerak antara 20-22)
    const techInterval = setInterval(() => {
      setTechStack((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(20, Math.min(22, newValue));
      });
    }, 2500);

    // Interval untuk Bugs Fixed (bergerak antara 980-1020)
    const bugsInterval = setInterval(() => {
      setBugsFixed((prev) => {
        // Perubahan lebih besar untuk bugs
        const change = Math.floor(Math.random() * 10) - 5; // -5 sampai +5
        const newValue = prev + change;
        return Math.max(980, Math.min(1020, newValue));
      });
    }, 1500);

    // Interval untuk Coffee (selalu bertambah!)
    const coffeeInterval = setInterval(() => {
      setCoffeeCount((prev) => {
        // Selalu bertambah, lebih cepat dari yang lain
        const increase = Math.floor(Math.random() * 3) + 1; // 1-3
        return prev + increase;
      });
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(projectsInterval);
      clearInterval(techInterval);
      clearInterval(bugsInterval);
      clearInterval(coffeeInterval);
    };
  }, [isVisible]);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Jalankan continuous counting saat isVisible berubah
  useEffect(() => {
    if (isVisible) {
      const cleanup = startContinuousCounting();
      return cleanup;
    }
  }, [isVisible, startContinuousCounting]);

  // Data stats dengan icon lucide
  const stats = [
    {
      label: "Projects",
      value: `${projects}+`,
      color: "text-emerald-400",
      icon: FolderKanban,
      description: "Active & deployed",
    },
    {
      label: "Tech Stack",
      value: `${techStack}+`,
      color: "text-blue-400",
      icon: Layers,
      description: "Mastered tools",
    },
    {
      label: "Cups of Coffee",
      value: coffeeCount > 1000 ? "∞" : `${coffeeCount}+`,
      color: "text-purple-400",
      icon: CupSoda,
      description: "And counting...",
    },
    {
      label: "Bugs Fixed",
      value: `${bugsFixed}+`,
      color: "text-amber-400",
      icon: Bug,
      description: "Squashed!",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900/20 via-black to-black px-6 overflow-hidden relative pt-20 md:pt-24">
      {/* Navbar space */}
      <div className="absolute top-0 left-0 right-0 h-20 md:h-24" />
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-6xl w-full mt-8">
        {/* Main content card */}
        <div className="rounded-3xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-2xl p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-transparent to-blue-500/20 opacity-50" />
          {/* Icons row */}
          <div className="flex justify-center gap-8 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Code className="text-emerald-400" size={28} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Cpu className="text-blue-400" size={28} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Coffee className="text-purple-400" size={28} />
            </motion.div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400 mb-4 px-4 py-2 rounded-full bg-white/5">
              <Sparkles size={14} className="text-emerald-400" />
              2025 · Tech Journey · Full Stack Dev
              <Sparkles size={14} className="text-emerald-400" />
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Adrian&apos;s</span>
              <br />
              <span className="text-white">Code Chronicles</span>
            </motion.h1>
          </div>

          {/* Main description */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="max-w-2xl mx-auto mb-10">
            <p className="text-xl md:text-2xl text-zinc-300 text-center leading-relaxed">
              From <span className="font-semibold text-emerald-300">pentester scripts</span> to <span className="font-semibold text-blue-300">full-stack apps</span>. 3 years of building, debugging, and turning coffee into{" "}
              <span className="italic text-purple-300">clean code</span>.
            </p>
          </motion.div>

          {/* Stats row dengan continuous animation */}
          <div ref={sectionRef}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                      delay: 1 + index * 0.1,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="relative text-center p-4 rounded-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-300 group overflow-hidden"
                  >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    {/* Animated icon */}
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                      className="flex justify-center mb-2"
                    >
                      <div className={`p-2 rounded-lg ${stat.color.replace("text-", "bg-")}/10 border ${stat.color.replace("text-", "border-")}/20`}>
                        <IconComponent className={`${stat.color}`} size={24} />
                      </div>
                    </motion.div>

                    {/* Counter dengan animasi */}
                    <motion.div key={stat.value} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`text-3xl font-bold ${stat.color} font-mono mb-1`}>
                      {stat.value}
                    </motion.div>

                    <div className="text-sm text-zinc-400 mb-1">{stat.label}</div>
                    <div className="text-xs text-zinc-500">{stat.description}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, repeat: Infinity, duration: 2 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-zinc-500 mb-2">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-emerald-500/30 flex justify-center">
                <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
