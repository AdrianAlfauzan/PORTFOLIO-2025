import { useState, useMemo } from "react";
import { GuestbookComment } from "@/types/guestbook";
import { StatusType } from "@/types/admin";

export interface UseCommentFiltersReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: StatusType;
  setStatusFilter: (status: StatusType) => void;
  showStatusDropdown: boolean;
  setShowStatusDropdown: (show: boolean) => void;
  filteredComments: GuestbookComment[];
}

export const useCommentFilters = (comments: GuestbookComment[], initialStatus: StatusType = "all"): UseCommentFiltersReturn => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusType>(initialStatus);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const filteredComments = useMemo(() => {
    let filtered = [...comments];

    if (statusFilter !== "all") {
      filtered = filtered.filter((comment) => comment.status === statusFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (comment) => comment.name.toLowerCase().includes(term) || comment.email.toLowerCase().includes(term) || comment.message.toLowerCase().includes(term) || (comment.profession && comment.profession.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [comments, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    showStatusDropdown,
    setShowStatusDropdown,
    filteredComments,
  };
};
