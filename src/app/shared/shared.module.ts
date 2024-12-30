import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';
import { CategoriesComponent } from '../categories/categories.component';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { CompletedTasksComponent } from '../completed-tasks/completed-tasks.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { HomeComponent } from '../home/home.component';
import { ViewProfileComponent } from '../view-profile/view-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Routes } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';
import { AuthorizeGuard } from '../guards/authorize.guard';

const routes: Routes = [
  {path:'/admin', component: AdminComponent, canActivate:[AuthorizeGuard]},

];
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddNewTaskComponent,
    CategoriesComponent,
    CompletedTasksComponent,
    ViewProfileComponent,
    EditProfileComponent,
    AdminComponent,
    DeleteAccountComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedRoutingModule
  ],
  exports: [
    CommonModule, 
    ReactiveFormsModule, 
    FormsModule,
    MenuComponent
  ],
  providers: [
    UserService, 
    AuthService,
    AuthorizeGuard
  ],
  
})
export class SharedModule { }
