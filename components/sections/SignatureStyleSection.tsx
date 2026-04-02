"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Heart, Coffee, Code2, Search, Pencil } from "lucide-react";
// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const styles = [
  {
    icon: Zap,
    text: "AI Assisted & Fast Delivery",
    description: "Leveraging advanced AI tools to accelerate development speed by 30 to 50 percent while maintaining code quality",
  },
  {
    icon: ShieldCheck,
    text: "QA Mindset & Clean Code",
    description: "Deep experience in manual testing and UAT ensuring every feature is stable secure and bug free before deployment",
  },
  {
    icon: Heart,
    text: "Creative & User Centric",
    description: "Focusing on interactive experiences and emotional connection through polished UI and smooth animations",
  },
  {
    icon: Coffee,
    text: "Introverted but Highly Productive",
    description: "A deep worker who thrives in focused environments to deliver high quality results and meet tight deadlines",
  },
  {
    icon: Code2,
    text: "Fullstack Versatility",
    description: "Fluent in bridging the gap between mobile interfaces web platforms and scalable backend architectures",
  },
  {
    icon: Search,
    text: "Detail Oriented Researcher",
    description: "Analyzing complex systems from weather radars to seismic databases with high precision and technical accuracy",
  },
];

export default function SignatureStyleSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Signature Style" icon={Pencil} />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
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
            className="relative group rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-6"
          >
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/12 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <div className="relative flex flex-col items-start gap-4">
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1DB954]/15 to-transparent border border-[#1DB954]/25 flex items-center justify-center">
                <item.icon size={26} className="text-[#1DB954]" strokeWidth={2} />
              </div>

              <div className="space-y-2">
                <h3 className="text-zinc-100 font-bold tracking-wide">{item.text}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
