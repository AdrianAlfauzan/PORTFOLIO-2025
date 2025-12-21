import { motion } from "framer-motion";
import { Globe, Briefcase, Star, Check, Eye, AlertCircle } from "lucide-react";
import { GuestbookComment, ReactionOption, ReactionType } from "@/types/guestbook";
import { calculatePositiveReactions } from "@/utils/reactions";

interface CommentsGridProps {
  comments: GuestbookComment[];
  onReaction: (commentId: string, reactionType: ReactionType) => void;
  isReacting: string | null;
  reactionOptions: ReactionOption[];
}

export default function CommentsGrid({ comments, onReaction, isReacting, reactionOptions }: CommentsGridProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      {comments.map((comment, index) => {
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
            {/* Note untuk request edit */}
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

            {/* Status badge */}
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

            {/* Content */}
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
              <div className="flex flex-col gap-3 pt-3 md:pt-4 border-t border-gray-700/50">
                <div className="flex flex-wrap items-center gap-1 md:gap-2">
                  {reactionOptions.map((reaction) => {
                    const ReactionIcon = reaction.icon;
                    return (
                      <motion.button
                        key={reaction.type}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onReaction(comment.id, reaction.type)}
                        disabled={isReacting === comment.id}
                        className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      >
                        <ReactionIcon size={14} className={`md:size-4 ${reaction.color}`} />
                        <span className="text-xs md:text-sm text-gray-300">{comment.reactions[reaction.type as keyof typeof comment.reactions]}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between">
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
  );
}
