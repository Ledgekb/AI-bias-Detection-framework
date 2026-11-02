import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiasService {
  private apiUrl = 'http://localhost:5000/api/bias';

  constructor(private http: HttpClient) { }

  calculateWEAT(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/weat`, data);
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history`);
  }
}
