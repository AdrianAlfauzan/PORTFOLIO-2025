"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type AnimatedTitleProps = {
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
};

export default function AnimatedTitle({ title, icon: Icon }: AnimatedTitleProps) {
  return (
    <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 text-4xl md:text-5xl font-bold mb-12">
      {Icon && <Icon size={36} className="text-[#1DB954]" strokeWidth={2.2} />}
      <span>{title}</span>
    </motion.h2>
  );
}
