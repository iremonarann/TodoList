import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { CategoriesComponent } from './categories/categories.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminComponent } from './admin/admin.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { NgModule } from '@angular/core';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  {
    path: 'add-new-task',
    component: AddNewTaskComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'view-profile',
    component: ViewProfileComponent
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
  },
  {
    path: 'delete-account',
    component: DeleteAccountComponent
  },
  {
    path: 'completed-tasks',
    component: CompletedTasksComponent
  },
  { 
    path: 'admin', 
    component: AdminComponent 
  },
  {
    path: 'logout',
    component: LogoutModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

