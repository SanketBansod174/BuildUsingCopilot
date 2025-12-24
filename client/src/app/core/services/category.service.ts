import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Category } from '../models/category.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CategoryService {
  private categories$ = new BehaviorSubject<Category[]>([]);

  constructor(private db: DbService) {
    this.load();
  }

  async load() {
    const items = await this.db.categories.toArray();
    this.categories$.next(items);
  }

  getAll() {
    return this.categories$.asObservable();
  }

  async create(category: Category) {
    await this.db.categories.add(category);
    await this.load();
  }

  async update(category: Category) {
    await this.db.categories.put(category);
    await this.load();
  }

  async delete(id: string) {
    await this.db.categories.delete(id);
    await this.load();
  }
}
