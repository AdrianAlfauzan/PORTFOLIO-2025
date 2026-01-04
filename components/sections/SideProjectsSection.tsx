"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight, TestTube } from "lucide-react";
import { useState } from "react";

// OUR DATA & TYPES
import { sideProjects } from "@/data/side-projects";
import { DEFAULT_ITEMS_PER_PAGE, getUniqueCategories } from "@/data/side-projects";
import { SIDE_PROJECT_STATUS_COLORS } from "@/constants/side-projects";
import { SideProject } from "@/types/side-projects";

// OUR COMPONENTS
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Items per page
const ITEMS_PER_PAGE = DEFAULT_ITEMS_PER_PAGE;

export default function SideProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter projects by category
  const filteredProjects = selectedCategory === "all" ? sideProjects : sideProjects.filter((project) => project.category === selectedCategory);

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Get unique categories
  const categories = getUniqueCategories();

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll ke atas section saat ganti page
    const section = document.getElementById("side-projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <SectionWrapper id="side-projects">
      <div className="max-w-6xl mx-auto">
        {/* Header dengan title playful */}
        <div className="text-center mb-12">
          <AnimatedTitle title="Experimental Playground" icon={TestTube} subtitle="Where ideas meet code, just for fun" />

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-sm">A collection of random experiments, weekend projects, and &quot;what if&quot; coding sessions. None of these were client work—just pure curiosity and play!</p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category ? "bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 text-white" : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category === "all" ? "All Experiments" : category}
            </motion.button>
          ))}
        </div>

        {/* Projects Count Info */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Showing <span className="text-white font-medium">{currentProjects.length}</span> of <span className="text-white font-medium">{filteredProjects.length}</span> experiments
          </div>
          <div className="text-sm text-zinc-400">
            Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProjects.map((project: SideProject) => {
            const ProjectIcon = project.icon;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden"
              >
                {/* Status badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border bg-gradient-to-r ${SIDE_PROJECT_STATUS_COLORS[project.status]}`}>{project.status}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon and header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center">
                      <ProjectIcon className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{project.name}</h3>
                      <p className="text-sm text-emerald-400">{project.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-300 mb-4 line-clamp-3">{project.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 text-xs rounded-lg bg-white/5 text-zinc-300 border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features preview */}
                  <div className="mb-4">
                    <div className="text-xs text-zinc-500 mb-2">Features</div>
                    <ul className="space-y-1">
                      {project.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-xs text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {feature}
                        </li>
                      ))}
                      {project.features.length > 2 && <li className="text-xs text-zinc-500">+{project.features.length - 2} more features</li>}
                    </ul>
                  </div>

                  {/* Note */}
                  {project.note && (
                    <div className="p-3 rounded-lg bg-gradient-to-r from-zinc-900/50 to-transparent border border-white/5 mb-4">
                      <p className="text-xs text-zinc-400 italic">&quot;{project.note}&quot;</p>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-zinc-300 hover:text-white transition-colors"
                      >
                        <Github size={14} />
                        Code
                      </motion.a>
                    )}

                    {project.demoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white hover:border-emerald-400/50 transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Info text */}
            <div className="text-sm text-zinc-400">
              Showing experiments {startIndex + 1} - {Math.min(endIndex, filteredProjects.length)} of {filteredProjects.length}
            </div>

            {/* Pagination buttons */}
            <div className="flex items-center gap-2">
              {/* Previous button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border flex items-center gap-1 text-sm transition-all ${
                  currentPage === 1 ? "border-white/10 bg-white/5 text-zinc-500 cursor-not-allowed" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50"
                }`}
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Previous</span>
              </motion.button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show limited page numbers for better UX
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          currentPage === page ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {page}
                      </motion.button>
                    );
                  }

                  // Show ellipsis for skipped pages
                  if ((page === currentPage - 2 && currentPage > 3) || (page === currentPage + 2 && currentPage < totalPages - 2)) {
                    return (
                      <span key={page} className="w-10 h-10 flex items-center justify-center text-zinc-500">
                        ...
                      </span>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Next button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg border flex items-center gap-1 text-sm transition-all ${
                  currentPage === totalPages ? "border-white/10 bg-white/5 text-zinc-500 cursor-not-allowed" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500/50"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>

            {/* Items per page selector (optional) */}
            <div className="text-sm text-zinc-400">{ITEMS_PER_PAGE} per page</div>
          </div>
        )}

        {/* Stats footer */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{sideProjects.length}</div>
              <div className="text-sm text-zinc-400">Total Experiments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">{new Set(sideProjects.map((p) => p.category)).size}</div>
              <div className="text-sm text-zinc-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">{sideProjects.filter((p) => p.demoUrl).length}</div>
              <div className="text-sm text-zinc-400">Live Demos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
              <div className="text-sm text-zinc-400">Just For Fun</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-zinc-500">These projects were built purely out of curiosity, not for clients or profit. Sometimes the best learning happens when you&quot;re just playing around!</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
