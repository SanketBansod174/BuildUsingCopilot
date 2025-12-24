import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <mat-sidenav-container class="sidenav-container" autosize>
    <mat-sidenav mode="side" opened>
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard"><mat-icon>dashboard</mat-icon> Dashboard</a>
        <a mat-list-item routerLink="/transactions"><mat-icon>receipt</mat-icon> Transactions</a>
        <a mat-list-item routerLink="/accounts"><mat-icon>account_balance</mat-icon> Accounts</a>
        <a mat-list-item routerLink="/categories"><mat-icon>category</mat-icon> Categories</a>
        <a mat-list-item routerLink="/reports"><mat-icon>bar_chart</mat-icon> Reports</a>
        <a mat-list-item routerLink="/settings"><mat-icon>settings</mat-icon> Settings</a>
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content>
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="toggleTheme()"><mat-icon>brightness_6</mat-icon></button>
        <span style="margin-left: 8px;">BuildUsingCopilot</span>
      </mat-toolbar>

      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }
    .content { padding: 24px; }
  `]
})
export class AppLayoutComponent {
  toggleTheme() {
    // Implement theme toggle logic (persist to settings later)
    document.body.classList.toggle('dark-theme');
  }
}
