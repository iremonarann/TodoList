import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../models/todoItem.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItemService } from '../services/todo-item.service';
import { AuthService } from '../auth.service';
import { PriorityService } from '../services/priority.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styles: ``
})
export class CompletedTasksComponent implements OnInit{

  title: string = '';
  todoItems: TodoItem[] = [];
  errorMessage = '';
  item: any;
  incompletedTasks: TodoItem[] = [];
  completedTasks: TodoItem[] = [];
  showCompletedTasks: boolean = false;
  editForm: FormGroup;
  editingItem: any = null;
  showPriorities: boolean = false;
  priorities: any[] = []; 
  categories: any[] = [];
  shouldColorTasks: boolean = false;
  deletingItem: TodoItem | null = null;


  constructor(
    private todoItemService: TodoItemService,
    private authService: AuthService,
    private priorityService: PriorityService,
    private categoryService: CategoryService,
    private fb: FormBuilder 
  ){
    this.editForm = this.fb.group({
      name: ['', [Validators.required]], 
      description: [''],  
      dueDate: ['', [Validators.required]],
      lastUpdated: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      priorityId: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.title = this.authService.getUserName();
    this.loadP();
    this.loadC();
    if (userId) {
      this.todoItemService.getTodoItemsByUserId(userId).subscribe(
        (items) => {
          this.completedTasks = items.filter((item: any) => item.isComplete);
        },
        (error) => {
          this.errorMessage = 'Could not load completed tasks.';
          console.error(error);
        }
      );
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
        this.loadTodoItems();
      },
      (error) => console.error('Error completing task', error)
    );
    window.location.reload();
  }

  editItem(item: any) {
    this.editingItem = item;
    this.editForm.patchValue({
      name: item.name,
      description: item.description,
      dueDate: item.dueDate,
      lastUpdated: Date(),
      categoryId: item.categoryId,
      priorityId: item.priorityId
    });
  }

  saveEditedItem() {
    if (this.editForm.valid && this.editingItem) {
      const updatedItem = {
        ...this.editingItem,  
        ...this.editForm.value
      };

      this.todoItemService.updateTodoItem(updatedItem.id, updatedItem).subscribe(
        (response) => {
          const index = this.todoItems.findIndex(item => item.id === updatedItem.id);
          if (index !== -1) {
            this.todoItems[index] = updatedItem;
            this.editingItem = null;  
          }
        },
        (error) => {
          this.errorMessage = 'Todo item güncelleme işlemi başarısız oldu.';
        }
      );
    }
  }
  onEditSubmit() {
    if (this.editForm.valid) {
      const updatedItem = {
        ...this.editingItem,  
        ...this.editForm.value
      };
  
      this.todoItemService.updateTodoItem(updatedItem.id, updatedItem).subscribe(
        (response) => {
          const index = this.todoItems.findIndex(item => item.id === updatedItem.id);
          if (index !== -1) {
            this.todoItems[index] = updatedItem; 
          }
          this.editingItem = null; 
        },
        (error) => {
          console.error('Error updating item', error);
        }
      );
    }
    window.location.reload();
  }

  cancelEdit() {
    this.editingItem = null;  
  }

  loadTodoItems() {
    this.todoItemService.getTodoItems().subscribe(
      (items: any) => {
        console.log('API response:', items); 
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

  loadPriorities2(){
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

  loadP() {
    this.priorityService.getPriorities().subscribe(
      (data: any) => {
        this.priorities = data;
      },
      (error) => {
        console.error('Error loading priorities:', error);
      }
    )
  }

  loadC() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
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
}
