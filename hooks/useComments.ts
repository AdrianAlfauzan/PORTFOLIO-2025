import { useState, useEffect, useCallback } from "react";

// OUR TYPES
import { GuestbookComment, StatsType, SupabaseGuestbookRow } from "@/types/guestbook";

// OUR LIBRARIES
import { supabase } from "@/lib/supabase";

// OUR UTILS
import { normalizeReactions } from "@/utils/reactions";

export const useComments = () => {
  const [comments, setComments] = useState<GuestbookComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<StatsType>({
    total: 0,
    approved: 0,
    featured: 0,
    pending: 0,
    needs_revision: 0,
  });

  const calculateStats = useCallback((data: GuestbookComment[]) => {
    setStats({
      total: data.length,
      approved: data.filter((c) => c.status === "approved").length,
      featured: data.filter((c) => c.is_featured).length,
      pending: data.filter((c) => c.status === "pending").length,
      needs_revision: data.filter((c) => c.status === "needs_revision").length,
    });
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.from("guestbook").select("*").order("created_at", { ascending: false });

      if (error) throw error;

      // Gunakan SupabaseGuestbookRow type yang sudah kita buat
      const rows: SupabaseGuestbookRow[] = data || [];

      const normalizedData: GuestbookComment[] = rows.map((row) => ({
        id: row.id,
        name: row.name,
        email: row.email,
        message: row.message,
        profession: row.profession,
        website: row.website,
        status: row.status,
        is_featured: row.is_featured,
        reactions: normalizeReactions(row.reactions),
        user_token: row.user_token,
        created_at: row.created_at,
        updated_at: row.updated_at,
        ip_address: row.ip_address,
        user_agent: row.user_agent,
        is_spam: row.is_spam,
      }));

      setComments(normalizedData);
      calculateStats(normalizedData);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  }, [calculateStats]);

  const addComment = useCallback(
    (comment: GuestbookComment) => {
      setComments((prev) => [comment, ...prev]);
      calculateStats([comment, ...comments]);
    },
    [comments, calculateStats]
  );

  const updateComment = useCallback(
    (id: string, updates: Partial<GuestbookComment>) => {
      setComments((prev) => prev.map((comment) => (comment.id === id ? { ...comment, ...updates } : comment)));
      calculateStats(comments.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    },
    [comments, calculateStats]
  );

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    isLoading,
    error,
    stats,
    fetchComments,
    addComment,
    updateComment,
  };
};
