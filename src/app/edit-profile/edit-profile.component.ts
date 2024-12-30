import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styles: ``
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  title: string = '';
  currentUserData: any = {};

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService) {
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.title = this.authService.getUserName();

    if (userId) {
      this.userService.getUserDetails(userId).subscribe((user: any) => {
        this.currentUserData = user;
        this.editProfileForm.patchValue({
          name: user.name,
          surname: user.surname,
          username: user.username,
          email: user.email,
          password: user.password
        });
      });
    }
  }


  onSubmit(): void {
    if (this.editProfileForm.valid) {
      console.log('User updated successfully');
      const updatedUser = {
        name: this.editProfileForm.value.name || this.currentUserData.name,
        surname: this.editProfileForm.value.surname || this.currentUserData.surname,
        username: this.editProfileForm.value.username || this.currentUserData.username,
        email: this.editProfileForm.value.email || this.currentUserData.email,
        password: this.editProfileForm.value.password ? this.editProfileForm.value.password : this.currentUserData.password
      };

      console.log('User updated successfully');
      console.log(updatedUser.name);
      console.log(updatedUser.surname);
      console.log(updatedUser.username);
      console.log(updatedUser.email);
      console.log(updatedUser.password);
      const userId = this.authService.getUserId();
      if (userId) {
        console.log('User updated successfully');
        this.userService.updateUser(userId, updatedUser).subscribe(
          (response) => {
            console.log('User updated successfully');
          },
          (error) => {
            console.error('Error updating user', error);
          }
        );
      }
    }
    window.location.reload();
  }


}
