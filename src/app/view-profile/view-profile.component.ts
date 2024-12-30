import { Component } from '@angular/core';
import { TodoItemService } from '../services/todo-item.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styles: ``
})
export class ViewProfileComponent {

  user: any;
  taskCount: number = 0;
  completedTaskCount: number = 0;
  incompletedTaskCount: number = 0;
  title: string = '';

  constructor(private authService: AuthService, private userService: UserService, private todoItemService: TodoItemService) { }

  ngOnInit(): void {
    const userId = this.userService.getUserId();
    this.title = this.authService.getUserName();
    if (userId) {
      this.userService.getUserDetails(userId).subscribe((data: any) => {
        this.user = data;
      });

      this.todoItemService.getTodoItemsByUserId(userId).subscribe((tasks: any[]) => {
        this.taskCount = tasks.length;
        this.completedTaskCount = tasks.filter(task => task.isComplete).length;
        this.incompletedTaskCount = tasks.filter(task => !task.isComplete).length;
      });
    } else {
      console.error('User ID not found in localStorage.');
    }
  }

}
