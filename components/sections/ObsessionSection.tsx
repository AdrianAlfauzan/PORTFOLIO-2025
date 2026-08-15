"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

export default function ObsessionSection() {
  return (
    <SectionWrapper>
      <AnimatedTitle title="Biggest Obsession" icon={Brain} />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mt-10 max-w-3xl ml-auto rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/70 to-black/60 backdrop-blur-xl p-8 md:p-10"
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1DB954]/14 to-transparent opacity-0 hover:opacity-100 transition" />

        {/* Quote mark */}
        <div className="absolute -top-3 -left-2 text-7xl text-[#1DB954]/10 font-serif leading-none">&ldquo;</div>

        <p className="relative text-lg md:text-xl text-zinc-100 leading-relaxed text-right">
          <span className="text-[#1DB954] font-semibold">Kalau suatu hari nanti gua berhasil,</span> gua harap gua gak pernah lupa sama versi diri gua yang pernah berjuang ketika belum ada apa-apa.
          <br />
          <br />
          Versi yang tetap mencoba ketika gagal. Tetap belajar ketika gak punya uang. Tetap membangun ketika gak ada yang percaya. Dan tetap bermimpi ketika keadaan seolah-olah menyuruh gua untuk menyerah.
        </p>

        <div className="relative mt-6 text-right">
          <span className="inline-block text-sm text-zinc-500 italic">— Adrian Musa Alfauzan</span>
        </div>

        {/* Penutup kutipan */}
        <div className="absolute -bottom-3 -right-2 text-7xl text-[#1DB954]/10 font-serif leading-none rotate-180">&ldquo;</div>

        {/* Baris penutup tambahan sebagai "punch" */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.2 }} transition={{ delay: 0.6, duration: 0.6 }} className="relative mt-8 pt-6 border-t border-white/5 text-right">
          <p className="text-sm text-zinc-400 leading-relaxed">
            <span className="text-[#1DB954] font-medium">Karena mungkin pencapaian terbesar</span> bukan ketika semua orang akhirnya melihat kita berhasil. Tapi ketika kita berhasil membuktikan pada diri sendiri bahwa kita tidak
            meninggalkan diri kita sendiri di tengah perjalanan.
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
