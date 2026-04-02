"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, Target, Medal, Flame, Eye, Calendar, Building2, UserCog, FileText } from "lucide-react";
import Image from "next/image";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Modal from "@/components/ui/Modal";

// Data
import { achievements, Achievement } from "@/data/achievements";

export default function AchievementSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const achievementIcons = [Trophy, Award, Star, Target, Medal, Flame];

  const handleCardClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAchievement(null), 300);
  };

  return (
    <SectionWrapper>
      <AnimatedTitle title="Achievements" icon={Trophy} />

      <div className="mt-10 relative">
        {/* Garis timeline tengah */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#1DB954]/20 via-[#1DB954]/5 to-transparent hidden md:block" />

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {achievements.map((achievement, i) => {
            const Icon = achievementIcons[i % achievementIcons.length];
            const isLeft = i % 2 === 0; // Genap di kiri, ganjil di kanan

            return (
              <motion.button
                key={achievement.id}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ amount: 0.3, once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: i * 0.1,
                }}
                whileHover={{ y: -4 }}
                onClick={() => handleCardClick(achievement)}
                className={`relative group w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
              >
                {/* Dot pada timeline */}
                <div className={`absolute top-6 hidden md:block ${isLeft ? "-right-12" : "-left-12"} w-4 h-4 rounded-full bg-[#1DB954] border-2 border-black shadow-lg shadow-[#1DB954]/20 z-10`}>
                  <div className="absolute inset-0 rounded-full bg-[#1DB954] animate-ping opacity-75" />
                </div>

                {/* Card */}
                <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-6 text-left cursor-pointer overflow-hidden transition-all duration-300 group-hover:border-[#1DB954]/30 group-hover:shadow-lg group-hover:shadow-[#1DB954]/5">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/8 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                  {/* Corner accent */}
                  <div className={`absolute top-0 ${isLeft ? "left-0" : "right-0"} w-20 h-20 overflow-hidden pointer-events-none`}>
                    <div className={`absolute ${isLeft ? "-left-10 -top-10" : "-right-10 -top-10"} w-20 h-20 bg-[#1DB954]/10 rotate-45`} />
                  </div>

                  <div className="relative flex flex-col sm:flex-row items-start gap-4">
                    {/* Icon Container */}
                    <motion.div
                      initial={{ scale: 0.8, rotate: isLeft ? -5 : 5 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1DB954]/15 to-transparent border border-[#1DB954]/25 flex items-center justify-center flex-shrink-0"
                    >
                      <Icon size={24} className="text-[#1DB954]" strokeWidth={2} />
                    </motion.div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <p className="text-zinc-200 leading-relaxed font-semibold text-lg">{achievement.title}</p>
                        <span className="text-xs text-zinc-500 flex items-center gap-1 whitespace-nowrap">
                          <Calendar size={12} />
                          {achievement.date}
                        </span>
                      </div>

                      <p className="text-emerald-400/80 text-sm mt-1 flex items-center gap-1">
                        <Building2 size={12} />
                        {achievement.organization}
                      </p>

                      <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{achievement.description}</p>

                      <div className="flex items-center justify-end mt-4">
                        <span className="text-sm text-[#1DB954] flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                          View certificate
                          <Eye size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Garis penghubung ke timeline */}
                <div className={`absolute top-6 hidden md:block w-8 h-px bg-gradient-to-r from-[#1DB954]/30 to-transparent ${isLeft ? "-right-8" : "-left-8"} ${isLeft ? "rotate-180" : ""}`} />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal untuk menampilkan sertifikat */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedAchievement?.title} subtitle={selectedAchievement?.organization} size="lg">
        {selectedAchievement && (
          <div className="space-y-6">
            {/* Certificate Image */}
            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/30">
              <div className="relative w-full aspect-[3/4] md:aspect-[4/3]">
                <Image src={selectedAchievement.imagePath} alt={selectedAchievement.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 800px" loading="lazy" />
              </div>
            </div>

            {/* Certificate Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                  <UserCog size={16} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Role</p>
                  <p className="text-sm text-white font-medium">{selectedAchievement.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                  <Calendar size={16} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Date</p>
                  <p className="text-sm text-white font-medium">{selectedAchievement.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                  <Building2 size={16} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Organization</p>
                  <p className="text-sm text-white font-medium">{selectedAchievement.organization}</p>
                </div>
              </div>

              {selectedAchievement.certificateNumber && selectedAchievement.certificateNumber !== "-" && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
                    <FileText size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Certificate Number</p>
                    <p className="text-sm text-white font-mono">{selectedAchievement.certificateNumber}</p>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-zinc-500 mb-1">Description</p>
                <p className="text-sm text-zinc-300 leading-relaxed">{selectedAchievement.description}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
