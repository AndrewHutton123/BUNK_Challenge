import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  rootURL = '/api';

  calculatePayout(data: any) {
    console.log(data);
    return this.http.get('/api/payouts');
  }

  getInfo() {
    console.log('info');
    return this.http.get(this.rootURL + '/payouts');
  }
}
