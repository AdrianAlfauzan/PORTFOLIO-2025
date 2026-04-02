"use client";

import { motion } from "framer-motion";
import { Calendar, LucideIcon } from "lucide-react";

interface MonthCardProps {
  month: string;
  theme: string;
  desc?: string; // Tambahkan desc untuk menampilkan pencapaian nyata
  activityPercent?: number;
  icon?: LucideIcon;
  highlight?: boolean;
}

export default function MonthCard({ month, theme, desc, activityPercent = 50, icon: Icon = Calendar, highlight = false }: MonthCardProps) {
  return (
    <motion.div
      className={`relative group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full ${
        highlight ? "bg-zinc-800/80 border-[#1DB954]/40 shadow-[0_0_20px_rgba(29,185,84,0.1)]" : "bg-zinc-900/70 border-white/10"
      }`}
    >
      {/* Glow Accent */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" />

      <div>
        <div className="flex justify-between items-start mb-4">
          {/* Icon Container */}
          <div className="w-12 h-12 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/20 flex items-center justify-center">
            <Icon size={24} className="text-[#1DB954]" strokeWidth={2} />
          </div>

          {/* Highlight Badge */}
          {highlight && <span className="bg-[#1DB954] text-black text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-bold">Major Milestone</span>}
        </div>

        {/* Month & Theme */}
        <div className="space-y-1">
          <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{month}</h3>
          <h2 className="text-lg font-bold text-white group-hover:text-[#1DB954] transition-colors">{theme}</h2>
        </div>

        {/* Description - Menampilkan detail pekerjaan Anda */}
        {desc && <p className="mt-3 text-sm text-zinc-400 leading-relaxed italic">{desc}</p>}
      </div>

      {/* Progress & Stats Area */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium">
          <span>PRODUCTIVITY</span>
          <span>{activityPercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div initial={{ width: 0 }} whileInView={{ width: `${activityPercent}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-full" />
        </div>
      </div>
    </motion.div>
  );
}
