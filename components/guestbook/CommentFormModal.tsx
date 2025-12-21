import { motion } from "framer-motion";
import { MessageSquare, X, Send, AlertCircle, User, Mail, Briefcase, Globe, FileText } from "lucide-react";
import { FormEvent, ChangeEvent } from "react";

interface CommentFormModalProps {
  formData: {
    name: string;
    email: string;
    message: string;
    profession: string;
    website: string;
  };
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function CommentFormModal({ formData, onInputChange, onSubmit, onClose, isSubmitting }: CommentFormModalProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 backdrop-blur-xl mt-20 mb-10 md:mb-10 md:mt-20 rounded-2xl border border-gray-700/50 w-full max-w-6xl shadow-2xl shadow-black/50 overflow-hidden max-h-[90vh]"
      >
        {/* Header - Sidebar Style */}
        <div className="md:flex h-full">
          {/* Sidebar Section */}
          <div className="hidden md:flex w-2/5 bg-gradient-to-b from-purple-900/20 to-pink-900/20 p-8 border-r border-gray-700/50 flex-col">
            <div className="mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 inline-block mb-4">
                <MessageSquare size={28} className="text-purple-300" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Leave a Comment</h2>
              <p className="text-gray-300">Share your thoughts and feedback about my portfolio</p>
            </div>

            {/* Feature List */}
            <div className="space-y-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-emerald-500/20 mt-0.5 flex-shrink-0">
                  <User size={16} className="text-emerald-300" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-1">Name & Email Required</p>
                  <p className="text-sm text-gray-400">For moderation purposes</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/20 mt-0.5 flex-shrink-0">
                  <FileText size={16} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-1">Share Your Thoughts</p>
                  <p className="text-sm text-gray-400">Feedback and suggestions welcome</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-500/20 mt-0.5 flex-shrink-0">
                  <AlertCircle size={16} className="text-amber-300" />
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-1">All Comments Moderated</p>
                  <p className="text-sm text-gray-400">Email kept private, no spam</p>
                </div>
              </div>
            </div>

            {/* Note at bottom */}
            <div className="mt-auto pt-8 border-t border-gray-700/30">
              <p className="text-sm text-gray-300 leading-relaxed">Your feedback helps improve my portfolio. All comments are reviewed before publishing.</p>
            </div>
          </div>

          {/* Form Section - Lebih Kompak */}
          <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <MessageSquare size={20} className="text-purple-300" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Leave a Comment</h2>
                  <p className="text-gray-400 text-sm">Share your thoughts</p>
                </div>
              </div>
              <motion.button whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800/50">
                <X size={20} className="text-gray-400" />
              </motion.button>
            </div>

            {/* Desktop Close Button */}
            <div className="hidden md:flex justify-end mb-4">
              <motion.button whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-lg hover:bg-gray-800/50">
                <X size={20} className="text-gray-400" />
              </motion.button>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Grid for Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <User size={14} className="text-purple-400" />
                    <label className="text-sm font-medium text-gray-300">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-sm"
                    placeholder="Adrian Musa Alfauzan"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Mail size={14} className="text-purple-400" />
                    <label className="text-sm font-medium text-gray-300">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-sm"
                    placeholder="adrian@example.com"
                  />
                </div>
              </div>

              {/* Grid for Profession & Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Profession Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase size={14} className="text-purple-400" />
                    <label className="text-sm font-medium text-gray-300">Profession (Optional)</label>
                  </div>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-sm"
                    placeholder="Software Engineer, Designer, etc."
                  />
                </div>

                {/* Website Field */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe size={14} className="text-purple-400" />
                    <label className="text-sm font-medium text-gray-300">Website/Portfolio (Optional)</label>
                  </div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={onInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500 text-sm"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <FileText size={14} className="text-purple-400" />
                  <label className="text-sm font-medium text-gray-300">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                </div>
                <textarea
                  name="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={onInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none placeholder-gray-500 text-sm"
                  placeholder="What do you think about my portfolio? Any feedback or suggestions?"
                />
              </div>

              {/* Privacy Note - Lebih Kompak */}
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 rounded-md bg-purple-500/20 flex-shrink-0">
                    <AlertCircle size={14} className="text-purple-300" />
                  </div>
                  <div>
                    <p className="text-sm text-purple-300 font-medium mb-0.5">Privacy Note</p>
                    <p className="text-xs text-purple-300/80 leading-relaxed">Your email address will not be published publicly. All comments are moderated before appearing on the site.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Lebih Kompak */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-5 py-3 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-800/30 border border-gray-700/50 hover:from-gray-700/50 hover:to-gray-700/30 text-gray-300 font-medium transition-all duration-300 text-sm"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="size-4 border-2 border-white border-t-transparent rounded-full" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Submit Comment</span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
