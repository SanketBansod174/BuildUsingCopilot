import { Component } from '@angular/core';
import { PrefillService } from '../../core/services/prefill.service';
import { DbService } from '../../core/services/db.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  template: `
  <mat-card>
    <h2>Settings</h2>

    <div style="display:flex; gap:12px; flex-wrap:wrap;">
      <button mat-raised-button color="warn" (click)="onReset()" title="Clear DB and seed demo data">
        <mat-icon>restart_alt</mat-icon> Reset to Demo Data
      </button>

      <button mat-raised-button color="primary" (click)="onExport()" title="Export all data as JSON">
        <mat-icon>download</mat-icon> Export JSON
      </button>

      <label style="display:inline-flex; align-items:center; gap:8px;">
        <input type="file" accept="application/json" (change)="onFileSelected($event)" style="display:none" #fileInput>
        <button mat-raised-button color="accent" (click)="fileInput.click()">
          <mat-icon>upload</mat-icon> Import JSON
        </button>
      </label>
    </div>

    <p style="margin-top:16px; color:gray;">
      Export will download a JSON containing accounts, categories and transactions.
      Import expects the same shape and will replace current DB contents.
    </p>
  </mat-card>
  `
})
export class SettingsComponent {
  constructor(
    private prefill: PrefillService,
    private db: DbService,
    private snack: MatSnackBar
  ) {}

  async onReset() {
    try {
      await this.prefill.resetToDemoData();
      this.snack.open('Database reset to demo data', 'OK', { duration: 3000 });
    } catch (err) {
      console.error(err);
      this.snack.open('Failed to reset demo data', 'OK', { duration: 3000 });
    }
  }

  async onExport() {
    try {
      const [accounts, categories, transactions] = await Promise.all([
        this.db.accounts.toArray(),
        this.db.categories.toArray(),
        this.db.transactions.toArray()
      ]);
      const payload = { accounts, categories, transactions, exportedAt: new Date().toISOString() };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `buildusingcopilot-export-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.snack.open('Export started', 'OK', { duration: 2000 });
    } catch (err) {
      console.error(err);
      this.snack.open('Export failed', 'OK', { duration: 3000 });
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      // Basic validation
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.accounts) || !Array.isArray(parsed.categories) || !Array.isArray(parsed.transactions)) {
        this.snack.open('Invalid import file format', 'OK', { duration: 4000 });
        return;
      }

      // Replace DB contents: clear and bulkAdd
      await this.db.transaction('rw', this.db.accounts, this.db.categories, this.db.transactions, async () => {
        await this.db.accounts.clear();
        await this.db.categories.clear();
        await this.db.transactions.clear();

        if (parsed.accounts.length) {
          await this.db.accounts.bulkAdd(parsed.accounts);
        }
        if (parsed.categories.length) {
          await this.db.categories.bulkAdd(parsed.categories);
        }
        if (parsed.transactions.length) {
          await this.db.transactions.bulkAdd(parsed.transactions);
        }
      });

      this.snack.open('Import successful', 'OK', { duration: 3000 });
    } catch (err) {
      console.error(err);
      this.snack.open('Import failed: ' + (err?.message || ''), 'OK', { duration: 4000 });
    } finally {
      // clear file input (optional)
      input.value = '';
    }
  }
}
