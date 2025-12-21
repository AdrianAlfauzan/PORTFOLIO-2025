// utils/reactions.ts
import { Reactions } from "@/types/guestbook";

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

export const calculatePositiveReactions = (reactions: Reactions): number => {
  return reactions.like + reactions.love + reactions.thanks + reactions.insightful;
};
