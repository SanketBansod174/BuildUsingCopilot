import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { MOCK_ACCOUNTS } from '../mock-data/mock-accounts';
import { MOCK_CATEGORIES } from '../mock-data/mock-categories';
import { MOCK_TRANSACTIONS } from '../mock-data/mock-transactions';

@Injectable()
export class PrefillService {
  constructor(private db: DbService) {}

  async init(): Promise<void> {
    // On startup, seed DB if empty. This will run via APP_INITIALIZER.
    const empty = await this.db.isEmpty();
    if (!empty) {
      return;
    }
    // Seed accounts, categories, transactions
    await this.db.transaction('rw', this.db.accounts, this.db.categories, this.db.transactions, async () => {
      await this.db.accounts.bulkAdd(MOCK_ACCOUNTS);
      await this.db.categories.bulkAdd(MOCK_CATEGORIES);
      await this.db.transactions.bulkAdd(MOCK_TRANSACTIONS);
    });
  }

  // Expose reset to demo data function
  async resetToDemoData(): Promise<void> {
    await this.db.clearAll();
    await this.init();
  }
}
