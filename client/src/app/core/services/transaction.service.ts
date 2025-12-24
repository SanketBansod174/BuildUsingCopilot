import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TransactionService {
  private transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor(private db: DbService) {
    this.load();
  }

  async load() {
    const items = await this.db.transactions.orderBy('date').reverse().toArray();
    this.transactions$.next(items);
  }

  getAll() {
    return this.transactions$.asObservable();
  }

  async create(tx: Transaction) {
    await this.db.transactions.add(tx);
    await this.load();
  }

  async update(tx: Transaction) {
    await this.db.transactions.put(tx);
    await this.load();
  }

  async delete(id: string) {
    await this.db.transactions.delete(id);
    await this.load();
  }

  async getLastUsedAccountId(): Promise<string | undefined> {
    const latest = await this.db.transactions.orderBy('createdAt').reverse().first();
    return latest?.accountId;
  }
}
