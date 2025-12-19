// app/admin/guestbook/page.tsx
"use client";

import { useState, useEffect, useCallback, FormEvent, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import { Check, Star, Trash2, Lock, LogOut, Search, MessageSquare, AlertCircle, Edit, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteModal, ApproveModal, FeatureModal, NeedsRevisionModal } from "@/components/admin/Modals";

interface GuestbookComment {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status: string;
  is_featured: boolean;
  reactions: {
    like: number;
    love: number;
    thanks: number;
    insightful: number;
  };
  created_at: string;
}

interface StatusUpdate {
  status?: string;
  is_featured?: boolean;
  updated_at: string;
}

type StatusType = "all" | "pending" | "approved" | "featured" | "needs_revision";

interface StatusOption {
  value: StatusType;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

interface ModalState {
  type: "delete" | "approve" | "feature" | "needsRevision" | null;
  commentId: string | null;
  commentName: string;
}

export default function AdminGuestbookPage() {
  const router = useRouter();
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [filteredComments, setFilteredComments] = useState<GuestbookComment[]>([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType>("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Single modal state management
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    commentId: null,
    commentName: "",
  });

  // ADMIN PASSWORD
  const ADMIN_PASSWORD = "admin123";

  // Status options with proper types
  const statusOptions: StatusOption[] = [
    { value: "all", label: "All Status", color: "text-gray-300", bgColor: "bg-gray-800/50", borderColor: "border-gray-700/50", icon: MessageSquare },
    { value: "pending", label: "Pending", color: "text-amber-300", bgColor: "bg-amber-500/20", borderColor: "border-amber-500/30", icon: AlertCircle },
    { value: "approved", label: "Approved", color: "text-emerald-300", bgColor: "bg-emerald-500/20", borderColor: "border-emerald-500/30", icon: Check },
    { value: "featured", label: "Featured", color: "text-yellow-300", bgColor: "bg-yellow-500/20", borderColor: "border-yellow-500/30", icon: Star },
    { value: "needs_revision", label: "Needs Revision", color: "text-orange-300", bgColor: "bg-orange-500/20", borderColor: "border-orange-500/30", icon: Edit },
  ];

  // Get current status option
  const currentStatus = statusOptions.find((opt) => opt.value === statusFilter) || statusOptions[0];

  // Check auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      if (cookies["admin_auth"] === "true") {
        setIsAuthenticated(true);
        fetchComments();
      }
    };

    checkAuth();
  }, []);

  // Modal handlers
  const openModal = useCallback((type: ModalState["type"], commentId: string, commentName: string) => {
    setModalState({ type, commentId, commentName });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, commentId: null, commentName: "" });
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
      fetchComments();
    } else {
      alert("Wrong password!");
    }
  };

  const handleLogout = () => {
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    router.push("/guestbook");
  };

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      setComments(data || []);
      setFilteredComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Error loading comments");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Filter comments
  useEffect(() => {
    let filtered = comments;

    if (statusFilter !== "all") {
      filtered = filtered.filter((comment) => comment.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (comment) => comment.name.toLowerCase().includes(term) || comment.email.toLowerCase().includes(term) || comment.message.toLowerCase().includes(term) || (comment.profession && comment.profession.toLowerCase().includes(term))
      );
    }

    setFilteredComments(filtered);
  }, [comments, searchTerm, statusFilter]);

  // Validasi status
  const isValidStatus = (status: string): boolean => {
    const validStatuses = ["pending", "approved", "featured", "needs_revision"];
    return validStatuses.includes(status);
  };

  // CRUD Operations
  const updateCommentStatus = useCallback(
    async (id: string, status: string, isFeatured: boolean = false) => {
      // Validasi status
      if (!isValidStatus(status) && !isFeatured) {
        alert(`❌ Invalid status: ${status}. Must be one of: pending, approved, featured, needs_revision`);
        return;
      }

      try {
        const updates: StatusUpdate = {
          updated_at: new Date().toISOString(),
        };

        if (isFeatured) {
          updates.is_featured = true;
          updates.status = "featured";
        } else {
          updates.status = status;
        }

        const { error } = await supabase.from("guestbook").update(updates).eq("id", id);

        if (error) throw error;

        setComments((prev) =>
          prev.map((comment) =>
            comment.id === id
              ? {
                  ...comment,
                  status: isFeatured ? "featured" : status,
                  is_featured: isFeatured,
                }
              : comment
          )
        );

        closeModal();
        alert(`✓ Comment ${isFeatured ? "featured" : status} successfully!`);
      } catch (error: unknown) {
        console.error("Error updating comment:", error);
        alert(`❌ Error updating comment: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    },
    [closeModal]
  );

  const deleteComment = useCallback(async () => {
    if (!modalState.commentId) return;

    try {
      const { error } = await supabase.from("guestbook").delete().eq("id", modalState.commentId);

      if (error) throw error;

      setComments((prev) => prev.filter((comment) => comment.id !== modalState.commentId));
      closeModal();
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Error deleting comment");
    }
  }, [modalState.commentId, closeModal]);

  // Modal confirm handlers
  const handleDeleteConfirm = useCallback(() => {
    deleteComment();
  }, [deleteComment]);

  const handleApproveConfirm = useCallback(() => {
    if (modalState.commentId) {
      updateCommentStatus(modalState.commentId, "approved");
    }
  }, [modalState.commentId, updateCommentStatus]);

  const handleFeatureConfirm = useCallback(() => {
    if (modalState.commentId) {
      updateCommentStatus(modalState.commentId, "featured", true);
    }
  }, [modalState.commentId, updateCommentStatus]);

  const handleNeedsRevisionConfirm = useCallback(() => {
    if (modalState.commentId) {
      updateCommentStatus(modalState.commentId, "needs_revision");
    }
  }, [modalState.commentId, updateCommentStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "featured":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "pending":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "needs_revision":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle status selection
  const handleStatusSelect = (status: StatusType) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700/50 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-4">
              <Lock size={32} className="text-purple-300" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
            <p className="text-gray-400">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-300">
              Login
            </button>

            <button type="button" onClick={() => router.push("/guestbook")} className="w-full mt-3 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 text-gray-300 transition-all duration-300">
              Back to Guestbook
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-16 md:mt-20 bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Guestbook Admin Panel</h1>
            <p className="text-gray-400 text-sm md:text-base">Manage and moderate guestbook comments</p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={fetchComments} className="px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 text-sm md:text-base">
              Refresh
            </button>
            <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 hover:border-red-400/50 text-red-300 flex items-center gap-2 text-sm md:text-base">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold">{comments.length}</div>
            <div className="text-xs md:text-sm text-gray-400">Total</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-emerald-300">{comments.filter((c) => c.status === "approved").length}</div>
            <div className="text-xs md:text-sm text-gray-400">Approved</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-yellow-300">{comments.filter((c) => c.is_featured).length}</div>
            <div className="text-xs md:text-sm text-gray-400">Featured</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-amber-300">{comments.filter((c) => c.status === "pending").length}</div>
            <div className="text-xs md:text-sm text-gray-400">Pending</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-orange-300">{comments.filter((c) => c.status === "needs_revision").length}</div>
            <div className="text-xs md:text-sm text-gray-400">Needs Edit</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name, email, or message..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-purple-500/50 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Custom Dropdown Status Filter */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className={`flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-xl border transition-all duration-300 ${currentStatus.bgColor} ${currentStatus.borderColor}`}
            >
              <div className="flex items-center gap-3">
                <currentStatus.icon size={20} className={currentStatus.color} />
                <span className={currentStatus.color}>{currentStatus.label}</span>
              </div>
              {showStatusDropdown ? <ChevronUp size={20} className={currentStatus.color} /> : <ChevronDown size={20} className={currentStatus.color} />}
            </motion.button>

            <AnimatePresence>
              {showStatusDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-2xl shadow-black/50 z-50 overflow-hidden"
                >
                  <div className="py-2">
                    {statusOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.value}
                          whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                          onClick={() => handleStatusSelect(option.value)}
                          className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-all duration-200 ${statusFilter === option.value ? "bg-gray-700/30" : "hover:bg-gray-700/20"}`}
                        >
                          <div className={`p-2 rounded-lg ${option.bgColor} ${option.borderColor}`}>
                            <Icon size={18} className={option.color} />
                          </div>
                          <span className={option.color}>{option.label}</span>
                          {statusFilter === option.value && <motion.div layoutId="activeStatus" className="ml-auto w-2 h-2 rounded-full bg-purple-500" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Comments List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4" />
            <p className="text-gray-400">Loading comments...</p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/20 rounded-2xl border border-gray-700/50">
            <MessageSquare size={48} className="mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-bold mb-2">No comments found</h3>
            <p className="text-gray-400">{searchTerm ? "Try a different search term" : "No comments to display"}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComments.map((comment) => {
              const StatusIcon = statusOptions.find((opt) => opt.value === comment.status)?.icon || MessageSquare;

              return (
                <motion.div key={comment.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl border border-gray-700/50 overflow-hidden">
                  <div className="p-4 md:p-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-purple-300">{comment.name.charAt(0)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-white truncate">{comment.name}</h3>
                            <p className="text-sm text-gray-400 truncate">{comment.email}</p>
                            {comment.profession && <p className="text-sm text-gray-500 mt-1 truncate">{comment.profession}</p>}
                            {comment.website && (
                              <a href={comment.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300 transition-colors truncate block">
                                {comment.website}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(comment.status)} flex items-center gap-1`}>
                          <StatusIcon size={12} />
                          {comment.status === "needs_revision" ? "Needs Edit" : comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                          {comment.is_featured && " ⭐"}
                        </span>

                        <div className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(comment.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <p className="text-gray-300 whitespace-pre-line bg-gray-800/20 p-4 rounded-xl">{comment.message}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50">
                      {comment.status !== "approved" && comment.status !== "featured" && (
                        <button
                          onClick={() => openModal("approve", comment.id, comment.name)}
                          className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-sm"
                        >
                          <Check size={16} />
                          Approve
                        </button>
                      )}

                      {!comment.is_featured && (
                        <button
                          onClick={() => openModal("feature", comment.id, comment.name)}
                          className="px-4 py-2 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 text-yellow-300 flex items-center gap-2 text-sm"
                        >
                          <Star size={16} />
                          Feature
                        </button>
                      )}

                      {comment.status !== "needs_revision" && (
                        <button
                          onClick={() => openModal("needsRevision", comment.id, comment.name)}
                          className="px-4 py-2 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 text-orange-300 flex items-center gap-2 text-sm"
                        >
                          <Edit size={16} />
                          Needs Revision
                        </button>
                      )}

                      <button onClick={() => openModal("delete", comment.id, comment.name)} className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 text-gray-300 flex items-center gap-2 text-sm">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700/30 text-center text-gray-500 text-sm">
          <p>
            Admin Panel • {filteredComments.length} comments displayed • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Modals - Single source of truth */}
      <DeleteModal isOpen={modalState.type === "delete"} onClose={closeModal} onConfirm={handleDeleteConfirm} commentName={modalState.commentName} />

      <ApproveModal isOpen={modalState.type === "approve"} onClose={closeModal} onConfirm={handleApproveConfirm} commentName={modalState.commentName} />

      <FeatureModal isOpen={modalState.type === "feature"} onClose={closeModal} onConfirm={handleFeatureConfirm} commentName={modalState.commentName} />

      <NeedsRevisionModal isOpen={modalState.type === "needsRevision"} onClose={closeModal} onConfirm={handleNeedsRevisionConfirm} commentName={modalState.commentName} />
    </div>
  );
}
