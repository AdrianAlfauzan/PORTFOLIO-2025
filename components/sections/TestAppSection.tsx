"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, MapPin, Paperclip, History, Info, BookOpen, Target, Award, LayoutDashboard, Eye, Zap, Key, Shield, CheckCircle, Boxes, Sparkles, AlertTriangle } from "lucide-react";

import SectionWrapper from "@/components/ui/SectionWrapper";
import LiveDemo from "@/components/ui/LiveDemo";
import ReminderPopup from "@/components/WarningPopupApk";

import { testAppStats, testAppTechStats } from "@/constants/testapp-data";

interface TestAppFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function TestAppSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "demo">("overview");
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpenPopup = () => {
    setShowReminderPopup(true);
  };

  const handleClosePopup = () => {
    setShowReminderPopup(false);
  };

  const features: TestAppFeature[] = [
    {
      title: "Pengajuan Perizinan Online",
      description: "Warga dapat mengajukan berbagai jenis perizinan secara digital tanpa perlu datang ke kantor",
      icon: <FileText className="w-8 h-8" />,
    },
    {
      title: "Tracking Real-time",
      description: "Pantau status pengajuan dari awal hingga selesai dengan notifikasi otomatis",
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      title: "Dashboard Petugas",
      description: "Antarmuka khusus untuk petugas PTSP dalam memverifikasi dan memproses berkas",
      icon: <LayoutDashboard className="w-8 h-8" />,
    },
    {
      title: "Dokumen Digital",
      description: "Upload dan verifikasi dokumen persyaratan secara online dengan aman",
      icon: <Paperclip className="w-8 h-8" />,
    },
    {
      title: "Riwayat Pengajuan",
      description: "Akses semua riwayat perizinan yang pernah diajukan oleh pengguna",
      icon: <History className="w-8 h-8" />,
    },
    {
      title: "Layanan Informasi",
      description: "Informasi lengkap tentang persyaratan, biaya, dan prosedur setiap layanan",
      icon: <Info className="w-8 h-8" />,
    },
  ];

  const testAppEmbedUrl = "https://portal.testapp.io/apps/install/Jba196JNAq5nr";

  return (
    <SectionWrapper id="testapp-ptsp" className="py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-sm font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <Award className="w-3 h-3" />
            Official Mobile Application
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            PTSP BMKG <br className="hidden sm:block" />
            <span className="text-3xl md:text-4xl">Provinsi Bengkulu Mobile</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Aplikasi perizinan resmi berbasis Android dari BMKG Provinsi Bengkulu. Akses mudah, cepat, dan aman langsung dari smartphone Anda.</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-1 flex gap-1 flex-wrap justify-center">
            {[
              { id: "overview", label: "Overview", icon: <BookOpen className="w-4 h-4" /> },
              { id: "features", label: "Features", icon: <Zap className="w-4 h-4" /> },
              { id: "demo", label: "Live Demo", icon: <Eye className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 md:px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
                  activeTab === tab.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label === "Overview" ? "Info" : tab.label === "Features" ? "Fitur" : "Demo"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-4 md:p-8">
          {activeTab === "overview" && (
            <div>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                    Tentang Aplikasi
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
                    <strong className="text-blue-400">PTSP BMKG Mobile</strong> adalah aplikasi perizinan resmi berbasis Android dari <strong className="text-blue-400">BMKG Provinsi Bengkulu</strong> yang dirancang untuk mempermudah
                    masyarakat dalam mengurus berbagai dokumen perizinan secara mobile.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
                    Aplikasi mobile ini merupakan hasil revamp dari sistem lama dengan pendekatan modern menggunakan teknologi terkini untuk memberikan pengalaman yang lebih cepat, aman, dan transparan langsung dari smartphone Anda.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm flex items-center gap-1">
                      <Boxes className="w-3 h-3" />
                      React Native
                    </span>
                    <span className="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm flex items-center gap-1">
                      <Key className="w-3 h-3" />
                      TypeScript
                    </span>
                    <span className="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Tailwind CSS
                    </span>
                    <span className="px-2 md:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs md:text-sm flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Firebase
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 md:p-6 border border-gray-700">
                  <h4 className="text-base md:text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                    Tujuan Revamp Mobile
                  </h4>
                  <ul className="space-y-2 md:space-y-3 text-gray-300 text-sm md:text-base">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Akses perizinan kapan saja dan di mana saja via smartphone
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Antarmuka yang responsif dan mudah digunakan di layar sentuh
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Notifikasi push real-time untuk update status pengajuan
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Keamanan data tingkat lanjut dengan enkripsi end-to-end
                    </li>
                  </ul>
                </div>
              </div>

              {/* Developer Info */}
              <div className="mt-6 p-3 md:p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20 text-center">
                <p className="text-xs md:text-sm text-gray-300">
                  <strong className="text-blue-400">PTSP BMKG Provinsi Bengkulu</strong> – Aplikasi perizinan resmi versi mobile
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Dikembangkan oleh <strong className="text-white">Adrian Musa Alfauzan</strong> • Mahasiswa S1 IT Data & Software Engineering • Universitas Jenderal Achmad Yani
                </p>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/30 rounded-xl p-4 md:p-5 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
                >
                  <div className="text-blue-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "demo" && (
            <div className="relative">
              {/* Tombol Popup */}
              <motion.button
                ref={buttonRef}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenPopup}
                className="absolute -left-1 -top-1 md:-left-4 md:-top-4 z-10 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-yellow-500/30 blur-md group-hover:bg-yellow-500/50 transition-all" />
                  <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full p-1.5 md:p-2 shadow-lg cursor-pointer">
                    <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
              </motion.button>

              <LiveDemo
                embedUrl={testAppEmbedUrl}
                title="PTSP BMKG Mobile - Aplikasi Perizinan Resmi"
                description="Berikut adalah tampilan langsung dari aplikasi mobile PTSP BMKG Provinsi Bengkulu. Aplikasi ini merupakan versi mobile dari sistem perizinan terpadu yang dapat diakses melalui smartphone."
                showNotice={true}
                minHeight="500px"
              />
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12 text-center">
          {testAppStats.map((stat, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-3 md:p-4 border border-gray-700 hover:border-blue-500/50 transition-all group">
              <div className={`font-mono text-blue-400 group-hover:text-blue-300 transition-colors ${stat.isLongText ? "text-[10px] md:text-xs break-all" : "text-xs md:text-sm"}`}>{stat.value}</div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6 text-center">
          {testAppTechStats.map((stat, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-3 md:p-4 border border-gray-700 hover:border-blue-500/50 transition-all group">
              <div className="text-xl md:text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Reminder Popup */}
      <ReminderPopup
        isOpen={showReminderPopup}
        onClose={handleClosePopup}
        anchorRef={buttonRef}
        title="Informasi Aplikasi"
        message="Kenapa PTSP ini dalam bentuk .APK?"
        detail="Karena dari pihak BMKG Provinsi Bengkulu saat ini masih belum bisa melakukan perizinan ke pusat BMKG secara langsung."
      />
    </SectionWrapper>
  );
}
