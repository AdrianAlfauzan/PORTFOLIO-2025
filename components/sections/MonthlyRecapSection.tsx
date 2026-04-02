"use client";

import { motion } from "framer-motion";
import { Calendar, Rocket, Code, Book, Zap, Brain, UserCheck } from "lucide-react";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import MonthCard from "@/components/cards/MonthCard";

// Data
import { monthlyRecap } from "@/data/monthlyRecap";

// Helper untuk map bulan ke icon yang relevan dengan tema baru
const getMonthIcon = (month: string) => {
  const iconMap: Record<string, typeof Calendar> = {
    January: UserCheck, // Sesuai tema QA
    February: Brain, // Sesuai tema AI
    March: Rocket, // Sesuai tema Production Launch
    April: Code, // Sesuai tema Backend Systems
    May: Zap, // Sesuai tema Realtime WebRTC
    June: Book, // Sesuai tema Thesis/Research
  };
  return iconMap[month] || Calendar;
};

export default function MonthlyRecapSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Monthly Recap" icon={Calendar} />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {monthlyRecap.map((m, i) => (
          <motion.div
            key={m.month}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.4 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
              delay: i * 0.06,
            }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="relative group"
          >
            {/* Glow Accent menggunakan warna brand hijau Spotify-like */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/15 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <MonthCard
              {...m}
              icon={getMonthIcon(m.month)}
              // Highlight diubah ke indeks 2 (Maret) karena rilis Produksi adalah milestone terbesar
              highlight={i === 2}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
