import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { CategoryService } from '../../core/services/category.service';
import { TransactionService } from '../../core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  template: `
  <div style="display:flex; gap:16px; flex-wrap:wrap;">
    <mat-card style="flex:1 1 200px;">
      <h3>Accounts</h3>
      <div>{{ accountsCount }}</div>
    </mat-card>

    <mat-card style="flex:1 1 200px;">
      <h3>Categories</h3>
      <div>{{ categoriesCount }}</div>
    </mat-card>

    <mat-card style="flex:1 1 200px;">
      <h3>Transactions</h3>
      <div>{{ transactionsCount }}</div>
    </mat-card>
  </div>

  <mat-divider style="margin:16px 0;"></mat-divider>

  <p>Charts and metrics go here (placeholder). Use services to compute totals, trends, and feed chart components.</p>
  `
})
export class DashboardComponent implements OnInit {
  accountsCount = 0;
  categoriesCount = 0;
  transactionsCount = 0;

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private txService: TransactionService
  ) {}

  ngOnInit(): void {
    this.accountService.getAll().subscribe(a => this.accountsCount = a.length);
    this.categoryService.getAll().subscribe(c => this.categoriesCount = c.length);
    this.txService.getAll().subscribe(t => this.transactionsCount = t.length);
  }
}
