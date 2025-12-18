"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, ThumbsUp, Star, Sparkles, Send, X, Check, Eye, EyeOff, Filter, Globe, Briefcase, Zap, TrendingUp, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type ReactionType = "like" | "love" | "thanks" | "insightful";
type CommentStatus = "pending" | "approved" | "rejected";

interface GuestbookComment {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status: CommentStatus;
  is_featured: boolean;
  reactions: {
    like: number;
    love: number;
    thanks: number;
    insightful: number;
  };
  created_at: string;
  updated_at: string;
}

export default function GuestbookPage() {
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [filter, setFilter] = useState<"all" | "featured" | "approved">("all");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    profession: "",
    website: "",
  });
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    featured: 0,
    pending: 0,
  });

  // Reactions options
  const reactionOptions = [
    { type: "like" as ReactionType, icon: ThumbsUp, label: "Like", color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { type: "love" as ReactionType, icon: Heart, label: "Love", color: "text-pink-400", bgColor: "bg-pink-500/20" },
    { type: "thanks" as ReactionType, icon: Sparkles, label: "Thanks", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    { type: "insightful" as ReactionType, icon: Zap, label: "Insightful", color: "text-purple-400", bgColor: "bg-purple-500/20" },
  ];

  // Fetch comments
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      setComments(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (data: GuestbookComment[]) => {
    setStats({
      total: data.length,
      approved: data.filter((c) => c.status === "approved").length,
      featured: data.filter((c) => c.is_featured).length,
      pending: data.filter((c) => c.status === "pending").length,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from("guestbook")
        .insert([
          {
            ...formData,
            status: "pending",
            is_featured: false,
            reactions: { like: 0, love: 0, thanks: 0, insightful: 0 },
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setComments((prev) => [data, ...prev]);
      calculateStats([data, ...comments]);
      setShowForm(false);
      setFormData({ name: "", email: "", message: "", profession: "", website: "" });

      // Show success notification
      alert("Thank you for your comment! It will be reviewed and published soon.");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reaction
  const handleReaction = async (commentId: string, reactionType: ReactionType) => {
    try {
      const comment = comments.find((c) => c.id === commentId);
      if (!comment) return;

      const newReactions = {
        ...comment.reactions,
        [reactionType]: comment.reactions[reactionType] + 1,
      };

      const { error } = await supabase.from("guestbook").update({ reactions: newReactions }).eq("id", commentId);

      if (error) throw error;

      setComments((prev) => prev.map((c) => (c.id === commentId ? { ...c, reactions: newReactions } : c)));
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  // Filtered comments
  const filteredComments = comments.filter((comment) => {
    if (filter === "featured") return comment.is_featured;
    if (filter === "approved") return comment.status === "approved";
    return true; // 'all'
  });

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
            <MessageSquare size={40} className="text-purple-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">Guestbook & Testimonials</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Leave your thoughts, feedback, or just say hello! Your comments make this portfolio better.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Comments", value: stats.total, icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
            { label: "Approved", value: stats.approved, icon: Check, color: "from-emerald-500 to-green-500" },
            { label: "Featured", value: stats.featured, icon: Star, color: "from-yellow-500 to-amber-500" },
            { label: "Pending", value: stats.pending, icon: EyeOff, color: "from-orange-500 to-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}/20`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg transition-all duration-300 shadow-2xl shadow-purple-500/25 flex items-center gap-3 mx-auto"
          >
            <MessageSquare size={24} />
            Leave a Comment
          </motion.button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3 mb-8 justify-center">
          {[
            { value: "all", label: "All Comments", icon: Users },
            { value: "featured", label: "Featured", icon: Star },
            { value: "approved", label: "Approved", icon: Check },
          ].map((tab) => (
            <motion.button
              key={tab.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(tab.value as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl border transition-all duration-300 ${
                filter === tab.value ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300" : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:border-gray-600/50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Comments List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4" />
            <p className="text-gray-400">Loading comments...</p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold mb-2">No comments yet</h3>
            <p className="text-gray-400 mb-6">Be the first to leave a comment!</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowForm(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
              Write First Comment
            </motion.button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-gray-800/30 backdrop-blur-sm rounded-2xl border overflow-hidden ${comment.is_featured ? "border-yellow-500/50 shadow-2xl shadow-yellow-500/10" : "border-gray-700/50"}`}
              >
                {/* Featured badge */}
                {!comment.is_featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        comment.status === "approved"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : comment.status === "pending"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}
                    >
                      {comment.status === "approved" ? "✓ Approved" : comment.status === "pending" ? "⏳ Pending" : "✗ Rejected"}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Comment header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <span className="text-xl font-bold text-purple-300">{comment.name.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{comment.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        {comment.profession && (
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Briefcase size={12} />
                            {comment.profession}
                          </div>
                        )}
                        {comment.website && (
                          <a href={comment.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                            <Globe size={12} />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Comment message */}
                  <div className="mb-6">
                    <p className="text-gray-300 whitespace-pre-line">{comment.message}</p>
                  </div>

                  {/* Reactions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      {reactionOptions.map((reaction) => (
                        <motion.button
                          key={reaction.type}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReaction(comment.id, reaction.type)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                        >
                          <reaction.icon size={16} className={reaction.color} />
                          <span className="text-sm text-gray-300">{comment.reactions[reaction.type]}</span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-12 pt-8 border-t border-gray-700/30">
          <p className="text-gray-500 text-sm">All comments are moderated. Spam and inappropriate content will be removed.</p>
          <p className="text-gray-400 mt-1">
            Powered by <span className="text-purple-400">Next.js + Supabase</span>
          </p>
        </motion.div>
      </div>

      {/* Comment Form Modal */}
      <AnimatePresence>{showForm && <CommentForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onClose={() => setShowForm(false)} isSubmitting={isSubmitting} />}</AnimatePresence>
    </div>
  );
}

// Comment Form Modal Component
function CommentForm({ formData, setFormData, onSubmit, onClose, isSubmitting }: { formData: any; setFormData: any; onSubmit: (e: React.FormEvent) => Promise<void>; onClose: () => void; isSubmitting: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200] pt-16 md:pt-8" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 w-full max-w-2xl shadow-2xl shadow-black/50"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <MessageSquare size={24} className="text-purple-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Leave a Comment</h2>
                <p className="text-gray-400 text-sm">Share your thoughts about my portfolio</p>
              </div>
            </div>
            <motion.button whileHover={{ rotate: 90, backgroundColor: "rgba(255, 255, 255, 0.1)" }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-2 rounded-lg transition-all duration-300">
              <X size={20} className="text-gray-400" />
            </motion.button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
                  placeholder="Adrian Musa Alfauzan"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
                  placeholder="adrian@yahoo.com"
                />
              </div>

              {/* Profession */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Profession (Optional)</label>
                <input
                  type="text"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
                  placeholder="Software Engineer, Designer, etc."
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website/Portfolio (Optional)</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Your Message *</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all resize-none"
                placeholder="What do you think about my portfolio? Any feedback or suggestions?"
              />
            </div>

            {/* Note */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
              <p className="text-sm text-purple-300">
                <strong>Note:</strong> All comments are moderated. Your email will not be published publicly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-6 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Comment
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
