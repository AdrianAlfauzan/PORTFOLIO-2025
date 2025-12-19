// Guestbook related interfaces
export interface GuestbookComment {
  id: string;
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
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
}

export interface CommentReactions {
  like: number;
  love: number;
  thanks: number;
  insightful: number;
}

// For API responses
export interface GuestbookInsertDTO {
  name: string;
  email: string;
  message: string;
  profession?: string;
  website?: string;
  status?: string;
  is_featured?: boolean;
}

export interface GuestbookUpdateDTO {
  status?: string;
  is_featured?: boolean;
  status_updated_at?: string;
  updated_at?: string;
}
