"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function ObsessionSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Biggest Obsession" icon={Brain} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mt-10 max-w-3xl ml-auto rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-8"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1DB954]/14 to-transparent opacity-0 hover:opacity-100 transition" />

        <p className="relative text-lg md:text-xl text-zinc-200 leading-relaxed text-right">
          Loops, repeats, and messy logic? I turn them into <span className="text-[#1DB954] font-semibold">clean, reusable systems</span>.
          <br />
          <span className="text-zinc-400 text-base mt-2 block">Hooks, structure, and scalability — because &quot;it works&quot; is never enough.</span>
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
