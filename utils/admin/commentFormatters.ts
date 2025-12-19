import { GuestbookComment } from "@/types/guestbook";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    case "featured":
      return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
    case "pending":
      return "bg-amber-500/20 text-amber-300 border-amber-500/30";
    case "needs_revision":
      return "bg-orange-500/20 text-orange-300 border-orange-500/30";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/30";
  }
};

export const getCommentStats = (comments: GuestbookComment[]) => {
  const total = comments.length;
  const approved = comments.filter((c) => c.status === "approved").length;
  const featured = comments.filter((c) => c.is_featured).length;
  const pending = comments.filter((c) => c.status === "pending").length;
  const needsRevision = comments.filter((c) => c.status === "needs_revision").length;

  return {
    total,
    approved,
    featured,
    pending,
    needsRevision,
  };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
