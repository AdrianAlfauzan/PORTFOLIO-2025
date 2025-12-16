"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedTitle from "../ui/AnimatedTitle";
import { MessageSquare, Layers, FileX, Pencil } from "lucide-react";

const styles = [
  {
    icon: MessageSquare,
    text: "Bahasa santai, to the point",
  },
  {
    icon: Layers,
    text: "Suka step jelas & full code",
  },
  {
    icon: FileX,
    text: "Anti jawaban kepanjangan",
  },
];

export default function SignatureStyleSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Signature Style" icon={Pencil} />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
        {styles.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.08,
            }}
            whileHover={{ y: -4 }}
            className="relative group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-6 text-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/12 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="relative flex flex-col items-center gap-4">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1DB954]/15 to-transparent border border-[#1DB954]/25 flex items-center justify-center">
                <item.icon size={26} className="text-[#1DB954]" strokeWidth={2} />
              </div>

              <p className="text-zinc-200 font-medium">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
