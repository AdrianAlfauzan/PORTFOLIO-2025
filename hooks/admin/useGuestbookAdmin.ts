import { useState, useCallback, useRef, useEffect } from "react";

// OUR CONSTANTS
import { COOKIE_NAME } from "@/constants/admin";

// OUR HOOKS
import { useToast } from "@/hooks/useToast";

// OUR TYPES
import { GuestbookComment } from "@/types/guestbook";
import { ModalState } from "@/types/admin";

// OUR LIBRARIES
import { supabase } from "@/lib/supabase";

export const useGuestbookAdmin = () => {
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    commentId: null,
    commentName: "",
  });

  const hasFetched = useRef(false);
  const { success, error, warning } = useToast();

  const openModal = useCallback((type: ModalState["type"], commentId: string, commentName: string) => {
    setModalState({ type, commentId, commentName });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({ type: null, commentId: null, commentName: "" });
  }, []);

  const fetchComments = useCallback(async () => {
    if (hasFetched.current) return;

    try {
      setIsLoading(true);
      const { data, error: supabaseError } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      const commentsWithDefaults = (data || []).map((comment) => ({
        ...comment,
        status_updated_at: comment.status_updated_at || comment.created_at,
      }));

      // Gunakan setTimeout untuk menghindari synchronous update
      setTimeout(() => {
        setComments(commentsWithDefaults);
      }, 0);

      hasFetched.current = true;
      return commentsWithDefaults;
    } catch (err) {
      console.error("Error fetching comments:", err);
      error("Fetch Failed", "Failed to fetch comments", 3000);
      return [];
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  }, [error]);

  const refreshComments = useCallback(() => {
    hasFetched.current = false;
    fetchComments().then(() => {
      success("Refreshing...", "Loading latest comments", 1500);
    });
  }, [fetchComments, success]);

  // Perbaikan useEffect dengan setTimeout
  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

      if (cookies[COOKIE_NAME] === "true" && !hasFetched.current) {
        await fetchComments();
      }
    };

    // Gunakan setTimeout untuk async operation
    const timer = setTimeout(() => {
      checkAuthAndFetch();
    }, 0);

    return () => clearTimeout(timer);
  }, [fetchComments]);

  const updateCommentStatus = useCallback(
    async (id: string, status: string, isFeatured: boolean = false) => {
      const validStatuses = ["pending", "approved", "featured", "needs_revision"];

      if (!isFeatured && !validStatuses.includes(status)) {
        error("Invalid Status", `Status "${status}" is not valid`, 3000);
        return;
      }

      try {
        const updates: {
          updated_at: string;
          status_updated_at: string;
          is_featured?: boolean;
          status?: string;
        } = {
          updated_at: new Date().toISOString(),
          status_updated_at: new Date().toISOString(),
        };

        if (isFeatured) {
          updates.is_featured = true;
          updates.status = "featured";
        } else {
          updates.status = status;
        }

        const { error: supabaseError } = await supabase.from("guestbook").update(updates).eq("id", id);

        if (supabaseError) throw supabaseError;

        // Gunakan setTimeout untuk async update
        setTimeout(() => {
          setComments((prev) =>
            prev.map((comment) =>
              comment.id === id
                ? {
                    ...comment,
                    status: isFeatured ? "featured" : status,
                    is_featured: isFeatured,
                    status_updated_at: new Date().toISOString(),
                  }
                : comment
            )
          );
        }, 0);

        closeModal();

        if (isFeatured) {
          success("Comment Featured", "Comment is now featured with star badge", 3000);
        } else if (status === "approved") {
          success("Comment Approved", "Comment is now visible to all users", 3000);
        } else if (status === "needs_revision") {
          warning("Revision Requested", "User needs to improve this comment. Will auto-delete in 24h.", 4000);
        } else {
          success(`Comment ${status}`, "Status updated successfully", 3000);
        }
      } catch (err: unknown) {
        console.error("Error updating comment:", err);
        error("Update Failed", err instanceof Error ? err.message : "Unknown error", 4000);
      }
    },
    [closeModal, success, error, warning]
  );

  const deleteComment = useCallback(async () => {
    if (!modalState.commentId) return;

    try {
      const { error: supabaseError } = await supabase.from("guestbook").delete().eq("id", modalState.commentId);

      if (supabaseError) throw supabaseError;

      // Gunakan setTimeout untuk async update
      setTimeout(() => {
        setComments((prev) => prev.filter((comment) => comment.id !== modalState.commentId));
      }, 0);

      closeModal();
      success("Comment Deleted", "Comment has been permanently removed", 3000);
    } catch (err) {
      console.error("Error deleting comment:", err);
      error("Delete Failed", "Failed to delete comment", 3000);
    }
  }, [modalState.commentId, closeModal, success, error]);

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

  return {
    comments,
    isLoading,
    modalState,
    openModal,
    closeModal,
    refreshComments,
    handleDeleteConfirm,
    handleApproveConfirm,
    handleFeatureConfirm,
    handleNeedsRevisionConfirm,
  };
};
