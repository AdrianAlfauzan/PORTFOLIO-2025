"use client";

import { motion } from "framer-motion";
import { Clock, Check, Star, Edit, Trash2, Settings } from "lucide-react";
import { GuestbookComment } from "@/types/guestbook";
import { StatusOption } from "@/types/admin";

interface CommentCardProps {
  comment: GuestbookComment;
  statusOptions: StatusOption[];
  getStatusColor: (status: string) => string;
  getTimeUntilDelete: (dateString: string) => string;
  isAboutToBeDeleted: (dateString: string) => boolean;
  openModal: (type: "delete" | "approve" | "feature" | "needsRevision" | null, id: string, name: string) => void;
  openEditModal: (id: string, name: string, data: Partial<GuestbookComment>) => void;
}

export const CommentCard = ({ comment, statusOptions, getStatusColor, getTimeUntilDelete, isAboutToBeDeleted, openModal, openEditModal }: CommentCardProps) => {
  const StatusIcon = statusOptions.find((opt) => opt.value === comment.status)?.icon;
  // FIX: Gunakan updated_at karena status_updated_at tidak ada di type
  const willBeDeleted = comment.status === "needs_revision" && isAboutToBeDeleted(comment.updated_at);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-800/30 backdrop-blur-sm rounded-xl md:rounded-2xl border overflow-hidden ${willBeDeleted ? "border-red-500/50 animate-pulse" : "border-gray-700/50"}`}
    >
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-300">{comment.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white truncate">{comment.name}</h3>
                  {willBeDeleted && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                      <Clock size={10} />
                      Soon deleted
                    </span>
                  )}
                </div>
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
              {StatusIcon && <StatusIcon size={12} />}
              {comment.status === "needs_revision" ? "Needs Edit" : comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
              {comment.is_featured && " ⭐"}
            </span>

            <div className="text-xs text-gray-500 whitespace-nowrap">{formatDate(comment.created_at)}</div>
          </div>
        </div>

        {/* Auto-delete info for needs_revision */}
        {comment.status === "needs_revision" && (
          <div className={`mb-4 p-3 rounded-lg border ${willBeDeleted ? "bg-red-500/10 border-red-500/30" : "bg-orange-500/10 border-orange-500/30"}`}>
            <div className="flex items-center gap-2">
              <Clock size={14} className={willBeDeleted ? "text-red-400" : "text-orange-400"} />
              <span className={`text-xs ${willBeDeleted ? "text-red-300" : "text-orange-300"}`}>
                ⏰ {getTimeUntilDelete(comment.updated_at)} • Status updated: {formatDate(comment.updated_at)}
                {willBeDeleted && " • Will be auto-deleted soon!"}
              </span>
            </div>
          </div>
        )}

        {/* Message */}
        <div className="mb-6">
          <p className="text-gray-300 whitespace-pre-line bg-gray-800/20 p-4 rounded-xl">{comment.message}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700/50">
          {/* BUTTON EDIT */}
          <button
            onClick={() =>
              openEditModal(comment.id, comment.name, {
                name: comment.name,
                email: comment.email,
                message: comment.message,
                profession: comment.profession || "",
                website: comment.website || "",
                status: comment.status,
                is_featured: comment.is_featured,
                is_spam: comment.is_spam || false,
              })
            }
            className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 flex items-center gap-2 text-sm"
          >
            <Settings size={16} />
            Edit
          </button>
          {comment.status !== "approved" && comment.status !== "featured" && (
            <button onClick={() => openModal("approve", comment.id, comment.name)} className="px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-sm">
              <Check size={16} />
              Approve
            </button>
          )}
          {!comment.is_featured && (
            <button onClick={() => openModal("feature", comment.id, comment.name)} className="px-4 py-2 rounded-lg bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 text-yellow-300 flex items-center gap-2 text-sm">
              <Star size={16} />
              Feature
            </button>
          )}
          {comment.status !== "needs_revision" && (
            <button onClick={() => openModal("needsRevision", comment.id, comment.name)} className="px-4 py-2 rounded-lg bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/30 text-orange-300 flex items-center gap-2 text-sm">
              <Edit size={16} />
              Needs Revision
            </button>
          )}
          <button
            onClick={() => openModal("delete", comment.id, comment.name)}
            className={`px-4 py-2 rounded-lg border text-sm flex items-center gap-2 ${
              willBeDeleted ? "bg-red-600/20 hover:bg-red-600/30 border-red-500/30 text-red-300" : "bg-gray-700/50 hover:bg-gray-600/50 border-gray-600/50 text-gray-300"
            }`}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
};
