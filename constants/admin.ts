import { Check, Star, MessageSquare, AlertCircle, Edit } from "lucide-react";
import { StatusOption } from "@/types/admin";

export const statusOptions: StatusOption[] = [
  {
    value: "all",
    label: "All Status",
    color: "text-gray-300",
    bgColor: "bg-gray-800/50",
    borderColor: "border-gray-700/50",
    icon: MessageSquare,
  },
  {
    value: "pending",
    label: "Pending",
    color: "text-amber-300",
    bgColor: "bg-amber-500/20",
    borderColor: "border-amber-500/30",
    icon: AlertCircle,
  },
  {
    value: "approved",
    label: "Approved",
    color: "text-emerald-300",
    bgColor: "bg-emerald-500/20",
    borderColor: "border-emerald-500/30",
    icon: Check,
  },
  {
    value: "featured",
    label: "Featured",
    color: "text-yellow-300",
    bgColor: "bg-yellow-500/20",
    borderColor: "border-yellow-500/30",
    icon: Star,
  },
  {
    value: "needs_revision",
    label: "Needs Revision",
    color: "text-orange-300",
    bgColor: "bg-orange-500/20",
    borderColor: "border-orange-500/30",
    icon: Edit,
  },
];

export const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export const COOKIE_NAME = "admin_auth";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export const AUTO_DELETE_TEST_SECONDS = 60; // 1 minute for testing
export const AUTO_DELETE_PROD_SECONDS = 24 * 60 * 60; // 24 hours for production
