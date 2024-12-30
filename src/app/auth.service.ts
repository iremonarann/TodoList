import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { environment } from '../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin: boolean = false;
  private apiUrl = `${environment.baseUrl}/users`;
  private jwtHelper = new JwtHelperService();

  private tokenUrl = 'http://localhost:5186/api/Accounts';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.tokenUrl}/login`, { username, password });
  }

  getAdminData() {
    return this.http.get(this.tokenUrl);
  }

  saveToken(token: string) {
    console.log('Token kaydediliyor:', token);
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const token = this.getToken();

    if (!token) return false;

    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken);

      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decodedToken['role'];
      console.log('Token içindeki role:', role);
      return role === 'Admin';
    } catch (error) {
      console.error('Token decode edilemedi:', error);
      return false;
    }
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }



  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }




  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  saveUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  getUserName(): string {
    const username = localStorage.getItem('username');
    return username ? username : 'Guest';
  }

  saveUsername(username: string): void {
    localStorage.setItem('username', username);
  }


  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  delete() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  verifyPassword(password: string): Observable<boolean> {
    const userId = this.getUserId();
    return this.http.post<boolean>(`/api/verify-password`, { userId, password });
  }



}


