import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Category } from '../models/category.model';
import { Transaction } from '../models/transaction.model';

@Injectable()
export class DbService extends Dexie {
  accounts!: Dexie.Table<Account, string>;
  categories!: Dexie.Table<Category, string>;
  transactions!: Dexie.Table<Transaction, string>;

  constructor() {
    super('BuildUsingCopilotDB');
    this.version(1).stores({
      accounts: 'id, name, type, createdAt',
      categories: 'id, name, color, createdAt',
      transactions: 'id, date, accountId, categoryId, createdAt'
    });

    this.accounts = this.table('accounts');
    this.categories = this.table('categories');
    this.transactions = this.table('transactions');
  }

  // Helper to check emptiness
  async isEmpty(): Promise<boolean> {
    const count = await Promise.all([
      this.accounts.count(),
      this.categories.count(),
      this.transactions.count()
    ]);
    return count[0] === 0 && count[1] === 0 && count[2] === 0;
  }

  async clearAll(): Promise<void> {
    await Promise.all([
      this.accounts.clear(),
      this.categories.clear(),
      this.transactions.clear()
    ]);
  }
}
