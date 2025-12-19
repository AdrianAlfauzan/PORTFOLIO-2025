export interface GuestbookComment {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string | null;
  website?: string | null;
  status: string;
  is_featured: boolean;
  reactions: {
    like: number;
    love: number;
    thanks: number;
    insightful: number;
  };
  created_at: string;
  status_updated_at: string;
  user_token?: string;
  ip_address?: string;
  user_agent?: string;
  is_spam?: boolean;
  updated_at: string;
}

// Database row interface untuk data dari Supabase
export interface GuestbookDBRow {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string | null;
  website?: string | null;
  status: string;
  is_featured: boolean;
  reactions: unknown; // Dari database bisa JSON atau object
  created_at: string;
  status_updated_at?: string | null;
  user_token?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  is_spam?: boolean | null;
  updated_at: string;
}
