"use client";
import { motion } from "framer-motion";
import { Quote, Server, Globe, Database, Terminal, Shield, Cloud, RefreshCw, Bug, Wifi, AlertCircle } from "lucide-react";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function UnexpectedQuestionSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Most Unexpected Question" icon={Quote} />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.3 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative mt-12 mx-auto max-w-4xl">
        {/* Background gradient */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 blur-3xl opacity-30" />

        {/* Main card */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-2xl p-8 md:p-10 overflow-hidden">
          {/* Animated border effect */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          {/* Floating icons background */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

          {/* Icons row */}
          <div className="relative flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            {[
              { icon: Database, label: "PostgreSQL", color: "text-blue-400" },
              { icon: RefreshCw, label: "Cache", color: "text-cyan-400" },
              { icon: Globe, label: "API", color: "text-emerald-400" },
              { icon: Terminal, label: "CLI", color: "text-amber-400" },
              { icon: Bug, label: "Debug", color: "text-red-400" },
              { icon: Wifi, label: "Revalidate", color: "text-violet-400" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ amount: 0.1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center group"
              >
                <div className={`p-3 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-all duration-300 ${item.color} group-hover:scale-110`}>
                  <item.icon size={22} />
                </div>
                <span className="mt-2 text-xs text-zinc-400 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Question quote */}
          <blockquote className="relative mb-8">
            <div className="absolute -left-4 top-0 text-6xl text-blue-500/20 font-serif">&ldquo;</div>
            <p className="relative text-xl md:text-2xl font-medium text-zinc-100 leading-relaxed text-center pl-8 pr-8">&ldquo;Kok data gempa di website masih yang lama, padahal database udah di-update?&rdquo;</p>
            <div className="absolute -right-4 bottom-0 text-6xl text-purple-500/20 font-serif rotate-180">&ldquo;</div>

            <div className="mt-4 text-center">
              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 rounded-full text-sm text-zinc-300 border border-white/10">Pengalaman langsung dari project BMKG Stasiun Geofisika Kepahiang</span>
            </div>
          </blockquote>

          {/* Debugging details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* Root cause */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 p-5 rounded-xl bg-gradient-to-br from-red-900/10 to-transparent border border-red-500/10"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertCircle size={18} className="text-red-400" />
                </div>
                <h3 className="font-semibold text-red-300">Root Cause</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  Cache Redis belum di-flush setelah update database
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  API response format berubah tapi frontend belum adaptif
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  Revalidate path di Next.js masih 60 detik (default)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  Data earthquake dari USGS/BMKG kadang delay 5-10 menit
                </li>
              </ul>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 p-5 rounded-xl bg-gradient-to-br from-emerald-900/10 to-transparent border border-emerald-500/10"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Shield size={18} className="text-emerald-400" />
                </div>
                <h3 className="font-semibold text-emerald-300">Solution Applied</h3>
              </div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  Implement cache invalidation strategy (Redis FLUSHDB)
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  Add API versioning (/v1, /v2) for backward compatibility
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  Setup Next.js ISR with revalidate: 10 seconds
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  Add background job to sync data every 5 minutes
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Key learnings */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.1 }} transition={{ delay: 0.4 }} className="mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Database size={18} className="text-cyan-400" />
              <h3 className="font-semibold text-zinc-200">Key Learnings</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["Cache Management (Redis/Memcached)", "API Versioning Strategy", "Next.js ISR & Revalidation", "BMKG Data Integration", "Background Job dengan BullMQ", "Error Boundary & Fallback UI"].map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-zinc-300 hover:bg-white/10 hover:border-white/10 transition-all duration-300 cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
