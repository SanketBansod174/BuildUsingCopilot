import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { AccountService } from '../../core/services/account.service';
import { CategoryService } from '../../core/services/category.service';
import { Transaction } from '../../core/models/transaction.model';
import { Account } from '../../core/models/account.model';
import { Category } from '../../core/models/category.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-transactions',
  template: `
  <div style="display:flex; gap:24px;">
    <div style="flex:1;">
      <h2>New Transaction</h2>
      <form (ngSubmit)="add()">
        <mat-form-field appearance="fill" style="width:100%;">
          <mat-label>Account</mat-label>
          <mat-select [(ngModel)]="model.accountId" name="accountId" required>
            <mat-option *ngFor="let a of accounts" [value]="a.id">{{a.name}}</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill" style="width:100%;">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="model.categoryId" name="categoryId">
            <mat-option *ngFor="let c of categories" [value]="c.id">{{c.name}}</mat-option>
            <mat-option [value]="null">—</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill" style="width:100%;">
          <mat-label>Amount</mat-label>
          <input matInput type="number" [(ngModel)]="model.amount" name="amount" required>
        </mat-form-field>

        <mat-form-field appearance="fill" style="width:100%;">
          <mat-label>Date</mat-label>
          <input matInput [matDatepicker]="picker" [(ngModel)]="modelDate" name="date" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit">Add</button>
      </form>
    </div>

    <div style="flex:2;">
      <h2>Transactions</h2>
      <div *ngIf="transactions?.length === 0">No transactions</div>
      <mat-list>
        <mat-list-item *ngFor="let t of transactions">
          <div mat-line>{{t.date | date}} — {{t.amount | currency}}</div>
          <div mat-line small>{{ getAccountName(t.accountId) }} • {{ getCategoryName(t.categoryId) }}</div>
        </mat-list-item>
      </mat-list>
    </div>
  </div>
  `
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  accounts: Account[] = [];
  categories: Category[] = [];

  model: Partial<Transaction> = {};
  modelDate: Date = new Date();

  constructor(
    private txService: TransactionService,
    private accountService: AccountService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.txService.getAll().subscribe(x => this.transactions = x);
    this.accountService.getAll().subscribe(x => this.accounts = x);
    this.categoryService.getAll().subscribe(x => this.categories = x);

    // Prefill model date and default account
    this.txService.getLastUsedAccountId().then(id => {
      if (id) {
        this.model.accountId = id;
      } else if (this.accounts.length) {
        this.model.accountId = this.accounts[0].id;
      }
    });
  }

  async add() {
    const tx: Transaction = {
      id: uuidv4(),
      date: (this.modelDate || new Date()).toISOString(),
      amount: Number(this.model.amount || 0),
      accountId: String(this.model.accountId),
      categoryId: this.model.categoryId ?? null,
      payee: this.model.payee,
      notes: this.model.notes,
      type: (this.model.amount && this.model.amount > 0) ? 'income' : 'expense',
      createdAt: new Date().toISOString()
    };
    await this.txService.create(tx);
    // reset
    this.model = {};
    this.modelDate = new Date();
  }

  getAccountName(id: string) {
    return this.accounts.find(a => a.id === id)?.name ?? id;
  }

  getCategoryName(id?: string | null) {
    if (!id) return '—';
    return this.categories.find(c => c.id === id)?.name ?? id;
  }
}
