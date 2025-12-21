// constants/guestbook.ts
import { MessageSquare, Heart, ThumbsUp, ThumbsDown, Star, Sparkles, Check, Eye, EyeOff, Users, Edit, AlertCircle, Zap } from "lucide-react";
import { ReactionOption, TabOption, StatCard } from "@/types/guestbook";

// Reaction options
export const reactionOptions: ReactionOption[] = [
  {
    type: "like",
    icon: ThumbsUp,
    label: "Like",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
  },
  {
    type: "love",
    icon: Heart,
    label: "Love",
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
  },
  {
    type: "thanks",
    icon: Sparkles,
    label: "Thanks",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
  },
  {
    type: "insightful",
    icon: Zap,
    label: "Insightful",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    type: "dislike",
    icon: ThumbsDown,
    label: "Dislike",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
];

// Filter tabs
export const filterTabs: TabOption[] = [
  {
    value: "all",
    label: "All Comments",
    icon: Users,
  },
  {
    value: "featured",
    label: "Featured",
    icon: Star,
  },
  {
    value: "approved",
    label: "Approved",
    icon: Check,
  },
  {
    value: "request_edit",
    label: "Request Edit",
    icon: AlertCircle,
  },
];

// Default stat cards (values will be populated dynamically)
export const statCards: StatCard[] = [
  {
    label: "Total Comments",
    value: 0,
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Approved",
    value: 0,
    icon: Check,
    color: "from-emerald-500 to-green-500",
  },
  {
    label: "Featured",
    value: 0,
    icon: Star,
    color: "from-yellow-500 to-amber-500",
  },
  {
    label: "Pending",
    value: 0,
    icon: EyeOff,
    color: "from-orange-500 to-red-500",
  },
  {
    label: "Request Edit",
    value: 0,
    icon: Edit,
    color: "from-orange-500 to-red-500",
  },
];

// Pagination constants
export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 9,
  MAX_VISIBLE_PAGES: 5,
  MOBILE_ITEMS_PER_PAGE: 6,
};

// Form validation constants
export const FORM_VALIDATION = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  EMAIL: {
    MAX_LENGTH: 255,
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
  },
  PROFESSION: {
    MAX_LENGTH: 100,
  },
  WEBSITE: {
    MAX_LENGTH: 255,
  },
};

// Color constants for status badges
export const STATUS_COLORS = {
  pending: {
    bg: "bg-amber-500/20",
    text: "text-amber-300",
    border: "border-amber-500/30",
    icon: Eye,
  },
  approved: {
    bg: "bg-emerald-500/20",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    icon: Check,
  },
  needs_revision: {
    bg: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
    text: "text-orange-300",
    border: "border-orange-500/50",
    icon: AlertCircle,
  },
  featured: {
    bg: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20",
    text: "text-yellow-300",
    border: "border-yellow-500/30",
    icon: Star,
  },
};

// Animation constants
export const ANIMATION = {
  PAGE_ENTER: {
    opacity: 0,
    y: 20,
  },
  PAGE_ENTER_DELAYED: (delay: number) => ({
    opacity: 0,
    y: 20,
    transition: { delay },
  }),
  STAGGER_CHILDREN: {
    staggerChildren: 0.1,
  },
  FADE_IN: {
    opacity: 1,
    y: 0,
  },
};
