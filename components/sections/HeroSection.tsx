"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1DB954]/20 via-black to-black px-6">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.8 }} className="max-w-4xl w-full rounded-3xl bg-zinc-900/70 backdrop-blur-xl p-10 shadow-2xl">
        <p className="text-sm uppercase tracking-widest text-zinc-400 mb-4">2025 · ChatGPT Wrapped</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Adrian’s <span className="text-[#1DB954]">Developer Journey</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          A year of code, configs, caffeine, and the occasional
          <span className="italic"> kok gini sih?</span>
        </p>
      </motion.div>
    </section>
  );
}
