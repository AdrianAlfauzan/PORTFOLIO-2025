"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Smartphone, Info, Building, Landmark } from "lucide-react";

interface ReminderPopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  title?: string;
  message?: string;
  detail?: string;
}

export default function ReminderPopup({
  isOpen,
  onClose,
  anchorRef,
  title = "Informasi Aplikasi",
  message = "Kenapa PTSP ini dalam bentuk .APK?",
  detail = "Karena dari pihak BMKG Provinsi Bengkulu saat ini masih belum bisa melakukan perizinan ke pusat BMKG secara langsung.",
}: ReminderPopupProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  }, [isOpen, anchorRef]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop dengan blur */}
          <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={onClose} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />

          {/* Popup Content */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
              zIndex: 50,
            }}
            className="w-[300px] sm:w-[340px] md:w-[400px]"
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 px-4 md:px-5 py-2.5 md:py-3 border-b border-yellow-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  <h3 className="font-semibold text-white text-sm md:text-base">{title}</h3>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Body */}
              <div className="p-4 md:p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                      <strong className="text-yellow-400">{message}</strong>
                      <br />
                      <span className="text-gray-400">{detail}</span>
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/20 mt-3">
                  <div className="flex items-start gap-2">
                    <Landmark className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
                      Aplikasi dalam format <strong className="text-yellow-300">.APK</strong> sudah selesai dan siap digunakan. Namun, pihak <strong className="text-blue-400">BMKG Provinsi Bengkulu</strong> saat ini
                      <span className="text-yellow-300"> masih mengurus perizinan ke BMKG Pusat</span> untuk publikasi resmi.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20 mt-3">
                  <div className="flex items-start gap-2">
                    <Building className="w-3 h-3 md:w-4 md:h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed">
                      Aplikasi sudah dapat diunduh dan digunakan melalui file .APK. Menunggu proses administrasi dari Provinsi Bengkulu ke Pusat untuk dapat dipublikasikan di Google Play Store.
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-full mt-4 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white font-medium text-sm hover:shadow-lg hover:shadow-yellow-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  Mengerti, lanjutkan
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
