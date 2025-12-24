import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';
import { Account } from '../../core/models/account.model';

@Component({
  selector: 'app-accounts',
  template: `
  <mat-card>
    <h2>Accounts</h2>
    <mat-list>
      <mat-list-item *ngFor="let a of accounts">
        <div mat-line>{{ a.name }}</div>
        <div mat-line style="font-size:12px;color:gray;">
          Balance: {{ balances[a.id] | currency:'USD':'symbol':'1.2-2' }}
        </div>
      </mat-list-item>
    </mat-list>
  </mat-card>
  `
})
export class AccountsComponent implements OnInit {
  accounts: Account[] = [];
  balances: Record<string, number> = {};

  constructor(private accountService: AccountService) {}

  async ngOnInit() {
    this.accountService.getAll().subscribe(a => this.accounts = a);
    this.balances = await this.accountService.computeBalances();
  }
}
