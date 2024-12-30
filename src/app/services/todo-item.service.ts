import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todoItem.model';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private apiUrl = 'http://localhost:5186/api/TodoItems';

  constructor(private http: HttpClient) { }

  getTodoItems(): Observable<any>{
    return this.http.get<TodoItem>(`${this.apiUrl}`);
  }
  getTodoItemsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  deleteTodoItem(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTodoItem(id: number, updatedItem: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedItem);
  }
  
  createTodoItem(newTask: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, newTask);
  }
  
  getTodoItemsByCategoryAndUser(categoryId: number, userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category/${categoryId}/user/${userId}`);
  }

}
