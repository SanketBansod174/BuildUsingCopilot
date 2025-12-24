export interface Transaction {
  id: string;
  date: string; // ISO
  amount: number;
  accountId: string;
  categoryId?: string | null;
  payee?: string;
  notes?: string;
  createdAt?: string;
  // positive for income, negative for expense (or use type)
  type?: 'expense' | 'income' | 'transfer';
}
