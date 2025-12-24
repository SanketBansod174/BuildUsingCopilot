import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: AccountsComponent }])
  ]
})
export class AccountsModule {}
