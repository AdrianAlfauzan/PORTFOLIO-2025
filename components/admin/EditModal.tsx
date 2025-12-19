"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, Globe, Briefcase, MessageSquare, AlertCircle, Check } from "lucide-react";

import { EditFormData } from "@/types/admin";
import { useToast } from "@/hooks/useToast";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: EditFormData) => void;
  commentName?: string;
  initialData?: Partial<EditFormData>;
}

export const EditModal = ({ isOpen, onClose, onConfirm, commentName, initialData }: EditModalProps) => {
  const { error } = useToast();

  // Langsung buat initial state dari initialData
  const [formData, setFormData] = useState<EditFormData>(() => {
    return {
      name: initialData?.name || "",
      email: initialData?.email || "",
      message: initialData?.message || "",
      profession: initialData?.profession || "",
      website: initialData?.website || "",
    };
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!formData.name.trim()) {
      error("Validation Error", "Name is required", 3000);
      return;
    }
    if (!formData.email.trim()) {
      error("Validation Error", "Email is required", 3000);
      return;
    }
    if (!formData.message.trim()) {
      error("Validation Error", "Message is required", 3000);
      return;
    }

    onConfirm(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm">
          <div>
            <h2 className="text-xl font-bold text-white">Edit Comment</h2>
            <p className="text-sm text-gray-400 mt-1">
              Editing: <span className="text-blue-300 font-medium">{commentName || "Unknown User"}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <User size={14} />
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="Full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Mail size={14} />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="email@example.com"
                  required
                />
              </div>

              {/* Profession */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Briefcase size={14} />
                  Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="Software Engineer"
                />
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Globe size={14} />
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <MessageSquare size={14} />
                Message *
              </label>
              <textarea
                required
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none transition-all resize-none"
                placeholder="Comment message..."
              />
            </div>

            {/* Warning */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-amber-300 mb-1">Admin Edit Notice</p>
                  <p className="text-xs text-amber-400/80">Editing this comment will update all fields. Changes are logged in the database. Original user data will be overwritten.</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-700/30">
              <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 text-gray-300 font-medium transition-all duration-300">
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Update Comment
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
