import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category.model";

@Injectable({
    providedIn: 'root'
})

export class CategoryService{
    private apiUrl = 'http://localhost:5186/api/Categories';

    constructor(private http: HttpClient) {}
        
    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }
    
    getUserCategories(userId: number): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/user/${userId}`);
    }

    deleteCategory(categoryId: number): Observable<any[]> {
        return this.http.delete<any[]>(`${this.apiUrl}/${categoryId}`);
    }
}