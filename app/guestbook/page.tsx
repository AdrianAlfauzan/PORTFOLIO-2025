"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Inbox } from "lucide-react";

// Hooks
import { useComments } from "@/hooks/useComments";
import { useCommentForm } from "@/hooks/useCommentForm";
import { useReactions } from "@/hooks/useReactions";
import { useCommentAnalytics } from "@/hooks/useCommentAnalytics";
import { usePagination } from "@/hooks/usePagination";

// Components
import CommentFormModal from "@/components/guestbook/CommentFormModal";
import HeaderSection from "@/components/guestbook/HeaderSection";
import StatsCards from "@/components/guestbook/StatsCards";
import ChampionCard from "@/components/guestbook/ChampionCard";
import FilterTabs from "@/components/guestbook/FilterTabs";
import CommentsGrid from "@/components/guestbook/CommentsGrid";
import Pagination from "@/components/guestbook/Pagination";
import FooterSection from "@/components/guestbook/FooterSection";

// OUR CONSTANTS
import { reactionOptions, filterTabs, statCards } from "@/constants/guestbook";

// OUR TYPES
import { FilterType, ReactionType } from "@/types/guestbook";

export default function GuestbookPage() {
  // State
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  // Hooks
  const { comments, isLoading, stats, updateComment } = useComments();
  const { formData, isSubmitting, handleInputChange, handleSubmit: submitForm, resetForm } = useCommentForm(() => setShowForm(false));
  const { isReacting, handleReaction } = useReactions(comments, updateComment);
  const { mostPopularReaction, championComment, championReactionTotal, commentsWithoutChampion } = useCommentAnalytics(comments);

  // Filter comments
  const filteredComments = commentsWithoutChampion.filter((comment) => {
    if (filter === "featured") return comment.is_featured;
    if (filter === "approved") return comment.status === "approved";
    if (filter === "request_edit") return comment.status === "needs_revision";
    return true;
  });

  // Pagination
  const { currentPage, currentItems, totalPages, indexOfFirstItem, indexOfLastItem, getPaginationNumbers, goToPage, nextPage, prevPage, setCurrentPage } = usePagination(filteredComments, 9);

  // Combined submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    await submitForm(e);
    setCurrentPage(1);
  };

  // Wrapper untuk handleReaction
  const handleReactionWrapper = (commentId: string, reactionType: ReactionType) => {
    handleReaction(commentId, reactionType);
  };

  return (
    <div className="min-h-screen mt-16 md:mt-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-8 relative z-0">
      {/* Animated Background */}
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <HeaderSection />

        {/* Stats Cards */}
        <StatsCards stats={stats} statCards={statCards} mostPopularReaction={mostPopularReaction} reactionOptions={reactionOptions} />

        {/* Champion Card */}
        {championComment && championReactionTotal > 0 && (
          <ChampionCard comment={championComment} reactionTotal={championReactionTotal} reactionOptions={reactionOptions} onReaction={handleReactionWrapper} isReacting={isReacting === championComment.id} />
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

        {/* Filter Tabs */}
        <FilterTabs
          filter={filter}
          onFilterChange={(value) => {
            setFilter(value);
            setCurrentPage(1);
          }}
          filterTabs={filterTabs}
        />

        {/* Comments List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="size-10 md:size-12 border-4 border-purple-500 border-t-transparent rounded-full mb-3 md:mb-4" />
            <p className="text-gray-400 text-sm md:text-base">Loading comments...</p>
          </div>
        ) : filteredComments.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">
              <Inbox className="size-16 md:size-24 text-gray-400 mb-4" />
            </div>
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
            <CommentsGrid comments={currentItems} onReaction={handleReactionWrapper} isReacting={isReacting} reactionOptions={reactionOptions} />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredComments.length}
                indexOfFirstItem={indexOfFirstItem}
                indexOfLastItem={indexOfLastItem}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
                getPaginationNumbers={getPaginationNumbers}
              />
            )}
          </>
        )}

        {/* Footer */}
        <FooterSection />
      </div>

      {/* Comment Form Modal */}
      <AnimatePresence>
        {showForm && (
          <CommentFormModal
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              resetForm();
            }}
            isSubmitting={isSubmitting}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
