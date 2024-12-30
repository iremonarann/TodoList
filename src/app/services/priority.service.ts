import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  private apiUrl = 'http://localhost:5186/api/priorities'; 

  constructor(private http: HttpClient) { }

  getPriorities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}