export interface Account {
  id: string;
  name: string;
  type?: 'cash' | 'bank' | 'credit' | string;
  currency?: string;
  createdAt?: string;
  // computed client-side
  balance?: number;
}
