// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   private base = environment.apiUrl;
//   private http = inject(HttpClient);

//   getHello(): Observable<any> {
//     return this.http.get(`${this.base}/hello`);
//   }

//   get<T>(path: string): Observable<T> {
//     return this.http.get<T>(`${this.base}${path}`);
//   }

//   post<T>(path: string, body: any): Observable<T> {
//     return this.http.post<T>(`${this.base}${path}`, body);
//   }
// }
       