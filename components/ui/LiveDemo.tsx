// components/ui/LiveDemo.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Copy, AlertCircle } from "lucide-react";

interface LiveDemoProps {
  embedUrl: string;
  title?: string;
  description?: string;
  showNotice?: boolean;
  noticeText?: string;
  minHeight?: string;
}

export default function LiveDemo({
  embedUrl,
  title = "Live Demo Aplikasi",
  description = "Berikut adalah tampilan langsung dari aplikasi.",
  showNotice = true,
  noticeText = "Aplikasi ini membutuhkan akses internet dan mungkin memerlukan login untuk mengakses semua fitur.",
  minHeight = "500px",
}: LiveDemoProps) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }} className="text-gray-300 text-center mb-6">
        {description}
        <AnimatePresence>
          {isIframeLoading && (
            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="text-blue-400 ml-2 inline-block">
              Loading...
            </motion.span>
          )}
        </AnimatePresence>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative rounded-xl overflow-hidden border border-gray-700 bg-gray-900"
      >
        <div className="aspect-video w-full">
          <iframe src={embedUrl} className="w-full h-full" style={{ minHeight }} title={title} onLoad={() => setIsIframeLoading(false)} sandbox="allow-same-origin allow-scripts allow-popups allow-forms" />
        </div>
        <AnimatePresence>
          {isIframeLoading && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-gray-900/80"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="rounded-full h-12 w-12 border-4 border-t-blue-500 border-r-purple-500 border-b-blue-500 border-l-purple-500 mx-auto mb-4"
              />
              <p className="text-gray-400 mt-2">Memuat tampilan aplikasi...</p>
              <p className="text-sm text-gray-500 mt-2">
                Jika tidak muncul,
                <a href={embedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">
                  buka di tab baru
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.4 }} className="flex flex-wrap gap-4 justify-center mt-6">
        <motion.a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
        >
          <ExternalLink className="w-5 h-5" />
          Buka Aplikasi
        </motion.a>
        <motion.button
          onClick={() => {
            navigator.clipboard.writeText(embedUrl);
          }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="px-6 py-3 bg-gray-800 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center gap-2 cursor-pointer"
        >
          <Copy className="w-5 h-5" />
          Salin Link
        </motion.button>
      </motion.div>

      {showNotice && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          whileHover={{ scale: 1.01, borderColor: "rgba(234, 179, 8, 0.5)" }}
          className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center gap-3"
        >
          <motion.div animate={{ rotate: [0, 10, -10, 10, 0] }} transition={{ delay: 0.6, duration: 0.5 }}>
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
          </motion.div>
          <p className="text-yellow-400 text-sm text-center flex-1">{noticeText}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
