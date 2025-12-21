"use client";

import { useState, useCallback } from "react";

// OUR HOOKS
import { useToast } from "@/hooks/useToast";

// OUR TYPES
import { GuestbookComment, ReactionType } from "@/types/guestbook";

// OUR UTILS
import { getUserIp } from "@/utils/ip";
import { normalizeReactions } from "@/utils/reactions";

// OUR LIBRARIES
import { supabase } from "@/lib/supabase";

export const useReactions = (comments: GuestbookComment[], updateComment: (id: string, updates: Partial<GuestbookComment>) => void) => {
  const [isReacting, setIsReacting] = useState<string | null>(null);
  const { success, error, info } = useToast();

  const handleReaction = useCallback(
    async (commentId: string, reactionType: ReactionType) => {
      if (isReacting) return;

      // Check if already reacted in localStorage
      const localStorageKey = `reacted_${commentId}`;
      if (localStorage.getItem(localStorageKey)) {
        info("Already Reacted", "You can only react once per comment.");
        return;
      }

      setIsReacting(commentId);

      const comment = comments.find((c) => c.id === commentId);
      if (!comment) {
        setIsReacting(null);
        return;
      }

      try {
        const userToken = localStorage.getItem("user_token");
        if (!userToken) {
          setIsReacting(null);
          error("Error", "Please refresh the page and try again.");
          return;
        }

        const currentReactions = { ...comment.reactions };
        const newCount = (currentReactions[reactionType] || 0) + 1;
        const updatedReactions = {
          ...currentReactions,
          [reactionType]: newCount,
        };

        // Update reactions in guestbook table
        const { error: reactionError } = await supabase.from("guestbook").update({ reactions: updatedReactions }).eq("id", commentId);

        if (reactionError) throw reactionError;

        // Record reaction in separate table (optional, untuk tracking)
        try {
          await supabase.from("guestbook_reactions").insert([
            {
              guestbook_id: commentId,
              ip_address: await getUserIp(),
              reaction_type: reactionType,
              user_token: userToken,
              created_at: new Date().toISOString(),
            },
          ]);
        } catch (recordError) {
          console.warn("Failed to record reaction:", recordError);
          // Lanjutkan meski recording gagal
        }

        // Mark as reacted in localStorage
        localStorage.setItem(localStorageKey, "true");

        updateComment(commentId, {
          reactions: normalizeReactions(updatedReactions),
        });

        success("Reaction Added", `You ${reactionType}d the comment!`);
      } catch (err) {
        console.error("Error reacting:", err);
        error("Error", "Failed to add reaction. Please try again.");
      } finally {
        setIsReacting(null);
      }
    },
    [comments, updateComment, isReacting, success, error, info]
  );

  return {
    isReacting,
    handleReaction,
  };
};
