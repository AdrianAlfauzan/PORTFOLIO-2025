"use client";

import { motion } from "framer-motion";
import { Globe, Bug, Database, Code2, ShieldCheck, Rocket, Pencil } from "lucide-react";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const styles = [
  {
    icon: Globe,
    text: "Fullstack Developer (Web & Mobile)",
    description: "Membangun website dan aplikasi mobile dengan Next.js, React Native, dan NestJS. Terbukti di 3 proyek BMKG dan PTSP Bengkulu.",
  },
  {
    icon: Bug,
    text: "Quality Assurance & Manual Testing",
    description: "2+ tahun pengalaman QA freelance di Atmos Education & PT Tekno Indo Kreatis. Functional, Integration, E2E, Regression, dan UAT testing.",
  },
  {
    icon: Database,
    text: "Database & API Integration",
    description: "Mengelola PostgreSQL, MySQL, MongoDB, Firebase. Integrasi REST API dengan Postman, Swagger, dan SQL query untuk validasi data.",
  },
  {
    icon: ShieldCheck,
    text: "Government & Mission-Critical Systems",
    description: "Berpengalaman di 3 BMKG (Meteorologi, Klimatologi, Geofisika) dan BASARNAS - sistem yang butuh akurasi & real-time.",
  },
  {
    icon: Code2,
    text: "Fullstack & Backend Architecture",
    description: "Membangun RESTful API, CMS, role-based dashboard, real-time chat (WebRTC/WebSockets), dan cache management (Redis).",
  },
  {
    icon: Rocket,
    text: "DevOps & CI/CD",
    description: "Deployment di VPS Hostinger, DNS management, CI/CD dengan GitHub Actions, dan monitoring aplikasi production.",
  },
];

export default function SignatureStyleSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Specialization" icon={Pencil} />

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
