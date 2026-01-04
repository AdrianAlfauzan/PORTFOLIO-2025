"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, X, ExternalLink, Github, Figma, Calendar, Users, Code, Shield, Wifi, Brain, Cpu, Sparkles } from "lucide-react";
import { useState } from "react";

// OUR DATA & TYPES
import { projects } from "@/data/projects";
import { Project } from "@/types/projects";

// OUR COMPONENTS
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Category Icons Mapping
const categoryIcons: Record<string, React.ReactNode> = {
  // ← Fix type
  "Mobile Development": <Cpu className="w-4 h-4" />,
  "Web Development": <Code className="w-4 h-4" />,
  "Real-time Apps": <Wifi className="w-4 h-4" />,
  "Security Tools": <Shield className="w-4 h-4" />,
  "IoT & AI": <Brain className="w-4 h-4" />,
};

// Status Colors
const statusColors: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "in-progress": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  planned: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  archived: "bg-gray-500/10 text-gray-300 border-gray-500/20",
};

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <SectionWrapper id="projects">
      <AnimatedTitle title="Featured Projects" icon={FolderOpen} />

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
        {projects
          .filter((p) => p.featured)
          .map((project) => (
            <motion.button
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleProjectClick(project)}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-6 w-full text-left cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 flex items-center gap-1">
                    <Sparkles size={12} className="text-yellow-300" />
                    <span className="text-xs font-medium text-yellow-300">Featured</span>
                  </div>
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${statusColors[project.status]}`}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
              </div>

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

              {/* Project Icon/Image Placeholder */}
              <div className="relative mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">{categoryIcons[project.category] || <Code className="w-6 h-6 text-emerald-300" />}</div>
              </div>

              <h3 className="relative text-lg font-semibold text-white">{project.name}</h3>
              <p className="relative mt-1 text-sm text-emerald-400">{project.tagline}</p>
              <p className="relative mt-3 text-sm text-zinc-400 line-clamp-2">{project.description}</p>

              {/* Tech Stack Preview */}
              <div className="relative mt-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-1 text-xs rounded-full bg-white/5 text-zinc-300 border border-white/10">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && <span className="px-2 py-1 text-xs rounded-full bg-white/5 text-zinc-400 border border-white/10">+{project.techStack.length - 3} more</span>}
              </div>

              {/* Footer */}
              <div className="relative mt-6 flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {project.year}
                  </span>
                  {project.teamSize && (
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {project.teamSize} {project.teamSize === 1 ? "person" : "people"}
                    </span>
                  )}
                </div>

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

      {/* ========== MODAL FIXED Z-INDEX ========== */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <>
            {/* Backdrop dengan z-index tinggi */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] flex items-center justify-center p-4 cursor-pointer"
            />

            {/* Modal content dengan z-index lebih tinggi */}
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
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-4xl rounded-2xl border border-white/20 bg-gradient-to-br from-zinc-900 to-black backdrop-blur-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal header - TIDAK SCROLL */}
                <div className="flex-shrink-0">
                  <motion.div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1DB954] to-emerald-400" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />

                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[selectedProject.status]}`}>{selectedProject.status.charAt(0).toUpperCase() + selectedProject.status.slice(1)}</span>
                          {selectedProject.featured && (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-300 flex items-center gap-1">
                              <Sparkles size={14} />
                              Featured
                            </span>
                          )}
                        </div>

                        <motion.h2 className="text-2xl md:text-3xl font-bold text-white" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                          {selectedProject.name}
                        </motion.h2>
                        <motion.p className="text-emerald-400 text-lg mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                          {selectedProject.tagline}
                        </motion.p>
                      </div>

                      {/* Tombol close */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={closeModal}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative z-10 ml-4"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <X size={20} className="text-zinc-400" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* CONTENT AREA - CLEAN MODERN DESIGN */}
                <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 md:pb-8">
                  <div className="h-full pr-3">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }} className="space-y-8">
                      {/* ===== PROJECT INFO SECTION ===== */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Project Info Card */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm shadow-lg">
                          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                                {/* Animated glowing dot */}
                                <div className="relative">
                                  <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse" />
                                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-emerald-400  opacity-50" />
                                </div>
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-white tracking">Project Info</h4>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                              <div className="flex items-center gap-2">
                                {/* Category dot - blinking green */}
                                <div className="relative">
                                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-70" />
                                </div>
                                <span className="text-sm text-zinc-400">Category</span>
                              </div>
                              <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">{selectedProject.category}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                              <div className="flex items-center gap-2">
                                {/* Year dot - blinking blue */}
                                <div className="relative">
                                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-blue-400 animate-ping opacity-70" />
                                </div>
                                <span className="text-sm text-zinc-400">Year</span>
                              </div>
                              <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">{selectedProject.year}</span>
                            </div>

                            {selectedProject.role && (
                              <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                  {/* Role dot - blinking purple */}
                                  <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-purple-400 animate-ping opacity-70" />
                                  </div>
                                  <span className="text-sm text-zinc-400">Role</span>
                                </div>
                                <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">{selectedProject.role}</span>
                              </div>
                            )}

                            {selectedProject.teamSize && (
                              <div className="flex items-center justify-between py-2">
                                <div className="flex items-center gap-2">
                                  {/* Team size dot - blinking amber */}
                                  <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-70" />
                                  </div>
                                  <span className="text-sm text-zinc-400">Team Size</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex -space-x-2">
                                    {[...Array(Math.min(selectedProject.teamSize, 3))].map((_, i) => (
                                      <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400/20 to-blue-400/20 border border-emerald-400/30 flex items-center justify-center">
                                        <span className="text-xs font-medium text-emerald-300">P{i + 1}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-white">{selectedProject.teamSize}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description Card */}
                        <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm shadow-lg">
                          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                                {/* Animated glowing dot */}
                                <div className="relative">
                                  <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse" />
                                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-blue-400  opacity-50" />
                                </div>
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-white tracking">Description</h4>
                          </div>

                          <p className="text-zinc-300 leading-relaxed text-sm">{selectedProject.description}</p>

                          {/* Tech highlights */}
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.techStack.slice(0, 4).map((tech) => (
                                <span key={tech} className="text-xs text-blue-400/70">
                                  #{tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ===== TECH STACK SECTION ===== */}
                      <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm shadow-lg">
                        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
                              {/* Animated glowing dot */}
                              <div className="relative">
                                <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse" />
                                <div className="absolute inset-0 w-4 h-4 rounded-full bg-amber-400  opacity-50" />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-sm font-semibold text-white tracking">Tech Stack</h4>
                          <span className="ml-auto text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">{selectedProject.techStack.length} technologies</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {selectedProject.techStack.map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.03 }}
                              className="px-3 py-2 text-sm rounded-lg bg-gradient-to-br from-white/5 to-white/2 border border-white/10 
                       hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all duration-200 
                       text-white font-medium"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* ===== FEATURES & CHALLENGES SECTION ===== */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Features Card */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm shadow-lg">
                          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center">
                                {/* Animated glowing dot */}
                                <div className="relative">
                                  <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />
                                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-400  opacity-50" />
                                </div>
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-white tracking">Key Features</h4>
                            <span className="ml-auto text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">{selectedProject.features.length} features</span>
                          </div>

                          <ul className="space-y-3">
                            {selectedProject.features.map((feature, index) => (
                              <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors"
                              >
                                {/* Feature dot - blinking green */}
                                <div className="relative mt-2">
                                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-400 animate-ping opacity-70" />
                                </div>
                                <span className="text-sm text-zinc-300 leading-relaxed">{feature}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Challenges Card */}
                        {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm shadow-lg">
                            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                              <div className="relative">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
                                  {/* Animated glowing dot */}
                                  <div className="relative">
                                    <div className="w-4 h-4 rounded-full bg-orange-400 animate-pulse" />
                                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-orange-400  opacity-50" />
                                  </div>
                                </div>
                              </div>
                              <h4 className="text-sm font-semibold text-white tracking">Challenges & Solutions</h4>
                              <span className="ml-auto text-xs font-medium text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full">{selectedProject.challenges.length} challenges</span>
                            </div>

                            <ul className="space-y-3">
                              {selectedProject.challenges.map((challenge, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: 5 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  className="flex items-start gap-3 p-3 rounded-lg bg-white/2 hover:bg-white/5 transition-colors"
                                >
                                  {/* Challenge dot - blinking orange */}
                                  <div className="relative mt-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-orange-400 animate-ping opacity-70" />
                                  </div>
                                  <span className="text-sm text-zinc-300 leading-relaxed">{challenge}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* ===== LEARNINGS SECTION (Optional) ===== */}
                      {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/10 backdrop-blur-sm shadow-lg">
                          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                            <div className="relative">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 flex items-center justify-center">
                                {/* Animated glowing dot */}
                                <div className="relative">
                                  <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
                                  <div className="absolute inset-0 w-4 h-4 rounded-full bg-cyan-400 animate-ping opacity-50" />
                                </div>
                              </div>
                            </div>
                            <h4 className="text-sm font-semibold text-white tracking">Key Learnings</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedProject.learnings.map((learning, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10 
                         hover:border-cyan-500/20 transition-all"
                              >
                                <span className="text-sm text-zinc-300">{learning}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* FOOTER - TIDAK SCROLL */}
                <div className="flex-shrink-0 px-6 md:px-8 pb-6 md:pb-8">
                  {/* Action buttons */}
                  <motion.div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    {selectedProject.liveDemoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.a>
                    )}

                    {selectedProject.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors"
                      >
                        <Github size={18} />
                        Source Code
                      </motion.a>
                    )}

                    {selectedProject.figmaUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 font-medium transition-colors border border-purple-500/20"
                      >
                        <Figma size={18} />
                        Design
                      </motion.a>
                    )}
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
