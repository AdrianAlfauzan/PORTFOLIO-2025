"use client";

import { ChangeEvent } from "react";
import { ChevronDown, ChevronUp, Clock, Search, LogOut, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// OUR COMPONENTS
import { DeleteModal, ApproveModal, FeatureModal, NeedsRevisionModal } from "@/components/admin/Modals";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { CommentCard } from "@/components/admin/CommentCard";
import { EditModal } from "@/components/admin/EditModal";

// OUR HOOKS
import { useAutoDeleteComments } from "@/hooks/useAutoDeleteComments";
import { useAuthAdmin } from "@/hooks/admin/useAuthAdmin";
import { useGuestbookAdmin } from "@/hooks/admin/useGuestbookAdmin";
import { useCommentFilters } from "@/hooks/admin/useCommentFilters";

// OUR UTILS
import { getStatusColor, getCommentStats } from "@/utils/admin/commentFormatters";

// OUR CONSTANTS
import { statusOptions } from "@/constants/admin";

// OUR TYPES
import { StatusType } from "@/types/admin";

export default function AdminGuestbookPage() {
  // Authentication
  const { isAuthenticated, password, setPassword, handleLogin, handleLogout } = useAuthAdmin();

  // Guestbook data and operations
  const { comments, isLoading, modalState, openModal, openEditModal, closeModal, refreshComments, handleDeleteConfirm, handleApproveConfirm, handleFeatureConfirm, handleNeedsRevisionConfirm, handleEditConfirm } = useGuestbookAdmin();

  // Filters
  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, showStatusDropdown, setShowStatusDropdown, filteredComments } = useCommentFilters(comments);

  // Auto-delete
  const { autoDeleteCount, getTimeUntilDelete, isAboutToBeDeleted, config } = useAutoDeleteComments({
    isAuthenticated,
  });

  // Stats
  const stats = getCommentStats(comments);
  const currentStatus = statusOptions.find((opt) => opt.value === statusFilter) || statusOptions[0];

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusSelect = (status: StatusType) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
  };

  // Debug log
  console.log("Modal State:", modalState);

  if (!isAuthenticated) {
    return <AdminLogin password={password} setPassword={setPassword} handleLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen mt-16 md:mt-20 bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Guestbook Admin Panel</h1>
            <p className="text-gray-400 text-sm md:text-base">Manage and moderate guestbook comments</p>
            {autoDeleteCount > 0 && (
              <div className="mt-2 text-xs text-orange-400 flex items-center gap-1">
                <Clock size={12} />
                <span>Auto-deleted {autoDeleteCount} old &quot;Needs Revision&quot; comments</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={refreshComments} className="px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 text-sm md:text-base">
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
            <div className="text-xl md:text-2xl font-bold">{stats.total}</div>
            <div className="text-xs md:text-sm text-gray-400">Total</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-emerald-300">{stats.approved}</div>
            <div className="text-xs md:text-sm text-gray-400">Approved</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-yellow-300">{stats.featured}</div>
            <div className="text-xs md:text-sm text-gray-400">Featured</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-amber-300">{stats.pending}</div>
            <div className="text-xs md:text-sm text-gray-400">Pending</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
            <div className="text-xl md:text-2xl font-bold text-orange-300">{stats.needsRevision}</div>
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

          {/* Status Filter Dropdown */}
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
            {filteredComments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                statusOptions={statusOptions}
                getStatusColor={getStatusColor}
                getTimeUntilDelete={getTimeUntilDelete}
                isAboutToBeDeleted={isAboutToBeDeleted}
                openModal={openModal}
                openEditModal={openEditModal}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700/30 text-center text-gray-500 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <p>Admin Panel • {filteredComments.length} comments displayed • Auto-delete system active</p>
            <div className="text-xs text-orange-400 flex items-center gap-1">
              <Clock size={12} />
              <span>
                &quot;Needs Revision&quot; auto-deletes after {config.deleteAfterSeconds} seconds
                {config.isTesting && " (Testing Mode)"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeleteModal
        isOpen={modalState.type === "delete"} //
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        commentName={modalState.commentName}
      />
      <ApproveModal
        isOpen={modalState.type === "approve"} //
        onClose={closeModal}
        onConfirm={handleApproveConfirm}
        commentName={modalState.commentName}
      />
      <FeatureModal
        isOpen={modalState.type === "feature"} //
        onClose={closeModal}
        onConfirm={handleFeatureConfirm}
        commentName={modalState.commentName}
      />
      <NeedsRevisionModal
        isOpen={modalState.type === "needsRevision"} //
        onClose={closeModal}
        onConfirm={handleNeedsRevisionConfirm}
        commentName={modalState.commentName}
      />
      {/* EDIT MODAL - DENGAN initialData */}
      <EditModal
        isOpen={modalState.type === "edit"}
        onClose={closeModal}
        onConfirm={handleEditConfirm}
        commentName={modalState.commentName}
        initialData={
          modalState.commentData
            ? {
                ...modalState.commentData,
                profession: modalState.commentData.profession || "",
                website: modalState.commentData.website || "",
              }
            : undefined
        }
        key={modalState.commentId}
      />
    </div>
  );
}
