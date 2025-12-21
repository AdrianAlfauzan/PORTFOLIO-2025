// =================== BASIC TYPES ===================
export type ReactionType = "like" | "love" | "thanks" | "insightful" | "dislike";
export type CommentStatus = "pending" | "approved" | "needs_revision" | "featured";
export type FilterType = "all" | "featured" | "approved" | "request_edit";

// =================== CORE INTERFACES ===================
export interface Reactions {
  like: number;
  love: number;
  thanks: number;
  insightful: number;
  dislike: number;
}

// Data mentah dari Supabase (reactions masih unknown)
export interface SupabaseGuestbookRow {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status: CommentStatus;
  is_featured: boolean;
  reactions: unknown; // Akan dinormalisasi
  user_token?: string;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
  is_spam?: boolean;
}

// Data yang sudah dinormalisasi (ready untuk UI)
export interface GuestbookComment {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status: CommentStatus;
  is_featured: boolean;
  reactions: Reactions; // Sudah dinormalisasi
  user_token?: string;
  created_at: string;
  updated_at: string;
  ip_address?: string;
  user_agent?: string;
  is_spam?: boolean;
}

export interface StatsType {
  total: number;
  approved: number;
  featured: number;
  pending: number;
  needs_revision: number;
}

// =================== UI CONFIGURATION TYPES ===================
export interface ReactionOption {
  type: ReactionType;
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
  color: string;
  bgColor: string;
}

export interface TabOption {
  value: FilterType;
  label: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

export interface StatCard {
  label: string;
  value: number;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
}

// =================== FORM TYPES ===================
export interface FormDataType {
  name: string;
  email: string;
  message: string;
  profession: string;
  website: string;
}

// =================== PAGINATION TYPES ===================
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// =================== FEEDBACK TYPES ===================
export interface FeedbackMessage {
  type: "success" | "error" | "warning" | "info" | "reaction-success";
  title: string;
  message: string;
  duration?: number;
}

// =================== COMPONENT PROPS TYPES ===================
export interface CommentCardProps {
  comment: GuestbookComment;
  onReaction: (commentId: string, reactionType: ReactionType) => void;
  isReacting?: boolean;
  showFullMessage?: boolean;
}

export interface ReactionButtonsProps {
  commentId: string;
  reactions: Reactions;
  onReaction: (reactionType: ReactionType) => void;
  isReacting?: boolean;
  userHasReacted?: boolean;
}
