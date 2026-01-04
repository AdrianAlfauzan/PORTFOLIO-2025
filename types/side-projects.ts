import { LucideIcon } from "lucide-react";

export interface SideProject {
  id: number;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
  category: string;
  status: "experimental" | "fun" | "weird" | "nostalgic" | "educational" | "useful";
  githubUrl: string | null;
  demoUrl: string | null;
  features: string[];
  note?: string;
}

export interface SideProjectFilters {
  category: string;
  status?: string;
  search?: string;
}

export interface SideProjectPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
