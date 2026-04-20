/**
 * Servicio Angular de ejemplo para consumir endpoints de Spring Boot.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id?: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // Ruta base
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  listItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/items`);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseUrl}/items/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseUrl}/items`, item);
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseUrl}/items/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/items/${id}`);
  }
}
