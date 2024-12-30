import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TodoItemService } from '../services/todo-item.service';
import { CategoryService } from '../services/category.service';
import { PriorityService } from '../services/priority.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: ``
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  todoItems: any[] = [];
  categories: any[] = [];
  priorities: any[] = [];
  selectedUserTasks: any[] = [];
  errorMessage = '';
  showUserSection = false;

  constructor(private userService: UserService, private todoItemService: TodoItemService, private categoryService: CategoryService, private priorityService: PriorityService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadTodoItems();
    this.loadCategories();
    this.loadPriorities();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = 'Error loading users';
        console.error(error);
      }
    );
  }

  loadTodoItems() {
    this.todoItemService.getTodoItems().subscribe(
      (data) => {
        this.todoItems = data;
      },
      (error) => {
        this.errorMessage = 'Error loading tasks';
        console.error(error);
      }
    );
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        this.errorMessage = 'Error loading categories';
        console.error(error);
      }
    )
  }

  loadPriorities(){
    this.priorityService.getPriorities().subscribe(
      (data) => {
        this.priorities = data;
      },
      (error) => {
        this.errorMessage = 'Error loading priorities';
        console.error(error);
      }
    )
  }

  deleteUser(userId: number){
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.loadUsers();
        },
        (error) => {
          this.errorMessage = 'Error deleting task';
          console.error(error);
        }
      );
    }
  }

  deleteItem(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todoItemService.deleteTodoItem(taskId).subscribe(
        () => {
          this.loadTodoItems();
        },
        (error) => {
          this.errorMessage = 'Error deleting task';
          console.error(error);
        }
      );
    }
  }

  deleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          this.loadCategories();
        },
        (error) => {
          this.errorMessage = 'Error deleting task';
          console.error(error);
        }
      );
    }
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({behavior:'smooth' });
  }

  closeSection() {
    this.showUserSection = false;
    window.scrollTo({top: 10, behavior: 'smooth' });
  }

}



