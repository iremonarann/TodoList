import { Component } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent {
  user: User = new User(0, '', '', '', '', '');
  errorMessage: string = '';
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^\S*$/)]],  
      username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],  
      email: ['', [Validators.required, Validators.email]],  
      password: ['', [Validators.required, Validators.minLength(8)]]  
    });
  }

  onSubmit() {
    console.log('Kayıt işlemi başlatılıyor:', this.user);
    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('Kayıt işlemi başarılı!');
        this.router.navigate(['/login']);  
      },
      (error) => {
        console.error('Kayıt işlemi başarısız:', error);
        if (error.status === 400) {
          this.errorMessage = error.error.message || 'Kullanıcı adı zaten mevcut!';
        } else {
          this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin!';
        }
      }
    );
  }
  
}



