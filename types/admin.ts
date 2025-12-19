import { LucideIcon } from "lucide-react";
import { GuestbookComment } from "@/types/guestbook";

export type StatusType = "all" | "pending" | "approved" | "featured" | "needs_revision";

export interface StatusOption {
  value: StatusType;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
}

export type ModalType = "delete" | "approve" | "feature" | "needsRevision" | "edit" | null;

export interface ModalState {
  type: ModalType;
  commentId: string | null;
  commentName: string;
  commentData?: Partial<GuestbookComment>;
}

export interface EditFormData {
  name: string;
  email: string;
  message: string;
  profession: string;
  website: string;

}

export interface GuestbookUpdateDTO {
  name?: string;
  email?: string;
  message?: string;
  profession?: string | null;
  website?: string | null;
  status?: string;
  is_featured?: boolean;
  is_spam?: boolean;
  updated_at?: string;
  status_updated_at?: string;
}
