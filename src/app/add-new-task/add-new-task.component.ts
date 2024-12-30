import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoItemService } from '../services/todo-item.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CategoryService } from '../services/category.service';
import { PriorityService } from '../services/priority.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styles: ``
})


export class AddNewTaskComponent implements OnInit{
  title: string = '';
  taskForm: FormGroup;
  userId: number | null = null;
  categories: any[] = [];
  priorities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private todoItemService: TodoItemService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private priorityService: PriorityService
  ) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      dueDate: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      priorityId: ['', [Validators.required]]
    });
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
  }

  onSubmit() {
    if(this.taskForm.valid && this.userId){
      const newTask = {
        ...this.taskForm.value,
        userId: this.userId
      };
      this.todoItemService.createTodoItem(newTask).subscribe(
        (response) => {
          console.log('New task added:', response);
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );

    }
  }


}
