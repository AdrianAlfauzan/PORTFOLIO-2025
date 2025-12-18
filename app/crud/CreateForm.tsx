"use client";

import { motion } from "framer-motion";
import { X, User, Mail, Shield, Activity, Loader2 } from "lucide-react";
import { useState } from "react";
import { FormData } from "./types";

interface CreateFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  isLoading: boolean;
}

export default function CreateForm({ onSubmit, onClose, isLoading }: CreateFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    role: "User",
    status: "active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-gray-900 rounded-2xl border border-gray-700/50 w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Add New User</h2>
              <p className="text-gray-400 text-sm">Fill in the user details below</p>
            </div>
            <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <X size={20} />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Form fields with animations */}
            {[
              {
                icon: User,
                label: "Full Name",
                name: "name",
                type: "text",
                placeholder: "John Doe",
                required: true,
              },
              {
                icon: Mail,
                label: "Email Address",
                name: "email",
                type: "email",
                placeholder: "john@example.com",
                required: true,
              },
              {
                icon: Shield,
                label: "Role",
                name: "role",
                type: "select",
                options: ["Admin", "Editor", "User", "Viewer"],
              },
              {
                icon: Activity,
                label: "Status",
                name: "status",
                type: "select",
                options: ["active", "inactive"],
              },
            ].map((field, index) => (
              <motion.div key={field.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none"
                    >
                      {field.options?.map((option) => (
                        <option key={option} value={option.toLowerCase()}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.name as keyof FormData]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-3 mt-8">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Creating...
                  </>
                ) : (
                  "Create User"
                )}
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
