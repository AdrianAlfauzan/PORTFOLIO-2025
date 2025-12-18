export interface DataItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export type FormData = Omit<DataItem, 'id' | 'createdAt'>;