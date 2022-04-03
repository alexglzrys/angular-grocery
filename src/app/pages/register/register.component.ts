import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileService } from 'src/app/shared/services/file.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
    });
  }

  createUser() {
    if (this.formRegister.valid) {
      this.userService.create(this.formRegister.value).subscribe(user => {
        this.downloadFileRegister()
        Swal.fire({
          title: 'Felicidades',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/');
          }
        });
      })
    }
  }

  downloadFileRegister() {
    // Descargar un archivo de forma programatica (el archivo debe existir previamente en el servidor)
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf').subscribe(file => {
      console.log('archivo descargado')
    });
  }

}
