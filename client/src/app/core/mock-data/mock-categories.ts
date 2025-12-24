import { Category } from '../models/category.model';

export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat_food', name: 'Food', color: '#FF7043', createdAt: new Date().toISOString() },
  { id: 'cat_rent', name: 'Rent', color: '#8E24AA', createdAt: new Date().toISOString() },
  { id: 'cat_travel', name: 'Travel', color: '#039BE5', createdAt: new Date().toISOString() },
  { id: 'cat_util', name: 'Utilities', color: '#7CB342', createdAt: new Date().toISOString() }
];
