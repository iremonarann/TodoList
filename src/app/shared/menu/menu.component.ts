import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthorizeGuard } from '../../guards/authorize.guard';

declare var bootstrap: any;

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent implements OnInit {

  title: string = '';
  userId: number | null = null;
  deletingUser: User | null = null;
  isAdminUser: boolean = false;
  logoutUserId: number | null = null;

  constructor(public authService: AuthService, private userService: UserService, private router: Router, private authorizeGuard: AuthorizeGuard) { }

  ngOnInit(): void {
    this.title = this.authService.getUserName();
    this.isAdminUser = this.authorizeGuard.canActivate();
  }

  
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

  logout() {
  
    this.authService.logout();
    this.router.navigate(['/login']);
  
  
}

  
}
