// utils/reactions.ts
import { Reactions } from "@/types/guestbook";

/**
 * Normalize reactions data from unknown format to Reactions interface
 */
export const normalizeReactions = (reactions: unknown): Reactions => {
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

/**
 * Calculate total positive reactions (excludes dislike)
 */
export const calculatePositiveReactions = (reactions: Reactions): number => {
  return reactions.like + reactions.love + reactions.thanks + reactions.insightful;
};

/**
 * Get the most popular reaction type and count
 */
export const getMostPopularReaction = (reactions: Reactions): { type: keyof Reactions; count: number } => {
  const reactionTypes = Object.entries(reactions) as [keyof Reactions, number][];

  let maxType: keyof Reactions = "like";
  let maxCount = 0;

  reactionTypes.forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  });

  return { type: maxType, count: maxCount };
};

/**
 * Format reaction count with K/M suffix
 */
export const formatReactionCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

/**
 * Check if user has reacted to a comment
 */
export const hasUserReacted = (commentId: string): boolean => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(`reacted_${commentId}`) === "true";
};

/**
 * Mark comment as reacted by user
 */
export const markAsReacted = (commentId: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`reacted_${commentId}`, "true");
};

/**
 * Clear all reaction marks (for testing or logout)
 */
export const clearReactionMarks = (): void => {
  if (typeof window === "undefined") return;

  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith("reacted_")) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
};
