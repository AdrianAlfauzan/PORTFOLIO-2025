"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedTitle from "../ui/AnimatedTitle";
import { achievements } from "@/data/achievements";
import { Trophy, Award, Star, Target, Medal, Flame } from "lucide-react";

export default function AchievementSection() {
  // Pilih icon secara bergantian
  const achievementIcons = [Trophy, Award, Star, Target, Medal, Flame];

  return (
    <SectionWrapper>
      <AnimatedTitle title="Achievements" icon={Trophy} />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
        {achievements.map((a, i) => {
          const Icon = achievementIcons[i % achievementIcons.length];

          return (
            <motion.div
              key={a}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.4 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: i * 0.06,
              }}
              whileHover={{ y: -4 }}
              className="relative group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-5"
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/12 to-transparent opacity-0 group-hover:opacity-100 transition" />

              <div className="relative flex items-start gap-4">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1DB954]/15 to-transparent border border-[#1DB954]/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-[#1DB954]" strokeWidth={2} />
                </div>

                <p className="text-zinc-200 leading-relaxed pt-1">{a}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
