"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedTitle from "../ui/AnimatedTitle";
import { Brain } from "lucide-react";

export default function ObsessionSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Biggest Obsession" icon={Brain} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mt-10 max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-8"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1DB954]/14 to-transparent opacity-0 hover:opacity-100 transition" />

        <p className="relative text-lg md:text-xl text-zinc-200 leading-relaxed">
          Loops, repeats, copy-paste nightmares? I turn them into <span className="text-[#1DB954] font-semibold">sleek reusable hooks</span>.
          <br />
          <span className="text-zinc-400 text-base mt-2 block">One rule: clean code or bust.</span>
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
