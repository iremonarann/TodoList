import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TodoItemService } from '../services/todo-item.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { PriorityService } from '../services/priority.service';
import { TodoItem } from '../models/todoItem.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: ``
})
export class CategoriesComponent implements OnInit {

  title: string = '';
  userId: number | null = null;
  categories: any[] = [];
  todoItems: any[] = [];
  priorities: any[] = [];
  errorMessage: string = '';
  incompletedTasks: TodoItem[] = [];
  completedTasks: TodoItem[] = [];
  shouldColorTasks: boolean = false;
  showCompletedTasks: boolean = false;
  showPriorities: boolean = false;
  deletingItem: TodoItem | null = null;

  constructor(
    private todoItemService: TodoItemService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private priorityService: PriorityService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.title = this.authService.getUserName();
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    )

    this.priorityService.getPriorities().subscribe(
      (priorities) => {
        this.priorities = priorities;
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    )

    this.loadCategories();
  }

  loadCategories(): void {
    const userId = this.authService.getUserId();
    if (userId !== null) {
      this.categoryService.getUserCategories(userId).subscribe(
        (categories) => {
          this.categories = categories;
        },
        (error) => {
          console.error('Error fetching categpories', error);
        }
      );
    } else {
      console.error('User is not logged in. No userId found.');
    }

  }

  onCategoryClick(categoryId: number): void {
    this.todoItems = [];
    this.errorMessage = '';
    const userId = this.authService.getUserId();  // Giriş yapan kullanıcı ID'si
    if (userId) {
      this.todoItemService.getTodoItemsByCategoryAndUser(categoryId, userId).subscribe(
        (items) => {
          this.todoItems = items;
        },
        (error) => {
          this.errorMessage = 'There is no task in this category!';
        }
      );
    } else {
      this.errorMessage = 'User not logged in.';
    }
  }

  loadTodoItems() {
    this.todoItemService.getTodoItems().subscribe(
      (items: any) => {
        console.log('API response:', items); // Veriyi burada inceleyin
        this.todoItems = items;
        this.incompletedTasks = this.todoItems.filter((item: any) => !item.isComplete);
        this.completedTasks = this.todoItems.filter((item: any) => item.isComplete);
      },
      (error) => {
        this.errorMessage = 'Could not load tasks.';
      }
    );

  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
  }

  loadPriorities() {
    this.priorityService.getPriorities().subscribe(
      (data: any) => {
        this.priorities = data;
        this.showPriorities = !this.showPriorities;
      },
      (error) => {
        console.error('Error loading priorities:', error);
      }
    )
  }

  loadPriorities2() {
    this.shouldColorTasks = !this.shouldColorTasks;
    this.priorityService.getPriorities().subscribe(
      (priorities) => {
        this.priorities = priorities;
        this.todoItems.forEach((item) => {
          return this.getPriorityColor(item.priorityId);
        });
      }
    );
  }

  getPriorityColor(id: number): string {
    switch (id) {
      case 1:
        return '#ffebe6';
      case 2:
        return '#fff5e6';
      case 3:
        return '#ffffe6';
      default:
        return 'rgba(211, 211, 211, 0.7)';
    }
  }

  deleteItem(item: TodoItem) {
    this.deletingItem = item;
  }

  confirmDelete() {
    if (this.deletingItem) {
      this.todoItemService.deleteTodoItem(this.deletingItem.id).subscribe(
        (response) => {
          console.log('Task Deleted');
          this.loadTodoItems();
          this.deletingItem = null;
        },
        (error) => {
          console.error('Error deleting task', error);
        }
      );
    }
    window.location.reload();

}

taskComplete(item: any) {
  item.isComplete = !item.isComplete;
  this.todoItemService.updateTodoItem(item.id, item).subscribe(
    (response) => {
      console.log('Task is completed');
    },
    (error) => console.error('Error completing task', error)
  );
}
}