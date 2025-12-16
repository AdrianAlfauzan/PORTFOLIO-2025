"use client";

import SectionWrapper from "../ui/SectionWrapper";
import AnimatedTitle from "../ui/AnimatedTitle";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, X, ExternalLink, Github } from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (index: number) => {
    setSelectedProject(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <SectionWrapper>
      <AnimatedTitle title="Projects" icon={FolderOpen} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {projects.map((project, i) => (
          <motion.button
            key={project}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 20 },
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleProjectClick(i)}
            className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-6 w-full text-left cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            {/* Click effect overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/0 to-transparent" whileHover={{ opacity: 0.1 }} transition={{ duration: 0.2 }} />

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#1DB954]/10 via-transparent to-transparent" />

            {/* Ripple effect circle */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-[#1DB954]/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{
                scale: 2,
                opacity: 1,
                transition: { duration: 0.6, ease: "easeOut" },
              }}
            />

            <h3 className="relative text-lg font-semibold text-white">{project}</h3>

            <p className="relative mt-2 text-sm text-zinc-400">Experimental project crafted with modern web & mobile stack.</p>

            <div className="relative mt-4 flex items-center justify-between">
              <span className="text-xs text-zinc-500">#{i + 1}</span>

              <motion.span
                className="text-xs font-medium text-[#1DB954] flex items-center gap-1"
                initial={{ opacity: 0, x: -10 }}
                whileHover={{
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.2 },
                }}
              >
                View details
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </motion.span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Modal with detailed project view */}
      <AnimatePresence>
        {isModalOpen && selectedProject !== null && (
          <>
            {/* Backdrop - Klik di area ini juga bisa close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
            />

            {/* Modal content - Tidak menangkap klik untuk mencegah bubbling */}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-2xl rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-900 to-black backdrop-blur-2xl overflow-hidden pointer-events-auto"
                onClick={(e) => e.stopPropagation()} // Stop klik dari bubbling ke backdrop
              >
                {/* Modal header */}
                <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1DB954] to-emerald-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <motion.h2 className="text-2xl font-bold text-white" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        {projects[selectedProject]}
                      </motion.h2>
                      <motion.p className="text-emerald-400 mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        Full-stack Project
                      </motion.p>
                    </div>

                    {/* Tombol close dengan z-index lebih tinggi */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={closeModal}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative z-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 }}
                      aria-label="Close modal"
                    >
                      <X size={20} className="text-zinc-400" />
                    </motion.button>
                  </div>

                  {/* Project content */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-3">Project Details</h3>
                      <p className="text-zinc-300">A sophisticated full-stack application built with modern technologies. This project demonstrates advanced features and clean architecture.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <motion.div className="p-4 rounded-xl bg-white/5 border border-white/10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                        <h4 className="text-sm font-medium text-zinc-400 mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {["React", "Node.js", "TypeScript", "MongoDB", "Tailwind", "AWS"].map((tech) => (
                            <span key={tech} className="px-3 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div className="p-4 rounded-xl bg-white/5 border border-white/10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                        <h4 className="text-sm font-medium text-zinc-400 mb-2">Features</h4>
                        <ul className="space-y-1 text-sm text-zinc-300">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Real-time updates
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Responsive design
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            Authentication system
                          </li>
                        </ul>
                      </motion.div>
                    </div>

                    {/* Action buttons */}
                    <motion.div className="flex gap-4 pt-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        <Github size={18} />
                        Source Code
                      </motion.a>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Floating particles */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
