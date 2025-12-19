"use client";

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Heart, ThumbsUp, ThumbsDown, Star, Sparkles, Send, X, Check, Eye, EyeOff, Globe, Briefcase, Zap, Users, Lock, Edit, ChevronLeft, ChevronRight, AlertCircle, Trophy, Crown, Award, Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import type { PostgrestError } from "@supabase/supabase-js";

type ReactionType = "like" | "love" | "thanks" | "insightful" | "dislike";
type CommentStatus = "pending" | "approved" | "needs_revision" | "featured";
type FilterType = "all" | "featured" | "approved" | "request_edit";

interface Reactions {
  like: number;
  love: number;
  thanks: number;
  insightful: number;
  dislike: number;
}

interface GuestbookComment {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status: CommentStatus;
  is_featured: boolean;
  reactions: Reactions;
  user_token?: string;
  created_at: string;
  updated_at: string;
}

interface FormDataType {
  name: string;
  email: string;
  message: string;
  profession: string;
  website: string;
}

interface StatsType {
  total: number;
  approved: number;
  featured: number;
  pending: number;
  needs_revision: number;
}

interface ReactionOption {
  type: ReactionType;
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  color: string;
  bgColor: string;
}

interface TabOption {
  value: FilterType;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

interface StatCard {
  label: string;
  value: number;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
}

// Helper function untuk mendapatkan IP address
const getUserIp = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip || "unknown";
  } catch (error) {
    console.error(error);
    const token = localStorage.getItem("user_token") || "unknown";
    return token;
  }
};

// Helper untuk normalize reactions
const normalizeReactions = (reactions: unknown): Reactions => {
  if (!reactions || typeof reactions !== "object") {
    return { like: 0, love: 0, thanks: 0, insightful: 0, dislike: 0 };
  }

  const reactionObj = reactions as Record<string, unknown>;

  return {
    like: typeof reactionObj.like === "number" ? reactionObj.like : 0,
    love: typeof reactionObj.love === "number" ? reactionObj.love : 0,
    thanks: typeof reactionObj.thanks === "number" ? reactionObj.thanks : 0,
    insightful: typeof reactionObj.insightful === "number" ? reactionObj.insightful : 0,
    dislike: typeof reactionObj.dislike === "number" ? reactionObj.dislike : 0,
  };
};

// Hitung total reactions positif (tidak termasuk dislike)
const calculatePositiveReactions = (reactions: Reactions): number => {
  return reactions.like + reactions.love + reactions.thanks + reactions.insightful;
};

// Type untuk Supabase guestbook row (partial)
type GuestbookRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status: CommentStatus;
  is_featured: boolean;
  reactions: unknown;
  user_token?: string;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
  is_spam?: boolean;
};

export default function GuestbookPage() {
  const router = useRouter();
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState<StatsType>({
    total: 0,
    approved: 0,
    featured: 0,
    pending: 0,
    needs_revision: 0,
  });

  // Feedback states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showAlreadyReacted, setShowAlreadyReacted] = useState(false);
  const [showReactionSuccess, setShowReactionSuccess] = useState(false);
  const [showReactionError, setShowReactionError] = useState(false);

  // Reaction state
  const [isReacting, setIsReacting] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Most popular reaction
  const [mostPopularReaction, setMostPopularReaction] = useState<{
    type: ReactionType;
    count: number;
  }>({ type: "like", count: 0 });

  // Champion comment (highest positive reactions)
  const [championComment, setChampionComment] = useState<GuestbookComment | null>(null);
  const [championReactionTotal, setChampionReactionTotal] = useState(0);

  // Reactions options
  const reactionOptions: ReactionOption[] = [
    { type: "like", icon: ThumbsUp, label: "Like", color: "text-blue-400", bgColor: "bg-blue-500/20" },
    { type: "love", icon: Heart, label: "Love", color: "text-pink-400", bgColor: "bg-pink-500/20" },
    { type: "thanks", icon: Sparkles, label: "Thanks", color: "text-yellow-400", bgColor: "bg-yellow-500/20" },
    { type: "insightful", icon: Zap, label: "Insightful", color: "text-purple-400", bgColor: "bg-purple-500/20" },
    { type: "dislike", icon: ThumbsDown, label: "Dislike", color: "text-red-400", bgColor: "bg-red-500/20" },
  ];

  const calculateStats = useCallback((data: GuestbookComment[]) => {
    setStats({
      total: data.length,
      approved: data.filter((c) => c.status === "approved").length,
      featured: data.filter((c) => c.is_featured).length,
      pending: data.filter((c) => c.status === "pending").length,
      needs_revision: data.filter((c) => c.status === "needs_revision").length,
    });
  }, []);

  

  // Function to find champion comment
  const findChampionComment = useCallback((commentsData: GuestbookComment[]) => {
    if (commentsData.length === 0) {
      setChampionComment(null);
      setChampionReactionTotal(0);
      return;
    }

    let champion: GuestbookComment | null = null;
    let highestPositiveReactions = 0;

    commentsData.forEach((comment) => {
      const positiveReactions = calculatePositiveReactions(comment.reactions);

      if (positiveReactions > highestPositiveReactions) {
        highestPositiveReactions = positiveReactions;
        champion = comment;
      }
    });

    setChampionComment(champion);
    setChampionReactionTotal(highestPositiveReactions);
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      // Normalize reactions data dengan type safety
      const normalizedData: GuestbookComment[] = (data || []).map((row: GuestbookRow) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        profession: row.profession,
        website: row.website,
        status: row.status,
        is_featured: row.is_featured,
        reactions: normalizeReactions(row.reactions),
        user_token: row.user_token,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));

      setComments(normalizedData);
      calculateStats(normalizedData);

      // Calculate champion comment
      findChampionComment(normalizedData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [calculateStats , findChampionComment]);

  useEffect(() => {
    fetchComments();

    // Sync reactions status saat component mount
    const syncReactions = async () => {
      const userToken = localStorage.getItem("user_token");
      if (userToken) {
        try {
          const { data: reactions, error } = await supabase.from("guestbook_reactions").select("guestbook_id").eq("user_token", userToken);

          if (error) {
            console.error("Error fetching reactions:", error);
            return;
          }

          if (reactions) {
            reactions.forEach((reaction) => {
              localStorage.setItem(`reacted_${reaction.guestbook_id}`, "true");
            });
          }
        } catch (error) {
          console.error("Error syncing reactions:", error);
        }
      }
    };

    syncReactions();
  }, [fetchComments]);

  // Calculate most popular reaction
  useEffect(() => {
    if (comments.length > 0) {
      const reactionTotals: Record<ReactionType, number> = {
        like: 0,
        love: 0,
        thanks: 0,
        insightful: 0,
        dislike: 0,
      };

      comments.forEach((comment) => {
        Object.entries(comment.reactions).forEach(([type, count]) => {
          reactionTotals[type as ReactionType] += count;
        });
      });

      let maxType: ReactionType = "like";
      let maxCount = 0;

      Object.entries(reactionTotals).forEach(([type, count]) => {
        if (count > maxCount) {
          maxCount = count;
          maxType = type as ReactionType;
        }
      });

      setMostPopularReaction({ type: maxType, count: maxCount });
    }
  }, [comments]);

  // Filter comments based on selected filter
  const filteredComments = comments.filter((comment) => {
    if (filter === "featured") return comment.is_featured;
    if (filter === "approved") return comment.status === "approved";
    if (filter === "request_edit") return comment.status === "needs_revision";
    return true;
  });

  // Exclude champion comment from regular comments list
  const commentsWithoutChampion = filteredComments.filter((comment) => !championComment || comment.id !== championComment.id);

  // Pagination calculations (excluding champion)
  const totalPages = Math.ceil(commentsWithoutChampion.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentComments = commentsWithoutChampion.slice(indexOfFirstItem, indexOfLastItem);

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      pages.push(1);

      if (leftBound > 2) pages.push("...");

      for (let i = leftBound; i <= rightBound; i++) pages.push(i);

      if (rightBound < totalPages - 1) pages.push("...");

      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Generate user token if not exists
      let userToken = localStorage.getItem("user_token");
      if (!userToken) {
        userToken = crypto.randomUUID();
        localStorage.setItem("user_token", userToken);
      }

      const { data, error } = await supabase
        .from("guestbook")
        .insert([
          {
            ...formData,
            status: "pending",
            is_featured: false,
            reactions: { like: 0, love: 0, thanks: 0, insightful: 0, dislike: 0 },
            user_token: userToken,
            ip_address: await getUserIp(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // Normalize the new comment
      const newComment: GuestbookComment = {
        id: data.id,
        name: data.name,
        email: data.email,
        message: data.message,
        profession: data.profession,
        website: data.website,
        status: data.status,
        is_featured: data.is_featured,
        reactions: normalizeReactions(data.reactions),
        user_token: data.user_token,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };

      setComments((prev) => [newComment, ...prev]);
      calculateStats([newComment, ...comments]);
      setShowForm(false);
      setFormData({ name: "", email: "", message: "", profession: "", website: "" });
      setCurrentPage(1);

      // Show success feedback
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error submitting comment:", error);
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reaction - dengan type safety yang lengkap
  const handleReaction = useCallback(
    async (commentId: string, reactionType: ReactionType) => {
      if (isReacting === commentId) return;
      setIsReacting(commentId);

      try {
        // Cek localStorage dulu
        const localStorageKey = `reacted_${commentId}`;
        if (localStorage.getItem(localStorageKey)) {
          setShowAlreadyReacted(true);
          setTimeout(() => setShowAlreadyReacted(false), 2000);
          return;
        }

        // Get comment
        const comment = comments.find((c) => c.id === commentId);
        if (!comment) {
          console.error("Comment not found:", commentId);
          return;
        }

        // Get user token
        let userToken = localStorage.getItem("user_token");
        if (!userToken) {
          userToken = crypto.randomUUID();
          localStorage.setItem("user_token", userToken);
        }

        // Update reactions count
        const newReactions: Reactions = {
          like: comment.reactions.like,
          love: comment.reactions.love,
          thanks: comment.reactions.thanks,
          insightful: comment.reactions.insightful,
          dislike: comment.reactions.dislike,
          [reactionType]: comment.reactions[reactionType] + 1,
        };

        console.log("Updating reactions:", {
          commentId,
          reactionType,
          currentReactions: comment.reactions,
          newReactions,
        });

        // 1. Update guestbook dengan reactions yang lengkap
        const { error: updateError } = await supabase
          .from("guestbook")
          .update({
            reactions: newReactions,
            updated_at: new Date().toISOString(),
          })
          .eq("id", commentId);

        if (updateError) {
          console.error("Update error details:", updateError);
          throw updateError;
        }

        // 2. Insert reaction record
        const { error: reactionError } = await supabase.from("guestbook_reactions").insert([
          {
            guestbook_id: commentId,
            ip_address: await getUserIp(),
            reaction_type: reactionType,
            user_token: userToken,
            created_at: new Date().toISOString(),
          },
        ]);

        if (reactionError) {
          // Jika error karena unique constraint
          if (reactionError.code === "23505") {
            console.log("User sudah pernah react");
            setShowAlreadyReacted(true);
            setTimeout(() => setShowAlreadyReacted(false), 2000);
            return;
          }
          console.warn("Reaction insert error (non-critical):", reactionError);
          // Lanjutkan meskipun insert reaction gagal, karena reaction count sudah diupdate
        }

        // Update localStorage
        localStorage.setItem(localStorageKey, "true");

        // Update state dengan data yang benar
        const updatedComments = comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                reactions: newReactions,
                updated_at: new Date().toISOString(),
              }
            : c
        );

        setComments(updatedComments);

        // Recalculate champion after update
        findChampionComment(updatedComments);

        setShowReactionSuccess(true);
        setTimeout(() => setShowReactionSuccess(false), 1500);
      } catch (error: unknown) {
        console.error("Error updating reaction:", error);

        // Type safe error handling
        const postgrestError = error as PostgrestError;
        if (postgrestError?.code === "23505") {
          setShowAlreadyReacted(true);
          setTimeout(() => setShowAlreadyReacted(false), 2000);
          return;
        }

        // Coba fallback update
        try {
          const comment = comments.find((c) => c.id === commentId);
          if (comment) {
            const newReactions: Reactions = {
              like: comment.reactions.like,
              love: comment.reactions.love,
              thanks: comment.reactions.thanks,
              insightful: comment.reactions.insightful,
              dislike: comment.reactions.dislike,
              [reactionType]: comment.reactions[reactionType] + 1,
            };

            // Update lokal saja
            const updatedComments = comments.map((c) =>
              c.id === commentId
                ? {
                    ...c,
                    reactions: newReactions,
                  }
                : c
            );

            setComments(updatedComments);
            findChampionComment(updatedComments);

            localStorage.setItem(`reacted_${commentId}`, "true");
            setShowReactionSuccess(true);
            setTimeout(() => setShowReactionSuccess(false), 1500);
            return;
          }
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
        }

        setShowReactionError(true);
        setTimeout(() => setShowReactionError(false), 2000);
      } finally {
        setTimeout(() => setIsReacting(null), 1000);
      }
    },
    [comments, isReacting, findChampionComment]
  );

  // Form state
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
    profession: "",
    website: "",
  });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Filter tabs
  const filterTabs: TabOption[] = [
    { value: "all", label: "All Comments", icon: Users },
    { value: "featured", label: "Featured", icon: Star },
    { value: "approved", label: "Approved", icon: Check },
    { value: "request_edit", label: "Request Edit", icon: AlertCircle },
  ];

  // Stats cards
  const statCards: StatCard[] = [
    { label: "Total Comments", value: stats.total, icon: MessageSquare, color: "from-blue-500 to-cyan-500" },
    { label: "Approved", value: stats.approved, icon: Check, color: "from-emerald-500 to-green-500" },
    { label: "Featured", value: stats.featured, icon: Star, color: "from-yellow-500 to-amber-500" },
    { label: "Pending", value: stats.pending, icon: EyeOff, color: "from-orange-500 to-red-500" },
    { label: "Request Edit", value: stats.needs_revision, icon: Edit, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="min-h-screen mt-16 md:mt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Feedback Messages */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-4 right-4 left-4 md:left-auto md:right-4 z-50">
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <div className="flex-shrink-0">
                <Check size={24} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Thank you for your comment!</p>
                <p className="text-sm opacity-90">It will be reviewed and published soon.</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowSuccessMessage(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {showErrorMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-4 right-4 left-4 md:left-auto md:right-4 z-50">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <div className="flex-shrink-0">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Submission Failed</p>
                <p className="text-sm opacity-90">Please try again later.</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowErrorMessage(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {showAlreadyReacted && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 md:top-4 right-4 left-4 md:left-auto md:right-4 z-50">
            <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <div className="flex-shrink-0">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Already Reacted</p>
                <p className="text-sm opacity-90">You can only react once per comment.</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowAlreadyReacted(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {showReactionSuccess && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 md:top-4 right-4 left-4 md:left-auto md:right-4 z-50">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <div className="flex-shrink-0">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Reaction Recorded</p>
                <p className="text-sm opacity-90">Thanks for your feedback!</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowReactionSuccess(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {showReactionError && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 md:top-4 right-4 left-4 md:left-auto md:right-4 z-50">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
              <div className="flex-shrink-0">
                <AlertCircle size={24} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Reaction Failed</p>
                <p className="text-sm opacity-90">Please try again.</p>
              </div>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setShowReactionError(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
          <div className="flex-1 text-center md:text-left">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
              <div className="inline-flex items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3 md:mb-4">
                <MessageSquare size={32} className="md:size-10 text-purple-300" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 md:mb-4">Guestbook & Testimonials</h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0">Leave your thoughts, feedback, or just say hello! Your comments make this portfolio better.</p>
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => router.push("/admin/guestbook")}
            className="md:ml-4 px-3 md:px-4 py-2 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-300 flex items-center gap-2 justify-center md:justify-start w-full md:w-auto text-sm md:text-base"
          >
            <Lock size={16} className="md:size-[18px]" />
            <span>Admin Panel</span>
          </motion.button>
        </div>

        {/* Stats Cards */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-700/50"
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color}/20`}>
                    <IconComponent size={20} className="md:size-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xl md:text-2xl font-bold truncate">{stat.value}</div>
                    <div className="text-xs md:text-sm text-gray-400 truncate">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Most Popular Reaction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -3 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-700/50"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div
                className={`p-2 md:p-3 rounded-lg md:rounded-xl ${
                  mostPopularReaction.type === "like"
                    ? "bg-blue-500/20"
                    : mostPopularReaction.type === "love"
                    ? "bg-pink-500/20"
                    : mostPopularReaction.type === "thanks"
                    ? "bg-yellow-500/20"
                    : mostPopularReaction.type === "insightful"
                    ? "bg-purple-500/20"
                    : "bg-red-500/20"
                }`}
              >
                {mostPopularReaction.type === "like" && <ThumbsUp size={20} className="md:size-6 text-blue-400" />}
                {mostPopularReaction.type === "love" && <Heart size={20} className="md:size-6 text-pink-400" />}
                {mostPopularReaction.type === "thanks" && <Sparkles size={20} className="md:size-6 text-yellow-400" />}
                {mostPopularReaction.type === "insightful" && <Zap size={20} className="md:size-6 text-purple-400" />}
                {mostPopularReaction.type === "dislike" && <ThumbsDown size={20} className="md:size-6 text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl md:text-2xl font-bold truncate">{mostPopularReaction.count}</div>
                <div className="text-xs md:text-sm text-gray-400 truncate">
                  {mostPopularReaction.type === "like" ? "Likes" : mostPopularReaction.type === "love" ? "Loves" : mostPopularReaction.type === "thanks" ? "Thanks" : mostPopularReaction.type === "insightful" ? "Insightful" : "Dislikes"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CHAMPION CARD - Only show if there's a champion with positive reactions */}
        {championComment && championReactionTotal > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mb-8 md:mb-10">
            <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-transparent bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 p-0.5">
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-30 animate-pulse"></div>

              {/* Inner content */}
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl md:rounded-3xl p-4 md:p-6 backdrop-blur-sm">
                {/* Champion badge */}
                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-20">
                  <div className="relative">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-md" />
                    <div className="relative bg-gradient-to-r from-yellow-500 to-amber-500 p-2 md:p-3 rounded-full shadow-2xl">
                      <Crown className="size-6 md:size-8 text-white" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-4 md:mb-6">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="relative">
                      <div className="size-12 md:size-16 rounded-full bg-gradient-to-br from-yellow-500/30 to-amber-500/30 flex items-center justify-center border-2 border-yellow-500/50">
                        <span className="text-xl md:text-2xl font-bold text-yellow-300">{championComment.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-1">
                        <Trophy className="size-4 md:size-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        <span>🏆 Champion Comment</span>
                      </h3>
                      <p className="text-yellow-300 text-sm md:text-base font-semibold">Most Loved by Community</p>
                    </div>
                  </div>

                  {/* Reaction stats */}
                  <div className="ml-auto flex items-center gap-4 md:gap-6">
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">{championReactionTotal}</div>
                      <div className="text-xs md:text-sm text-yellow-300/80">Positive Reactions</div>
                    </div>
                    <div className="hidden md:block h-8 w-px bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent"></div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">#1</div>
                      <div className="text-xs md:text-sm text-gray-400">Rank</div>
                    </div>
                  </div>
                </div>

                {/* Comment content */}
                <div className="mb-4 md:mb-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-base md:text-lg truncate flex items-center gap-2">
                        {championComment.name}
                        {championComment.profession && <span className="text-sm text-yellow-300 font-normal">• {championComment.profession}</span>}
                      </h4>
                      {championComment.website && (
                        <a href={championComment.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs md:text-sm text-blue-400 hover:text-blue-300 transition-colors truncate">
                          <Globe size={12} className="md:size-4" />
                          <span className="truncate">{championComment.website.replace(/^https?:\/\//, "")}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full"></div>
                    <p className="text-gray-200 text-sm md:text-base pl-4 line-clamp-2 md:line-clamp-3">{championComment.message}</p>
                  </div>
                </div>

                {/* Reaction breakdown */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-yellow-500/20">
                  <div className="flex items-center gap-2 md:gap-3">
                    {reactionOptions
                      .filter((r) => r.type !== "dislike")
                      .map((reaction) => {
                        const ReactionIcon = reaction.icon;
                        const count = championComment.reactions[reaction.type];
                        return count > 0 ? (
                          <div key={reaction.type} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50">
                            <ReactionIcon size={16} className={reaction.color} />
                            <span className="text-sm font-medium text-gray-300">{count}</span>
                            <span className="text-xs text-gray-400">{reaction.label}</span>
                          </div>
                        ) : null;
                      })}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20">
                      <Flame className="size-4 text-orange-400" />
                      <span className="text-sm text-yellow-300 font-medium">Community Favorite</span>
                    </div>
                    <button
                      onClick={() => handleReaction(championComment.id, "like")}
                      disabled={isReacting === championComment.id}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-medium transition-all disabled:opacity-50"
                    >
                      Vote for Champion
                    </button>
                  </div>
                </div>

                {/* Sparkle effects */}
                <div className="absolute top-4 left-4 opacity-30">
                  <Sparkles className="size-6 text-yellow-400" />
                </div>
                <div className="absolute bottom-4 right-4 opacity-30">
                  <Award className="size-6 text-amber-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-8 md:mb-10">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(true)}
            className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-base md:text-lg transition-all duration-300 shadow-xl md:shadow-2xl shadow-purple-500/25 flex items-center gap-2 md:gap-3 justify-center mx-auto w-full max-w-md"
          >
            <MessageSquare size={20} className="md:size-6" />
            <span>Leave a Comment</span>
          </motion.button>
        </motion.div>

        {/* Filter tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center">
          {filterTabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <motion.button
                key={tab.value}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setFilter(tab.value);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl border transition-all duration-300 text-sm md:text-base flex-1 md:flex-none min-w-[120px] md:min-w-0 ${
                  filter === tab.value ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300" : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:border-gray-600/50"
                }`}
              >
                <TabIcon size={16} className="md:size-[18px]" />
                <span className="truncate">{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Comments List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="size-10 md:size-12 border-4 border-purple-500 border-t-transparent rounded-full mb-3 md:mb-4" />
            <p className="text-gray-400 text-sm md:text-base">Loading comments...</p>
          </div>
        ) : commentsWithoutChampion.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📝</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">No comments yet</h3>
            <p className="text-gray-400 mb-4 md:mb-6">Be the first to leave a comment!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm md:text-base"
            >
              Write First Comment
            </motion.button>
          </div>
        ) : (
          <>
            {/* Comments Grid */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              {currentComments.map((comment, index) => {
                const isNeedsRevision = comment.status === "needs_revision";
                const positiveReactions = calculatePositiveReactions(comment.reactions);

                return (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className={`bg-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl border overflow-hidden relative ${
                      comment.is_featured ? "border-yellow-500/50 shadow-xl md:shadow-2xl shadow-yellow-500/10" : isNeedsRevision ? "border-orange-500/50 shadow-lg md:shadow-xl shadow-orange-500/10" : "border-gray-700/50"
                    }`}
                  >
                    {/* Note untuk request edit - DI ATAS BADGE */}
                    {isNeedsRevision && (
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 z-10">
                        <div className="px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-sm">
                          <div className="flex items-start gap-1.5 md:gap-2">
                            <AlertCircle size={12} className="md:size-3.5 text-orange-300 mt-0.5 flex-shrink-0" />
                            <p className="text-[10px] md:text-xs text-orange-200 leading-tight">Admin requested improvements on this comment</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Status badge - DI BAWAH NOTE */}
                    <div className={`absolute ${isNeedsRevision ? "top-14 md:top-20" : "top-3 md:top-4"} right-3 md:right-4 z-10 flex flex-col gap-1`}>
                      {comment.is_featured && (
                        <div className="flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/30">
                          <Star size={10} />
                          <span>Featured</span>
                        </div>
                      )}

                      {!comment.is_featured && comment.status === "approved" && (
                        <div className="flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          <Check size={10} className="md:size-3" /> Approved
                        </div>
                      )}

                      {isNeedsRevision && (
                        <div className="flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 border border-orange-500/50">
                          <AlertCircle size={10} className="md:size-3" /> Request Edit
                        </div>
                      )}

                      {comment.status === "pending" && !isNeedsRevision && (
                        <div className="flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          <Eye size={10} className="md:size-3" /> Pending
                        </div>
                      )}
                    </div>

                    {/* Content - atur padding top berdasarkan apakah ada note */}
                    <div className={`p-4 md:p-6 ${isNeedsRevision ? "pt-24 md:pt-28" : "pt-4 md:pt-6"}`}>
                      {/* Comment header */}
                      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="flex-shrink-0">
                          <div className="size-8 md:size-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <span className="text-sm md:text-xl font-bold text-purple-300">{comment.name.charAt(0).toUpperCase()}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-sm md:text-base truncate">{comment.name}</h4>
                          <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-0.5 md:mt-1">
                            {comment.profession && (
                              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-400">
                                <Briefcase size={10} className="md:size-3" />
                                <span className="truncate">{comment.profession}</span>
                              </div>
                            )}
                            {comment.website && (
                              <a href={comment.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs md:text-sm text-blue-400 hover:text-blue-300 transition-colors truncate">
                                <Globe size={10} className="md:size-3" />
                                <span className="truncate">Website</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Comment message */}
                      <div className="mb-3 md:mb-6">
                        <p className="text-gray-300 whitespace-pre-line text-sm md:text-base line-clamp-3 md:line-clamp-none">{comment.message}</p>
                      </div>

                      {/* Reactions */}
                      <div className="flex flex-wrap items-center gap-4 justify-between pt-3 md:pt-4 border-t border-gray-700/50">
                        <div className="flex items-center gap-1 md:gap-2">
                          {reactionOptions.map((reaction) => {
                            const ReactionIcon = reaction.icon;
                            return (
                              <motion.button
                                key={reaction.type}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleReaction(comment.id, reaction.type)}
                                disabled={isReacting === comment.id}
                                className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <ReactionIcon size={14} className={`md:size-4 ${reaction.color}`} />
                                <span className="text-xs md:text-sm text-gray-300">{comment.reactions[reaction.type]}</span>
                              </motion.button>
                            );
                          })}
                        </div>

                        <div className="flex items-center gap-2">
                          {positiveReactions > 0 && <div className="text-xs text-yellow-400 font-medium bg-yellow-500/10 px-2 py-0.5 rounded-full">+{positiveReactions}</div>}
                          <div className="text-[10px] md:text-xs text-gray-500 whitespace-nowrap">
                            {new Date(comment.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 md:gap-4 mb-10 md:mb-12">
                {/* Pagination Info */}
                <div className="text-gray-400 text-xs md:text-sm text-center px-4">
                  Page {currentPage} of {totalPages} • Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, commentsWithoutChampion.length)} of {commentsWithoutChampion.length} comments
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1 md:gap-2">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                      currentPage === 1 ? "bg-gray-800/30 border-gray-700/50 text-gray-600 cursor-not-allowed" : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300"
                    }`}
                  >
                    <ChevronLeft size={18} className="md:size-5" />
                    <span className="hidden sm:inline text-sm md:text-base">Previous</span>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 md:gap-2 mx-2 md:mx-4">
                    {getPaginationNumbers().map((pageNum, index) =>
                      pageNum === "..." ? (
                        <span key={`dots-${index}`} className="px-2 md:px-3 py-1 text-gray-500 text-sm md:text-base">
                          •••
                        </span>
                      ) : (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCurrentPage(pageNum as number)}
                          className={`px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg border transition-all duration-300 min-w-[32px] md:min-w-[40px] text-sm md:text-base ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 text-white shadow-lg shadow-purple-500/25"
                              : "bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-purple-500/30 hover:bg-purple-500/10"
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                      currentPage === totalPages
                        ? "bg-gray-800/30 border-gray-700/50 text-gray-600 cursor-not-allowed"
                        : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300"
                    }`}
                  >
                    <span className="hidden sm:inline text-sm md:text-base">Next</span>
                    <ChevronRight size={18} className="md:size-5" />
                  </motion.button>
                </div>

                {/* Page Indicator Dots (Mobile) */}
                <div className="flex items-center gap-1 sm:hidden mt-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`size-1.5 rounded-full transition-all ${currentPage === index + 1 ? "bg-purple-500 w-3" : "bg-gray-700 hover:bg-gray-600"}`}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700/30">
          <p className="text-gray-500 text-xs md:text-sm">All comments are moderated. Spam and inappropriate content will be removed.</p>
          <p className="text-gray-400 mt-1 text-xs md:text-sm">
            Powered by <span className="text-purple-400">Next.js + Supabase</span>
          </p>
        </motion.div>
      </div>

      {/* Comment Form Modal */}
      <AnimatePresence>
        {showForm && <CommentForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} onClose={() => setShowForm(false)} isSubmitting={isSubmitting} handleInputChange={handleInputChange} />}
      </AnimatePresence>
    </div>
  );
}

// Comment Form Modal Component
interface CommentFormProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onSubmit: (e: FormEvent) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function CommentForm({ formData, onSubmit, onClose, isSubmitting, handleInputChange }: CommentFormProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 backdrop-blur-xl rounded-xl md:rounded-2xl border border-gray-700/50 w-full max-w-md md:max-w-2xl shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto"
      >
        <div className="p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <MessageSquare size={20} className="md:size-6 text-purple-300" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white">Leave a Comment</h2>
                <p className="text-gray-400 text-xs md:text-sm">Share your thoughts about my portfolio</p>
              </div>
            </div>
            <motion.button whileHover={{ rotate: 90, scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1.5 md:p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-300">
              <X size={18} className="md:size-5 text-gray-400" />
            </motion.button>
          </div>

          <form onSubmit={onSubmit}>
            <div className="space-y-4 md:space-y-6">
              {/* Two Column Grid for Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Name Field */}
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3.5 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                    placeholder="Adrian Musa Alfauzan"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3.5 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                    placeholder="adrian@example.com"
                  />
                </div>
              </div>

              {/* Two Column Grid for Profession & Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Profession Field */}
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Profession (Optional)</label>
                  <input
                    type="text"
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3.5 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                    placeholder="Software Engineer, Designer, etc."
                  />
                </div>

                {/* Website Field */}
                <div className="space-y-1.5 md:space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Website/Portfolio (Optional)</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3.5 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all placeholder-gray-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-1.5 md:space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Your Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3.5 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none placeholder-gray-500"
                  placeholder="What do you think about my portfolio? Any feedback or suggestions?"
                />
              </div>
            </div>

            {/* Note */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="flex items-start gap-2 md:gap-3">
                <div className="p-1 md:p-1.5 rounded-md md:rounded-lg bg-purple-500/20 flex-shrink-0">
                  <AlertCircle size={14} className="md:size-4 text-purple-300" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-purple-300 font-medium mb-0.5 md:mb-1">Note:</p>
                  <p className="text-xs md:text-sm text-purple-300/80">All comments are moderated. Your email will not be published publicly. You&#39;ll receive a confirmation message after submission.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4 md:mt-6">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-800/30 border border-gray-700/50 hover:from-gray-700/50 hover:to-gray-700/30 text-gray-300 font-medium transition-all duration-300 text-sm md:text-base"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 md:gap-2 text-sm md:text-base"
              >
                {isSubmitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="size-4 md:size-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} className="md:size-5" />
                    <span>Submit Comment</span>
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
