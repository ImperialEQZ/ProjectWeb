import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api';

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }

  // Регистрация
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { username, password });
  }

  // Вход
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }
}
