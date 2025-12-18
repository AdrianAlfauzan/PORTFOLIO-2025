"use client";

import { motion } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Edit User</h2>
              <p className="text-gray-400 text-sm">ID: {item.id}</p>
            </div>
            <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <X size={20} />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all"
                />
              </div>

              {/* Role Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={formData.role || ""}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <div className="flex gap-4">
                  {[
                    { value: "active", label: "Active", color: "bg-emerald-500" },
                    { value: "inactive", label: "Inactive", color: "bg-amber-500" },
                  ].map((status) => (
                    <motion.button
                      key={status.value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFormData({ ...formData, status: status.value as "active" | "inactive" })}
                      className={`flex-1 py-3 rounded-xl text-center transition-all ${formData.status === status.value ? `${status.color} text-white` : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"}`}
                    >
                      {status.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-3 mt-8">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
