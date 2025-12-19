import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface UseAutoDeleteCommentsProps {
  isAuthenticated: boolean;
  onAutoDelete?: (deletedCount: number) => void;
}

export function useAutoDeleteComments({ isAuthenticated, onAutoDelete }: UseAutoDeleteCommentsProps) {
  const [autoDeleteCount, setAutoDeleteCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  // PRODUCTION SETTINGS
  const AUTO_DELETE_AFTER_SECONDS = 86400; // 24 jam = 86400 detik
  const CHECK_INTERVAL_MS = 300000; // 5 menit = 300000 ms

  const autoDeleteOldRevisionComments = useCallback(async () => {
    if (!isAuthenticated || isChecking) return;

    try {
      setIsChecking(true);
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1); // Kurangi 1 hari

      const { data: oldComments, error: fetchError } = await supabase.from("guestbook").select("*").eq("status", "needs_revision").lt("status_updated_at", oneDayAgo.toISOString());

      if (fetchError) throw fetchError;

      if (oldComments && oldComments.length > 0) {
        const commentIds = oldComments.map((comment) => comment.id);

        const { error: deleteError } = await supabase.from("guestbook").delete().in("id", commentIds);

        if (deleteError) throw deleteError;

        const deletedCount = oldComments.length;
        setAutoDeleteCount((prev) => prev + deletedCount);

        if (onAutoDelete) {
          onAutoDelete(deletedCount);
        }

        console.log(`✅ Auto-deleted ${deletedCount} old revision comments`);
        return deletedCount;
      }
    } catch (error) {
      console.error("❌ Error auto-deleting old comments:", error);
    } finally {
      setIsChecking(false);
    }

    return 0;
  }, [isAuthenticated, isChecking, onAutoDelete]);

  // Hitung waktu tersisa dalam jam
  const getTimeUntilDelete = useCallback((statusUpdatedAt: string): string => {
    const updatedAt = new Date(statusUpdatedAt);
    const now = new Date();
    const hoursDiff = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60));

    if (hoursDiff >= 24) {
      return "Ready for auto-delete";
    }

    const hoursLeft = 24 - hoursDiff;
    if (hoursLeft > 1) {
      return `${hoursLeft} hours remaining`;
    } else {
      const minutesLeft = 60 - (Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60)) % 60);
      return `${minutesLeft} minutes remaining`;
    }
  }, []);

  // Check jika akan dihapus dalam 1 jam ke depan
  const isAboutToBeDeleted = useCallback((statusUpdatedAt: string): boolean => {
    const updatedAt = new Date(statusUpdatedAt);
    const now = new Date();
    const hoursDiff = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60));
    return hoursDiff >= 23; // 23 jam atau lebih
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Jalankan sekali saat mount
    autoDeleteOldRevisionComments();

    // Setup interval setiap 5 menit
    const interval = setInterval(() => {
      autoDeleteOldRevisionComments();
    }, CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAuthenticated, autoDeleteOldRevisionComments]);

  return {
    autoDeleteCount,
    isChecking,
    getTimeUntilDelete,
    isAboutToBeDeleted,
    triggerManualCheck: autoDeleteOldRevisionComments,
    config: {
      deleteAfterSeconds: AUTO_DELETE_AFTER_SECONDS,
      checkIntervalMs: CHECK_INTERVAL_MS,
      isTesting: false, // Production mode
    },
  };
}
