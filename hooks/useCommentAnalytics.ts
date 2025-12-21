import { useState, useEffect, useMemo } from "react";
import { GuestbookComment, ReactionType } from "@/types/guestbook";
import { calculatePositiveReactions } from "@/utils/reactions";

export const useCommentAnalytics = (comments: GuestbookComment[]) => {
  const [mostPopularReaction, setMostPopularReaction] = useState<{
    type: ReactionType;
    count: number;
  }>({ type: "like", count: 0 });

  const [championComment, setChampionComment] = useState<GuestbookComment | null>(null);
  const [championReactionTotal, setChampionReactionTotal] = useState(0);

  useEffect(() => {
    // Use requestAnimationFrame to defer state update
    const rafId = requestAnimationFrame(() => {
      if (comments.length === 0) {
        setMostPopularReaction({ type: "like", count: 0 });
        return;
      }

      const reactionTotals: Record<ReactionType, number> = {
        like: 0,
        love: 0,
        thanks: 0,
        insightful: 0,
        dislike: 0,
      };

      comments.forEach((comment) => {
        Object.entries(comment.reactions).forEach(([type, count]) => {
          reactionTotals[type as ReactionType] += count as number;
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
    });

    return () => cancelAnimationFrame(rafId);
  }, [comments]);

  // Find champion comment - wrapped in useEffect with cleanup
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      if (comments.length === 0) {
        setChampionComment(null);
        setChampionReactionTotal(0);
        return;
      }

      let champion: GuestbookComment | null = null;
      let highestPositiveReactions = 0;

      comments.forEach((comment) => {
        const positiveReactions = calculatePositiveReactions(comment.reactions);

        if (positiveReactions > highestPositiveReactions) {
          highestPositiveReactions = positiveReactions;
          champion = comment;
        }
      });

      setChampionComment(champion);
      setChampionReactionTotal(highestPositiveReactions);
    });

    return () => cancelAnimationFrame(rafId);
  }, [comments]);

  // Filter comments excluding champion
  const commentsWithoutChampion = useMemo(() => {
    if (!championComment) return comments;
    return comments.filter((comment) => comment.id !== championComment.id);
  }, [comments, championComment]);

  return {
    mostPopularReaction,
    championComment,
    championReactionTotal,
    commentsWithoutChampion,
  };
};
