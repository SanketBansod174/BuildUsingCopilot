import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Account } from '../models/account.model';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AccountService {
  private accounts$ = new BehaviorSubject<Account[]>([]);

  constructor(private db: DbService) {
    this.load();
  }

  async load() {
    const items = await this.db.accounts.toArray();
    this.accounts$.next(items);
  }

  getAll(): Observable<Account[]> {
    return this.accounts$.asObservable();
  }

  async getById(id: string): Promise<Account | undefined> {
    return this.db.accounts.get(id);
  }

  async create(account: Account) {
    await this.db.accounts.add(account);
    await this.load();
  }

  async update(account: Account) {
    await this.db.accounts.put(account);
    await this.load();
  }

  async delete(id: string) {
    await this.db.accounts.delete(id);
    await this.load();
  }

  // compute balances from transactions
  async computeBalances(): Promise<Record<string, number>> {
    const txns = await this.db.transactions.toArray();
    const balances: Record<string, number> = {};
    for (const t of txns) {
      balances[t.accountId] = (balances[t.accountId] || 0) + t.amount;
    }
    return balances;
  }
}
