import { LucideIcon } from "lucide-react";

// Status types
export type StatusType = "all" | "pending" | "approved" | "featured" | "needs_revision";

// Status filter options
export interface StatusOption {
  value: StatusType;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

// Modal types
export type ModalType = "delete" | "approve" | "feature" | "needsRevision" | null;

export interface ModalState {
  type: ModalType;
  commentId: string | null;
  commentName: string;
}

// Auto-delete configuration
export interface AutoDeleteConfig {
  deleteAfterSeconds: number;
  isTesting: boolean;
}

// Admin component props
// export interface AdminGuestbookPageProps {
//   // Add any props if needed
// }

// Filter state
export interface FilterState {
  searchTerm: string;
  statusFilter: StatusType;
  showStatusDropdown: boolean;
}
