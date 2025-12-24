import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-categories',
  template: `
  <mat-card>
    <h2>Categories</h2>
    <mat-list>
      <mat-list-item *ngFor="let c of categories">
        <mat-icon matListAvatar style="color:{{c.color}}">label</mat-icon>
        <div mat-line>{{ c.name }}</div>
        <div mat-line style="font-size:12px;color:gray;">
          Budget: {{ c.budgetPerMonth ? (c.budgetPerMonth | currency) : '—' }}
        </div>
      </mat-list-item>
    </mat-list>
  </mat-card>
  `
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }
}
