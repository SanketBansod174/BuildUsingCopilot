import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutComponent } from './layout/app-layout.component';
import { TransactionsComponent } from './features/transactions/transactions.component';
import { DbService } from './core/services/db.service';
import { PrefillService } from './core/services/prefill.service';
import { AccountService } from './core/services/account.service';
import { CategoryService } from './core/services/category.service';
import { TransactionService } from './core/services/transaction.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function prefillFactory(prefill: PrefillService) {
  return () => prefill.init();
}

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    TransactionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    DbService,
    PrefillService,
    AccountService,
    CategoryService,
    TransactionService,
    {
      provide: APP_INITIALIZER,
      useFactory: prefillFactory,
      deps: [PrefillService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
