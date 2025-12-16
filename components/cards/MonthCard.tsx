"use client";

import { motion } from "framer-motion";
import { Calendar, LucideIcon } from "lucide-react";

interface MonthCardProps {
  month: string;
  theme: string;
  activityPercent?: number;
  icon?: LucideIcon;
  highlight?: boolean;
}

export default function MonthCard({ 
  month, 
  theme, 
  activityPercent = 50, 
  icon: Icon = Calendar,
  highlight = false 
}: MonthCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.02 }} 
      className="relative group bg-zinc-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col items-start justify-between h-full"
    >
      {/* Glow Accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/20 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      {/* Highlight Badge */}
      {highlight && (
        <span className="absolute top-3 right-3 bg-[#1DB954]/30 text-[#1DB954] text-xs px-2 py-1 rounded-full font-semibold">
          Peak Month
        </span>
      )}

      {/* Icon Container */}
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1DB954]/15 to-transparent border border-[#1DB954]/25 flex items-center justify-center mb-4">
        <Icon size={24} className="text-[#1DB954]" strokeWidth={2} />
      </div>

      {/* Month Name */}
      <strong className="text-lg font-semibold text-white">{month}</strong>

      {/* Theme */}
      <p className="mt-1 text-sm text-zinc-400">{theme}</p>

      {/* Progress Bar */}
      <div className="w-full mt-4 h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#1DB954] rounded-full transition-all duration-500" 
          style={{ width: `${activityPercent}%` }} 
        />
      </div>
    </motion.div>
  );
}