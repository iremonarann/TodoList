import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styles: ``
})
export class DeleteAccountComponent {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}


  confirmDeleteAccount(): void {
    const userId = this.authService.getUserId();
    
    if(userId === null){
      console.error('User Id is null. Cannot delete user');
      return;
    }

    console.log('Delete user initiated for userId:', userId);

    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully.');
        this.authService.logout();
        this.router.navigate(['/register']); 
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  closeModal() {
    this.router.navigate(['/home']); 
  }


}
