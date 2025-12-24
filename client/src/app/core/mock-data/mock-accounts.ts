import { Account } from '../models/account.model';

export const MOCK_ACCOUNTS: Account[] = [
  { id: 'acc_cash', name: 'Cash', type: 'cash', currency: 'USD', createdAt: new Date().toISOString() },
  { id: 'acc_bank', name: 'Checking Account', type: 'bank', currency: 'USD', createdAt: new Date().toISOString() },
  { id: 'acc_credit', name: 'Credit Card', type: 'credit', currency: 'USD', createdAt: new Date().toISOString() }
];
