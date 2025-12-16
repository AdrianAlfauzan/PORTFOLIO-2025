"use client";

import { motion } from "framer-motion";
import SectionWrapper from "../ui/SectionWrapper";
import AnimatedTitle from "../ui/AnimatedTitle";
import { monthlyRecap } from "@/data/monthlyRecap";
import MonthCard from "../cards/MonthCard";
import { Calendar, Rocket, TrendingUp, Code, Book, Zap, Users, Lightbulb, Target, Star, Award, Gem } from "lucide-react";

// Helper untuk map bulan ke icon
const getMonthIcon = (month: string) => {
  const iconMap: Record<string, typeof Calendar> = {
    January: Rocket,
    February: TrendingUp,
    March: Code,
    April: Book,
    May: Zap,
    June: Users,
    July: Lightbulb,
    August: Target,
    September: Star,
    October: Award,
    November: Gem,
    December: Calendar,
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
            {/* Glow Accent */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1DB954]/15 to-transparent opacity-0 group-hover:opacity-100 transition" />

            <MonthCard
              {...m}
              icon={getMonthIcon(m.month)}
              highlight={i === 0 || i === 5} // Jan & Jun sebagai highlight
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
