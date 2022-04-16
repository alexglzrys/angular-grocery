import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/dtos/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User | null = null;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.authService.profile().subscribe(user => {
      this.user = user;
      console.log(user)
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
