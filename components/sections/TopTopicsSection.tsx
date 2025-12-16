"use client";

import { motion } from "framer-motion";
import AnimatedTitle from "../ui/AnimatedTitle";
import SectionWrapper from "../ui/SectionWrapper";
import TopicCard from "../cards/TopicCard";
import { topTopics } from "@/data/topTopics";
import { Flame } from "lucide-react";

export default function TopTopicsSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Top Topics" icon={Flame} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
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

            <TopicCard {...topic} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
