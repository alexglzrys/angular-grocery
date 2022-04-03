import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(private fb: FormBuilder,
              private autService: AuthService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    if(this.formLogin.valid) {
      const {email, password} = this.formLogin.value
      this.autService.login(email, password).subscribe(auth => {
        console.log(auth);
      })
    }
  }

}
