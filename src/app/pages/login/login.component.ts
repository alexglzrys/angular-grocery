import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private fb: FormBuilder,
              private autService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    if(this.formLogin.valid) {
      const {email, password} = this.formLogin.value

      /*this.autService.login(email, password).subscribe(auth => {
        window.localStorage.setItem('token', auth.access_token);
        this.autService.profile().subscribe(user => {
          window.localStorage.setItem('profile', JSON.stringify(user));
          this.router.navigateByUrl('/');
        })
      })*/

      this.autService.loginAndProfile(email, password).subscribe({
        next: (user) => {
          window.localStorage.setItem('profile', JSON.stringify(user));
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          Swal.fire({
            title: 'Lo sentimos',
            text: err,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      })
    }
  }

}
