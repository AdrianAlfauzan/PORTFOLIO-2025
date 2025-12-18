"use client";

import { motion } from "framer-motion";
import { X, Save, Loader2, Check, User, Mail, Shield, Zap, Crown, Edit, Users, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { DataItem } from "./types";

interface EditFormProps {
  item: DataItem;
  onSubmit: (id: string, data: Partial<DataItem>) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function EditForm({ item, onSubmit, onClose, isLoading }: EditFormProps) {
  const [formData, setFormData] = useState<Partial<DataItem>>(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(item.id, formData);
  };

  // Role options dengan icon yang lebih keren
  const roleOptions = [
    {
      value: "Admin",
      label: "Administrator",
      icon: <Crown size={18} />,
      color: "text-purple-300",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      description: "Full access",
    },
    {
      value: "Editor",
      label: "Editor",
      icon: <Edit size={18} />,
      color: "text-blue-300",
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      description: "Edit content",
    },
    {
      value: "User",
      label: "Regular User",
      icon: <Users size={18} />,
      color: "text-gray-300",
      bgColor: "bg-gradient-to-br from-gray-500/20 to-gray-600/20",
      borderColor: "border-gray-500/30",
      description: "Basic access",
    },
    {
      value: "Viewer",
      label: "Viewer",
      icon: <Eye size={18} />,
      color: "text-emerald-300",
      bgColor: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      description: "Read-only",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[100] pt-16 md:pt-8" // pt-16 di mobile, pt-8 di desktop
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-4xl shadow-2xl shadow-black/50 flex flex-col max-h-[80vh]"
      >
        {/* Header */}
        <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-700/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Edit User</h2>
              <p className="text-gray-400 text-sm">ID: {item.id}</p>
            </div>
            <motion.button
              whileHover={{
                rotate: 90,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                scale: 1.1,
              }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg transition-all duration-300 group"
            >
              <X size={20} className="group-hover:text-red-400 transition-colors duration-300" />
            </motion.button>
          </div>
        </div>

        {/* Horizontal Layout untuk Desktop */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Column - Personal Info */}
              <div className="lg:w-2/5 space-y-6">
                {/* Name Field */}
                <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <span className="flex items-center gap-2">
                      <User size={16} className="text-blue-400" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email Field */}
                <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <span className="flex items-center gap-2">
                      <Mail size={16} className="text-amber-400" />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 text-white placeholder-gray-500"
                    placeholder="Enter email address"
                  />
                  <div className="mt-3 p-2 bg-gray-900/50 rounded-lg">
                    <p className="text-xs text-gray-400">Current email:</p>
                    <p className="text-sm text-gray-300 font-medium truncate">{item.email}</p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="bg-blue-900/10 rounded-xl p-5 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <Zap size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-300 mb-1">Account Info</h4>
                      <div className="space-y-1 text-xs text-gray-400">
                        <p>Created: {item.created_at ? new Date(item.created_at).toLocaleDateString() : "N/A"}</p>
                        <p>Last Updated: {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "N/A"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Role & Status */}
              <div className="lg:w-3/5 space-y-6">
                {/* Role Field */}
                <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <Shield size={16} className="text-purple-400" />
                      User Role
                    </span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {roleOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, role: option.value })}
                        className={`relative p-4 rounded-xl border transition-all duration-300 ${
                          formData.role === option.value ? `${option.borderColor} ${option.color} bg-gray-800/70 shadow-lg` : "border-gray-700/50 text-gray-400 hover:border-gray-600/50 bg-gray-800/30"
                        }`}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className={`p-3 rounded-lg ${option.bgColor} mb-2`}>{option.icon}</div>
                          <div className="space-y-1">
                            <div className={`font-semibold text-sm ${formData.role === option.value ? option.color : "text-gray-300"}`}>{option.label.split(" ")[0]}</div>
                            <div className="text-xs text-gray-400 leading-tight">{option.description}</div>
                          </div>
                        </div>
                        {formData.role === option.value && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                            <Check size={12} />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Status Field */}
                <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700/30">
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    <span className="flex items-center gap-2">
                      <Zap size={16} className="text-emerald-400" />
                      Account Status
                    </span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        value: "active",
                        label: "Active",
                        icon: "✓",
                        color: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
                        textColor: "text-emerald-300",
                        borderColor: "border-emerald-500/30",
                        description: "User account is active and can access the system",
                      },
                      {
                        value: "inactive",
                        label: "Inactive",
                        icon: "✗",
                        color: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
                        textColor: "text-amber-300",
                        borderColor: "border-amber-500/30",
                        description: "User account is disabled and cannot login",
                      },
                    ].map((status) => (
                      <motion.button
                        key={status.value}
                        type="button"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, status: status.value as "active" | "inactive" })}
                        className={`relative p-5 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${
                          formData.status === status.value ? `${status.borderColor} ${status.textColor} bg-gray-800/70 shadow-lg` : "border-gray-700/50 text-gray-400 hover:border-gray-600/50 bg-gray-800/30"
                        }`}
                      >
                        <div className={`p-3 rounded-full ${status.color}`}>
                          <span className={`text-xl font-bold ${status.textColor}`}>{status.icon}</span>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <div className={`font-semibold text-lg ${formData.status === status.value ? status.textColor : "text-gray-300"}`}>{status.label}</div>
                            {formData.status === status.value && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ml-2">
                                <Check size={10} />
                              </motion.div>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">{status.description}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-700/30">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Simple Footer */}
        <div className="flex-shrink-0 p-4 pt-3 border-t border-gray-700/30">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Inactive</span>
              </div>
            </div>
            <div className="hidden sm:block text-gray-600">|</div>
            <div className="text-gray-400">
              Editing user: <span className="text-gray-300">{item.name}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
