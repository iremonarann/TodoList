import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5186/api/Users';  

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  updateUser(userId: number, updatedUser: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, updatedUser);
  }
  
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
