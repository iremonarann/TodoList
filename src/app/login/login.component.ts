import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent {
  errorMessage = '';
  loginForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder
  ) {
    // Login formunu oluştur
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],  
      password: ['', [Validators.required]]  
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.login(username, password).subscribe(
        (response) => {
          console.log('Giriş Başarılı! Yanıt:', response);
  
          if (response.token) {
            this.authService.saveToken(response.token);
            this.authService.saveUserId(response.id);
            this.authService.saveUsername(response.username);
            this.router.navigate(['/home']);  
          } else {
            console.error('Token alınamadı!');
          }

          this.authService.admin = true;
        },
        (error) => {
          this.authService.admin = false;
          this.authService.clearToken();
          
        }
      );
    }
  }
  
}
