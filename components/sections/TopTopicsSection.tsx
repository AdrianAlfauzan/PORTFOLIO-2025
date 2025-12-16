"use client";

import { motion } from "framer-motion";
import AnimatedTitle from "../ui/AnimatedTitle";
import SectionWrapper from "../ui/SectionWrapper";
import TopicCard from "../cards/TopicCard";
import { topTopics } from "@/data/topTopics";
import { Flame } from "lucide-react";

export default function TopTopicsSection() {
  // Split topics untuk layout 2-2-1
  const desktopTopics = [
    topTopics.slice(0, 2), // Baris 1: 2 item
    topTopics.slice(2, 4), // Baris 2: 2 item
    topTopics.slice(4, 5), // Baris 3: 1 item
  ];

  return (
    <SectionWrapper>
      <AnimatedTitle title="Top Topics" icon={Flame} />

      <div className="mt-10 max-w-7xl mx-auto">
        {/* Desktop Layout - Grid 2-2-1 di kanan */}
        <div className="hidden lg:flex flex-col items-end space-y-8">
          {desktopTopics.map((row, rowIndex) => (
            <motion.div
              key={`row-${rowIndex}`}
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.35 }}
              transition={{
                duration: 0.65,
                ease: "easeOut",
                delay: rowIndex * 0.2,
              }}
              className={`flex gap-6 ${row.length === 1 ? "justify-end" : ""}`}
            >
              {row.map((topic, colIndex) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: rowIndex * 0.2 + colIndex * 0.1,
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="
                    relative group
                    rounded-3xl
                    border border-white/10
                    bg-gradient-to-br from-zinc-900/70 to-black/60
                    backdrop-blur-xl
                    p-6
                    w-full
                    transition-all duration-300
                  "
                  style={{
                    width: row.length === 1 ? "100%" : "calc(50% - 12px)",
                    maxWidth: row.length === 1 ? "100%" : "500px",
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1DB954]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Floating number indicator */}
                  <div className="absolute -left-4 top-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#1DB954]/20 to-emerald-500/10 border border-[#1DB954]/30 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-[#1DB954]">{rowIndex * 2 + colIndex + 1}</span>
                  </div>

                  {/* Highlight border on hover */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#1DB954]/20 transition-all duration-500" />

                  <TopicCard {...topic} />
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Tetap grid biasa */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          {topTopics.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.35 }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: i * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="
                relative group
                rounded-3xl
                border border-white/10
                bg-gradient-to-br from-zinc-900/70 to-black/60
                backdrop-blur-xl
                p-6
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1DB954]/14 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Number indicator untuk mobile */}
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#1DB954]/20 to-emerald-500/10 border border-[#1DB954]/30 flex items-center justify-center">
                <span className="text-xs font-bold text-[#1DB954]">{i + 1}</span>
              </div>

              <TopicCard {...topic} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
