export interface DataItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at?: string;
}

export type FormData = Omit<DataItem, "id" | "created_at" | "updated_at">;

// Untuk mapping dari Supabase
export interface SupabaseUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at?: string;
}

export interface TableState {
  selectedItems: Set<string>;
  isAllSelected: boolean;
}
