import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { RouterModule } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./services/user.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { AuthorizeGuard } from "./guards/authorize.guard";

@NgModule({
  declarations: [
    AppComponent,
    LogoutModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }