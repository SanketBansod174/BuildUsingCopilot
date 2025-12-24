import { Transaction } from '../models/transaction.model';

const today = new Date();
function iso(dayOffset: number) {
  const d = new Date();
  d.setDate(today.getDate() + dayOffset);
  return d.toISOString();
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: iso(-2), amount: -12.50, accountId: 'acc_cash', categoryId: 'cat_food', payee: 'Cafe', notes: '', type: 'expense', createdAt: iso(-2) },
  { id: 't2', date: iso(-1), amount: -50, accountId: 'acc_bank', categoryId: 'cat_travel', payee: 'Taxi', notes: '', type: 'expense', createdAt: iso(-1) },
  { id: 't3', date: iso(0), amount: -800, accountId: 'acc_bank', categoryId: 'cat_rent', payee: 'Landlord', notes: 'Monthly rent', type: 'expense', createdAt: iso(0) },
  { id: 't4', date: iso(-5), amount: 2500, accountId: 'acc_bank', categoryId: null, payee: 'Employer', notes: 'Salary', type: 'income', createdAt: iso(-5) },
  { id: 't5', date: iso(-3), amount: -120.75, accountId: 'acc_credit', categoryId: 'cat_food', payee: 'Grocery', notes: '', type: 'expense', createdAt: iso(-3) },
  { id: 't6', date: iso(-7), amount: -60, accountId: 'acc_cash', categoryId: 'cat_util', payee: 'Electric Co', notes: '', type: 'expense', createdAt: iso(-7) },
  { id: 't7', date: iso(-12), amount: -30, accountId: 'acc_credit', categoryId: 'cat_travel', payee: 'Train', notes: '', type: 'expense', createdAt: iso(-12) },
  { id: 't8', date: iso(-20), amount: -8.50, accountId: 'acc_cash', categoryId: 'cat_food', payee: 'Coffee', notes: '', type: 'expense', createdAt: iso(-20) },
  { id: 't9', date: iso(-15), amount: -200, accountId: 'acc_bank', categoryId: 'cat_util', payee: 'Water', notes: '', type: 'expense', createdAt: iso(-15) },
  { id: 't10', date: iso(-9), amount: -45.00, accountId: 'acc_credit', categoryId: 'cat_food', payee: 'Restaurant', notes: '', type: 'expense', createdAt: iso(-9) }
];
