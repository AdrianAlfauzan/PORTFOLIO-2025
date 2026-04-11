"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, MapPin, Paperclip, History, Info, BookOpen, Target, Award, LayoutDashboard, Eye, Zap, Key, Shield, CheckCircle, Boxes, Sparkles } from "lucide-react";

// Components
import SectionWrapper from "@/components/ui/SectionWrapper";
import LiveDemo from "@/components/ui/LiveDemo";

// Constants
import { testAppStats, testAppTechStats } from "@/constants/testapp-data";

interface TestAppFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function TestAppSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "demo">("overview");

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
            Featured Project
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">TESTAPP PTSP REVAMP</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Aplikasi perizinan modern untuk Pelayanan Terpadu Satu Pintu (PTSP) dengan fitur lengkap dan antarmuka yang user-friendly.</p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-1 flex gap-1">
            {[
              { id: "overview", label: "Overview", icon: <BookOpen className="w-4 h-4" /> },
              { id: "features", label: "Features", icon: <Zap className="w-4 h-4" /> },
              { id: "demo", label: "Live Demo", icon: <Eye className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${activeTab === tab.id ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8">
          {activeTab === "overview" && (
            <div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-400" />
                    Tentang Aplikasi
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    <strong className="text-blue-400">TESTAPP PTSP REVAMP</strong> adalah sistem informasi perizinan berbasis web yang dirancang untuk mempermudah masyarakat dalam mengurus berbagai dokumen perizinan.
                  </p>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Aplikasi ini merupakan hasil revamp dari sistem lama dengan pendekatan modern menggunakan teknologi terkini untuk memberikan pengalaman yang lebih cepat, aman, dan transparan.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-1">
                      <Boxes className="w-3 h-3" />
                      Next.js
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-1">
                      <Key className="w-3 h-3" />
                      TypeScript
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Tailwind CSS
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Firebase
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold mb-3 text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-400" />
                    Tujuan Revamp
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Meningkatkan kecepatan akses dan response time
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Antarmuka yang lebih intuitif dan modern
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Sistem notifikasi real-time untuk update status
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      Keamanan data yang lebih baik dengan enkripsi
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800/30 rounded-xl p-5 hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 group"
                >
                  <div className="text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === "demo" && <LiveDemo embedUrl={testAppEmbedUrl} title="TESTAPP PTSP REVAMP Demo" description="Berikut adalah tampilan langsung dari aplikasi TESTAPP PTSP REVAMP." showNotice={true} minHeight="500px" />}
        </motion.div>

        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-center">
          {testAppStats.map((stat, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all group">
              <div className={`font-mono text-blue-400 group-hover:text-blue-300 transition-colors ${stat.isLongText ? "text-xs break-all" : "text-sm"}`}>{stat.value}</div>
              <div className="text-xs text-gray-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-center">
          {testAppTechStats.map((stat, i) => (
            <div key={i} className="bg-gray-800/30 rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-all group">
              <div className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
