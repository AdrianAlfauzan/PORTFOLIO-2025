"use client";

import { useState, useCallback, useRef, useEffect } from "react";

// OUR CONSTANTS
import { COOKIE_NAME } from "@/constants/admin";

// OUR HOOKS
import { useToast } from "@/hooks/useToast";

// OUR TYPES
import { GuestbookComment, GuestbookDBRow } from "@/types/guestbook";
import { ModalState, EditFormData, GuestbookUpdateDTO } from "@/types/admin";

// OUR LIBRARIES
import { supabase } from "@/lib/supabase";

export const useGuestbookAdmin = () => {
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    commentId: null,
    commentName: "",
    commentData: undefined,
  });

  const hasFetched = useRef(false);
  const { success, error, warning } = useToast();

  // Helper function untuk normalize reactions
  const normalizeReactions = (reactions: unknown): GuestbookComment["reactions"] => {
    if (!reactions || typeof reactions !== "object") {
      return { like: 0, love: 0, thanks: 0, insightful: 0 };
    }

    const reactionObj = reactions as Record<string, unknown>;

    return {
      like: typeof reactionObj.like === "number" ? reactionObj.like : 0,
      love: typeof reactionObj.love === "number" ? reactionObj.love : 0,
      thanks: typeof reactionObj.thanks === "number" ? reactionObj.thanks : 0,
      insightful: typeof reactionObj.insightful === "number" ? reactionObj.insightful : 0,
    };
  };

  // Open modal generic
  const openModal = useCallback((type: ModalState["type"], commentId: string, commentName: string, commentData?: Partial<GuestbookComment>) => {
    setModalState({ type, commentId, commentName, commentData });
  }, []);

  // Specific function for edit modal - TAMBAHKAN KONVERSI NULL KE STRING KOSONG
  const openEditModal = useCallback(
    (commentId: string, commentName: string, commentData: Partial<GuestbookComment>) => {
      // Konversi null values ke empty string
      const formattedData = {
        ...commentData,
        profession: commentData.profession || "",
        website: commentData.website || "",
      } as Partial<EditFormData>;

      openModal("edit", commentId, commentName, formattedData);
    },
    [openModal]
  );

  const closeModal = useCallback(() => {
    setModalState({ type: null, commentId: null, commentName: "", commentData: undefined });
  }, []);

  const fetchComments = useCallback(async () => {
    if (hasFetched.current) return;

    try {
      setIsLoading(true);
      const { data, error: supabaseError } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;

      // Type data sebagai GuestbookDBRow[]
      const dbRows = data as GuestbookDBRow[];

      const commentsWithDefaults: GuestbookComment[] = dbRows.map((comment: GuestbookDBRow) => ({
        id: comment.id,
        name: comment.name,
        email: comment.email,
        message: comment.message,
        profession: comment.profession ?? undefined,
        website: comment.website ?? undefined,
        status: comment.status,
        is_featured: comment.is_featured,
        reactions: normalizeReactions(comment.reactions),
        created_at: comment.created_at,
        status_updated_at: comment.status_updated_at || comment.created_at,
        user_token: comment.user_token ?? undefined,
        ip_address: comment.ip_address ?? undefined,
        user_agent: comment.user_agent ?? undefined,
        is_spam: comment.is_spam ?? false,
        updated_at: comment.updated_at,
      }));

      setComments(commentsWithDefaults);
      hasFetched.current = true;
      return commentsWithDefaults;
    } catch (err) {
      console.error("Error fetching comments:", err);
      error("Fetch Failed", "Failed to fetch comments", 3000);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [error]);

  const refreshComments = useCallback(() => {
    hasFetched.current = false;
    fetchComments().then(() => {
      success("Refreshing...", "Loading latest comments", 1500);
    });
  }, [fetchComments, success]);

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

    checkAuthAndFetch();
  }, [fetchComments]);

  // Update comment status (for approve, feature, needs revision)
  const updateCommentStatus = useCallback(
    async (id: string, status: string, isFeatured: boolean = false) => {
      const validStatuses = ["pending", "approved", "featured", "needs_revision"];

      if (!isFeatured && !validStatuses.includes(status)) {
        error("Invalid Status", `Status "${status}" is not valid`, 3000);
        return;
      }

      try {
        const updates: GuestbookUpdateDTO = {
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

  // Update full comment (for edit functionality)
  const updateComment = useCallback(async (commentId: string, updates: GuestbookUpdateDTO) => {
    try {
      // Add timestamps
      const fullUpdates: GuestbookUpdateDTO = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      // If status changed, update status_updated_at
      if (updates.status) {
        fullUpdates.status_updated_at = new Date().toISOString();
      }

      const { error: supabaseError } = await supabase.from("guestbook").update(fullUpdates).eq("id", commentId);

      if (supabaseError) throw supabaseError;

      // Update local state dengan type-safe approach
      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id !== commentId) return comment;

          return {
            ...comment,
            ...(updates.name !== undefined && { name: updates.name }),
            ...(updates.email !== undefined && { email: updates.email }),
            ...(updates.message !== undefined && { message: updates.message }),
            ...(updates.profession !== undefined && { profession: updates.profession }),
            ...(updates.website !== undefined && { website: updates.website }),
            ...(updates.status !== undefined && { status: updates.status }),
            ...(updates.is_featured !== undefined && { is_featured: updates.is_featured }),
            ...(updates.is_spam !== undefined && { is_spam: updates.is_spam }),
            updated_at: new Date().toISOString(),
            status_updated_at: updates.status ? new Date().toISOString() : comment.status_updated_at,
          };
        })
      );

      return true;
    } catch (err: unknown) {
      console.error("Error updating comment:", err);
      return false;
    }
  }, []);

  // Handle edit confirmation
  const handleEditConfirm = useCallback(
    async (formData: EditFormData) => {
      if (!modalState.commentId) return;

      const updates: GuestbookUpdateDTO = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        profession: formData.profession || null,
        website: formData.website || null,
      };

      const result = await updateComment(modalState.commentId, updates);
      if (result) {
        success("Comment Updated", "Comment has been successfully updated", 3000);
        closeModal();
      } else {
        error("Update Failed", "Failed to update comment", 3000);
      }
    },
    [modalState.commentId, updateComment, closeModal, success, error]
  );

  const deleteComment = useCallback(async () => {
    if (!modalState.commentId) return;

    try {
      const { error: supabaseError } = await supabase.from("guestbook").delete().eq("id", modalState.commentId);

      if (supabaseError) throw supabaseError;

      setComments((prev) => prev.filter((comment) => comment.id !== modalState.commentId));
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
    openEditModal,
    closeModal,
    fetchComments,
    refreshComments,
    updateComment,
    deleteComment,
    handleDeleteConfirm,
    handleApproveConfirm,
    handleFeatureConfirm,
    handleNeedsRevisionConfirm,
    handleEditConfirm,
  };
};
